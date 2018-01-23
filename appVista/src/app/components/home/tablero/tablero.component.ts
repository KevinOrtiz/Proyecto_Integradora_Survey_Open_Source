import { Component, OnInit } from '@angular/core';
import { StadisticalActivitiesService } from '../../../services/stadistical-activities.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {
  informacion: string;
  listaComentariosByPreguntas: Object[];
  listaDiscuionesByPreguntas: Object [];
  loadComentarios = true;
  loadDiscusiones = true;
  loadGraficaActividades = true;
  loadGraficaPreguntas = true;
  loadGraficaEncuestas = true;
  public Options: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public labels: string[] = ['Enero', 'Febrero' , 'Marzo',
                            'Abril', 'Mayo', 'Junio', 'Julio',
                            'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public barChartType = 'bar';
  public lineChartType = 'line';
  public legend = true;
  public barChartDataActivities: any [] = [
    {data: [], label: 'comentarios'},
    {data: [], label: 'likes'},
    {data: [], label: 'dislikes'},
    {data: [], label: 'favoritos'}
  ];
  public lineDataPreguntasValidasNoValidas: any [] = [
    {data: [], label: 'Preguntas Creadas'},
    {data: [], label: 'Preguntas Aceptadas por los miembros del comite'}
  ];
  public lineEncuestasByMonth: any [] = [
    {data: [], label: 'Encuestas Creadas'}
  ];
  constructor(private servicioGrafica: StadisticalActivitiesService) {
    this.informacion = sessionStorage.getItem('messaje');
    this.servicioGrafica.getSummaryDiscusionesPregunta().subscribe((response) => {
      this.listaDiscuionesByPreguntas = response['listaDiscusiones'];
      this.loadDiscusiones = false;
    });
    this.servicioGrafica.getSummaryCommentsByPreguntas().subscribe((response) => {
      this.listaComentariosByPreguntas = response['listaComentarios'];
      this.loadComentarios = false;
    });

    this.servicioGrafica.getActivitiesByMonth().subscribe((response) => {
      console.log(response ['chartComentarios']);
      for (const item of response['chartComentarios']) {
        this.barChartDataActivities[0]['data'].push(item['cantidadComentarios']);
        this.barChartDataActivities[1]['data'].push(item['cantidadLikes']);
        this.barChartDataActivities[2]['data'].push(item['cantidadDislike']);
        this.barChartDataActivities[3]['data'].push(item['cantidadFavoritos']);
      }
      this.loadGraficaActividades = false;
    });

    this.servicioGrafica.getChartPreguntasValidasNoValidas().subscribe((response) => {
      for (const item of response['listaPreguntas']) {
        this.lineDataPreguntasValidasNoValidas[0]['data'].push(item['cantidadpreguntas']);
        this.lineDataPreguntasValidasNoValidas[1]['data'].push(item['cantidadpreguntasvalidas']);
      }
      this.loadGraficaPreguntas = false;
    });

    this.servicioGrafica.getChartEncuestasByMonth().subscribe((response) => {
      for (const item of response['listaEncuestas']) {
        this.lineEncuestasByMonth[0]['data'].push(item['cantidadEncuesta']);
      }
      this.loadGraficaEncuestas = false;
    });
  }

  ngOnInit() {

  }

}
