import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  constructor(private router: Router) { }

  login(): void {
    this.isLoggedIn = true;
    this.router.navigateByUrl('/items');
    console.log(this.isLoggedIn);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
