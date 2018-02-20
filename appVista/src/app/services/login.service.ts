import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class LoginService {
  private usuario: Observable<firebase.User>;
  private currentUser: firebase.User = null;
  private usuarioInformation: Usuario;
  private urlServicio = '/apiRest/crearUsuario' ;
  private messaje = new BehaviorSubject<string>(null);
  private idUsuario = new BehaviorSubject<string>(null);
  private messaje$ = this.messaje.asObservable();
  private idUsuario$ = this.idUsuario.asObservable();
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

   setMessaje (descripcion) {
    this.messaje.next(descripcion);
   }
   getMessaje () {
      return this.messaje$;
   }
   getIDUsuario () {
      return this.idUsuario$;
   }

   setIDUsuario (id) {
     this.idUsuario.next(id);
   }
  login() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  
  loginTwitter() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }
  
  loginGithub() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
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
  setSessionTokenId(token, id) {
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

  crearUsuario(tokenID) {
    return this.http.post(this.urlServicio, {usuario: this.getUserInformation(), token: tokenID})
                    .map((res: Response) => {
                      this.setSessionTokenId(res['token'], res['_id']);
                      this.setRolesUsuario(res['roles'][0]['rol'], res['roles'][0]['Acciones'][0], res['messaje']);
                      return res;
                    });
  }
  setRolesUsuario (rol, acciones, mensaje) {
    sessionStorage.setItem('rol', rol);
    sessionStorage.setItem('Acciones', acciones);
    sessionStorage.setItem('messaje', mensaje);
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
  roles: [{
    rol: string,
    Acciones: string[]
  }];
}
