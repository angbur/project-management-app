import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Register } from 'src/app/state/system/system.actions';
import { getSystemError, SystemState } from 'src/app/state/system/system.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorMessage: string | null = null;
  form: RegisterForm = {
    name: '',
    login: '',
    password: ''
  };

  constructor(
    private readonly store: Store<SystemState>,
    private router: Router
    ) {
      this.store.pipe(select(getSystemError)).subscribe(error=> this.errorMessage = error);
    }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.store.dispatch(new Register(this.form));
  }

}

interface RegisterForm {
  name: string,
  login: string,
  password: string
};
