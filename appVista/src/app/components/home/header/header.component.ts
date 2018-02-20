import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import {LoginService} from '../../../services/login.service';
import {NotificacionesService} from '../../../services/notificaciones.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  input: string;
  focused: boolean;
  isOpen = false;
  isOpenAcciones = false;
  
  @ViewChild('audioMensaje') audioMensajeRef: ElementRef;
  @ViewChild('audioAccion') audioAccionRef: ElementRef;
  private idConexion;
  nombre: string;
  apellido: string;
  imagen: string;
  listaMensajes: any = [];
  listaAcciones: any = [];
  notificacionMensajesUsuarios = 0;
  notificacionAccionesUsuarios = 0;
  susbcripcionIDUsuario: Subscription;
  
  
  constructor(private servicioNotificacion: NotificacionesService, private servicioLogin: LoginService,
              private router: Router) {
  }

  ngOnInit() {
    this.nombre = sessionStorage.getItem('nombre');
    this.apellido = sessionStorage.getItem('apellido');
    this.imagen = sessionStorage.getItem('imagen');
    this.susbcripcionIDUsuario = this.servicioLogin.getIDUsuario().subscribe((res) => {
      this.setIdConexion(res);
      // tslint:disable-next-line:max-line-length
      this.servicioNotificacion.getNumeroAcciones(res).subscribe(respuesta => this.notificacionAccionesUsuarios = respuesta);
      this.servicioNotificacion.getNumeroMensajes(res).subscribe(respuesta => this.notificacionMensajesUsuarios = respuesta);
      this.servicioNotificacion.loadFiveAcciones(res).subscribe((respuesta) => {
        this.listaAcciones = respuesta;
      });
      this.servicioNotificacion.loadFiveMensajes(res).subscribe((respuesta) => {
        this.listaMensajes = respuesta;
      });
    });
  }
  ngAfterViewInit () {
    this.servicioNotificacion.connect(this.getIdConexion());
    this.servicioNotificacion.recibirAccionesUsuarios().subscribe((res) => {
      if (res['tipo'] === 'comentario') {
        if (this.listaMensajes === null) {
          this.listaMensajes = [res];
        } else {
          this.listaMensajes.push(res);
        }
        this.notificacionMensajesUsuarios = this.listaMensajes.length;
        if (this.notificacionMensajesUsuarios > 0) {
          this.audioMensajeRef.nativeElement.play();
        }
      } else {
        if (this.listaAcciones === null) {
          this.listaAcciones = [res];
        } else {
          this.listaAcciones.push(res);
        }
        this.notificacionAccionesUsuarios = this.listaAcciones.length;
        if (this.notificacionAccionesUsuarios > 0) {
          this.audioAccionRef.nativeElement.play();
        }
      }
    });

  }
  setIdConexion (id) {
    this.idConexion = id;
  }
  
  getIdConexion () {
    return this.idConexion;
  }
  
  
  toggleDropdown() {
    console.log('entre');
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }
  
  onClickOutside() {
    this.isOpen = false;
  }
  
  toggleDropdownAcciones(){
    this.isOpenAcciones = !this.isOpenAcciones;
  }
  
  onClickOutsideAcciones() {
    this.isOpenAcciones = false;
  }

}
