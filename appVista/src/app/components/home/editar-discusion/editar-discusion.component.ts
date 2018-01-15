import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { DiscusionesService } from '../../../services/discusiones.service';


@Component({
  selector: 'app-editar-discusion',
  templateUrl: './editar-discusion.component.html',
  styleUrls: ['./editar-discusion.component.scss']
})
export class EditarDiscusionComponent implements OnInit {
  @ViewChild('actualizado') private actualizado: SwalComponent;
  @ViewChild('error') private error: SwalComponent;
  discusion: Object = {
    titulo: '',
    descripcion: '',
    etiquetas: []
  };
  discusionActualizada: Object = {
    titulo: '',
    descripcion: '',
    etiquetas: [],
    creador_ID: sessionStorage.getItem('id'),
    estados: [{
      usuario_ID: sessionStorage.getItem('id'),
      texto: 'revision'
    }],
    pregunta_ID: ''
  };
  vistaPrevia: any;
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
  constructor(private servicioDiscusion: DiscusionesService) {
    this.servicioDiscusion.loadMiDiscusionPregunta(this.servicioDiscusion.getIdCuerpoDiscusion()).subscribe((res) => {
      console.log(res);
      console.log('******');
      this.discusion['titulo'] = res['titulo'];
      this.discusion['descripcion'] = res['descripcion'];
      this.discusion['etiquetas'] = res['etiquetas'];
      this.discusionActualizada['pregunta_ID'] = res['pregunta_ID'];
      console.log(this.discusionActualizada);
    this.formularioDiscusion.setValue(this.discusion);
    });
   }

  ngOnInit() {
    this.formularioDiscusion = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(10)]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(20)]),
      etiquetas: new FormControl('', [Validators.required])
    });
    console.log(this.discusion);
  }

  actualizarDiscusion(value, valido) {
    console.log('entreeeee');
    this.discusionActualizada['etiquetas'] = value.etiquetas;
    this.discusionActualizada['titulo'] = value.titulo;
    this.discusionActualizada['descripcion'] = value.descripcion;
    this.servicioDiscusion.editarDiscusion(this.servicioDiscusion.getIdCuerpoDiscusion(), this.discusionActualizada).subscribe((res) => {
      if (res['status'] === 200) {
        this.actualizado.show();
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
