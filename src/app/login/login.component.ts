import { templateSourceUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  login(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.authService.login(credentials).subscribe(
      (response: any) => {
        const token = (<any>response).token;
        console.log('token: ' + token);
        localStorage.setItem('jwt', token);
        // localStorage.removeItem('jwt');
        // console.log('token ' + token);
        this.invalidLogin = false;
      },
      () => ((this.invalidLogin = true), console.log(credentials))
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
  }
}
