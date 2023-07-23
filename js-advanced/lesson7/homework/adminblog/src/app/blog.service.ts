import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private url = environment.BACKEND_URL;
  private api = {
    posts: `${this.url}/posts`
  }

  constructor(
    private http: HttpClient
  ) { }

  readAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.api.posts);
  }

  create(newPost: Post): Observable<void> {
    return this.http.post<void>(this.api.posts, newPost);
  }

  update(newPost: Post): Observable<void> {
    return this.http.patch<void>(`${this.api.posts}/${newPost.id}`, newPost);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.posts}/${id}`);
  }
}

export type Post = {
  id: number,
  title: string,
  text: string,
  author: string
}