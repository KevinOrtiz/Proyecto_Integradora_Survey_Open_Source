export class Encuesta {
    private titulo = '';
    private descripcion = 'encuesta sin descripcion';
    private usuario_ID = '';
    private historial_cambios: String [] = [];
    private registroActual = true;
    private etiqueta: Object [] = [];
    private contenido_multimedia = {
        url: '',
        tipo: ''
    };
    private preguntas: Object [] = [];
    constructor () {}
    public getTitulo() {
        return this.titulo;
    }

    public getUsuarioID () {
        return this.usuario_ID;
    }

    public getEtiqueta () {
        return this.etiqueta;
    }

    public getDescripcion () {
        return this.descripcion;
    }

    public getHistorialCambios () {
        return this.historial_cambios;
    }

    public getRegistroActual () {
        return this.registroActual;
    }

    public getlogoEncuesta () {
        return this.contenido_multimedia;
    }

    public getListaPreguntas () {
        return this.preguntas;
    }

    public setTitulo (titulo) {
        console.log(titulo);
        this.titulo = titulo;
    }

    public setHistorialCambios (texto) {
        this.historial_cambios.push(texto);
    }

    public addEtiqueta (texto) {
        console.log(texto);
        console.log(this.etiqueta);
        this.etiqueta.push(texto);
    }

    public addHistorialCambios (actividad) {
        this.historial_cambios.push(actividad);
    }

    public setUsuarioID (idUsuario) {
        this.usuario_ID = idUsuario;
    }

    public setDescripcion (descripcion) {
        console.log(descripcion);
        this.descripcion = descripcion;
    }

    public setlogoEncuesta(imagen) {
        console.log(imagen);
        this.contenido_multimedia.url = imagen;
        this.contenido_multimedia.tipo = 'imagen';
    }

    public addPreguntaLista (pregunta: Object) {
        this.preguntas.push(pregunta);
    }

    public removePreguntaLista (pregunta: any) {
        const index = this.preguntas.indexOf(pregunta);
        this.preguntas.splice(index, 1 );
    }

    public removeTagEncuesta (etiqueta: any) {
        console.log(etiqueta);
        const index = this.etiqueta.indexOf(etiqueta);
        this.etiqueta.splice(index, 1);
    }

    public getObjectEncuesta () {
        const objetoEncuesta = {
            titulo: this.getTitulo(),
            descripcion: this.getDescripcion(),
            usuario_ID: this.getUsuarioID(),
            historial_cambios: this.getHistorialCambios(),
            registroActual : this.getRegistroActual(),
            etiqueta: this.getEtiqueta(),
            contenido_multimedia: this.getlogoEncuesta(),
            preguntas: this.getListaPreguntas()

        };
        return objetoEncuesta;
    }

}
