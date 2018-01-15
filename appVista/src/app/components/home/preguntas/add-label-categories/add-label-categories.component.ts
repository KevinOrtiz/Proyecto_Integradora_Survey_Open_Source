import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { CategoriasEtiquetasService } from '../../../../services/categorias-etiquetas.service';
import { MatDialogRef } from '@angular/material';
import { PreguntasService } from '../../../../services/preguntas.service';

@Component({
  selector: 'app-add-label-categories',
  templateUrl: './add-label-categories.component.html',
  styleUrls: ['./add-label-categories.component.scss']
})
export class AddLabelCategoriesComponent implements OnInit {
  private listaCategorias = [];
  constructor(private categoria: CategoriasEtiquetasService, private preguntaServicio: PreguntasService) { }
  ngOnInit() {
    this.listaCategorias = this.categoria.getCategorias();
  }
  guardarCategoria(objetoCategoria) {
    console.log(objetoCategoria.value);
    this.categoria.setCategoria(objetoCategoria.value.value);
    this.preguntaServicio.setTopico(this.categoria.getCategoria());
  }

}
