import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()
export class ProfileService {
  idUsuario;
  constructor( private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'x-access-token': '' +  sessionStorage.getItem('token')
    });
    return headers;
  }
  getProfileInformationUser(): any {
    const headers = this.getHeaders();
    const url = '/apiRest/cargarPerfil/?id=' + this.getIDUsuario();
    return this.http.get(url, { headers })
      .map((res:Response) => {
        return res['usuario'];
      });
  }
  actualizarInformacionUsuario(objetoUsuario) {
    const headers = this.getHeaders();
    const url = '/apiRest/actualizarInformacionUsuario';
    return this.http.post(url, {id: sessionStorage.getItem('id'),usuario:objetoUsuario},{headers})
      .map((res: Response) => {
          return res['status'];
      });
    
  }
  
  setIDUsuario (id){
    this.idUsuario = id;
  }
  
  getIDUsuario () {
    return this.idUsuario;
  }



}
