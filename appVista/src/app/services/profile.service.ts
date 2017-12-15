import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ProfileService {
  private urlServicio = '/apiRest/crearUsuario/cargarPerfil/' + sessionStorage.getItem('_id') ;
  private objectProfile: any;
  constructor( private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'x-access-token': '' +  sessionStorage.getItem('token')
    });
    return headers;
  }
  getProfileInformationUser(): any {
    const headers = this.getHeaders();
    return this.http.get(this.urlServicio , { headers });
  }
  getCantidadColaboradores(listaColaboradores: any[]): any {
    return listaColaboradores.length;
  }

  getCantidadNotificacionesAcciones(listaNotificaciones: any[]) {
    let contador = 0;
    const arrayAcciones: any[] = null;
    if (listaNotificaciones.length === 0) {
        return 0;
    }else {
      for (const notificacion of listaNotificaciones) {
        if (notificacion.tipo === 'acciones' && notificacion.leido === false ) {
          contador = contador + 1;
          arrayAcciones.push(notificacion);
        }
      }
      const respuesta = {
        'cantidad': contador,
        'acciones': arrayAcciones
      };
      return respuesta;
    }
  }

  getCantidadNotificacionesMensajes(listaNotificaciones: any[]) {
    let contador = 0;
    const arrayMensajes: any[] = null;
    if (listaNotificaciones.length === 0) {
      return 0;
    }else {

      for (const mensaje of listaNotificaciones) {
        if ( mensaje.tipo === 'mensaje' && mensaje.leido === false) {
          contador = contador + 1;
          arrayMensajes.push(mensaje);
        }
      }
      const respuesta = {
        'cantidad': contador,
        'mensajes': arrayMensajes
      };
      return respuesta;
    }
  }
  actualizarInformacionUsuario(objetoUsuario: any) {
  }



}
