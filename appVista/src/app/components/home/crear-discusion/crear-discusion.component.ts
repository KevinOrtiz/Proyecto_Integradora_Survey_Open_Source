import { Component, OnInit, ViewChild } from '@angular/core';
import { DiscusionesService } from '../../../services/discusiones.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { NotificacionesService } from '../../../services/notificaciones.service';

@Component({
  selector: 'app-crear-discusion',
  templateUrl: './crear-discusion.component.html',
  styleUrls: ['./crear-discusion.component.scss']
})
export class CrearDiscusionComponent implements OnInit {
  @ViewChild('guardado') private guardado: SwalComponent;
  @ViewChild('error') private error: SwalComponent;
  discusion: Object = {
    titulo: '',
    descripcion: '',
    etiquetas: [],
    creador_ID: sessionStorage.getItem('id'),
    estados: [{
      usuario_ID: sessionStorage.getItem('id'),
      texto: 'revision'
    }],
    fecha_creacion: new Date(),
    fecha_cierre: '',
    pregunta_ID: this.servicioDiscusion.getIdCuerpoDiscusion()
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
                      {value: 'Respuestas-extensas', descripcion: 'Respuestas extensas'}
  ];

  formularioDiscusion: FormGroup;
  constructor(private servicioDiscusion: DiscusionesService, private servicioNotificacion: NotificacionesService) {
   }

  ngOnInit() {
    this.formularioDiscusion = new FormGroup({
      titulo: new FormControl('', [ Validators.required, Validators.minLength(10)]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(900)]),
      etiquetas: new FormControl('', [Validators.required])
    });

  }

  guardarDiscusion(value, valido) {
    this.discusion['etiquetas'] = value.etiquetas;
    this.discusion['titulo'] = value.titulo;
    this.discusion['descripcion'] = value.descripcion;
    this.servicioDiscusion.guardarDiscusion(this.discusion).subscribe((res) => {
      if (res['status'] === 200) {
         this.guardado.show();
         this.servicioNotificacion.sendNotificacionAccion(res['idUsuario'], 'Se ha creado una discusion', 'creacion-discusion');
      }else {
        this.error.show();
      }
    });
    this.formularioDiscusion.reset();
  }

  setTexto(event) {
    console.log(event);
    this.vistaPrevia = event.html;
  }


}
