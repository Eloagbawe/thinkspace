import { Component } from '@angular/core';
import { SidebarComponent } from '../../partials/sidebar/sidebar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.scss'
})
export class AddBlogComponent {

}
