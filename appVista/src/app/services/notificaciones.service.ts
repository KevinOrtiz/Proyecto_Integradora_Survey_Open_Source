import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotificacionesService {
  private socket: SocketIOClient.Socket;
  idemisor;
  nombre;
  token;

  constructor(private http: HttpClient) {
    this.idemisor = sessionStorage.getItem('id');
    this.nombre = sessionStorage.getItem('nombre');
    this.token = sessionStorage.getItem('token');

   }

   private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'x-access-token': '' +  sessionStorage.getItem('token')
    });
    return headers;
  }


  connect () {
    this.socket = io('http://localhost:3001', {query: 'id=' + this.idemisor + '&name=' + this.nombre});

  }

   sendNotificacionAccion (idReceptor, mensaje, tipoMensaje) {
     this.socket.emit('recibir-accion', {receptor: idReceptor, texto: mensaje, emisor: this.idemisor, tipo: tipoMensaje});
   }

    recibirAccionesUsuarios() {
     const observable = new Observable(observer => {
        this.socket.on('acciones', (datos) => {
          console.log('recibi la notificacion');
          observer.next(datos);
        });
     });
     return observable;
   }

   loadListaMensajes () {
     const headers = this.getHeaders();
     const url = 'apiRest/loadListaMensajes/?id=' + sessionStorage.getItem('id');
     return this.http.get(url, {headers})
                     .map((res: Response) => {
                        return res['listaMensajes'];
                     });
   }

   loadListaAcciones () {
     const headers = this.getHeaders();
     const url = 'apiRest/loadListaAcciones/?id=' + sessionStorage.getItem('id');
     return this.http.get(url, {headers})
                     .map((res: Response) => {
                        return res['listaAcciones'];
                     });
   }

   getNumeroMensajes () {
     const headers = this.getHeaders();
     const url = 'apiRest/numeroMensajes/?id=' + sessionStorage.getItem('id');
     return this.http.get(url, {headers})
                     .map((res: Response) => {
                        return res['numeroMensajes'];
                     });
   }

   getNumeroAcciones () {
     const headers = this.getHeaders();
     const url = 'apiRest/numeroAcciones/?id=' + sessionStorage.getItem('id');
     return this.http.get(url, {headers})
                     .map((res: Response) => {
                        return res['numeroNotificaciones'];
                     });
   }

   loadFiveMensajes() {
     const headers = this.getHeaders();
     const url = 'apiRest/loadFiveMensajes/?id=' + sessionStorage.getItem('id');
     return this.http.get(url, {headers})
                     .map((res: Response) => {
                        return res['listaMensajes'];
                     });
   }

   loadFiveAcciones() {
     const headers = this.getHeaders();
     const url = 'apiRest/loadFiveAcciones/?id=' + sessionStorage.getItem('id');
     return this.http.get(url, {headers})
                     .map((res: Response) => {
                       return res['listaAcciones'];
                     });
   }




}
