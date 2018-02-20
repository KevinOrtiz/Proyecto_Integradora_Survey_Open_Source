import {Routes} from '@angular/router';
import {AdminDiscusionesPreguntasComponent} from './admin-discusiones-preguntas/admin-discusiones-preguntas.component';
import {AdminPreguntasComponent} from './admin-preguntas/admin-preguntas.component';
import {AdministrarDiscusionesEncuestaComponent} from './administrar-discusiones-encuesta/administrar-discusiones-encuesta.component';
import {AdministrarEncuestaComponent} from './administrar-encuesta/administrar-encuesta.component';
import {EncuestasCompartidasComponent} from './compartir-encuesta/encuestas-compartidas/encuestas-compartidas.component';
import {EditarEncuestaComponent} from './editar-encuesta/editar-encuesta.component';
import {EncuestasComponent} from './encuestas/encuestas.component';
import {ListadoDiscusionesComponent} from './listado-discusiones/listado-discusiones.component';
import {NotificacionAccionesComponent} from './notificacion-acciones/notificacion-acciones.component';
import {NotificacionMensajesComponent} from './notificacion-mensajes/notificacion-mensajes.component';
import {PerfilUsuarioComponent} from "./perfil-usuario/perfil-usuario.component";
import {PortalEncuestasComponent} from './portal-encuestas/portal-encuestas.component';
import {PortalPreguntasComponent} from './portal-preguntas/portal-preguntas.component';
import {PreguntasComponent} from './preguntas/preguntas.component';
import {TableroComponent} from './tablero/tablero.component';
import {VerComentariosComponent} from './ver-comentarios/ver-comentarios.component';


export const HOME_ROUTES: Routes = [
    {path: 'tablero', component: TableroComponent},
    {path: 'portalPregunta', component: PortalPreguntasComponent},
    {path: 'agregarPregunta', component: PreguntasComponent},
    {path: 'crearEncuesta', component: EncuestasComponent},
    {path: 'notificaciones', component: NotificacionAccionesComponent},
    {path: 'mensaje', component: NotificacionMensajesComponent},
    {path: 'portalEncuesta', component: PortalEncuestasComponent},
    {path: 'verComentarios', component: VerComentariosComponent},
    {path: 'listadoDiscusiones', component: ListadoDiscusionesComponent},
    {path: 'misDiscusionesPreguntas', component: AdminDiscusionesPreguntasComponent},
    {path: 'misPreguntas', component: AdminPreguntasComponent},
    {path: 'misEncuestas', component: AdministrarEncuestaComponent},
    {path: 'misDiscusionesEncuestas', component: AdministrarDiscusionesEncuestaComponent},
    {path: 'editarEncuesta', component: EditarEncuestaComponent},
    {path: 'encuestaCompartida', component: EncuestasCompartidasComponent},
    {path: 'micuenta', component: PerfilUsuarioComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'tablero'}
];
