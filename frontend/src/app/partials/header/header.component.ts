import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavComponent, ProfileComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  display: boolean = false;

  openModal = () => {
    this.display = true;
  }

  closeModal = () => {
    this.display = false;
  }

}
