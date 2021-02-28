import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticateResponse } from '../services/contracts/authentication.service.contracts';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = null;
  isSuccessful = false;
  isLoginFailed = false;
  isSubmitted = false;
  errorMessage = '';

  constructor(
    private authenticationService: AuthenticationService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit(): void {
    this.authenticationService.login(this.loginForm.value).subscribe(
      (data: AuthenticateResponse) => {
        console.log(data);
        this.tokenStorageService.saveToken(data.jwtToken);
        this.tokenStorageService.saveUser({
          userName: data.userName,
          email: data.email,
          roles: data.roles,
          refreshToken: data.refreshToken,
          id: data.id,
        });
        
        this.isSuccessful = true;
        this.isLoginFailed = false;
        this.isSubmitted = true;

        this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isSubmitted = true;
      }
    );
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  reloadPage(): void {
    window.location.reload();
  }
}
