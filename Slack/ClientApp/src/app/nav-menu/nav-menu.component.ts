import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;

  logged: boolean;

  constructor(private router: Router, private service: LoginService) {
    this.logged = localStorage.getItem('token') != null;
  }

  ngOnInit() {
    this.service.loggedSubject.subscribe((res : boolean) => {
      this.logged = res;
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  Logout = () => {
    this.service.emitLogged(false);
    localStorage.removeItem('token');
    this.router.navigate['/login'];
  }
}
