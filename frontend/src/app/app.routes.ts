import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', component: BlogsComponent},
      {path: 'blogs/new', component: AddBlogComponent},
      {path: 'blogs/:id', component: BlogComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignUpComponent}
    ]
  }
];
