
import MongoStore from 'connect-mongo';
import express from 'express';
import { logger } from './utils/logger.js'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { info } from './docs/info.js';
import cors from 'cors';


import handlebars from "express-handlebars";
import { _dirname } from "./utils.js";

import { Server } from 'socket.io';

import productsRouter from './routes/product.router.js';
import homepage from './routes/homepage.router.js';
import cartsRouter from './routes/cart.router.js';
import messagesRouter from './routes/message.router.js';
import usersRouter from './routes/user.router.js';
import viewsRouter from './routes/view.router.js';
import ticketsRouter from './routes/ticket.router.js';
import loggerRouter from './routes/logger.prueba.router.js';
import mockingProductsRouter from './routes/mockingProducts.router.js'


import { errorHandler } from './middlewares/errorHandler.js';
import passport from 'passport';
import './passport/local-strategy.js';
import "./passport/gitHub-strategy.js";
//import './database.js';
import config from './config.js';
//import 'dotenv/config' 

import * as messageService from "./services/message.services.js";
import * as productService from "./services/product.services.js";
import * as cartService from "./services/cart.services.js";

const app = express();

app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
        next();
    }
});

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        crypto: { secret: process.env.SECRET_KEY },
        ttl: 300,
    }),
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 300000,
        secure: true,
        sameSite: 'none'
    }
};

app.use(cors({
    origin: 'https://proyecto-final-ok-render-perez-fortunato.onrender.com',
    credentials: true
}))




const specs = swaggerJSDoc(info);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))


app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session(storeConfig))
app.use('/public', express.static(_dirname + '/public'));

app.use(passport.initialize());
app.use(passport.session());


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", _dirname + "/views");

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use('/homepage', homepage);
app.use('/loggerPrueba', loggerRouter);
app.use('/mockingproducts', mockingProductsRouter);
app.use('/messages', messagesRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', usersRouter);
app.use('/api/views', viewsRouter);
app.use('/api/tickets', ticketsRouter);
app.get('/', (req, res) => {
    res.redirect('/docs');
});


app.use(errorHandler);

//if (process.env.PERSISTENCE === 'MONGO') initMongoDB();

//initMongoDB();

const PORT = config.PORT;

const httpServer = app.listen(PORT, () => logger.info(`SERVER UP ON PORT ${PORT} in ${config.NODE_ENV} mode`));

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    logger.info('new connection', socket.id)

    socketServer.emit('messages', await messageService.getAll())

    socket.on('disconnect', () => {
        logger.info(' User disconnect', socket.id)
    });

    socket.on('newUser', (user) => {
        logger.info(`> ${user} ha iniciado sesión`);
        socket.broadcast.emit('newUser', user);
    })

    socket.on('chat:message', async (msg) => {
        await messageService.create(msg);
        socketServer.emit('messages', await messageService.getAll());
    })


    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data)
    })
    //DESPLEGAR LISTA EN ADMINISTRADOR DE PRODUCTOS--------------------------------
    socket.on('productList', async () => {
        try {
            const products = await productService.getAll()
            logger.silly("en el server la lista es", products)
            socketServer.emit('productList2', products.payload)
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
        }
    })





    //LISTA DE PRODUCTOS DISPONIBLES PARA CARRITOS-----------------------------------
    socket.on('getListproducts', async () => {
        try {
            const products = await productService.getAll()
            logger.silly("En el server la lista de productos es:", products.payload)
            socketServer.emit('listProducts1', products.payload)
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
        }
    })

    // AGREGAR PRODUCTOS AL CARRITO------------------------------------------- 
    socket.on('addProduct1', async (cid) => {
        try {
            const productIncart = await cartService.getById(cid)
            socketServer.emit("addProduct2", productIncart.products)
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
        }
    })

    //BORRAR PRODUCTO DEL CARRITO----------------------------------------------------
    socket.on('deleteProduct', async (productDelete) => {
        try {
            const cid = productDelete.idC
            const id = productDelete.idP
            const product = await cartService.removeProdToCart(cid, id);
            const productIncart = await cartService.getById(cid)
            socketServer.emit("deleteProduct2", productIncart.products)
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
        }
    })

    //LIMPIAR CARRITO---------------------------------------------------------
    socket.on('clearCart', async (idCart) => {
        try {
            const cart = await cartService.clearCart(idCart);
            socketServer.emit('emptyCart', cart.products)
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
        }
    })




}) 
