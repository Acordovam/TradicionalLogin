import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginModel, UsuarioModel} from '../Models/usuario.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyDhpuJwSW-cUj7rtwRE1gxnR13TLEsWTZA ';
  userToken: string;
  // Crear nuevo usuario
  // signUp?key=[API_KEY]
  // login
  // signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leertoken();
  }
  logout() {
  localStorage.removeItem('token');
  }
  login(usuario: LoginModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map(resp => {
        console.log('Entro en el mapa del RXJS');
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }
  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}signUp?key=${this.apikey}`,
      authData
    ).pipe(
      map(resp => {
        console.log('Entro en el mapa del RXJS')
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }
  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }
    leertoken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
  estaAuthenticado(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }

}