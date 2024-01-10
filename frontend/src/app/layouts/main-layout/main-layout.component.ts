import { Component } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../../partials/nav/nav.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, RouterModule, NavComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
