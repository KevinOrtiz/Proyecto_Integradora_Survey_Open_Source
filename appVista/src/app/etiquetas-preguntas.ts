export class EtiquetasPreguntas {
    constructor () {}
    getListaEtiqueta () {
    const listaEtiqueta = [{
            value: 'opcionesMultiples', viewValue: 'Opciones Multiples'
            },
            {
            value: 'PreguntaAbierta', viewValue: 'Pregunta Abierta'
            },
            {
            value: 'respuestas_Si/No', viewValue: 'Pregunta Si/No'
            },
            {
            value: 'rating', viewValue: 'Rating'
            },
            {
            value: 'listaDesplegable', viewValue: 'lista Desplegable'
            }];
        return listaEtiqueta;
    }
}
