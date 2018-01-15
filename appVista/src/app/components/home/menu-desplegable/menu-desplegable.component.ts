import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-desplegable',
  templateUrl: './menu-desplegable.component.html',
  styleUrls: ['./menu-desplegable.component.scss']
})
export class MenuDesplegableComponent implements OnInit {
  rotatePreguntas = 0;
  rotateEncuestas = 0;
  constructor() { }

  ngOnInit() {
  }
  closeEncuestas(valor) {
    console.log(valor);
    console.log('close encuestas');
    this.rotateEncuestas = 0;
  }
  openEncuestas (valor) {
    console.log(valor);
    console.log('open encuestas');
    this.rotateEncuestas = 90;
  }
  closePreguntas () {
    console.log('close preguntas');
    this.rotatePreguntas = 0;
  }
  openPreguntas () {
    console.log('entre preguntas');
    this.rotatePreguntas = 90;
  }

}
