import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { register } from 'src/app/state/system/system.actions';
import { getSystemError, SystemState } from 'src/app/state/system/system.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  errorMessage: Error | null = null;
  form: RegisterForm = {
    name: '',
    login: '',
    password: '',
  };

  constructor(private readonly store: Store<SystemState>, private router: Router) {
    this.store.pipe(select(getSystemError)).subscribe(error => (this.errorMessage = error));
  }

  onSubmit(): void {
    this.store.dispatch(register({ data: this.form }));
  }
}

interface RegisterForm {
  name: string;
  login: string;
  password: string;
}
