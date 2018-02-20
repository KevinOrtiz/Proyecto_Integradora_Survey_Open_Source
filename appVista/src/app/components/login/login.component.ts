import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SwalComponent} from "@toverux/ngx-sweetalert2";
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  @ViewChild('correoFaltante') correoFaltante: SwalComponent;
  activarCargadorPagina = false;
  
  constructor(private autenticacion: LoginService, private router: Router) {
  }
  
  ngOnInit() {
  }
  
  loginGoogle() {
    this.activarCargadorPagina = true;
    this.autenticacion.login().then((userGoogle) => {
      if (userGoogle.user.displayName.split('')[0] === undefined) {
        userGoogle.user.displayName.split('')[0] = ' ';
      }
      if (userGoogle.user.displayName.split('')[1] === undefined) {
        userGoogle.user.displayName.split('')[1] = ' ';
      }
      if (userGoogle.user.displayName.split('')[2] === undefined) {
        userGoogle.user.displayName.split('')[2] = ' ';
      }
      if (userGoogle.user.displayName.split('')[3] === undefined) {
        userGoogle.user.displayName.split('')[3] = ' ';
      }
      if (userGoogle.user.email === undefined) {
        userGoogle.user.email = ' ';
      }
      // tslint:disable-next-line:prefer-const
      let usuario: Usuario = {
        nombre: ' ' + userGoogle.user.displayName.split(' ')[0] + ' ' + userGoogle.user.displayName.split(' ')[1],
        apellido: ' ' + userGoogle.user.displayName.split(' ')[2] + ' ' + userGoogle.user.displayName.split(' ')[3],
        correo: userGoogle.user.email,
        urlImage: userGoogle.user.photoURL,
        historialLogin: {
          actividad: 'usuario autenticado en la aplicacion',
          fecha_entrada: userGoogle.user.metadata.creationTime,
          fecha_salida: userGoogle.user.metadata.lastSignInTime
        },
        roles: [{
          rol: 'usuario',
          Acciones: ['crearPregunta', 'comentarPregunta', 'crearDiscusiones']
        }]
      };
      this.activarCargadorPagina = false;
      if (!usuario.correo) {
        this.correoFaltante.show();
      } else {
        this.autenticacion.setUserInformation(usuario);
        this.autenticacion.crearUsuario(userGoogle.user.refreshToken).subscribe(respuesta => {
          this.autenticacion.setIDUsuario(respuesta['_id']);
          this.autenticacion.setMessaje(respuesta['messaje']);
          this.router.navigate(['/home', 'tablero']);
        });
  
  
      }
  
    }).catch((error) => {
      this.router.navigate(['login']);
    });
  
  
  }
  
  loginTwitter() {
    this.activarCargadorPagina = true;
    this.autenticacion.loginTwitter().then((userTwitter) => {
      let usuario: Usuario = {
        nombre: ' ' + userTwitter.user.displayName.split(' ')[0] + ' ' + userTwitter.user.displayName.split(' ')[1],
        apellido: ' ' + userTwitter.user.displayName.split(' ')[2] + ' ' + userTwitter.user.displayName.split(' ')[3],
        correo: userTwitter.user.email,
        urlImage: userTwitter.user.photoURL,
        historialLogin: {
          actividad: 'usuario autenticado en la aplicacion',
          fecha_entrada: userTwitter.user.metadata.creationTime,
          fecha_salida: userTwitter.user.metadata.lastSignInTime
        },
        roles: [{
          rol: 'usuario',
          Acciones: ['crearPregunta', 'comentarPregunta', 'crearDiscusiones']
        }]
      };
      if (!usuario.correo) {
        this.correoFaltante.show();
        this.activarCargadorPagina = false;
  
      } else {
        this.autenticacion.setUserInformation(usuario);
        this.autenticacion.crearUsuario(userTwitter.user.refreshToken).subscribe(respuesta => {
          this.autenticacion.setIDUsuario(respuesta['_id']);
          this.autenticacion.setMessaje(respuesta['messaje']);
          this.router.navigate(['/home', 'tablero']);
  
        });
      }
      
    }).catch((error) => {
      this.router.navigate(['login']);
      
    });
  }
  
  loginGithub() {
    this.activarCargadorPagina = true;
    this.autenticacion.loginGithub().then((userGithub) => {
      let usuario: Usuario = {
        nombre: ' ' + userGithub.user.displayName.split(' ')[0] + ' ' + userGithub.user.displayName.split(' ')[1],
        apellido: ' ' + userGithub.user.displayName.split(' ')[2] + ' ' + userGithub.user.displayName.split(' ')[3],
        correo: userGithub.user.email,
        urlImage: userGithub.user.photoURL,
        historialLogin: {
          actividad: 'usuario autenticado en la aplicacion',
          fecha_entrada: userGithub.user.metadata.creationTime,
          fecha_salida: userGithub.user.metadata.lastSignInTime
        },
        roles: [{
          rol: 'usuario',
          Acciones: ['crearPregunta', 'comentarPregunta', 'crearDiscusiones']
        }]
      };
      this.activarCargadorPagina = false;
      if (!usuario.correo) {
        this.correoFaltante.show();
      } else {
        this.autenticacion.setUserInformation(usuario);
        this.autenticacion.crearUsuario(userGithub.refreshToken).subscribe(respuesta => {
          this.autenticacion.setIDUsuario(respuesta['_id']);
          this.autenticacion.setMessaje(respuesta['messaje']);
          this.router.navigate(['/home', 'tablero']);
  
        });
      }
      
    }).catch((error) => {
      this.router.navigate(['login']);
      
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
  roles: [{
    rol: string,
    Acciones: string[]
  }];
}

