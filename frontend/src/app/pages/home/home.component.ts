import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { BlogsComponent } from '../../components/blogs/blogs.component';
import { SidebarComponent } from '../../partials/sidebar/sidebar.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlogsComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private blogService = inject(BlogService)

  constructor() {
    // this.blogService.getBlogs().subscribe((res: any) => {
    //   console.log(res)
    // })
  }

}
