import { createTransport } from 'nodemailer';
import { logger } from '../utils/logger.js'
import 'dotenv/config';




export const transporterGmail = createTransport({
    service: 'gmail',
    port: process.env.PORT_GMAIL,
    secure: true,
    auth: {
        user: process.env.EMAIL_GMAIL,
        pass: process.env.PASS_GMAIL
    }
});

const CreateMsgDeleteUsers = (first_name) => `<h1> Hola ${first_name}, tu cuenta ha sido eiminada debido a que han transcurrido dos días desde tu última conexión.`  //al no poner const, luego de levantar el servidor este se vuelve a cerrar
const CreateMsgDeleteProducts = (first_name, id) => `<h1> Hola ${first_name}, el producto identificado como ${id} ha sido dado de baja.` 


export const sendGmail = async (first_name, email,id, service) => {
    try {
        let msg = '';
        console.log("en email service el service es", service) 
        service === 'deleteUsers' ? msg = CreateMsgDeleteUsers(first_name) :
        service === 'deleteProducts' ? msg = CreateMsgDeleteProducts(first_name, id) : msg = ""; 
                
        let subj = '';

        service === 'deleteUsers' ? subj = "Baja de usuario" :
        service === 'deleteProducts' ? subj="Baja de producto" : subj = ""; 

                
        const gmailOptions = {
            from: process.env.EMAIL_GMAIL,
            to: email,
            subject: subj,
            html: msg,
        }
        const response = await transporterGmail.sendMail(gmailOptions);
        logger.info("from email.service.js - se realizo el envio del email ")
        return response
    } catch (error) {
        throw new Error(error);
    }
};


