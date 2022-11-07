import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { register } from 'src/app/state/system/system.actions';
import { getSystemError, SystemState } from 'src/app/state/system/system.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  errorMessage: Observable<Error | null>;
  form: RegisterForm = {
    name: '',
    login: '',
    password: '',
  };

  constructor(private readonly store: Store<SystemState>) {
    this.errorMessage = this.store.pipe(select(getSystemError));
  };

  onSubmit(): void {
    this.store.dispatch(register({ data: this.form }));
  };
};

interface RegisterForm {
  name: string;
  login: string;
  password: string;
};
