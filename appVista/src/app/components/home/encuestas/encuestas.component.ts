import { Component, OnInit } from '@angular/core';
import { EncuestasService } from '../../../services/encuestas.service';
import { ResumenComponent } from './resumen/resumen.component';
import { CompartirComponent } from './compartir/compartir.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {

  constructor(private servicioEncuesta: EncuestasService, private modal: MatDialog) { }

  ngOnInit() {
  }

  abrirModalVistaPrevia() {
    const vistaPrevia = this.modal.open(ResumenComponent, {
      width: '900px'
    });

  }

  descargarEncuesta() {
    const descargarEncuesta = this.modal.open(CompartirComponent, {
      width: '900px'
    });

  }

}
