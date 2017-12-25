export class Preguntas {
    _id: string;
    urlUsuario: string;
    creador: string;
    topicos: {
        texto: string;
    };
    etiquetas: {
        texto: string;
    };
    descripcion: string;
    numeroDiscusiones: string;
    numeroComentarios: string;
    constructor (_id, urlUsuario, creador, topicos, etiquetas,
    descripcion, numeroDiscusiones,
    numeroComentarios) {
        this._id = _id;
        this.urlUsuario = urlUsuario;
        this.creador = creador;
        this.topicos.texto = topicos;
        this.etiquetas.texto = etiquetas;
        this.descripcion = descripcion;
        this.numeroDiscusiones = numeroDiscusiones;
        this.numeroComentarios = numeroComentarios;

    }
}
