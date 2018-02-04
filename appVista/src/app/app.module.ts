import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/home/header/header.component';
import { TableroComponent } from './components/home/tablero/tablero.component';
import { APP_ROUTING } from './app.routes';
import { LoginService } from './services/login.service';
import { ProfileService } from './services/profile.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoaderComponent } from './components/loader/loader.component';
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
import { CategoriasEtiquetasService } from './services/categorias-etiquetas.service';
import { SnackBarMensajesComponent } from './components/home/preguntas/snack-bar-mensajes/snack-bar-mensajes.component';
// tslint:disable-next-line:max-line-length
import { SnackBarEliminarPreguntaComponent } from './components/home/preguntas/snack-bar-eliminar-pregunta/snack-bar-eliminar-pregunta.component';
import { SnackBarMensajesActualizadosComponent } from './components/home/preguntas/snack-bar-mensajes-actualizados/snack-bar-mensajes-actualizados.component';
import { UploadFormComponent } from './components/uploads/upload-form/upload-form.component';
import { UploadService } from './uploads/shared/upload.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { VerPreguntaComponent } from './components/home/ver-pregunta/ver-pregunta.component';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import 'hammerjs';
import { PortalPreguntasComponent } from './components/home/portal-preguntas/portal-preguntas.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ComentariosService } from './services/comentarios.service';
import { VerComentariosComponent } from './components/home/ver-comentarios/ver-comentarios.component';
import { ListaSubComentariosComponent } from './components/home/lista-sub-comentarios/lista-sub-comentarios.component';
import { DiscusionesService } from './services/discusiones.service';
import { CrearDiscusionComponent } from './components/home/crear-discusion/crear-discusion.component';
import { QuillModule } from 'ngx-quill';
import {MatTabsModule} from '@angular/material/tabs';
import { SaniarHtmlPipe } from './saniar-html.pipe';
import { ListadoDiscusionesComponent } from './components/home/listado-discusiones/listado-discusiones.component';
import { AdminDiscusionesPreguntasComponent } from './components/home/admin-discusiones-preguntas/admin-discusiones-preguntas.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { VistaPreviaDiscusionComponent } from './components/home/vista-previa-discusion/vista-previa-discusion.component';
import {MatChipsModule} from '@angular/material/chips';
import { EditarDiscusionComponent } from './components/home/editar-discusion/editar-discusion.component';
import { AdminPreguntasComponent } from './components/home/admin-preguntas/admin-preguntas.component';
import { ListadoDiscusionesPreguntaComponent } from './components/home/listado-discusiones-pregunta/listado-discusiones-pregunta.component';
import { ValidarPreguntasComponent } from './components/home/validar-preguntas/validar-preguntas.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { ClickOutsideModule } from 'ng-click-outside';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MenuDesplegableComponent } from './components/home/menu-desplegable/menu-desplegable.component';
// tslint:disable-next-line:max-line-length
import { MzSidenavModule, MzIconModule, MzIconMdiModule,
         MzDropdownModule, MzTooltipModule, MzProgressModule,
         MzInputModule, MzCollapsibleModule, MzTextareaModule, MzButtonModule } from 'ng2-materialize';
import { NotificacionAccionesComponent } from './components/home/notificacion-acciones/notificacion-acciones.component';
import { NotificacionMensajesComponent } from './components/home/notificacion-mensajes/notificacion-mensajes.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddLabelCategoriesComponent } from './components/home/preguntas/add-label-categories/add-label-categories.component';
import { FileHandledDirective } from './uploads/file-handled.directive';
import { MensajeAccionesUsuarioComponent } from './components/home/mensaje-acciones-usuario/mensaje-acciones-usuario.component';
import { AccionesUsuarioService } from './services/acciones-usuario.service';
import { StadisticalActivitiesService } from './services/stadistical-activities.service';
import { ChartsModule } from 'ng2-charts';
import { EncuestasComponent } from './components/home/encuestas/encuestas.component';
import { ResumenComponent } from './components/home/encuestas/resumen/resumen.component';
import { DisenoComponent } from './components/home/encuestas/diseno/diseno.component';
import { CompartirComponent } from './components/home/encuestas/compartir/compartir.component';
import {MatStepperModule} from '@angular/material/stepper';
import {DndModule} from 'ng2-dnd';
import { VerEncuestaComponent } from './components/home/ver-encuesta/ver-encuesta.component';
import { PortalEncuestasComponent } from './components/home/portal-encuestas/portal-encuestas.component';
import { NotificacionesService } from './services/notificaciones.service';
import { MzModalService } from 'ng2-materialize';
import { EncuestasService } from './services/encuestas.service';
import { AdministrarEncuestaComponent } from './components/home/administrar-encuesta/administrar-encuesta.component';
// tslint:disable-next-line:max-line-length
import { AdministrarDiscusionesEncuestaComponent } from './components/home/administrar-discusiones-encuesta/administrar-discusiones-encuesta.component';
import { ListadoDiscusionesEncuestaComponent } from './components/home/listado-discusiones-encuesta/listado-discusiones-encuesta.component';
import { EditarEncuestaComponent } from './components/home/editar-encuesta/editar-encuesta.component';
import { CompartirEncuestaComponent } from './components/home/compartir-encuesta/compartir-encuesta.component';
import { EncuestasCompartidasComponent } from './components/home/compartir-encuesta/encuestas-compartidas/encuestas-compartidas.component';


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
    HeaderComponent,
    TableroComponent,
    LoaderComponent,
    PreguntasComponent,
    CasillaComponent,
    RadioComponent,
    SiNoComponent,
    PuntajeComponent,
    DescripcionComponent,
    ListaDesplegableComponent,
    SnackBarMensajesComponent,
    SnackBarEliminarPreguntaComponent,
    SnackBarMensajesActualizadosComponent,
    UploadFormComponent,
    VerPreguntaComponent,
    PortalPreguntasComponent,
    VerComentariosComponent,
    ListaSubComentariosComponent,
    CrearDiscusionComponent,
    SaniarHtmlPipe,
    ListadoDiscusionesComponent,
    AdminDiscusionesPreguntasComponent,
    VistaPreviaDiscusionComponent,
    EditarDiscusionComponent,
    AdminPreguntasComponent,
    ListadoDiscusionesPreguntaComponent,
    ValidarPreguntasComponent,
    MenuDesplegableComponent,
    NotificacionAccionesComponent,
    NotificacionMensajesComponent,
    AddLabelCategoriesComponent,
    FileHandledDirective,
    MensajeAccionesUsuarioComponent,
    EncuestasComponent,
    ResumenComponent,
    DisenoComponent,
    CompartirComponent,
    VerEncuestaComponent,
    PortalEncuestasComponent,
    AdministrarEncuestaComponent,
    AdministrarDiscusionesEncuestaComponent,
    ListadoDiscusionesEncuestaComponent,
    EditarEncuestaComponent,
    CompartirEncuestaComponent,
    EncuestasCompartidasComponent
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
    InfiniteScrollModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    QuillModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatProgressBarModule,
    CommonModule,
    ClickOutsideModule,
    MatToolbarModule,
    MzSidenavModule,
    MzIconModule,
    MzIconMdiModule,
    MzDropdownModule,
    MzProgressModule,
    MatTooltipModule,
    MzInputModule,
    ChartsModule,
    MatStepperModule,
    MzTextareaModule,
    MzButtonModule,
    DndModule.forRoot(),
    MzCollapsibleModule
  ],
  entryComponents: [
     SnackBarMensajesComponent, SnackBarEliminarPreguntaComponent,
    SnackBarMensajesActualizadosComponent, UploadFormComponent,  ListaSubComentariosComponent, VerPreguntaComponent,
    CrearDiscusionComponent, VistaPreviaDiscusionComponent, EditarDiscusionComponent, ListadoDiscusionesPreguntaComponent,
    ValidarPreguntasComponent, MensajeAccionesUsuarioComponent, VerEncuestaComponent, ResumenComponent, CompartirComponent,
    ListadoDiscusionesEncuestaComponent, CompartirEncuestaComponent, CompartirEncuestaComponent
  ],
  providers: [
    LoginService,
    ProfileService,
    RespuestasService,
    PreguntasService,
    CategoriasEtiquetasService,
    UploadService,
    AngularFireDatabase,
    ComentariosService,
    DiscusionesService,
    AccionesUsuarioService,
    StadisticalActivitiesService,
    NotificacionesService,
    EncuestasService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
