import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'LangApp';
  isLoggedIn = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      console.log('user', user);

      this.username = user.userName;
    }else{
      this.router.navigate(['login'])
    }
  }

  goTo(location: string){
    window.location.href = location;
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.href = '/login';
  }
}
