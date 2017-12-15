import { TestBed, inject } from '@angular/core/testing';

import { RespuestasService } from './respuestas.service';

describe('RespuestasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RespuestasService]
    });
  });

  it('should be created', inject([RespuestasService], (service: RespuestasService) => {
    expect(service).toBeTruthy();
  }));
});
