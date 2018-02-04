const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user:'2017opensourcesurvey@gmail.com',
        pass:'263605kevin'
    } 
});


exports.sendEmailPreguntaCreada= (receptor,topico) => {
    console.log(receptor);
    console.log(topico);
    const contenido = `<h4>De parte del equipo que conforma esta plataforma estamos agradecido
        contigo por usar Open source survey pero debo
        notificarte algo</h4>
        <p>usted ha creado una pregunta en el area de ${topico}</p>
        <p>Su pregunta esta en un estado revision, que significa 
        que otros miembros del comite deberan revisar si el contenido
        de la misma es aceptada o necesita ser actualizada o rechazada
        se le notificara por correo electronico la respuestas de los
        miembros del comite</p>
        <p>Saludos: Open Source Survey</p>`;

    let mailOptions = {
        from: '"Open Source Survey" <2017opensourcesurvey@gmail.com>',
        to: receptor,
        subject: 'Creacion de Pregunta',
        text: 'Hola con todos',
        html: contenido
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('mensaje enviando');
        console.log(info);
    });


};

exports.sendEmailEstadoPregunta=(receptor,estado,topico,textoCambio)=>{
    var contenido = '';
    if (estado === 'revision'){
        contenido = `<h4>Estado de la pregunta creada</h4>
        <p>La pregunta del Sr ${receptor} con categoria ${topico}
        se encuentra en estado en revision, lo que significa
        que deberia realizar los siguientes cambios a su pregunta.
        ${textoCambio}</p>
        <p>Saludos Open Source Survey</p>`;

    }else if(estado === 'rechazado'){
        contenido = `<h4>Estado de la pregunta creada</h4>
        <p>Estimado ${receptor} debido que no se ha llegado a una correccion definitiva
        de la pregunta en la categoria ${topico}, los miembros del comite han decidido rechazar
        esta pregunta, con el siguiente comentario.
        ${textoCambio}</p>
        <p>Saludos Open Source Survey</p>`;

    }else if(estado === 'aceptada'){
        contenido = `<h4>Estado de la pregunta creada</h4>
        <p>Estimado ${receptor} felicidades su pregunta ha sido aceptada por los miembros
        del comite y ahora esta disponible para que otros usuarios puedan usarlo en sus encuestas,
        dejeme agradecerle por compartir sus conocimientos con nosotros y poder contribuir
        al desarrollo de conocimiento libre</p>
        <p>Saludos Open Source Survey</p>`;

    }
    console.log(estado);
    let mailOptions = {
        from: '"Open Source Survey" <2017opensourcesurvey@gmail.com>',
        to: receptor,
        subject: 'Actualizacion del estado de la pregunta',
        html: contenido
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('mensaje enviando');
        console.log(info);
    });
};

exports.sendComentarioCreado=(receptor,contenido)=>{
    const contenidoComentario = `<h4>Comentario Creado</h4>
    <p>Se ha creado un comentario en una pregunta elaborada por usted,
    el contenido de la pregunta indica lo siguiente: ${contenido}</p>
    <p>Saludos Open Source Survey</p>`;
    let mailOptions = {
        from: '"Open Source Survey" <2017opensourcesurvey@gmail.com>',
        to: receptor,
        subject: 'Comentario Creado en una Pregunta',
        text: 'Hola con todos',
        html: contenidoComentario
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('mensaje enviando');
        console.log(info);
    });

}

exports.sendComentarioCreadoEncuesta=(receptor,contenido)=>{
    const contenidoComentario = `<h4>Comentario Creado</h4>
    <p>Se ha creado un comentario en una encuesta elaborada por usted,
    el contenido de la encuesta indica lo siguiente: ${contenido}</p>
    <p>Saludos Open Source Survey</p>`;
    let mailOptions = {
        from: '"Open Source Survey" <2017opensourcesurvey@gmail.com>',
        to: receptor,
        subject: 'Comentario Creado de una Encuesta',
        text: 'Hola con todos',
        html: contenidoComentario
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('mensaje enviando');
        console.log(info);
    });

}


exports.sendCorreoDiscusionCreada =(receptor,nombre,titulo)=>{
    const contenidoDiscusion = `<h4>Discusion Creada</h4>
    Estimado ${nombre} han creado una discusion de una pregunta que usted desarrollo
    este es el titulo del mensaje: ${titulo}, para mas informacion visite su portal 
    de actividades
    <p>Saludos Open Source Survey</p>`;
    let mailOptions = {
        from: '"Open Source Survey" <2017opensourcesurvey@gmail.com>',
        to: receptor,
        subject: 'Creacion de Discusion de una pregunta',
        text: 'Hola con todos',
        html: contenidoDiscusion
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('mensaje enviando');
        console.log(info);
    });
}

exports.sendCorreoAddColaborador=(duenoEncuesta, tituloEncuesta, correoRemitente, rol, nombre)=>{
    const compartirEncuesta = `<h4>Te han añadido como colaborador de una encuesta</h4>
    Estimado ${nombre} el usuario ${duenoEncuesta} te ha añadido como colaborador de su encuesta,
    el titulo de la Encuesta es ${tituloEncuesta}, en esta encuesta te han asignado el rol de ${rol},
    en su menu lateral izquierdo en la seccion de encuesta, encontrara un subseccion de encuestas compartida
    ahi podra acceder a la encuesta que el usuario ${duenoEncuesta} ha compartido con usted.`;
    let mailOptions = {
        from: '"Open Source Survey" <2017opensourcesurvey@gmail.com>',
        to: correoRemitente,
        subject: 'Añadido a una encuesta de un usuario',
        text: 'Reciban un saludo de OSS',
        html: compartirEncuesta
    };
    transporter.sendMail(mailOptions, (error, info)=> {
        if (error) {
            return console.log(error);
        }
        console.log('mensaje enviando');
        console.log(info);
    });
}

exports.actualizacionRolColaborador = (dueñoEncuesta, correoRemitente, rol, nombre) => {
    const compartirEncuesta = `<h4>Te han cambiado el rol que tiene sobre una encuesta</h4>
    Estimado ${nombre} el usuario ${duenoEncuesta} a permitido que puedas  ${rol} su encuesta,
    en su menu lateral izquierdo en la seccion de encuesta, encontrara un subseccion de encuestas compartida
    ahi podra acceder a la encuesta que el usuario ${duenoEncuesta} ha compartido con usted.`;
    let mailOptions = {
        from: '"Open Source Survey" <2017opensourcesurvey@gmail.com>',
        to: correoRemitente,
        subject: 'Cambio en un rol de una encuesta',
        text: 'Reciban un saludo de OSS',
        html: compartirEncuesta
    };
    transporter.sendMail(mailOptions, (error, info)=> {
        if (error) {
            return console.log(error);
        }
        console.log('mensaje enviando');
        console.log(info);
    });
}

exports.eliminacionColaborador = (dueñoEncuesta, correoRemitente, nombre, tituloEncuesta) => {
    const compartirEncuesta = `<h4>Te han eliminado como colaborador de una encuesta</h4>
    Estimado ${nombre} el usuario ${duenoEncuesta} te ha eliminado como colaborador de su encuesta,
    con el titulo ${tituloEncuesta}.`;
    let mailOptions = {
        from: '"Open Source Survey" <2017opensourcesurvey@gmail.com>',
        to: correoRemitente,
        subject: 'Eliminado como  colaborador de una encuesta',
        text: 'Reciban un saludo de OSS',
        html: compartirEncuesta
    };
    transporter.sendMail(mailOptions, (error, info)=> {
        if (error) {
            return console.log(error);
        }
        console.log('mensaje enviando');
        console.log(info);
    });
}