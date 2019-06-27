import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private service: LoginService) {
    if (localStorage.getItem('token') != null)
      this.service.emitLogged(true);
    else
      this.service.emitLogged(false);
  }
}
