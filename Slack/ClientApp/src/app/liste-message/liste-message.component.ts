import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
    selector: 'app-liste-message',
    templateUrl: './liste-message.component.html',
    styleUrls: ['./liste-message.component.scss']
})
export class ListeMessageComponent implements OnInit {

  messages: any[];

  constructor(private service: ApiService) {

  }

  ngOnInit() {
    this.service.GetMessages().subscribe((res: any) => {
      if (res.messages.length > 0) {
        this.service.listeMessage = res.messages;
        this.service.Emit();
        console.log(this.service.listeMessage);
      }
    });

    this.service.listeMessageSubject.subscribe((res: any) => {
      this.messages = res;
    })
  }
}
