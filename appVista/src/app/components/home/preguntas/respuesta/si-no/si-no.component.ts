import { Component, OnInit } from '@angular/core';
import { RespuestasService } from '../../../../../services/respuestas.service';

@Component({
  selector: 'app-si-no',
  templateUrl: './si-no.component.html',
  styleUrls: ['./si-no.component.css']
})
export class SiNoComponent implements OnInit {

  constructor(private respuestas: RespuestasService) { }

  ngOnInit() {
  }

}
