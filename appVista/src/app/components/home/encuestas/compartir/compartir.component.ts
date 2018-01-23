import { Component, OnInit } from '@angular/core';
import { EncuestasService } from '../../../../services/encuestas.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

@Component({
  selector: 'app-compartir',
  templateUrl: './compartir.component.html',
  styleUrls: ['./compartir.component.scss']
})
export class CompartirComponent implements OnInit {
  downloadUrl;
  constructor(private servicioEncuesta: EncuestasService,
              private sanitazer: DomSanitizer) { }

  ngOnInit() {
  }

  descargarEncuestaVersionCSV() {
    console.log('todavia no implementado');
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true
    };

    return new Angular5Csv(this.servicioEncuesta.getObjectEncuesta(), '' + sessionStorage.getItem('nombre') + '_encuesta', options);
  }

  descargarEncuestaVersionJSON() {
      const  encuesta = JSON.stringify(this.servicioEncuesta.getObjectEncuesta());
      const url = this.sanitazer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(encuesta));
      this.downloadUrl = url;
  }

}
