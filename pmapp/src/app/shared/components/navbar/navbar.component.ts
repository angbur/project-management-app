import { logout } from 'src/app/state/system/system.actions';
import { selectLoginStatus, selectUserLogin } from 'src/app/state/index';
import { select, Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SystemState } from 'src/app/state/system/system.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoggedIn$: Observable<boolean>;
  userName$: Observable<string | null>;

  constructor(private router: Router, private readonly store: Store<SystemState>) {
    this.userName$ = this.store.pipe(select(selectUserLogin));
    this.isLoggedIn$ = this.store.pipe(select(selectLoginStatus));
  }

  handleLogout(): void {
    this.store.dispatch(logout());
  }

  navigateToProfilePage(): void {
    this.router.navigate(['/profile']);
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
