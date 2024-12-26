import { Component } from '@angular/core';
import { AboutComponent } from '@components/about/about.component';
import HomeComponent from '@components/home/home.component';
import { RecomendationsComponent } from '@components/recomendations/recomendations.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [HomeComponent, RecomendationsComponent, AboutComponent],
  template: `
    <app-home/>
    <app-about/>
    <app-recomendations/>
  `
})
export default class ContentComponent {

}
