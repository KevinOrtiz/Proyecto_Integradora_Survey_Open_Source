import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DiscusionesService } from '../../../services/discusiones.service';


@Component({
  selector: 'app-validar-preguntas',
  templateUrl: './validar-preguntas.component.html',
  styleUrls: ['./validar-preguntas.component.css']
})
export class ValidarPreguntasComponent implements OnInit {
  @ViewChild('guardado') private guardado: SwalComponent;
  @ViewChild('error') private error: SwalComponent;
  @ViewChild('registroExistente') private registroExistente: SwalComponent;
  discusion: Object = {
    titulo: '',
    descripcion: '',
    etiquetas: [],
    creador_ID: sessionStorage.getItem('id'),
    estados: [{
      usuario_ID: sessionStorage.getItem('id'),
      texto: ''
    }],
    fecha_creacion: new Date(),
    fecha_cierre: '',
    pregunta_ID: this.discusionesServicio.getIdCuerpoDiscusion()
  };
  vistaPrevia = 'no existe ningun comentario en la caja de texto';
  opcionesEtiqueta = [{value: 'errores-ortograficos', descripcion: 'Errores Ortograficos'},
                      {value: 'Pregunta-duplicada', descripcion: 'Pregunta duplicada'},
                      {value: 'Pregunta-confusa', descripcion: 'Pregunta confusa'},
                      {value: 'terminos-erroneos', descripcion: 'Terminos erroneos'},
                      {value: 'pregunta-invalida', descripcion: 'pregunta-invalida'},
                      {value: 'Dudas-pregunta', descripcion: 'Dudas de la pregunta'},
                      {value: 'Descripcion-extensa', descripcion: 'Pregunta-extensa'},
                      {value: 'imagen-Confusa', descripcion: 'Imagen Confusa'},
                      {value: 'mejorar-pregunta', descripcion: 'Mejorar Pregunta'},
                      {value: 'tipo-respuesta-erronea', descripcion: 'Tipo Respuesta erronea'},
                      {value: 'Respuestas-extensas', descripcion: 'Respuestas extensas'},
                      {value: 'Excelente-pregunta', descripcion: 'Excelente pregunta'},
                      {value: 'Muy-buena-aportacion', descripcion: 'Muy buena aportacion'}

  ];
  opcionesEstado = [{
      value: 'rechazada', descripcion: 'rechazada'
  }, {
      value: 'aceptada', descripcion: 'aceptada'
  }];
  formularioDiscusion: FormGroup;
  constructor(private discusionesServicio: DiscusionesService) { }

  ngOnInit() {
    this.formularioDiscusion = new FormGroup({
      titulo: new FormControl('', [ Validators.required, Validators.minLength(10)]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(900)]),
      etiquetas: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required])
    });
  }

  guardarDiscusion(value, valido) {
    console.log('entro');
    console.log(value);
    this.discusion['etiquetas'] = value.etiquetas;
    this.discusion['titulo'] = value.titulo;
    this.discusion['descripcion'] = value.descripcion;
    this.discusion['estados'][0]['texto'] = value.estado;
    this.discusionesServicio.guardaDiscusionMiembroComite(this.discusion).subscribe((res) => {
      if (res['status'] === 200) {
         this.guardado.show();
      }else if (res['status'] === 304) {
        this.registroExistente.show();
      }else {
        this.error.show();
      }
    });
    this.formularioDiscusion.reset();
  }
  setTexto(event) {
    this.vistaPrevia = event.html;
  }

}
