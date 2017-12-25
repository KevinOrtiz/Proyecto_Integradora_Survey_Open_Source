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

    }else if(estado === 'estable'){
        contenido = `<h4>Estado de la pregunta creada</h4>
        <p>Estimado ${receptor} felicidades su pregunta ha sido aceptada por los miembros
        del comite y ahora esta disponible para que otros usuarios puedan usarlo en sus encuestas,
        dejeme agradecerle por compartir sus conocimientos con nosotros y poder contribuir
        al desarrollo de conocimiento libre</p>
        <p>Saludos Open Source Survey</p>`;

    }
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

exports.sendComentarioCreado=(receptor,topico)=>{
    const contenido = `<h4>Comentario Creado</h4>
    <p>Se ha creado un comentario en una pregunta en la categoria
    ${topico}</p>
    <p>Saludos Open Source Survey</p>`;
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

}