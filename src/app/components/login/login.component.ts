import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Response } from 'src/app/interfaces/response';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthenticateResponse } from 'src/app/services/contracts/authentication.service.contracts';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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
      (response: Response<AuthenticateResponse>) => {
        console.log(response);
        this.tokenStorageService.saveToken(response.data.jwtToken);
        this.tokenStorageService.saveUser(new User(response.data));

        this.isSuccessful = true;
        this.isLoginFailed = false;
        this.isSubmitted = true;

        this.goTo('/');
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

  goTo(location: string) {
    window.location.href = location;
  }

  reloadPage(): void {
    window.location.reload();
  }
}
