import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getActivitiesByMonth() {
    const headers = this.getHeaders();
    const url = 'apiRest/loadSummaryActivitiesByMonth/?id=' + sessionStorage.getItem('id');
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res;
                    });
  }

  getChartPreguntasValidasNoValidas () {
    const headers = this.getHeaders();
    const url = 'apiRest/loadSummaryPreguntasValidasNoValidas/?id=' + sessionStorage.getItem('id');
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res;
                    });
  }

  getChartEncuestasByMonth () {
    const headers = this.getHeaders();
    const url = 'apiRest/loadChartEncuestasByMonth/?id=' + sessionStorage.getItem('id');
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res;
                    });
  }

  getSummaryCommentsByPreguntas () {
    const headers = this.getHeaders();
    const url = 'apiRest/loadSummaryCommentsByPreguntas/?id=' + sessionStorage.getItem('id');
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res;
                    });
  }

  getSummaryDiscusionesPregunta () {
    const headers = this.getHeaders();
    const url = 'apiRest/loadSummaryDiscusionesPregunta/?id=' + sessionStorage.getItem('id');
    return this.http.get(url, {headers})
                    .map((res: Response) => {
                      return res;
                    });
  }

}
