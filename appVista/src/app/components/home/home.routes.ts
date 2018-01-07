import { Routes } from '@angular/router';
import { TableroComponent } from './tablero/tablero.component';
import { ProfileComponent } from './profile/profile.component';
import { MensajesComponent } from './profile/mensajes.component';
import { NotificacionesComponent } from './profile/notificaciones.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { PortalPreguntasComponent } from './portal-preguntas/portal-preguntas.component';
import { VerComentariosComponent } from './ver-comentarios/ver-comentarios.component';
import { ListadoDiscusionesComponent } from './listado-discusiones/listado-discusiones.component';
import { AdminDiscusionesPreguntasComponent } from './admin-discusiones-preguntas/admin-discusiones-preguntas.component';
import { AdminPreguntasComponent } from './admin-preguntas/admin-preguntas.component';


export const HOME_ROUTES: Routes = [
    {path: 'tablero', component: TableroComponent},
    {path: 'portalPregunta', component: PortalPreguntasComponent},
    {path: 'agregarPregunta', component: PreguntasComponent},
    {path: 'verComentarios', component: VerComentariosComponent},
    {path: 'listadoDiscusiones', component: ListadoDiscusionesComponent},
    {path: 'misDiscusionesPreguntas', component: AdminDiscusionesPreguntasComponent},
    {path: 'misPreguntas', component: AdminPreguntasComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'mensajes', component: MensajesComponent},
    {path: 'notificaciones', component: NotificacionesComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'tablero'}
];
