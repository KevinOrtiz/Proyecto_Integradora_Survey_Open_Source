import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AccionesUsuarioService {
  mensaje = new BehaviorSubject<string>(null);
  mensaje$ = this.mensaje.asObservable();
  constructor() { }
  setAccion (texto) {
    this.mensaje.next(texto);
  }

  getObjectMensaje() {
    return this.mensaje$;
  }
}
