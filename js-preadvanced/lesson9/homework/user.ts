let count: number = 1

export class User {
    private _id: number
    private _login: string
    private _password: string
    private _email: string

    constructor(login: string, password: string, email: string, id: number = 0) {
        this.login = login
        this.password = password
        this.email = email
        this.id = id
    }

    get login(): string { return this._login }
    set login(value: string) {
        this._login = value.match(/[A-Z]?[a-z]{3,15}|[a-z]{4,16}/)?.length
            ? this._login = value
            : this._login = 'u' + (count++).toString().padStart(3, '0')
    }

    get id(): number { return this._id }
    set id(value: number) {
        this._id = value >= 0 ? Math.ceil(value) : 0
    }

    get password(): string { return this._password }
    set password(value: string) {
        this._password = value.match(/[A-Za-z0-9-_.]{4,16}/)?.length
            ? this._password = value
            : this._password = 'password'
    }

    get email(): string { return this._email }
    set email(value: string) {
        this._email = value.match(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+/)?.length
            ? this._email = value
            : this._email = `email${count}@example.com`
    }
}