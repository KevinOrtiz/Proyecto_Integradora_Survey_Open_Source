import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class NotificacionesService {
  private socket: SocketIOClient.Socket;
  private token;
  private idReceptor;

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('token');

   }

   setIDreceptor(id) {
     this.idReceptor = id;
   }

   getIDreceptor () {
     return this.idReceptor;
   }

   private static getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'x-access-token': '' +  sessionStorage.getItem('token')
    });
    return headers;
  }


  connect (idConexion) {
    if (idConexion == null) {
      idConexion = sessionStorage.getItem('id');
    }
    this.socket = io('http://localhost:3001', {query: 'id=' + idConexion});

  }

   sendNotificacionAccion (idReceptor, mensaje, tipoMensaje) {
     this.socket.emit('recibir-accion', {receptor: idReceptor, texto: mensaje, emisor: sessionStorage.getItem('id'), tipo: tipoMensaje});
   }

    recibirAccionesUsuarios() {
     return  new Observable(observer => {
        this.socket.on('acciones', (datos) => {
          console.log('recibi la notificacion');
          observer.next(datos);
        });
     });
   }

   loadListaMensajes (id) {
    if (id === null) {
      id = sessionStorage.getItem('id');
    }
     const headers = NotificacionesService.getHeaders();
     const url = 'apiRest/loadListaMensajes/?id=' + id;
     return this.http.get(url, {headers})
                     .map((res: Response) => {
                        return res['listaMensajes'];
                     });
   }

   loadListaAcciones (id) {
     if (id === null) {
       id = sessionStorage.getItem('id');
     }
     const headers = NotificacionesService.getHeaders();
     const url = 'apiRest/loadListaAcciones/?id=' + id;
     return this.http.get(url, {headers})
                     .map((res: Response) => {
                        return res['listaAcciones'];
                     });
   }

   getNumeroMensajes (id) {
    if (id === null) {
      id = sessionStorage.getItem('id');
    }
     const headers = NotificacionesService.getHeaders();
     const url = 'apiRest/numeroMensajes/?id=' + id;
     return this.http.get(url, {headers})
                     .map((res: Response) => {
                        return res['numeroMensajes'];
                     });
   }

   getNumeroAcciones (id) {
    if (id === null) {
      id = sessionStorage.getItem('id');
    }
     const headers = NotificacionesService.getHeaders();
     const url = 'apiRest/numeroAcciones/?id=' + id;
     return this.http.get(url, {headers})
                     .map((res: Response) => {
                        return res['numeroNotificaciones'];
                     });
   }

   loadFiveMensajes(id) {
     if (id === null) {
       id = sessionStorage.getItem('id');
     }
     const headers = NotificacionesService.getHeaders();
     const url = 'apiRest/loadFiveMensajes/?id=' + id;
     return this.http.get(url, {headers})
                     .map((res: Response) => {
                        return res['listaMensajes'];
                     });
   }

   loadFiveAcciones(id) {
     if (id === null) {
       id = sessionStorage.getItem('id');
     }
     const headers = NotificacionesService.getHeaders();
     const url = 'apiRest/loadFiveAcciones/?id=' + id;
     return this.http.get(url, {headers})
                     .map((res: Response) => {
                       return res['listaAcciones'];
                     });
   }




}
