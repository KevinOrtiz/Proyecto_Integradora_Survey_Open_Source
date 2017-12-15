import { Injectable, Optional } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginService {
  private usuario: Observable<firebase.User>;
  private currentUser: firebase.User = null;
  private usuarioInformation: Usuario;
  private urlServicio = '/apiRest/crearUsuario' ;
  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
    this.usuario = this.afAuth.authState;
    this.usuario.subscribe( user => {
      if (user) {
        this.currentUser = user;
      }else {
        this.currentUser = null;
      }
    });
   }
  login() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.removeSession();
    return this.afAuth.auth.signOut();
  }
  getObjectUser() {
    return this.usuario;
  }
  setUserInformation(usuario: Usuario) {
    this.usuarioInformation = usuario;
    sessionStorage.setItem('nombre', this.usuarioInformation.nombre);
    sessionStorage.setItem('apellido', this.usuarioInformation.apellido);
    sessionStorage.setItem('imagen', this.usuarioInformation.urlImage);
  }
 getUserInformation() {
  return  this.usuarioInformation;
  }
  setSessionTokenId(token, id): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('id', id);
  }

  removeSession(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('apellido');
    sessionStorage.removeItem('imagen');
    sessionStorage.removeItem('id');
  }

  crearUsuario() {
    return this.http.post(this.urlServicio, {usuario: this.getUserInformation()})
                    .map((res: Response) => {
                      this.setSessionTokenId(res.token, res._id);
                      return res;
                    });
  }

}
interface Usuario {
  nombre: string;
  apellido: string;
  correo: string;
  urlImage: string;
  historialLogin: {
    actividad: string,
    fecha_entrada: string,
    fecha_salida: string
  };
}
