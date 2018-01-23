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
  pagina = 0;
  removido = true;
  visible = true;
  seleccionado = true;
  fotoEliminada = false;
  imagen = 'assets/img/no_available.jpg';
  etiquetas: Object [] = [{
    texto: 'e.g Seguridad de la informacion'
  }];
  listaPreguntas: Object [] = [];
  listaPreguntasSeleccionadas: Object [] = [];
  constructor(private servicioEncuesta: EncuestasService,
              private servicioUpload: UploadService,
              private dialogo: MatDialog,
              private snackBar: MatSnackBar) {
          this.servicioEncuesta.loadlistaPreguntasValidas(this.pagina).subscribe((res) => {
            this.listaPreguntas = res;
          });
  }

  ngOnInit() {
    this.formularioEncuesta = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      etiqueta: new FormControl('', Validators.required)
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
      this.imagen = this.servicioUpload.getfileImage().url;
      this.servicioEncuesta.setImagen(this.imagen);
      this.fotoEliminada = true;
    });
    this.snackBar.open('logo añadido a la encuesta', 'close', {
      duration: 1000
    });

  }
  addPregunta($event: any) {
    const newPregunta = $event.dragData;
    this.listaPreguntasSeleccionadas.push(newPregunta);
    this.servicioEncuesta.addPregunta(newPregunta);
    const indexOldPregunta = this.listaPreguntas.indexOf(newPregunta);
    this.listaPreguntas.splice(indexOldPregunta, 1);
    this.listaPreguntasSeleccionadas.sort((a: Object , b: Object) => {
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
    this.fotoEliminada = false;

  }

  eliminarPregunta(preguntaSeleccionada) {
    const index = this.listaPreguntasSeleccionadas.indexOf(preguntaSeleccionada);
    this.listaPreguntasSeleccionadas.splice(index, 1);
  }

  filterPregunta($event) {
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
    if (valid && this.listaPreguntasSeleccionadas) {
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
