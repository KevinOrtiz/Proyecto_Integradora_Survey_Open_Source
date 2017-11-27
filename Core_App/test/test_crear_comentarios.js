/**
 *Creacion de comentarios
 *
 *
 */

const assert = require('assert');
const Comentario = require('../models/Comentarios');


describe('Creacion de un comentario',()=>{
   let  comentarioInstance,subcomentarioInstance,comentarioInstance2;
   beforeEach((done)=>{

       /**
        * guardar un comentario y un subcomentario dentro del comentario principal en la base de datos
        */

       comentarioInstance = new Comentario({
          creador:{nombre:'kevin Ortiz',ID:1},
          contenido:"Un comentario de prueba",
          fecha_creacion:'12/11/2017',
          fecha_actualizacion:'12/12/2017',
          likes:100,
          dislikes:200,
          favoritos:3
      });


      subcomentarioInstance = new Comentario({
          creador:{nombre:'Pedro Ortiz',ID:2},
          contenido:"comentario",
          fecha_creacion:'12/11/2017',
          fecha_actualizacion:'12/12/2017',
          likes:20,
          dislikes:30,
          favoritos:3
      });

       /**
        * definir una funcion que vaya guardando cada comentario en un documento
        * y anadirla a la promesa sincrona
        */

       comentarioInstance.comentarios.push(subcomentarioInstance);

      Promise.all([comentarioInstance.save(),subcomentarioInstance.save()])
          .then(()=>done());
   });

   it('guardar un comentario',(done)=>{

       comentarioInstance2 = new Comentario({
          creador:{nombre:'Juan Lopez',ID:3},
          contenido:"Un comentario de prueba 2",
          fecha_creacion:'12/14/2017',
          fecha_actualizacion:'12/14/2017',
          likes:100,
          dislikes:200,
          favoritos:3
      });
       comentarioInstance2.save()
           .then(()=>{
            assert(!comentarioInstance2.isNew);
            done()
           });
   });

   it('Cargar los subcomentario dentro del comentario principal',(done)=>{
       Comentario.findOne({creador:{nombre:'kevin Ortiz',ID:1}})
           .populate('listaSubComentarios')
           .then((comentario)=>{
               assert(comentario.listaSubComentarios[0].contenido=='comentario');
               done();
           });
   });






});

