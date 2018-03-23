export class User {

  role: string;
    constructor(
        _id: string,
        fname: string,
        lname: string,
        username: string,
        email: string,
        password: string,
        role: string = "view",
        image: string = null) {}
}