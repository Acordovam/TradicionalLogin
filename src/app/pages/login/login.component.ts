import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginModel} from '../../Models/usuario.model';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginUser: LoginModel;
  recordarme = false;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginUser =  new LoginModel();
    if (localStorage.getItem('email')) {
      this.loginUser.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }
login(form: NgForm) {
    if ( form.invalid) { return; }
    this.auth.login(this.loginUser).subscribe(resp => {
      console.log(resp);
      this.router.navigateByUrl('/home');
      if (this.recordarme) {
        localStorage.setItem('email', this.loginUser.email);
      }
    }, (err) => {
      console.log(err.error.error.message);
    });
}
}
