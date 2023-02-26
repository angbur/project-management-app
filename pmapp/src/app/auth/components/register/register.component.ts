import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthError } from 'state';
import { register } from 'state/system/system.actions';
import { SystemState } from 'state/system/system.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  errorMessage: Observable<string | null>;
  form: RegisterForm = {
    name: '',
    login: '',
    password: '',
  };

  constructor(private readonly store: Store<SystemState>) {
    this.errorMessage = this.store.pipe(select(getAuthError));
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
