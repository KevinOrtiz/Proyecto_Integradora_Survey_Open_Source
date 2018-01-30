import { Component, OnInit } from '@angular/core';
import { EncuestasService } from '../../../services/encuestas.service';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {

  constructor(private servicioEncuesta: EncuestasService) { }

  ngOnInit() {
  }

}
