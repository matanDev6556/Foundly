// src/models/Company.ts

import User, { UserType } from './User';

export default class Company extends User {
  constructor(
    name: string,
    email: string,
    password: string,
    public companyDetails: {
      companyName: string;
      website: string;
      promoVideoLink: string;
      country: string;
      registrarOfCompanies: boolean;
      category: string;
      description: string;
    },
    public raiseDetails: {
      raisedAmount: number;
      targetAmount: number;
      deadline: string;
      minInvestment: number;
      raisePurpose: string[];
    },
    public uploadedDocuments: string[] = [] // שדה חדש לשמירת נתיב המסמכים
  ) {
    super(name, email, password, 'Company');
  }
}
