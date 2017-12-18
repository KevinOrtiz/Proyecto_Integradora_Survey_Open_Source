import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../../../services/preguntas.service';
import { MatDialogRef } from '@angular/material';



@Component({
  selector: 'app-ver-pregunta',
  templateUrl: './ver-pregunta.component.html',
  styleUrls: ['./ver-pregunta.component.css']
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
    }
  }

  cerrarVentana() {
    this.thisDialogRef.close('confirm');
  }

}
