import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { CategoriasEtiquetasService } from '../../../../services/categorias-etiquetas.service';
import { MatDialogRef } from '@angular/material';



@Component({
  selector: 'app-add-label-categories',
  templateUrl: './add-label-categories.component.html',
  styleUrls: ['./add-label-categories.component.css']
})
export class AddLabelCategoriesComponent implements OnInit {
  private listaCategorias = [];
  private listaEtiquetas = [];
  constructor(private categoria: CategoriasEtiquetasService, public thisDialogRef: MatDialogRef<AddLabelCategoriesComponent>) { }
  ngOnInit() {
    this.listaCategorias = this.categoria.getCategorias();
    this.listaEtiquetas = this.categoria.getEtiquetas();
  }
  guardarCategoria(objetoCategoria) {
    console.log(objetoCategoria.value);
    this.categoria.setCategoria(objetoCategoria.value.value);
  }
  guardarEtiqueta( objetoEtiqueta) {
    console.log(objetoEtiqueta.value);
    this.categoria.setEtiqueta(objetoEtiqueta.value.value);
  }
  cerrarVentana() {
    this.thisDialogRef.close('confirm');

  }

}
