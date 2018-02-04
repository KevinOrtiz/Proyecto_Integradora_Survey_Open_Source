import { Component, OnInit } from '@angular/core';
import { EncuestasService } from '../../../../services/encuestas.service';
import { MatDialog } from '@angular/material';
import { VerEncuestaComponent } from '../../ver-encuesta/ver-encuesta.component';
import { ComentariosService } from '../../../../services/comentarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuestas-compartidas',
  templateUrl: './encuestas-compartidas.component.html',
  styleUrls: ['./encuestas-compartidas.component.scss']
})
export class EncuestasCompartidasComponent implements OnInit {
  private listaEncuestaCompartidas: Object [] = [];
  private finished = false;
  constructor(private servicioEncuesta: EncuestasService, private dialogo: MatDialog,
              private servicioComentario: ComentariosService, private router: Router) {
      this.servicioEncuesta.loadListaEncuestasCompartidas().subscribe((res) => {
        this.listaEncuestaCompartidas = res;
        this.finished = true;
      });
   }

  ngOnInit() {
  }
  verEncuesta (idEncuesta) {
    this.servicioEncuesta.setIDEncuesta(idEncuesta);
    const ventana = this.dialogo.open(VerEncuestaComponent, {
      width : '1000px'
    });
  }

  ingresarComentario (idEncuesta) {
    this.servicioComentario.setidCategoria(idEncuesta);
    this.servicioComentario.setTipoComentario('encuesta');
    this.router.navigate(['/home', 'verComentarios']);

  }

  editarEncuesta (idEncuesta, usuario_ID) {
    this.servicioEncuesta.setIDEncuesta(idEncuesta);
    this.servicioEncuesta.setIDPropietarioEncuesta(usuario_ID);
    this.router.navigate(['/home', 'editarEncuesta' ]);
  }

}
