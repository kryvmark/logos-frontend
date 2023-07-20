import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private _uid: number = -1;

  private _users: User[] = [
    { id: 0, userName: 'admin', email: 'admin@example.com', password: 'MickyMouse' }
  ];

  private _posts: Post[] = [
    { id: 10001, postedBy: 0, date: 1689681793410, topic: 'First post', message: 'Sign up to create your account and start using Angular Blog.' }
  ];

  constructor() { }

  login(user: string, password: string): boolean {
    if (this.checkLoginValidity(user, password)) {
      let match: number = this._users.findIndex(u => u.userName === user);
      match === -1 && (match = this._users.findIndex(u => u.email === user));

      if (match < 0) return false;
      else if (this._users[match].password !== password) return false;
      else {
        this._uid = this._users[match].id;
        return true;
      }
    }
    else return false;
  }

  logout(): void {
    this._uid = -1;
  }

  signUp(userName: string, email: string, password: string): void {
    if (this.checkSignUpValidity(userName, email, password))
      this._users.push({
        id: this.users[this.users.length - 1].id + 1,
        userName: userName,
        email: email,
        password: password
      });
  }

  createPost(topic: string, message: string): void {
    if (this.uid >= 0 && this.checkPostValidity(topic, message))
      this.posts.push({
        id: this.posts[this.posts.length - 1].id + 1,
        postedBy: this.uid,
        topic: topic,
        date: Date.now(),
        message: message
      });
  }

  readPost(id: number): Post {
    return this.posts[this.posts.findIndex(post => post.id === id)];
  }

  updatePost(id: number, topic?: string, message?: string): void {
    const index = this.posts.findIndex(post => post.id === id);
    if (this.uid == 0 || this.posts[index].postedBy == this.uid) {
      if (topic) this.posts[index].topic = topic;
      if (message) this.posts[index].message = message;
    }
  }

  deletePost(id: number): void {
    if (this.uid >= 0) {
      const index = this.posts.findIndex(post => post.id === id);
      if (this.uid == 0 || this.posts[index].postedBy == this.uid) this.posts.splice(index, 1);
    }
  }

  checkLoginValidity(user: string, password: string): boolean | null {
    const userRegExp = /^[\w\d]{4,16}|(\w)@(\w+){2,}\.(\w+){2,}$/;
    const passwordRegExp = /^.{8,16}$/;
    return user !== '' || password !== ''
      ? userRegExp.test(user) && passwordRegExp.test(password)
      : null;
  }

  checkSignUpValidity(userName: string, email: string, password: string): boolean | null {
    const userNameRegExp = /^[\w\d]{4,16}$/;
    const emailRegExp = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegExp = /^.{8,16}$/;
    return (userName !== '' || password !== '')
      && (userNameRegExp.test(userName)
        && emailRegExp.test(email)
        && passwordRegExp.test(password))
      ? this._users.findIndex(u => u.userName === userName) < 0 && this._users.findIndex(u => u.email === email) < 0
      : null;
  }

  checkPostValidity(topic: string, message: string): boolean | null {
    return (message !== '' && topic !== '') ? true : null;
  }

  get uid(): number { return this._uid; }

  get users(): UserProfile[] {
    let userProfiles: UserProfile[] = [];

    for (const profile of this._users) {
      userProfiles.push({
        id: profile.id,
        userName: profile.userName
      });
    }

    return userProfiles;
  }
  get posts(): Post[] { return this._posts; }
}

export type User = {
  id: number,
  userName: string,
  email: string,
  password: string
}

export type UserProfile = {
  id: number,
  userName: string
}

export type Post = {
  id: number,
  postedBy: number,
  topic: string,
  date: number,
  message: string
}