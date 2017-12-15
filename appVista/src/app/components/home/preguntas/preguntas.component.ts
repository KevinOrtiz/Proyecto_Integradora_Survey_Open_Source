import { Component, OnInit, ViewChild, ViewContainerRef,
         ComponentFactoryResolver, ComponentFactory, Type } from '@angular/core';
import { CasillaComponent } from './respuesta/casilla/casilla.component';
import { RadioComponent } from './respuesta/radio/radio.component';
import { ListaDesplegableComponent } from './respuesta/lista-desplegable/lista-desplegable.component';

@Component({
  selector: 'app-preguntas',
  entryComponents: [CasillaComponent, RadioComponent, ListaDesplegableComponent],
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  @ViewChild('casillaComponent', {read: ViewContainerRef}) casillaComponent: ViewContainerRef;
  @ViewChild('radioComponent', {read: ViewContainerRef})   radioComponent: ViewContainerRef;
  @ViewChild('listaComponent', {read: ViewContainerRef})   listaComponent: ViewContainerRef;
  private  listaRespuestasCasilla = [];
  private  listaRespuestasRadio = [];
  private  listaRespuestasLista = [];
  private Instancepregunta: Pregunta;
  private contadorRespuesta = 0;
  private   existePregunta= false;
  private  esLaPrimeraRespuesta = true;
  private  CHECKBOX = false;
  private  RADIOBUTTON = false;
  private  SI_NO = false;
  private  PUNTAJE = false;
  private  DESCRIPCION = false;
  private  LISTA_DESPLEGABLE = false;
  private  DESCRIPCION_RATING = 'ES UNA RESPUESTA DE RATING';
  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  addTipoRespuesta (tipo_De_Respuesta) {
    this.existePregunta = true;
    switch (tipo_De_Respuesta) {
      case '1': {
        this.RADIOBUTTON = true;
        this.CHECKBOX = false;
        this.SI_NO = false;
        this.PUNTAJE = false;
        this.DESCRIPCION = false;
        this.LISTA_DESPLEGABLE = false;
        break;
      }
      case '2': {
        this.CHECKBOX = true;
        this.RADIOBUTTON = false;
        this.SI_NO = false;
        this.PUNTAJE = false;
        this.DESCRIPCION = false;
        this.LISTA_DESPLEGABLE = false;
        break;
      }
      case '3': {
        this.SI_NO = true;
        this.CHECKBOX = false;
        this.RADIOBUTTON = false;
        this.PUNTAJE = false;
        this.DESCRIPCION = false;
        this.LISTA_DESPLEGABLE = false;
        break;
      }
      case '4': {
        this.PUNTAJE = true;
        this.SI_NO = false;
        this.CHECKBOX = false;
        this.RADIOBUTTON = false;
        this.DESCRIPCION = false;
        this.LISTA_DESPLEGABLE = false;
        break;
      }
      case '5': {
        this.LISTA_DESPLEGABLE = true;
        this.PUNTAJE = false;
        this.SI_NO = false;
        this.CHECKBOX = false;
        this.RADIOBUTTON = false;
        this.DESCRIPCION = false;
        break;
      }
      case  '6': {
        this.DESCRIPCION = true;
        this.LISTA_DESPLEGABLE = false;
        this.PUNTAJE = false;
        this.SI_NO = false;
        this.CHECKBOX = false;
        this.RADIOBUTTON = false;
        break;
      }

     }
    }


  addRespuesta(tipoRespuesta: string, descripcion: string) {
      console.log('si funciona');
  }

  addCasilla () {
    const componentCasilleroFactory = this.resolver.resolveComponentFactory(CasillaComponent);
    const componentCasillero = this.casillaComponent.createComponent(componentCasilleroFactory);
    this.listaRespuestasCasilla.push(componentCasillero);
    console.log(this.listaRespuestasCasilla);
    return componentCasillero;
  }
  removeComponentCasilla () {
    const component = this.listaRespuestasCasilla.find((value) => value.instance instanceof CasillaComponent);
    const componentIndex = this.listaRespuestasCasilla.indexOf(component);
    if (componentIndex !== -1) {
      this.casillaComponent.remove(this.casillaComponent.indexOf(component));
      this.listaRespuestasCasilla.splice(componentIndex, 1);
    }

  }
  addRadio () {
    const componentRadioFactory = this.resolver.resolveComponentFactory(RadioComponent);
    const componentRadio = this.radioComponent.createComponent(componentRadioFactory);
    this.listaRespuestasRadio.push(componentRadio);
    console.log(this.listaRespuestasRadio);
    return componentRadio;

  }
  removeComponentRadio () {
    const component = this.listaRespuestasRadio.find((value) => value.instance instanceof RadioComponent);
    const componentIndex = this.listaRespuestasRadio.indexOf(component);
    if (componentIndex !== -1) {
      this.radioComponent.remove(this.radioComponent.indexOf(component));
      this.listaRespuestasRadio.splice(componentIndex, 1);
    }

  }
  addLista () {

    const componentListaFactory = this.resolver.resolveComponentFactory(ListaDesplegableComponent);
    const componentLista = this.listaComponent.createComponent(componentListaFactory);
    this.listaRespuestasLista.push(componentLista);
    console.log(this.listaRespuestasLista);
    return componentLista;

  }
  removeComponentLista () {
    const component = this.listaRespuestasLista.find((value) => value.instance instanceof ListaDesplegableComponent);
    const componentIndex = this.listaRespuestasLista.indexOf(component);
    if (componentIndex !== -1) {
      this.listaComponent.remove(this.listaComponent.indexOf(component));
      this.listaRespuestasLista.splice(componentIndex, 1);
    }

  }
  deleteRespuesta(identificador: string) {

  }
  addDescripcion( descripcion: string) {

  }
  addTopicos(texto) {

  }
  addEtiquetas (color: string, descripcion: string) {

  }

  getObjetoPregunta () {

  }


}


interface Pregunta {
  identificador: string;
  descripcion: string;
  usuario_ID: string;
  historial_cambios: {
    texto: string;
  };
  registroActual: boolean;
  etiquetas: [{
    texto: string;
    color: string;
  }];
  topicos: [{
    texto: string;
  }];
  respuestas: [{
    id: number;
    texto: string;
    tipoRespuesta: string;
  }];

}
