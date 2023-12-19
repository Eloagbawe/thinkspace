import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../partials/header/header.component';
import { BlogService } from '../../services/blog/blog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private blogService = inject(BlogService)

  constructor() {
    this.blogService.getBlogs().subscribe((res: any) => {
      console.log(res)
    })
  }

}
