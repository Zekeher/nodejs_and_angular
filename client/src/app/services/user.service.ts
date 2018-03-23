import { Injectable } from '@angular/core';
import { pathServices } from './pathServices';
import { Http, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Options } from 'selenium-webdriver/firefox';
import { Upload } from '../models/upload';
import { User } from '../models/users';



@Injectable()
export class UserService {
  private url: string;

  constructor(private http: Http) {
    this.url = pathServices.url;
  }

  // funcion para verificar si tenemos localmente la sesion abierta del usuario
  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));
    return identity;

  };
  // funcion para verificar si tenemos localmente le token del usuario
  getToken() {
    let token = localStorage.getItem('token');
    return token;
  };

  // funcion para logear usuario
  loginUser(user, token = null): Observable<Response> {
    if (token != null) {
      user.gethash = token;
    } else {
      user.gethash = false;
    }
    let params = user;
    return this.http.post(this.url + 'login', params).map(res => res.json());
  }

  // funcion para obtener un usuario
  getUser(userId, token): Observable<User> {
    let headers = new Headers();
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + 'users/' + userId, options).map(res => res.json());
  };

  // funcion para ver todos los usuarios
  getAllUser(token): Observable<User> {
    let headers = new Headers();

    // seteamos el header del services con los datos correspondientes en este caso el TOKEN user
    headers.append('Authorization', token);

    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.url + 'users', options).map(res => res.json());
  }
  // funcion para crear usuarios
  createUser(user): Observable<User> {
    return this.http.post(this.url + 'register', user).map(res => res.json());
  }

  // funcion para eliminar usuario
  deleteUser(userId, token): Observable<User> {
    let headers = new Headers();
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.url + '/users/delete/' + userId, options).map(res => res.json());
  }

  // funcion para editar usuario
  updateUser(userId, user, token): Observable<User> {
    let headers = new Headers();
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + '/users/update/' + userId, user, options).map(res => res.json());
  }

  // funcion subir imagen 
  imageUpload(userId, token, image: Upload): Observable<Response>{
    let headers = new Headers();
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    let body = new FormData();
    body.append('file', image.file, image.name);   
    return this.http.post( this.url + 'users/update/' + userId + '/image', body, options).map(res => res.json());
  }
}
