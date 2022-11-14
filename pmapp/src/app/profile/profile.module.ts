import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ProfileModalComponent } from './components/profile-modal/profile-modal.component';

@NgModule({
  declarations: [ProfileComponent, ProfileCardComponent, ProfileModalComponent],
  imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
