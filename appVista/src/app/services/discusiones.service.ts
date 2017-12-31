import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DiscusionesService {

  private tipoDiscusion: string;
  private idCuerpoDiscusion: string;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'x-access-token': '' +  sessionStorage.getItem('token')
    });
    return headers;
  }

  setTipoDiscusion (discusion) {
    this.tipoDiscusion = discusion;
  }

  setIdCuerpoDiscusion (id) {
    this.idCuerpoDiscusion = id;
  }

  getTipoDiscusion() {
    return this.tipoDiscusion;
  }

  getIdCuerpoDiscusion() {
    return this.idCuerpoDiscusion;
  }

  loadListaDiscusiones (page: number) {
    const headers = this.getHeaders();
    const url = 'apiRest/loadListaDiscusion/?idcuerpodiscusion=' +
                 this.getIdCuerpoDiscusion() + '&tipoDiscusion=' +
                 this.getTipoDiscusion() + '&pagina=' + page;
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      console.log(res);
                      return res;
                    });
  }

  loadListaMisDiscusiones () {
    const  headers = this.getHeaders();
    const id = sessionStorage.getItem('id');
    const url = 'apiRest/loadListaMisDiscusiones/?tipoDiscusion=' + this.getTipoDiscusion() +
                '&id=' + id;
  return this.http.get(url, {headers})
                  .map((res: Response) => {
                    return res;
                  });
  }

  guardarDiscusion (discusion) {
    const headers = this.getHeaders();
    const url = 'apiRest/guardarDiscusion/';
    return this.http.post(url,
                          {respuestaDiscusion: discusion,
                          tipoDiscusion: this.getTipoDiscusion(),
                          idCuerpoDiscusion: this.getIdCuerpoDiscusion()}, {headers})
                    .map((res: Response) => {
                      console.log(res);
                      return res;
                    });
  }

  editarDiscusion (idDiscusion, discusion) {
    const headers = this.getHeaders();
    const url = 'apiRest/editarDiscusion';
    return this.http.post(url,
                          {respuestaDiscusion: discusion,
                           tipoDiscusion: this.getTipoDiscusion(),
                           id: idDiscusion}, {headers})
                           .map((res: Response) => {
                              console.log(res);
                              return res;
                           });
  }
  eliminarDiscusion (idDiscusion) {
    const parametros = new HttpParams();
    parametros.set('id', idDiscusion);
    parametros.set('tipoDiscusion', this.getTipoDiscusion());
    const headers = this.getHeaders();
    const url = 'apiRest/eliminarDiscusion';
    return this.http.delete(url, { headers , params: parametros})
                    .map((res: Response) => {
                      return res;
                    });

  }

}
