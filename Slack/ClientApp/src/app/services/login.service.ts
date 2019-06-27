import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class LoginService {

  private urlBase: string;

  loggedSubject = new Subject<any>();

  constructor(private http: HttpClient, @Inject("BASE_URL") base: string) {
    this.urlBase = base;
    }

  login = (data) => {
    return this.http.post(this.urlBase + 'api/user/login', data);
  }

  register = (data) => {
    return this.http.post(this.urlBase + 'api/user/register', data);
  }

  emitLogged = (value) => {
    this.loggedSubject.next(value);
  }
}
