import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  message = '';
  errors: string[] = [];
  loginForm: FormGroup;
  blurUsername: boolean = false;
  blurPassword: boolean = false;
  constructor(
    private service: LoginService,
    private router: Router,
    private authService: AuthenticationService,
    private builder: FormBuilder
  ) {
    this.loginForm = builder.group({
      username: [this.username, Validators.required],
      password: [this.password, Validators.required],
    });
  }

  blurInput(type) {
    if (type === 'username') this.blurUsername = true;
    if (type === 'password') this.blurPassword = true;
  }

  ngOnInit(): void {}
  logIn = () => {
    this.service.login(this.username, this.password).subscribe(
      async (data: HttpResponse<any>) => {
        await this.authService.logIn(data.headers.get('x-auth-token'));
        this.router.navigate(['tabs']);
      },
      (error) => {
        if (error.error.errors) {
          error.error.errors.map((err: any) => {
            this.errors.push(String(Object.values(err)[0]));
          });
        } else if (error.error) {
          this.errors = [error.error];
        }
      }
    );
  };
}
