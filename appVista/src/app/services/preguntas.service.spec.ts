import { TestBed, inject } from '@angular/core/testing';

import { PreguntasService } from './preguntas.service';

describe('PreguntasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreguntasService]
    });
  });

  it('should be created', inject([PreguntasService], (service: PreguntasService) => {
    expect(service).toBeTruthy();
  }));
});
