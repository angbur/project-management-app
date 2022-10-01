import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { FirstSectionComponent } from './components/first-section/first-section.component';
import { SecondSectionComponent } from './components/second-section/second-section.component';
import { DeveloperSectionComponent } from './components/developer-section/developer-section.component';
import { ThirdSectionComponent } from './components/third-section/third-section.component';


@NgModule({
  declarations: [
    HomePageComponent,
    HeroSectionComponent,
    FirstSectionComponent,
    SecondSectionComponent,
    DeveloperSectionComponent,
    ThirdSectionComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule { }
