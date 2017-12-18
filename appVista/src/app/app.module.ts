import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { HeaderComponent } from './components/home/header/header.component';
import { TableroComponent } from './components/home/tablero/tablero.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { NotificacionesComponent } from './components/home/profile/notificaciones.component';
import { MensajesComponent } from './components/home/profile/mensajes.component';
import { APP_ROUTING } from './app.routes';
import { LoginService } from './services/login.service';
import { ProfileService } from './services/profile.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoaderComponent } from './components/loader/loader.component';
import { EncuestasUsuarioComponent } from './components/home/profile/encuestas-usuario.component';
import { PreguntasUsuarioComponent } from './components/home/profile/preguntas-usuario.component';
import { PreguntasComponent } from './components/home/preguntas/preguntas.component';
import { CasillaComponent } from './components/home/preguntas/respuesta/casilla/casilla.component';
import { RadioComponent } from './components/home/preguntas/respuesta/radio/radio.component';
import { SiNoComponent } from './components/home/preguntas/respuesta/si-no/si-no.component';
import { PuntajeComponent } from './components/home/preguntas/respuesta/puntaje/puntaje.component';
import { DescripcionComponent } from './components/home/preguntas/respuesta/descripcion/descripcion.component';
import { ListaDesplegableComponent } from './components/home/preguntas/respuesta/lista-desplegable/lista-desplegable.component';
import { RespuestasService } from './services/respuestas.service';
import { PreguntasService } from './services/preguntas.service';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { UploadImagesComponent } from './components/home/preguntas/upload-images/upload-images.component';
import { AddLabelCategoriesComponent } from './components/home/preguntas/add-label-categories/add-label-categories.component';
import { CategoriasEtiquetasService } from './services/categorias-etiquetas.service';
import { SnackBarMensajesComponent } from './components/home/preguntas/snack-bar-mensajes/snack-bar-mensajes.component';
// tslint:disable-next-line:max-line-length
import { SnackBarEliminarPreguntaComponent } from './components/home/preguntas/snack-bar-eliminar-pregunta/snack-bar-eliminar-pregunta.component';
import { SnackBarMensajesActualizadosComponent } from './components/home/preguntas/snack-bar-mensajes-actualizados/snack-bar-mensajes-actualizados.component';



export const firebaseConfig = {
  apiKey: 'AIzaSyC4WyYXEuKYdy2tUGzcCYi2HF7gs7_TxJc',
  authDomain: 'open-source-survey-e0d80.firebaseapp.com',
  databaseURL: 'https://open-source-survey-e0d80.firebaseio.com',
  storageBucket: 'open-source-survey-e0d80.appspot.com',
  messagingSenderId: '224736788391'
};



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    TableroComponent,
    ProfileComponent,
    NotificacionesComponent,
    MensajesComponent,
    LoaderComponent,
    EncuestasUsuarioComponent,
    PreguntasUsuarioComponent,
    PreguntasComponent,
    CasillaComponent,
    RadioComponent,
    SiNoComponent,
    PuntajeComponent,
    DescripcionComponent,
    ListaDesplegableComponent,
    UploadImagesComponent,
    AddLabelCategoriesComponent,
    SnackBarMensajesComponent,
    SnackBarEliminarPreguntaComponent,
    SnackBarMensajesActualizadosComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  entryComponents: [
    AddLabelCategoriesComponent, SnackBarMensajesComponent, SnackBarEliminarPreguntaComponent,
    SnackBarMensajesActualizadosComponent
  ],
  providers: [
    LoginService,
    ProfileService,
    RespuestasService,
    PreguntasService,
    CategoriasEtiquetasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
