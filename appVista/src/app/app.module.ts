import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import 'hammerjs';
import {ClickOutsideModule} from 'ng-click-outside';
import {ChartsModule} from 'ng2-charts';
import {DndModule} from 'ng2-dnd';
// tslint:disable-next-line:max-line-length
import {
  MzButtonModule,
  MzCollapsibleModule,
  MzDropdownModule,
  MzIconMdiModule,
  MzIconModule,
  MzInputModule,
  MzProgressModule,
  MzSidenavModule,
  MzTextareaModule
} from 'ng2-materialize';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {QuillModule} from 'ngx-quill';
import {AppComponent} from './app.component';
import {APP_ROUTING} from './app.routes';
import {AdminDiscusionesPreguntasComponent} from './components/home/admin-discusiones-preguntas/admin-discusiones-preguntas.component';
import {AdminPreguntasComponent} from './components/home/admin-preguntas/admin-preguntas.component';
// tslint:disable-next-line:max-line-length
import {AdministrarDiscusionesEncuestaComponent} from './components/home/administrar-discusiones-encuesta/administrar-discusiones-encuesta.component';
import {AdministrarEncuestaComponent} from './components/home/administrar-encuesta/administrar-encuesta.component';
import {CompartirEncuestaComponent} from './components/home/compartir-encuesta/compartir-encuesta.component';
import {EncuestasCompartidasComponent} from './components/home/compartir-encuesta/encuestas-compartidas/encuestas-compartidas.component';
import {CrearDiscusionComponent} from './components/home/crear-discusion/crear-discusion.component';
import {EditarDiscusionEncuestaComponent} from './components/home/editar-discusion-encuesta/editar-discusion-encuesta.component';
import {EditarDiscusionComponent} from './components/home/editar-discusion/editar-discusion.component';
import {EditarEncuestaComponent} from './components/home/editar-encuesta/editar-encuesta.component';
import {CompartirComponent} from './components/home/encuestas/compartir/compartir.component';
import {DisenoComponent} from './components/home/encuestas/diseno/diseno.component';
import {EncuestasComponent} from './components/home/encuestas/encuestas.component';
import {ResumenComponent} from './components/home/encuestas/resumen/resumen.component';
import {HeaderComponent} from './components/home/header/header.component';
import {SearchBarItemRoutingComponent} from './components/home/header/search-bar-item-routing/search-bar-item-routing.component';
import {HomeComponent} from './components/home/home.component';
import {ListaSubComentariosComponent} from './components/home/lista-sub-comentarios/lista-sub-comentarios.component';
import {ListadoDiscusionesEncuestaComponent} from './components/home/listado-discusiones-encuesta/listado-discusiones-encuesta.component';
import {ListadoDiscusionesPreguntaComponent} from './components/home/listado-discusiones-pregunta/listado-discusiones-pregunta.component';
import {ListadoDiscusionesComponent} from './components/home/listado-discusiones/listado-discusiones.component';
import {MensajeAccionesUsuarioComponent} from './components/home/mensaje-acciones-usuario/mensaje-acciones-usuario.component';
import {MenuDesplegableComponent} from './components/home/menu-desplegable/menu-desplegable.component';
import {NotificacionAccionesComponent} from './components/home/notificacion-acciones/notificacion-acciones.component';
import {NotificacionMensajesComponent} from './components/home/notificacion-mensajes/notificacion-mensajes.component';
import {NvD3Service} from "./components/home/nvD3/nv-d3.service";
import {NvD3Component} from './components/home/nvD3/nv-d3/nv-d3.component';
import {PerfilUsuarioComponent} from './components/home/perfil-usuario/perfil-usuario.component';
import {VerPerfilComponent} from './components/home/perfil-usuario/ver-perfil/ver-perfil.component';
import {PortalEncuestasComponent} from './components/home/portal-encuestas/portal-encuestas.component';
import {PortalPreguntasComponent} from './components/home/portal-preguntas/portal-preguntas.component';
import {AddLabelCategoriesComponent} from './components/home/preguntas/add-label-categories/add-label-categories.component';
import {PreguntasComponent} from './components/home/preguntas/preguntas.component';
import {CasillaComponent} from './components/home/preguntas/respuesta/casilla/casilla.component';
import {DescripcionComponent} from './components/home/preguntas/respuesta/descripcion/descripcion.component';
import {ListaDesplegableComponent} from './components/home/preguntas/respuesta/lista-desplegable/lista-desplegable.component';
import {PuntajeComponent} from './components/home/preguntas/respuesta/puntaje/puntaje.component';
import {RadioComponent} from './components/home/preguntas/respuesta/radio/radio.component';
import {SiNoComponent} from './components/home/preguntas/respuesta/si-no/si-no.component';
// tslint:disable-next-line:max-line-length
import {SnackBarEliminarPreguntaComponent} from './components/home/preguntas/snack-bar-eliminar-pregunta/snack-bar-eliminar-pregunta.component';
import {SnackBarMensajesActualizadosComponent} from './components/home/preguntas/snack-bar-mensajes-actualizados/snack-bar-mensajes-actualizados.component';
import {SnackBarMensajesComponent} from './components/home/preguntas/snack-bar-mensajes/snack-bar-mensajes.component';
import {TableroComponent} from './components/home/tablero/tablero.component';
import {WidgetColaboradoresComponent} from './components/home/tablero/widget-colaboradores/widget-colaboradores.component';
import {WidgetComentariosComponent} from './components/home/tablero/widget-comentarios/widget-comentarios.component';
import {WidgetDiscusionesComponent} from './components/home/tablero/widget-discusiones/widget-discusiones.component';
import {WidgetEncuestasComponent} from './components/home/tablero/widget-encuestas/widget-encuestas.component';
import {ValidarPreguntasComponent} from './components/home/validar-preguntas/validar-preguntas.component';
import {VerComentariosComponent} from './components/home/ver-comentarios/ver-comentarios.component';
import {VerDiscusionEncuestaComponent} from './components/home/ver-discusion-encuesta/ver-discusion-encuesta.component';
import {VerEncuestaComponent} from './components/home/ver-encuesta/ver-encuesta.component';
import {VerPreguntaComponent} from './components/home/ver-pregunta/ver-pregunta.component';
import {VistaPreviaDiscusionComponent} from './components/home/vista-previa-discusion/vista-previa-discusion.component';
import {LoaderComponent} from './components/loader/loader.component';
import {LoginComponent} from './components/login/login.component';
import {UploadFormComponent} from './components/uploads/upload-form/upload-form.component';
import {SaniarHtmlPipe} from './saniar-html.pipe';
import {AccionesUsuarioService} from './services/acciones-usuario.service';
import {CategoriasEtiquetasService} from './services/categorias-etiquetas.service';
import {ComentariosService} from './services/comentarios.service';
import {DiscusionesService} from './services/discusiones.service';
import {EncuestasService} from './services/encuestas.service';
import {LoginService} from './services/login.service';
import {NotificacionesService} from './services/notificaciones.service';
import {PreguntasService} from './services/preguntas.service';
import {ProfileService} from './services/profile.service';
import {RespuestasService} from './services/respuestas.service';
import {StadisticalActivitiesService} from './services/stadistical-activities.service';
import {FileHandledDirective} from './uploads/file-handled.directive';
import {UploadService} from './uploads/shared/upload.service';


export const firebaseConfig = {
    apiKey: "AIzaSyDke6uZ-5VH0kn1B_jiyiPUsJahPLqh-XA",
    authDomain: "open-source-survey-4f690.firebaseapp.com",
    databaseURL: "https://open-source-survey-4f690.firebaseio.com",
    projectId: "open-source-survey-4f690",
    storageBucket: "open-source-survey-4f690.appspot.com",
    messagingSenderId: "247140915244"
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
    EncuestasCompartidasComponent,
    WidgetComentariosComponent,
    WidgetDiscusionesComponent,
    WidgetEncuestasComponent,
    WidgetColaboradoresComponent,
    NvD3Component,
    SearchBarItemRoutingComponent,
    PerfilUsuarioComponent,
    VerPerfilComponent,
    VerDiscusionEncuestaComponent,
    EditarDiscusionEncuestaComponent
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
    MzCollapsibleModule,
    
    
  ],
  entryComponents: [
     SnackBarMensajesComponent, SnackBarEliminarPreguntaComponent,
    SnackBarMensajesActualizadosComponent, UploadFormComponent,  ListaSubComentariosComponent, VerPreguntaComponent,
    CrearDiscusionComponent, VistaPreviaDiscusionComponent, EditarDiscusionComponent, ListadoDiscusionesPreguntaComponent,
    ValidarPreguntasComponent, MensajeAccionesUsuarioComponent, VerEncuestaComponent, ResumenComponent, CompartirComponent,
    ListadoDiscusionesEncuestaComponent, CompartirEncuestaComponent, CompartirEncuestaComponent, VerPerfilComponent,
    VerDiscusionEncuestaComponent, EditarDiscusionEncuestaComponent
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
    NvD3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
