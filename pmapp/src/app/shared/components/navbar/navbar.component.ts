import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userName = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleLogout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  navigateToProfilePage() :void {
    this.router.navigate(['/profile']);
  }

}
