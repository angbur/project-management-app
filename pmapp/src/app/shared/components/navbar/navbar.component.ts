import { Logout } from './../../../state/system/system.actions';
import { selectLoginStatus } from './../../../state/index';
import { select, Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SystemState } from 'src/app/state/system/system.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  userName = '';

  constructor(private router: Router, private readonly store: Store<SystemState>) {
    this.store.pipe(select(selectLoginStatus)).subscribe((status => this.isLoggedIn = status));
  }

  handleLogout(): void {
    this.store.dispatch(new Logout);
    this.router.navigate(['/']);
  }

  navigateToProfilePage(): void {
    this.router.navigate(['/profile']);
  }

}
