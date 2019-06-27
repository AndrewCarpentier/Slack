import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { LoginService } from './login.service';

declare var io: any

@Injectable()
export class WebsocketService implements OnInit {

  socket = io.connect("http://localhost:666");
  constructor(private service: ApiService) {
      this.socket.on('message', function (object) {
        console.log("socket result >> ");
        console.log(object);
        service.listeMessage.push({ username: object.user, id: null, content: object.content, date: Date.now() });
        service.Emit();
      });
    }

  ngOnInit() {
    
  }

  send = (message, token) => {
    this.socket.emit('message', {msg : message, username: token})
  }

  
}
