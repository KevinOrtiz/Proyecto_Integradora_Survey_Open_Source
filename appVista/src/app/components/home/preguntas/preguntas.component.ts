import {
  Component, OnInit, ViewChild, ViewContainerRef,
  ComponentFactoryResolver, ComponentFactory, Type
} from '@angular/core';
import { CasillaComponent } from './respuesta/casilla/casilla.component';
import { RadioComponent } from './respuesta/radio/radio.component';
import { ListaDesplegableComponent } from './respuesta/lista-desplegable/lista-desplegable.component';
import { RespuestasService } from '../../../services/respuestas.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { CategoriasPreguntas } from '../../../categorias-preguntas';
import { EtiquetasPreguntas } from '../../../etiquetas-preguntas';
import { CategoriasEtiquetasService } from '../../../services/categorias-etiquetas.service';
import {MatSnackBar} from '@angular/material';
import {MatDialog} from '@angular/material';
import { AddLabelCategoriesComponent } from './add-label-categories/add-label-categories.component';
import { PreguntasService } from '../../../services/preguntas.service';
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';
import { SnackBarEliminarPreguntaComponent } from './snack-bar-eliminar-pregunta/snack-bar-eliminar-pregunta.component';
import { UploadFormComponent } from '../../uploads/upload-form/upload-form.component';
import { VerPreguntaComponent } from '../ver-pregunta/ver-pregunta.component';


@Component({
  selector: 'app-preguntas',
  entryComponents: [CasillaComponent, RadioComponent, ListaDesplegableComponent],
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  @ViewChild('casillaComponent', { read: ViewContainerRef }) casillaComponent: ViewContainerRef;
  @ViewChild('radioComponent', { read: ViewContainerRef }) radioComponent: ViewContainerRef;
  @ViewChild('listaComponent', { read: ViewContainerRef }) listaComponent: ViewContainerRef;
  @ViewChild('errorGuardar') private errorGuardar: SwalComponent;
  @ViewChild('errorServidor') private errorServidor: SwalComponent;
  @ViewChild('guardadoExitoso') private guardadoExitoso: SwalComponent;
  @ViewChild('guardarPregunta') private guardarPregunta: SwalComponent;
  private listaRespuestasCasilla = [];
  private listaRespuestasRadio = [];
  private listaRespuestasLista = [];
  private contadorRespuesta = 0;
  private existePregunta = false;
  private esLaPrimeraRespuesta = true;
  private CHECKBOX = false;
  private RADIOBUTTON = false;
  private SI_NO = false;
  private PUNTAJE = false;
  private DESCRIPCION = false;
  private LISTA_DESPLEGABLE = false;
  private lacajaRespuestasEstaVacia = true;
  private descripcionPreguntaEstaVacia = true;
  private showButton = false;
  private fotoCargada = false;
  constructor(private resolver: ComponentFactoryResolver, private respuestas: RespuestasService,
              private categoria: CategoriasEtiquetasService, private dialog: MatDialog, private preguntaServicio: PreguntasService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    const categoriasLista = new CategoriasPreguntas();
    const EtiquetasLista = new EtiquetasPreguntas();
    this.categoria.setListaCategorias(categoriasLista.getListaCategorias());
    this.preguntaServicio.setHistorialCambios();
    this.preguntaServicio.setRegistroActual();
    this.preguntaServicio.setIdUsuario();
    this.preguntaServicio.setIdentificador(sessionStorage.getItem('id') + 'PREG');
  }

  addTipoRespuesta(tipo_De_Respuesta) {
    this.lacajaRespuestasEstaVacia = false;
    this.existePregunta = true;
    switch (tipo_De_Respuesta) {
      case '1': {
        this.respuestas.deleteListaRadios();
        this.RADIOBUTTON = true;
        this.CHECKBOX = false;
        this.SI_NO = false;
        this.PUNTAJE = false;
        this.DESCRIPCION = false;
        this.LISTA_DESPLEGABLE = false;
        break;
      }
      case '2': {
        this.respuestas.deleteListaCasillas();
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
        this.respuestas.deleteListaDesplegable();
        this.LISTA_DESPLEGABLE = true;
        this.PUNTAJE = false;
        this.SI_NO = false;
        this.CHECKBOX = false;
        this.RADIOBUTTON = false;
        this.DESCRIPCION = false;
        break;
      }
      case '6': {
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

  /**
   *  Esta funcion lo que hara es enviar al servicio la respuesta que se encuentre activa
   * en la seccion de respuestas
   */
  addRespuesta() {
    if (this.CHECKBOX) {
      this.preguntaServicio.setRespuesta(this.respuestas.getListaRespuestasCasillas());

    }else if (this.RADIOBUTTON) {
      this.preguntaServicio.setRespuesta(this.respuestas.getListaRespuestasRadios());

    }else if (this.LISTA_DESPLEGABLE) {
      this.preguntaServicio.setRespuesta(this.respuestas.getListaDesplegable());

    }

  }

  addCasilla() {
    const componentCasilleroFactory = this.resolver.resolveComponentFactory(CasillaComponent);
    const componentCasillero = this.casillaComponent.createComponent(componentCasilleroFactory);
    this.listaRespuestasCasilla.push(componentCasillero);
    this.addRespuesta();
    console.log(this.listaRespuestasCasilla);
    return componentCasillero;
  }
  removeComponentCasilla() {
    const component = this.listaRespuestasCasilla.find((value) => value.instance instanceof CasillaComponent);
    this.respuestas.deleteValueListaRespuestasCasillas(component.instance.input.nativeElement.value);
    const componentIndex = this.listaRespuestasCasilla.indexOf(component);
    if (componentIndex !== -1) {
      this.casillaComponent.remove(this.casillaComponent.indexOf(component));
      this.listaRespuestasCasilla.splice(componentIndex, 1);
    }
    this.showMensajeEliminado();

  }
  addRadio() {
    const componentRadioFactory = this.resolver.resolveComponentFactory(RadioComponent);
    const componentRadio = this.radioComponent.createComponent(componentRadioFactory);
    this.listaRespuestasRadio.push(componentRadio);
    this.addRespuesta();
    console.log(this.listaRespuestasRadio);
    return componentRadio;

  }
  removeComponentRadio() {
    const component = this.listaRespuestasRadio.find((value) => value.instance instanceof RadioComponent);
    this.respuestas.deleteValueListaRespuestasRadio(component.instance.input.nativeElement.value);
    const componentIndex = this.listaRespuestasRadio.indexOf(component);
    if (componentIndex !== -1) {
      this.radioComponent.remove(this.radioComponent.indexOf(component));
      this.listaRespuestasRadio.splice(componentIndex, 1);
    }
    this.showMensajeEliminado();

  }
  addLista() {
    const componentListaFactory = this.resolver.resolveComponentFactory(ListaDesplegableComponent);
    const componentLista = this.listaComponent.createComponent(componentListaFactory);
    this.listaRespuestasLista.push(componentLista);
    this.addRespuesta();
    console.log(this.listaRespuestasLista);
    return componentLista;

  }
  removeComponentLista() {
    const component = this.listaRespuestasLista.find((value) => value.instance instanceof ListaDesplegableComponent);
    this.respuestas.deleteValueListaDesplegable(component.instance.input.nativeElement.value);
    const componentIndex = this.listaRespuestasLista.indexOf(component);
    if (componentIndex !== -1) {
      this.listaComponent.remove(this.listaComponent.indexOf(component));
      this.listaRespuestasLista.splice(componentIndex, 1);
    }
    this.showMensajeEliminado();

  }

  showMensajeEliminado () {
    return this.snackBar.openFromComponent(SnackBarEliminarPreguntaComponent, { duration: 500});
  }
  addDescripcion(descripcion: string) {
    this.descripcionPreguntaEstaVacia = false;
    this.preguntaServicio.setDescripcion(descripcion);
  }
  setCategoriaPregunta() {
    if (this.lacajaRespuestasEstaVacia === true || this.descripcionPreguntaEstaVacia === true) {
      this.errorGuardar.show();
    }else {
      const dialogCategorias = this.dialog.open(AddLabelCategoriesComponent, {
        width: '350px'
      });
      dialogCategorias.afterClosed().subscribe(result => {
        this.preguntaServicio.setTopico(this.categoria.getCategoria());
        this.showButton = true;
      });
    }
  }

  /**
   * Aqui se se llamara a la funcion que guardara el objeto pregunta en la base de datos
   */
  guardarpregunta() {
    console.log('este dialogo se ha cerrado');
    console.log(this.respuestas.getDescripcion());
    console.log(this.preguntaServicio.getObjectRespuesta());
  }

  HabilitarBotonGuardar() {
    this.guardarPregunta.show();
  }

  anadirFoto() {
    const dialogCategorias = this.dialog.open(UploadFormComponent, {
      width: '450px'
    });
    dialogCategorias.afterClosed().subscribe(result => {
      this.fotoCargada = true;
    });
  }
  visualizarPregunta() {
    const dialogVerPregunta = this.dialog.open(VerPreguntaComponent, {
      width: '800px'
    });
    dialogVerPregunta.afterClosed().subscribe(result => {
    });
  }

}


