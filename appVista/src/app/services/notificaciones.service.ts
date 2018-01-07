import { Injectable } from '@angular/core';

@Injectable()
export class NotificacionesService {
  emisor;
  constructor() {
    this.emisor = sessionStorage.getItem('id');
   }

}
