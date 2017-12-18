import { TestBed, inject } from '@angular/core/testing';

import { CategoriasEtiquetasService } from './categorias-etiquetas.service';

describe('CategoriasEtiquetasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriasEtiquetasService]
    });
  });

  it('should be created', inject([CategoriasEtiquetasService], (service: CategoriasEtiquetasService) => {
    expect(service).toBeTruthy();
  }));
});
