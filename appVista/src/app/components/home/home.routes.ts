import { Routes } from '@angular/router';
import { TableroComponent } from './tablero/tablero.component';
import { ProfileComponent } from './profile/profile.component';
import { MensajesComponent } from './profile/mensajes.component';
import { NotificacionesComponent } from './profile/notificaciones.component';
import { PreguntasComponent } from './preguntas/preguntas.component';


export const HOME_ROUTES: Routes = [
    {path: 'tablero', component: TableroComponent},
    {path: 'agregarPregunta', component: PreguntasComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'mensajes', component: MensajesComponent},
    {path: 'notificaciones', component: NotificacionesComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'tablero'}
];
