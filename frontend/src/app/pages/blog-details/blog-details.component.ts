import { Component } from '@angular/core';
import { BlogComponent } from '../../components/blog/blog.component';
import { SidebarComponent } from '../../partials/sidebar/sidebar.component';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [BlogComponent, SidebarComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent {

}
