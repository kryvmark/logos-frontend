import { Component, OnInit } from '@angular/core';
import { BlogService, Post } from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public posts: Post[] = [];

  constructor(
    private blog: BlogService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.blog.readAll().subscribe(data => {
      this.posts = data;
    });
  }
}
