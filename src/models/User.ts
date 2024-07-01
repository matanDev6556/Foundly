// src/models/User.ts

export type UserType = 'Investor' | 'Company' | 'Admin';

export default class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public userType: UserType
  ) {}
}
