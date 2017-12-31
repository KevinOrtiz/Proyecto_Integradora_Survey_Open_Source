export class CategoriasPreguntas {
   constructor () {}
   public getListaCategorias () {
       const listaCategoria = [{
            principal: 'Ciencias Computacionales',
            subcategoria: [
                { value: 'Inteligencia_Artificial', viewValue: 'Inteligencia Artificial' },
                { value: 'Interaccion_Hombre_Maquina', viewValue: 'Interaccion Hombre Maquina' },
                { value: 'Analisis_Datos', viewValue: 'Analisis de Datos' },
                { value: 'Metodologias_de_Investigacion', viewValue: 'Metodologias de Investigacion' },
                { value: 'Programacion_Basica', viewValue: 'Programacion Basica' },
                { value: 'Seguridad_Informacion', viewValue: 'Seguridad de Informacion' },
                { value: 'Ingenieria_Software', viewValue: 'Ingenieria de Software' }
            ]
        },
        {
            principal: 'Matematicas',
            subcategoria: [
                { value: 'Calculo1 ', viewValue: 'Calculo 1' },
                { value: 'Calculo2 ', viewValue: 'Calculo 2' },
                { value: 'Ecuaciones_Diferenciales', viewValue: 'Ecuaciones Diferenciales' },
                { value: 'Algebra_lineal', viewValue: 'Algebra Lineal' }
            ]
        },
        {
            principal: 'Biologia',
            subcategoria: [
                { value: 'marina', viewValue: 'Marina' },
                { value: 'terrestre', viewValue: 'Terrestre' },
                { value: 'aerea', viewValue: 'Aerea' }
            ]
        }];
    return listaCategoria;

    }
}
