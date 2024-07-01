// src/models/Investor.ts

import User, { UserType } from './User';

export default class Investor extends User {
  constructor(
    name: string,
    email: string,
    password: string,
    public preferences: {
      categories: string[];
      investmentRange: string;
      preferenceCountry: string;
      investInPublicCompanies: boolean;
    }
  ) {
    super(name, email, password, 'Investor');
  }
}
