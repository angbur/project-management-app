import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, SpinnerComponent],
  imports: [CommonModule, MatToolbarModule, RouterModule, MatProgressSpinnerModule],
  exports: [NavbarComponent, FooterComponent, SpinnerComponent],
})
export class SharedModule {}
