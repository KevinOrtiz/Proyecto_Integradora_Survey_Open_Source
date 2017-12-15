import { Component, OnInit, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import { RadioComponent } from '../radio/radio.component';

@Component({
  selector: 'app-casilla',
  templateUrl: './casilla.component.html',
  styleUrls: ['./casilla.component.css']
})
export class CasillaComponent implements OnInit, AfterViewInit {
  listaRespuestas: any[] = [ ];
  @ViewChild('valorInputRespuestaCasilla') input: ElementRef;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log(' hola esta es una prueba' + this.input.nativeElement.value);
  }
  crearCasilla() {
    console.log('entree');
  }

}
