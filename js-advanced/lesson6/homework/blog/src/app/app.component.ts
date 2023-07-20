import { Component } from '@angular/core';
import { BlogService, Post, UserProfile } from './blog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog';

  protected modalName!: ModalName;
  protected modalStatus: boolean | null = false;
  protected modalNames = ModalName;
  protected shadow: number = window.scrollY;

  protected loginError = false;

  public uid: number = this.blog.uid;
  public users: UserProfile[] = this.blog.users;
  public posts: Post[] = this.blog.posts;

  protected login: { user: string, password: string } = { user: '', password: '' };
  protected signUp: { userName: string, email: string, password: string } = { userName: '', email: '', password: '' };
  protected post: { topic: string, message: string } = { topic: '', message: '' };
  protected postId = -1;

  constructor(private blog: BlogService) { }

  modal(name: ModalName): void {
    if (this.modalStatus) {
      this.modalStatus = null;
      setTimeout(() => {
        this.modalStatus = false;
        this.loginError = false;

        switch (this.modalName) {
          case ModalName.Login:
            this.login.user = '';
            this.login.password = '';
            break;
          case ModalName.SignUp:
            this.signUp.userName = '';
            this.signUp.email = '';
            this.signUp.password = '';
            break;
          case ModalName.Post:
            this.post.topic = '';
            this.post.message = '';
            this.postId = -1;
            break;
        }
      }, 250);
    }
    else {
      this.modalStatus = true;
      this.modalName = name;
    }
  }

  checkForm(): boolean | null {
    switch (this.modalName) {
      case ModalName.Login:
        return this.blog.checkLoginValidity(this.login.user, this.login.password);
      case ModalName.SignUp:
        return this.blog.checkSignUpValidity(this.signUp.userName, this.signUp.email, this.signUp.password);
      case ModalName.Post:
        return this.blog.checkPostValidity(this.post.topic, this.post.message);
    }
  }

  userFromId(id: number): string {
    return this.users.find(user => user.id == id)?.userName ?? '<anonymous>';
  }

  signIn(): void {
    if (this.blog.login(this.login.user, this.login.password)) {
      this.uid = this.blog.uid;
      this.modal(this.modalName);
    }
    else this.loginError = true;
  }

  signOut(): void {
    this.blog.logout();
    this.uid = this.blog.uid;
  }

  newUser(): void {
    this.blog.signUp(this.signUp.userName, this.signUp.email, this.signUp.password);
    this.users = this.blog.users;
    
    this.login.user = this.signUp.userName;
    this.login.password = this.signUp.password;
    this.signIn();
    this.login.user = '';
    this.login.password = '';
  }

  createPost(): void {
    this.blog.createPost(this.post.topic, this.post.message);
    this.modal(this.modalName);
  }

  readPost(id: number): void {
    this.modal(ModalName.Post);
    this.postId = id;
    this.post.topic = this.blog.readPost(id).topic;
    this.post.message = this.blog.readPost(id).message;
  }

  updatePost(): void {
    this.blog.updatePost(this.postId, this.post.topic, this.post.message);
    this.modal(this.modalName);
    this.postId = -1;
  }

  deletePost(id: number): void {
    this.blog.deletePost(id);
  }
}

enum ModalName {
  Login = 'login',
  SignUp = 'signUp',
  Post = 'post'
}