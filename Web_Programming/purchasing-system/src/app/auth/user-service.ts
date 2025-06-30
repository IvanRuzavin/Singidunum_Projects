import { Injectable } from "@angular/core";

export interface User {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    preferences: string[];
    password: string;
    date: Date;
}

@Injectable()
export class UserService {

    static dummyUserList: Array<User> = [
        {
            id: 1,
            fullName: "Guest",
            email: "guest@mail.com",
            phone: "Guest",
            address: "Guest",
            preferences: [],
            password: "guest",
            date: new Date("2025-06-29")
        }
    ];

    currentUser: User = UserService.dummyUserList[0];

    getUserName(user: User): string {
        return user.email;
    }

    getUserById(id: number): User {

        var foundUser!: User;
        UserService.dummyUserList.forEach(user => {
            if (user.id == id) {
                foundUser = user;
            }
        });

        this.currentUser = foundUser;

        return foundUser;
    }

    getUser(userEmail: string): User {
        this.currentUser = UserService.dummyUserList.find(userToFind => userToFind.email == userEmail)!;
        return this.currentUser;
    }

    isPasswordCorrect(userEmail: string, password: string): boolean{
        return UserService.dummyUserList.find(userToFind => (userToFind.email == userEmail && userToFind.password == password)) != undefined;
    }

    registerUser(fullName: string, email: string, phone: string, address: string, preferences: string[], password: string, date: Date): User {
        var maxId: number = 0;

        UserService.dummyUserList.forEach(user => {
            if (maxId < user.id) {
                maxId = user.id;
            }
        })

        var id = ++maxId;
        var user: User = {id, fullName, email, phone, address, preferences, password, date};

        UserService.dummyUserList.push(user);

        this.currentUser = user;
        console.log(user);
        return(user);
    }
}