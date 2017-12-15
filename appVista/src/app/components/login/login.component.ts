import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private usuarioInformation: Usuario;
  activarCargadorPagina: boolean;
  constructor(private autenticacion: LoginService, private router: Router) {
   }

  ngOnInit() {
  }

  loginGoogle() {
    this.activarCargadorPagina = true;
    this.autenticacion.login().then((user1) => {
      this.autenticacion.getObjectUser().subscribe((user) => {
      // tslint:disable-next-line:prefer-const
          let usuario: Usuario = {
            nombre: ' ' + user.displayName.split(' ')[0] + ' ' + user.displayName.split(' ')[1],
            apellido: ' ' + user.displayName.split(' ')[2] + ' ' + user.displayName.split(' ')[3],
            correo: user.email,
            urlImage: user.photoURL,
            historialLogin: {
              actividad: 'usuario autenticado en la aplicacion',
              fecha_entrada: user.metadata.creationTime,
              fecha_salida: user.metadata.lastSignInTime
            }
          };
          this.activarCargadorPagina = false;
          this.autenticacion.setUserInformation(usuario);
          this.autenticacion.crearUsuario().subscribe( respuesta => {
          });
    });
    this.router.navigate(['home', 'tablero']);
    }).catch((error) => {
      console.log('error ' + error);
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
}

