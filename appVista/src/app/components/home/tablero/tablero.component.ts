import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {fadeInAnimation} from "../../../route.animation";
import {LoginService} from '../../../services/login.service';
import {StadisticalActivitiesService} from '../../../services/stadistical-activities.service';


@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class TableroComponent implements OnInit {
  
  usuarioActivos = {
    icon: 'person',
    name: 'Usuarios activos ',
    number: 0,
    gain: '0',
    description: ' Usuarios activos utilizando la aplicacion',
    arrow: 'arrow_upward'
    
  };
  
  encuestasVisitadas = {
    icon: 'flash_on',
    name: 'Encuestas comentadas',
    number: 0,
    gain: '0',
    description: 'Usuarios han comentado tus encuestas',
    arrow: 'arrow_upward'
  };
  
  preguntasComentadas = {
    icon: 'public',
    name: 'Preguntas comentadas',
    number: 0,
    gain: '0',
    description: 'Usuarios han comentado tus preguntas',
    arrow: 'arrow_upward'
    
  };
  comentariosAcertados = {
    icon: 'public',
    name: 'Comentarios Positivos de preguntas',
    number: 0,
    gain: '0',
    description: 'Usuarios califican como positivo tus comentarios',
    arrow: 'arrow_upward'
  };
  
  preguntas = {
    icon: 'public',
    name: 'Preguntas Creadas y Rechazadas'
  };
  encuesta  = {
    icon: 'public',
    name: 'Encuestas Elaboradas'
  };
  
  
  
  
  idUsuario: string;
  informacion: string;
  subscripcionIDUsuario: Subscription;
  subscripcionMessajeUsuario: Subscription;
  
  constructor(private servicioGrafica: StadisticalActivitiesService, private servicioLogin: LoginService) {
  }
  
  ngOnInit() {
    this.subscripcionIDUsuario = this.servicioLogin.getIDUsuario().subscribe((res) => {
      if (res) {
        this.setidUsuario(res);
      } else {
        this.setidUsuario(sessionStorage.getItem('id'));
      }
    });
    this.subscripcionMessajeUsuario = this.servicioLogin.getMessaje().subscribe((res) => {
      if (res) {
        this.setInformacion(res);
      }else {
        this.setInformacion(sessionStorage.getItem('messaje'));
      }
    });
  
  
    this.servicioGrafica.getCountOnlineUsers().subscribe((res) => {
      this.usuarioActivos.number = res['valor'];
      this.usuarioActivos.gain = res['valor'];
    });
    
    this.servicioGrafica.getCountCommentsByPreguntas(this.getidUsuario()).subscribe((res) => {
      console.log(res['valor']);
      this.preguntasComentadas.number = res['valor'];
      this.preguntasComentadas.gain = res['valor'];
    });
    
    this.servicioGrafica.getCountCommentsByEncuestas(this.getidUsuario()).subscribe((res) => {
      console.log(res['valor']);
      this.encuestasVisitadas.number = res['valor'];
      this.encuestasVisitadas.gain = res['valor'];
    });
    
    this.servicioGrafica.getCountCommentsAcertados(this.getidUsuario()).subscribe((res) => {
      this.comentariosAcertados.number = res['valor'];
      this.comentariosAcertados.gain = res['valor'];
    });
    
  }
  
  setidUsuario(id){
    this.idUsuario = id;
  }
  
  getidUsuario() {
    return this.idUsuario;
  }
  
  setInformacion(informacion) {
    this.informacion = informacion;
  }
  
  getInformacion() {
    return this.informacion;
  }
  
}
