import { Component } from '@angular/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserListComponent {
  public editIndex = -1;

  public users: User[] = [];
  public newUser: User = {
    login: '',
    password: '',
    email: ''
  };

  addUser(): void {
    this.users.push(this.newUser);

    this.newUser = {
      login: '',
      password: '',
      email: ''
    };
  }

  editUser(index: number): void {
    this.editIndex = index;
    this.newUser = Object.assign({}, this.users[index]);
  }

  saveEditUser(index: number): void {
    this.editIndex = -1;
    this.users[index] = Object.assign({}, this.newUser);

    this.newUser = {
      login: '',
      password: '',
      email: ''
    };
  }

  deleteUser(index: number): void {
    this.users.splice(index, 1);
  }

  newUserValid(): ValidationStatus {
    if (this.newUser.login === '' ||
      this.newUser.password === '' ||
      this.newUser.email === '') return ValidationStatus.NotFilledIn;

    let patterns = {
      login: /^[A-Z]?[a-z]{3,15}$|^[a-z]{4,16}$/,
      password: /^[A-Za-z0-9-_.]{4,16}$/,
      email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/
    }

    let dataValid = patterns.login.test(this.newUser.login) &&
      patterns.password.test(this.newUser.password) &&
      patterns.email.test(this.newUser.email)

    if (!dataValid) return ValidationStatus.InvalidData;

    if (this.editIndex >= 0) {
      let loginTaken = this.users.map((user, i) => i == this.editIndex || user.login).includes(this.newUser.login);
      let emailTaken = this.users.map((user, i) => i == this.editIndex || user.email).includes(this.newUser.email);

      if (loginTaken || emailTaken) return ValidationStatus.TakenRecords;
    }
    else {
      let loginExists = this.users.map(user => user.login).includes(this.newUser.login);
      let emailExists = this.users.map(user => user.email).includes(this.newUser.email);

      if (loginExists || emailExists) return ValidationStatus.ExistentRecords;
    }

    return ValidationStatus.Valid;
  }
}

type User = {
  login: string,
  password: string,
  email: string
}

enum ValidationStatus {
  Valid = 0,
  NotFilledIn = 1,
  InvalidData = 2,
  ExistentRecords = 3,
  TakenRecords = 4
}
