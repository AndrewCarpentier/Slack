import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  success: boolean;
  error;

  constructor(private service: LoginService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'username': new FormControl(''),
      'password': new FormControl(''),
      'email': new FormControl('')
    });
  }

  Submit = () => {

    this.service.register(this.form.value).subscribe((res: any) => {

      if (<number>res.status == 0)
        this.success = true;
      else
        this.success = false;

      if (<number>res.status == 1)
        this.error = 'Erreur serveur';
      else if (<number>res.status == 2)
        this.error = 'Email déjà utilisé';
      else if (<number>res.status == 3)
        this.error = 'Username déjà utilisé';
    });
  }
}
