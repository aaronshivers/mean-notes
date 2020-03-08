import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private authSubscription: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  private onLogin(): void {
    this.authService.login()
  }
}
