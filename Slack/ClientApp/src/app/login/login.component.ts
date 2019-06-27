import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private service: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  Submit = () => {
    this.service.login(this.form.value).subscribe((res: any) => {
      if (<string>res.token != null) {
        localStorage.setItem('token', <string>res.token);
        localStorage.setItem('username', <string>this.form.value.username)
        this.service.emitLogged(true);
      }
    });
  }
}
