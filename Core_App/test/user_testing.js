let chai = require('chai');
let expect = chai.expect;
let chaiHttp = require('chai-http');
let server = require("../serverTest");
let should = chai.should();
let usuario = require("../models/Usuarios");

chai.use(chaiHttp);

describe("Prueba al controlador Usuario",()=>{
        beforeEach((done)=>{
            usuario.remove({},(err)=>{
                done();
            });
        });
        describe('Guardar la informacion de un usuario nuevo',()=>{
            it("No deberia permitirme  guardar la informacion de un usuario con datos incompletos",(done)=>{
                let usuario = {
                    nombre: "kevin",
                    apellido: "",
                    correo: "kevin@gmail.com",
                    urlImage: "image.png",
                    historialLogin:{
                        actividad:"usuario registrado",
                        fecha_entrada: "03/04/2017",
                        fecha_salida: "03/04/2017"
                    }
                }
                chai.request(server)
                    .post('/crearUsuario')
                    .send({usuario:usuario})
                    .end((err,res)=>{
                        expect(res.should.have.status(200));
                        expect(res.body.should.be.a('object'));
                        expect(res.body.should.have.property('messaje').eql("el tipos de datos enviados no son correctos"));
                        done();
                    });
            });
            it("No deberia permitirme guardar una informacion vacia",(done)=>{
                let usuario = {
                    nombre: "",
                    apellido: "",
                    correo: "",
                    urlImage: "",
                    historialLogin:{
                        actividad:"",
                        fecha_entrada: "03/04/2017",
                        fecha_salida: "03/04/2017"
                    }
                }

                chai.request(server)
                .post('/crearUsuario')
                .send({usuario:usuario})
                .end((err,res)=>{
                    expect(res.should.have.status(200));
                    expect(res.body.should.be.a('object'));
                    expect(res.body.should.have.property('messaje').eql("el tipos de datos enviados no son correctos"));
                    done();
                });

            });
            it("No deberia permitirme guardar una informacion con tipos de datos de fechas incorrectas",(done)=>{
                let usuario = {
                    nombre: "jorge",
                    apellido: "ortiz",
                    correo: "correo@gmail.com",
                    urlImage: "images/image.png",
                    historialLogin:{
                        actividad:"ekeldlklxsdddsds",
                        fecha_entrada: "03/04/2017",
                        fecha_salida: "03/04/2017"
                    }
                }

                chai.request(server)
                .post('/crearUsuario')
                .send({usuario:usuario})
                .end((err,resp)=>{
                    expect(resp.res.should.have.status(200));
                    expect(resp.res.body.should.be.a('object'));
                    done();
                });
            });
            it("No deberia permitirme guardar una informacion con un formato incorrecto de correo",(done)=>{
                let usuario = {
                    nombre: "jorge",
                    apellido: "ortiz",
                    correo: "correo@",
                    urlImage: "images/image.png",
                    historialLogin:{
                        actividad:"ekeldlklxsdddsds",
                        fecha_entrada: "03/04/2017",
                        fecha_salida: "03/04/2017"
                    }
                }

                chai.request(server)
                .post('/crearUsuario')
                .send({usuario:usuario})
                .end((err,res)=>{
                    expect(res.should.have.status(200));
                    expect(res.body.should.be.a('object'));
                    expect(res.body.should.have.property('messaje').eql("el tipos de datos enviados no son correctos"));
                    done();
                });
            })
            it("deberia permitirme guardar la informacion de un usuario nuevo",(done)=>{
                let usuario = {
                    nombre: "jorge",
                    apellido: "vergara",
                    correo: "correo@espol.edu.ec",
                    urlImage: "images/image.png",
                    historialLogin:{
                        actividad:"usuario_registrado",
                        fecha_entrada: "03/04/2017",
                        fecha_salida: "03/04/2017"
                    }
                }

                chai.request(server)
                .post('/crearUsuario')
                .send({usuario:usuario})
                .end((err,res)=>{
                    expect(res.should.have.status(200));
                    expect(res.body.should.be.a('object'));
                    done();
                });

            });
            it("deberia permitirme obtener la informacion de un usuario existente",(done)=>{
                let usuario = {
                    nombre: "jorge",
                    apellido: "vergara",
                    correo: "correo@espol.edu.ec",
                    urlImage: "images/image.png",
                    historialLogin:{
                        actividad:"usuario_registrado",
                        fecha_entrada: "03/04/2017",
                        fecha_salida: "03/04/2017"
                    }
                }

                chai.request(server)
                .post('/crearUsuario')
                .send({usuario:usuario})
                .end((err,res)=>{
                   expect(res.should.have.status(200));
                   expect(res.body.should.be.a('object'));
                    done();
                });
            });
            it("deberia permitirme guardar un usuario con el siguiente formato",(done)=>{
                let usuario = {
                    nombre: ' Kevin Andres',
                    apellido: ' Ortiz Merchan',
                    correo: 'kevinandresortizmerchan@gmail.com',
                    urlImage: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
                    historialLogin:{
                        actividad:'usuario autenticado en la aplicacion',
                        fecha_entrada: 'Mon, 11 Dec 2017 02:29:45 GMT',
                        fecha_salida: 'Mon, 11 Dec 2017 14:39:21 GMT'
                    }
                }

                chai.request(server)
                .post('/crearUsuario')
                .send({usuario:usuario})
                .end((err,res)=>{
                   expect(res.should.have.status(200));
                   expect(res.body.should.be.a('object'));
                   expect(res.body.should.have.property('status').eql(200));
                    done();
                });
            });
        });
        describe('Editar informacion de un usuario',()=>{
            it("no deberia permitirme actualizar un usuario si el objeto esta vacio",(done)=>{
                var usuario = {};
                chai.request(server)
                .post('/editarUsuario')
                .send({usuario:usuario})
                .end((err,res)=>{
                    expect(res.should.have.status(200));
                    expect(res.body.should.be.a('object'));
                    expect(res.body.should.have.property('messaje').eql("el identificador del usuario no puede ser nulo"));
                    done();
                });
                
            });
            it("no deberia permitirme actualizar un usuario si el id esta vacio",(done)=>{
                var usuario ={
                    _id:null,
                    nombre:"kevin Andres",
                    apellido:"ortiz Merchan",
                    correo: "kevin@gmail.com",
                    urlImage:"imagen.png",
                    historialLogin:{
                        actividad:"usuario actualizado",
                        fecha_entrada:"03/04/2017",
                        fecha_salida:"03/04/2017"
                    }
                }
                chai.request(server)
                .post('/editarUsuario')
                .send({usuario:usuario})
                .end((err,res)=>{
                    expect(res.should.have.status(200));
                    expect(res.body.should.be.a('object'));
                    expect(res.body.should.have.property('messaje').eql("el identificador del usuario no puede ser nulo"));
                    done();
                });

            });
            it("deberia permitirme actualizar un usuario dado un id y un objeto nuevo",(done)=>{
                var usuario ={
                    _id:'5a2d3ae97c8de1a0d9d92d8e',
                    nombre:"kevin Andres",
                    apellido:"ortiz Merchan",
                    correo: "kevin@gmail.com",
                    urlImage:"imagen.png",
                    historialLogin:{
                        actividad:"usuario actualizado",
                        fecha_entrada:"03/05/2017",
                        fecha_salida:"03/05/2017"
                    }
                }
                chai.request(server)
                .post('/editarUsuario')
                .send({usuario:usuario})
                .end((err,res)=>{
                    expect(res.should.have.status(200));
                    expect(res.body.should.be.a('object'));
                    expect(res.body.should.have.property('messaje').eql("es un usuario nuevo"));
                    expect(res.body.should.have.property('status').eql(200));                    
                    done();
                });
            });
        });
});
