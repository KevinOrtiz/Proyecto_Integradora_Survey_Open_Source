export class CategoriasPreguntas {
   constructor () {}
   public getListaCategorias () {
       const listaCategoria = [{
            principal: 'Ciencias Computacionales',
            subcategoria: [
                { value: 'InteligenciaArtificial', viewValue: 'Inteligencia Artificial' },
                { value: 'InteraccionHombreMaquina', viewValue: 'Interaccion Hombre Maquina' },
                { value: 'AnalisisDatos', viewValue: 'Analisis de Datos' },
                { value: 'Metodologias de Investigacion', viewValue: 'Interaccion Hombre Maquina' },
                { value: 'ProgramacionBasica', viewValue: 'Programacion Basica' },
                { value: 'SeguridadInformacion', viewValue: 'Seguridad de Informacion' },
                { value: 'IngenieriaSoftware', viewValue: 'Ingenieria de Software' }
            ]
        },
        {
            principal: 'Matematicas',
            subcategoria: [
                { value: 'Calculo1 ', viewValue: 'Calculo 1' },
                { value: 'Calculo2 ', viewValue: 'Calculo 2' },
                { value: 'EcuacionesDiferenciales', viewValue: 'Ecuaciones Diferenciales' },
                { value: 'Algebralineal', viewValue: 'Algebra Lineal' }
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
