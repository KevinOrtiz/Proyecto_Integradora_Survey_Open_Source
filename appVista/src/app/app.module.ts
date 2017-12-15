import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


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
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { CasillaComponent } from './components/home/preguntas/respuesta/casilla/casilla.component';
import { RadioComponent } from './components/home/preguntas/respuesta/radio/radio.component';
import { SiNoComponent } from './components/home/preguntas/respuesta/si-no/si-no.component';
import { PuntajeComponent } from './components/home/preguntas/respuesta/puntaje/puntaje.component';
import { DescripcionComponent } from './components/home/preguntas/respuesta/descripcion/descripcion.component';
import { ListaDesplegableComponent } from './components/home/preguntas/respuesta/lista-desplegable/lista-desplegable.component';

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
    DomseguroPipe,
    CasillaComponent,
    RadioComponent,
    SiNoComponent,
    PuntajeComponent,
    DescripcionComponent,
    ListaDesplegableComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
