import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { WebsocketService } from '../services/websocket.service';



@Component({
    selector: 'app-send',
    templateUrl: './send.component.html',
    styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit{

  form: FormGroup;

  constructor(private service: ApiService, private socket: WebsocketService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'content': new FormControl('')
    });
  }

  Submit = () => {
    this.service.SendMessage(this.form.value).subscribe((res: any) => {
      if (res.success) {
        this.socket.send(this.form.value.content, localStorage.getItem('username'));
        this.service.listeMessage.push({ username: localStorage.getItem('username'), id: null, content: this.form.value.content, date: Date.now() });
        console.log(this.service.listeMessage);
        this.service.Emit()
      }
      this.form.controls.content.setValue('');
    });
  }
}
