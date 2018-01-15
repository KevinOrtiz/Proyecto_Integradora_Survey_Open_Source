import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../../../services/preguntas.service';
import { MatDialogRef } from '@angular/material';



@Component({
  selector: 'app-ver-pregunta',
  templateUrl: './ver-pregunta.component.html',
  styleUrls: ['./ver-pregunta.component.scss']
})
export class VerPreguntaComponent implements OnInit {
  objetoPregunta: any ;
  constructor(private preguntaServicio: PreguntasService, public thisDialogRef: MatDialogRef<VerPreguntaComponent>) {
  }

  ngOnInit() {
    // valido cuando los datos no vienen del servidor
    if (!this.preguntaServicio.getFlagDatosServidor()) {
      console.log(this.preguntaServicio.getObjectRespuesta());
      this.objetoPregunta = this.preguntaServicio.getObjectRespuesta();
      console.log(this.objetoPregunta.respuestas.tipoRespuesta);
    }else {
      this.preguntaServicio.loadPregunta().subscribe((res) => {
        console.log('********');
        console.log(res['pregunta'].listaImagen.url);
        console.log('*********');
        this.objetoPregunta = res['pregunta'];
        console.log(this.objetoPregunta.listaImagen);
      });
    }
  }

  cerrarVentana() {
    this.thisDialogRef.close('confirm');
  }

}
