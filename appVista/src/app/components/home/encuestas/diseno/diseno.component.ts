import { Component, OnInit, ViewChild } from '@angular/core';
import { EncuestasService } from '../../../../services/encuestas.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material';
import { UploadService } from '../../../../uploads/shared/upload.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import { UploadFormComponent } from '../../../uploads/upload-form/upload-form.component';
import {ENTER, COMMA} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-diseno',
  templateUrl: './diseno.component.html',
  styleUrls: ['./diseno.component.scss']
})
export class DisenoComponent implements OnInit {
  @ViewChild('guardar') private guardar: SwalComponent;
  @ViewChild('error') private error: SwalComponent;
  @ViewChild('datosFaltantes') private datosFaltantes: SwalComponent;
  separatorKeysCodes = [ENTER, COMMA];
  formularioEncuesta: FormGroup;
  addOnBlur = true;
  pagina = 1;
  removido = true;
  visible = true;
  seleccionado = true;
  fotoEliminada = false;
  imagen = 'assets/img/no_available.jpg';
  etiquetas: Object [] = [];
  listaPreguntas: Object [] = [];
  listaPreguntasSeleccionadas: Object [] = [];
  constructor(private servicioEncuesta: EncuestasService,
              private servicioUpload: UploadService,
              private dialogo: MatDialog,
              private snackBar: MatSnackBar) {
          this.servicioEncuesta.loadlistaPreguntasValidas(this.pagina).subscribe((res) => {
            this.listaPreguntas = res;
            console.log(res);
          });
  }

  ngOnInit() {
    this.formularioEncuesta = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl(''),
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
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.etiquetas.push({texto: value.trim()});
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
        console.log(this.imagen);
        this.servicioEncuesta.setImagen(this.imagen);
        this.fotoEliminada = true;
        this.snackBar.open('logo añadido a la encuesta', 'close', {
          duration: 1000
        });
      }
    });

  }
  addPregunta($event: any) {
    console.log('entre');
    console.log($event.dragData);
    const newPregunta = $event.dragData;
    this.listaPreguntasSeleccionadas.unshift(newPregunta);
    this.servicioEncuesta.addPregunta(newPregunta);
    const indexOldPregunta = this.listaPreguntas.indexOf(newPregunta);
    this.listaPreguntas.splice(indexOldPregunta, 1);
    this.listaPreguntasSeleccionadas.sort((a: Object , b: Object) => {
      return a['descripcion'].localeCompare(b['descripcion']);
    });

  }

  agregarPregunta(pregunta) {
    this.listaPreguntasSeleccionadas.unshift(pregunta);
    this.servicioEncuesta.addPregunta(pregunta);
    const indexOldPregunta = this.listaPreguntas.indexOf(pregunta);
    this.listaPreguntas.splice(indexOldPregunta, 1);
    this.listaPreguntasSeleccionadas.sort((a: Object, b: Object) => {
      return a['descripcion'].localeCompare(b['descripcion']);
    });
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
    this.listaPreguntas.push(preguntaSeleccionada);
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

  guardarEncuesta (value, valid) {
    this.servicioEncuesta.setUsuarioID(sessionStorage.getItem('id'));
    this.servicioEncuesta.setHistorialCambios('pregunta creada');
    if (valid && this.listaPreguntasSeleccionadas.length > 0) {
      this.servicioEncuesta.guardarEncuesta().subscribe((res) => {
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
