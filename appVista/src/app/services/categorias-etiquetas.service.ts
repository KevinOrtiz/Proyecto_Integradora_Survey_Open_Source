import { Injectable } from '@angular/core';

@Injectable()
export class CategoriasEtiquetasService {
  private listaEtiquetas: any []= [];
  private listaCategorias: any[] = [];
  private categoria;
  private etiqueta;
  constructor() { }

  getCategorias () {
    return this.listaCategorias;
  }

  getEtiquetas () {
    return this.listaEtiquetas;
  }

  setListaCategorias (listaCategorias) {
    this.listaCategorias = listaCategorias;
  }

  setListaEtiquetas (listaEtiquetas) {
    this.listaEtiquetas = listaEtiquetas;
  }

  setCategoria (valorCategoria) {
    this.categoria = valorCategoria;
  }

  setEtiqueta (valorEtiqueta) {
    this.etiqueta = valorEtiqueta;
  }

  getCategoria () {
    return this.categoria;
  }

  getEtiqueta () {
    console.log(this.etiqueta);
    return this.etiqueta;
  }

}
