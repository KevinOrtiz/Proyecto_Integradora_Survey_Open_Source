import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class StadisticalActivitiesService {

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'x-access-token': '' +  sessionStorage.getItem('token')
    });
    return headers;
  }

  

  getChartPreguntasValidasNoValidas (id) {
    const headers = this.getHeaders();
    const url = 'apiRest/loadSummaryPreguntasValidasNoValidas/?id=' + id;
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res;
                    });
  }

  getChartEncuestasByMonth (id) {
    const headers = this.getHeaders();
    const url = 'apiRest/loadChartEncuestasByMonth/?id=' + id;
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res;
                    });
  }

  
  
  getCountOnlineUsers() {
    const headers = this.getHeaders();
    const url = 'apiRest/getCountOnlineUsers';
    return this.http.get(url, {headers})
                .map((res: Response) => {
                return res;
                });
  }

  
  
  getCountCommentsByPreguntas(idUsuario2: string) {
    const headers = this.getHeaders();
    const url = 'apiRest/getCountPreguntasComentadas/?id=' +idUsuario2;
    return this.http.get(url, {headers})
      .map((res:Response) => {
        return res;
      }) ;
  }
  
  getCountCommentsByEncuestas (id) {
    const headers = this.getHeaders();
    const url = 'apiRest/getCountEncuestasComentadas/?id=' + id;
    return this.http.get(url, {headers})
      .map((res:Response) => {
        return res;
      });
  }
  
  getCountCommentsAcertados (id) {
    const headers = this.getHeaders();
    const url = 'apiRest/getCountComentariosAcertados/?id=' + id;
    return this.http.get(url, {headers})
      .map((res: Response) => {
          return res;
      });
  }
  
  getListColaboradores (id) {
    const headers = this.getHeaders();
    const url = 'apiRest/getListaMisColaboradores/?id=' + id;
    return this.http.get(url, {headers})
      .map((res: Response) => {
          return res;
      });
  }
}
