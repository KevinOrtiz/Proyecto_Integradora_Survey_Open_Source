import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DiscusionesService {

  private tipoDiscusion: string;
  private idCuerpoDiscusion: string;

  constructor(private http: HttpClient) { }

  private static getHeaders(): HttpHeaders {
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

  loadListaDiscusiones (): Observable<Object[]> {
    const headers = DiscusionesService.getHeaders();
    const url = 'apiRest/loadListaDiscusion/?idcuerpodiscusion=' +
                 this.getIdCuerpoDiscusion() + '&tipoDiscusion=' +
                 this.getTipoDiscusion();
    return this.http.get<Object[]>(url, {headers})
                    .map((res) => {
                      console.log(res);
                      return res['discusiones'];
                    });
  }

  loadListaMisDiscusiones (page, topico) {
    const  headers = DiscusionesService.getHeaders();
    const id = sessionStorage.getItem('id');
    const url = 'apiRest/loadListaMisDiscusiones/?tipoDiscusion=' + this.getTipoDiscusion() +
                '&id=' + id + '&page='+ page + '&topico='+topico;
  return this.http.get(url, {headers})
                  .map((res: Response) => {
                    return res;
                  });
  }

  guardarDiscusion (discusion) {
    const headers = DiscusionesService.getHeaders();
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
    const headers = DiscusionesService.getHeaders();
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
  
  editarDiscusionEncuesta (idDiscusion, discusion) {
    const headers = DiscusionesService.getHeaders();
    const url = 'apiRest/editarDiscusion';
    return this.http.post(url, {
      respuestaDiscusion: discusion,
      tipoDiscusion: 'encuesta',
      id: idDiscusion
    }, {headers})
      .map((res: Response) => {
        return res;
      });
  }
  
  eliminarDiscusion (idDiscusion, idPregunta) {
    const headers = DiscusionesService.getHeaders();
    const url = 'apiRest/eliminarDiscusion/?tipoDiscusion=' + this.getTipoDiscusion() + '&id=' + idDiscusion + '&pregunta_ID=' + idPregunta;
    return this.http.get(url, { headers})
                    .map((res: Response) => {
                      return res;
                    });

  }

  loadMiDiscusionPregunta (idDiscusion) {
    const headers = DiscusionesService.getHeaders();
    const url = 'apiRest/verDiscusionPregunta/?tipoDiscusion=pregunta&id=' + idDiscusion;
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res['discusion'];
                    });
  }
  
  loadMiDiscusionEncuesta (idDiscusion){
     const headers = DiscusionesService.getHeaders();
     const url = 'apiRest/verDiscusionPregunta/?tipoDiscusion=encuesta&id=' + idDiscusion;
     return this.http.get(url, {headers})
       .map((res: Response) => {
         return res['discusion'];
       });
  }

  cerrarDiscusion () {
    const headers = DiscusionesService.getHeaders();
    const url = 'apiRest/cerrarDiscusionPregunta/?id=' + this.getIdCuerpoDiscusion();
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res;
                    });
  }
  
  cerrarDiscusionEncuesta(){
    const headers = DiscusionesService.getHeaders();
    const url = 'apiRest/cerrarDiscusionEncuesta/?id=' + this.getIdCuerpoDiscusion();
    return this.http.get(url, {headers})
      .map((res: Response) => {
        return res;
      });
  }
  guardaDiscusionMiembroComite (discusion) {
    const headers = DiscusionesService.getHeaders();
    const url = 'apiRest/validarPregunta/';
    return this.http.post(url,
                          {respuestaDiscusion: discusion,
                          tipoDiscusion: this.getTipoDiscusion(),
                          idCuerpoDiscusion: this.getIdCuerpoDiscusion()}, {headers})
                    .map((res: Response) => {
                      console.log(res);
                      return res;
                    });
  }
  
  actualizarEstadoDiscusionEncuesta (id, estado){
    const headers = DiscusionesService.getHeaders();
    const url = 'apiRest/actualizarEstadoDiscusionEncuesta/?id=' + id + '&estado=' + estado;
    return this.http.get(url, {headers})
      .map((res: Response)=> {
        return res;
      })
  }

}
