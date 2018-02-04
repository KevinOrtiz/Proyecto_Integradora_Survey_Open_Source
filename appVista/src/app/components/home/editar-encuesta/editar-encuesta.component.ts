import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ResumenComponent } from '../encuestas/resumen/resumen.component';
import { CompartirComponent } from '../encuestas/compartir/compartir.component';
import { EncuestasService } from '../../../services/encuestas.service';
import { UploadFormComponent } from '../../uploads/upload-form/upload-form.component';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { UploadService } from '../../../uploads/shared/upload.service';
import {MatChipInputEvent} from '@angular/material';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2';


@Component({
  selector: 'app-editar-encuesta',
  templateUrl: './editar-encuesta.component.html',
  styleUrls: ['./editar-encuesta.component.scss']
})
export class EditarEncuestaComponent implements OnInit {

  @ViewChild('guardar') private guardar: SwalComponent;
  @ViewChild('error') private error: SwalComponent;
  @ViewChild('datosFaltantes') private datosFaltantes: SwalComponent;
  @ViewChild('preguntaRepetida') private preguntaRepetida: SwalComponent;
  separatorKeysCodes = [ENTER, COMMA];
  formularioEncuesta: FormGroup;
  addOnBlur = true;
  pagina = 1;
  removido = true;
  visible = true;
  titulo = '';
  descripcion = '';
  seleccionado = true;
  fotoEliminada = false;
  imagen = 'assets/img/no_available.jpg';
  etiquetas: Object [] = [];
  listaPreguntas: Object [] = [];
  listaPreguntasSeleccionadas: Object [] = [];
  constructor(private dialogo: MatDialog,
              private servicioEncuesta: EncuestasService,
              private servicioUpload: UploadService,
              private snackBar: MatSnackBar) {
                this.servicioEncuesta.loadlistaPreguntasValidas(this.pagina).subscribe((res) => {
                  this.listaPreguntas = res;
                });
                this.servicioEncuesta.loadEncuesta().subscribe((res) => {
                  for (const etiqueta of res['etiqueta']) {
                    this.etiquetas.push({texto : etiqueta['texto']});
                  }
                  this.servicioEncuesta.setEtiqueta(this.etiquetas);
                  this.servicioEncuesta.setTitulo(res['titulo']);
                  this.servicioEncuesta.setDescripcion(res['descripcion']);
                  this.servicioEncuesta.setImagen(res['contenidoMultimedia']['url']);
                  this.titulo = res['titulo'];
                  this.descripcion = res['descripcion'];
                  this.listaPreguntasSeleccionadas.push.apply(this.listaPreguntasSeleccionadas, res['preguntas']);
                  console.log(res['preguntas']);
                  this.servicioEncuesta.setPreguntas(res['preguntas']);
                  if (res['contenidoMultimedia']['url']) {
                    this.imagen = res['contenidoMultimedia']['url'];
                  }

                });
              }

  ngOnInit() {
    this.formularioEncuesta = new FormGroup({
      titulo: new FormControl('' + this.titulo, Validators.required),
      descripcion: new FormControl('' + this.descripcion),
      etiqueta: new FormControl('', Validators.required)
    });
  }

  addDescripcion ($event) {
    this.servicioEncuesta.setDescripcion($event.target.value);
    this.snackBar.open('descripcion añadida a su encuesta', 'close', {
      duration: 1000
    });
  }

  addTitulo ($event) {
    this.servicioEncuesta.setTitulo($event.target.value);
    this.snackBar.open('titulo añadido a su encuesta', 'close', {
      duration: 1000
    });

  }

  addEtiqueta (event: MatChipInputEvent) {
    console.log(event.value);
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.etiquetas.push.apply({texto: value});
      this.servicioEncuesta.addTagEncuesta({texto: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  removeEtiqueta (etiqueta) {
    const index = this.etiquetas.indexOf(etiqueta);
    this.etiquetas.splice(index, 1);
    this.servicioEncuesta.deleteTagEncuesta(etiqueta);
  }

  addPhoto() {
    const openFoto = this.dialogo.open(UploadFormComponent, {
      width: '800px'
    });
    openFoto.afterClosed().subscribe((foto) => {
      if (this.servicioUpload.getfileImage()) {
        this.imagen = this.servicioUpload.getfileImage().url;
        this.servicioEncuesta.setImagen(this.imagen);
        this.fotoEliminada = true;
        this.snackBar.open('logo añadido a la encuesta', 'close', {
          duration: 1000
        });
      }
    });

  }
  addPregunta($event: any) {
    const newPregunta = $event.dragData;
    const indexOldPregunta = this.listaPreguntas.indexOf(newPregunta);
    if (indexOldPregunta === -1) {
      this.listaPreguntasSeleccionadas.unshift(newPregunta);
      this.servicioEncuesta.addPregunta(newPregunta);
      this.listaPreguntasSeleccionadas.sort((a: Object , b: Object) => {
        return a['descripcion'].localeCompare(b['descripcion']);
      });
    }else {
      this.preguntaRepetida.show();
    }

  }

  agregarPregunta(pregunta) {
    const indexOldPregunta = this.listaPreguntasSeleccionadas.indexOf(pregunta);
    console.log(indexOldPregunta);
    if (indexOldPregunta === -1) {
      this.listaPreguntasSeleccionadas.unshift(pregunta);
      this.servicioEncuesta.addPregunta(pregunta);
      this.listaPreguntasSeleccionadas.sort((a: Object, b: Object) => {
        return a['descripcion'].localeCompare(b['descripcion']);
      });
    }else {
      this.preguntaRepetida.show();
    }
  }

  obteniendoPregunta($event: any) {
    const pregunta = $event.dragData;
    this.snackBar.open(`ha escogido una pregunta en la categora ${pregunta['topico']}`, 'close', {
      duration: 5000
      });
  }

  deletePhoto() {
    this.servicioUpload.deleteUpload(this.servicioUpload.getfileImage());
    this.imagen = 'assets/img/no_available.jpg';
    this.servicioEncuesta.setImagen('');
    this.fotoEliminada = false;

  }

  eliminarPregunta(preguntaSeleccionada) {
    const index = this.listaPreguntasSeleccionadas.indexOf(preguntaSeleccionada);
    this.listaPreguntasSeleccionadas.splice(index, 1);
    this.servicioEncuesta.deleteRespuesta(preguntaSeleccionada);
  }

  filtrarPregunta($event) {
    const filterArray = this.listaPreguntas.filter((pregunta) => pregunta['topicos'] === $event.target.value );
    this.listaPreguntas = filterArray;
  }

  loadPreguntas() {
    this.pagina ++ ;
    this.servicioEncuesta.loadlistaPreguntasValidas(this.pagina).subscribe((res) => {
      this.listaPreguntas.push.apply(this.listaPreguntas, res);
    });

  }

  abrirModalVistaPrevia() {
    const dialogoVistaPrevia = this.dialogo.open(ResumenComponent, {
      width: '900px'
    });
  }

  descargarEncuesta() {
    const dialogoDescargarEncuesta = this.dialogo.open(CompartirComponent, {
        width: '900px'
    });
  }
  actualizarEncuesta (value, valid) {
    this.servicioEncuesta.setUsuarioID(this.servicioEncuesta.getIDPropietarioEncuesta());
    this.servicioEncuesta.setHistorialCambios('pregunta actualizada');
    if (valid && this.listaPreguntasSeleccionadas.length > 0) {
      this.servicioEncuesta.updateMyEncuesta().subscribe((res) => {
        if (res === 200) {
          this.guardar.show();
        }else {
          this.error.show();
        }
      });
    } else {
       this.datosFaltantes.show();
    }
  }

}
