import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
})
export class LoginComponent implements OnInit {
  private authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  private onLogin(f: NgForm): void {
    const email = f.value.email;
    const password = f.value.password;

    this.authService.login({ email, password })
      .subscribe(() => this.router.navigateByUrl('/items'));
  }
}
