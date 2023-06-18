let count = 1;
export class User {
    _id;
    _login;
    _password;
    _email;
    constructor(login, password, email, id = 0) {
        this.login = login;
        this.password = password;
        this.email = email;
        this.id = id;
    }
    get login() { return this._login; }
    set login(value) {
        this._login = value.match(/[A-Z]?[a-z]{3,15}|[a-z]{4,16}/)?.length
            ? this._login = value
            : this._login = 'u' + (count++).toString().padStart(3, '0');
    }
    get id() { return this._id; }
    set id(value) {
        this._id = value >= 0 ? Math.ceil(value) : 0;
    }
    get password() { return this._password; }
    set password(value) {
        this._password = value.match(/[A-Za-z0-9-_.]{4,16}/)?.length
            ? this._password = value
            : this._password = 'password';
    }
    get email() { return this._email; }
    set email(value) {
        this._email = value.match(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+/)?.length
            ? this._email = value
            : this._email = `email${count}@example.com`;
    }
}
