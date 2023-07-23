import { Component, OnInit } from '@angular/core';
import { BlogService, Post } from '../blog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {
  public posts: Post[] = [];
  public newPost: Post = {
    id: 0,
    title: '',
    text: '',
    author: ''
  };

  protected editing = false;

  constructor(
    private blog: BlogService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.blog.readAll().subscribe(data => {
      this.posts = data;
      this.newPost.id = this.posts[this.posts.length - 1]?.id + 1 ?? 0;
    });
  }

  createPost(): void {
    this.blog.create(this.newPost).subscribe(() => {
      this.resetForm();
      this.getPosts();
    });
  }

  readPost(id: number): void {
    this.editing = true;
    this.newPost = Object.assign({}, this.posts.find(post => post.id === id));
  }

  updatePost(): void {
    this.blog.update(this.newPost).subscribe(() => {
      this.editing = false;
      this.resetForm();
      this.getPosts();
    });
  }

  deletePost(id: number): void {
    this.blog.delete(id).subscribe(() => {
      this.getPosts();
    })
  }

  protected resetForm(): void {
    this.newPost.title = '';
    this.newPost.text = '';
    this.newPost.author = '';
  }
}
