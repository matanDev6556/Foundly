// src/models/Admin.ts

import User, { UserType } from './User';

export default class Admin extends User {
  constructor(name: string, email: string, password: string) {
    super(name, email, password, 'Admin');
  }
}
