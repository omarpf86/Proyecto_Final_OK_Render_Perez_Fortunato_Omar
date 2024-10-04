import  ProductDaoMongoDB from './mongodb/product.dao.js'
import  ProductDaoFS from './filesystem/product.dao.js'
import  UserDaoMongoDB from './mongodb/user.dao.js'
import  CartsDaoMongodb from './mongodb/cart.dao.js'
import  CartDaoFS from './filesystem/cart.dao.js'
import  MessageDaoMongoDB from './mongodb/message.dao.js'
import  MessageDaoFS from './filesystem/message.dao.js'
import { initMongoDB } from '../../db/connection.js'
import { logger } from '../../utils/logger.js' 

let prodDao = null;
let userDao = null;
let cartDao = null;
let messageDao = null;

let persistence = process.argv[3];

switch (persistence) {
    case 'fs':
        console.log(persistence)
        prodDao = new ProductDaoFS('./src/daos/filesystem/products.json');
        cartDao = new CartDaoFS('./src/daos/filesystem/carts.json');
        messageDao = new MessageDaoFS('./src/daos/filesystem/message.json');
   
    break;
    case 'mongo':
        logger.info("En factory.js - persistencia es :" + persistence)
        initMongoDB();
        userDao = new UserDaoMongoDB ();
        prodDao = new ProductDaoMongoDB ();
        cartDao = new CartsDaoMongodb ();
        messageDao=new MessageDaoMongoDB ()
    break;
  
    default:
    prodDao = new ProductDaoFS('./src/daos/filesystem/products.json');
    cartDao = new CartDaoFS('./src/daos/filesystem/carts.json');
    messageDao = new MessageDaoFS('./src/daos/filesystem/message.json');
    break;
}

export default { userDao, prodDao, cartDao, messageDao };