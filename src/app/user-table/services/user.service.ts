import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import names from '../../../assets/names.json';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject.asObservable();

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  addUser(name: string): void {
    const newUser: User = this.createUser(name);

    this.users.push(newUser)
    this.sortUsers();

    this.usersSubject.next([...this.users]);
  }

  removeUser(userId: string): void {
    const userIndex = this.users.findIndex(({ id }) => id === userId);

    this.users.splice(userIndex, 1);
    this.sortUsers();

    this.usersSubject.next([...this.users]);
  }

  integrateUsers(): void {
    const newUsers = names.map((name: string) => this.createUser(name));

    this.users = [
      ...this.users,
      ...newUsers
    ];

    this.sortUsers();

    this.usersSubject.next([...this.users]);
  }

  private createUser(name: string): User {
    return new User(name, uuidv4(), findTheSum(name));
  }

  private sortUsers(): void {
    this.users.sort((a, b) => a.name.localeCompare(b.name))

    this.users = this.users.map((user, index) => ({
      ...user,
      score: user.charSum * (index + 1)
    }));
  }
}

function findTheSum(str: string) {
  // Works properly only for the english alphabet, for other languages should be changed
  return str.toLowerCase()
    .split('')
    .reduce((acc: number, curr: string) => acc + curr.charCodeAt(0) - 96, 0)
}
