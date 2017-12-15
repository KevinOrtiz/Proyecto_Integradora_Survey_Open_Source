import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   nombre: string;
   apellido: string;
   imagen: string;
  constructor() { }

  ngOnInit() {
    this.nombre = sessionStorage.getItem('nombre');
    this.apellido = sessionStorage.getItem('apellido');
    this.imagen = sessionStorage.getItem('imagen');
  }

}
