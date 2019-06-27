import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class ApiService {

  private urlBase: string;

  listeMessage : any[];

  listeMessageSubject = new Subject<any>();

  constructor(private http: HttpClient, @Inject("BASE_URL") base : string) {
    this.urlBase = base;
  }

  GetMessages = () => {
    return this.http.get(this.urlBase + 'api/message/gets', {
      headers: { 'token': localStorage.getItem('token') }
    });
  }

  SendMessage = (data) => {
    return this.http.post(this.urlBase + 'api/message/send', data, { headers: new HttpHeaders({ 'token': localStorage.getItem('token') }) });
  }

  Emit = () => {
    this.listeMessageSubject.next(this.listeMessage);
  }
}
