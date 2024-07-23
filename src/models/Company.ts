import User from './User';

export interface CompanyDetails {
  companyName: string;
  website: string;
  promoVideoLink: string;
  country: string;
  registrarOfCompanies: boolean;
  category: string;
  description: string;
  about: string;
  image: string;
  logo: string;
}

export interface RaiseDetails {
  targetAmount: number;
  deadline: string;
  minInvestment: number;
  raisePurpose: string[];
  raisedAmount: number; // סכום הכסף שכבר הושקע
}

export default class Company extends User {
  public companyDetails: CompanyDetails;
  public raiseDetails: RaiseDetails;
  public uploadedDocuments: string[];

  constructor(
    uid: string = '',
    name: string = '',
    email: string = '',
    companyDetails: CompanyDetails = {
      companyName: '',
      website: '',
      promoVideoLink: '',
      country: '',
      registrarOfCompanies: false,
      category: '',
      description: '',
      about: '',
      image: '',
      logo: '',
    },
    raiseDetails: RaiseDetails = {
      targetAmount: 0,
      deadline: '',
      minInvestment: 0,
      raisePurpose: [],
      raisedAmount: 0,
    },
    uploadedDocuments: string[] = []
  ) {
    super(uid, name, email, 'Company');
    this.companyDetails = companyDetails;
    this.raiseDetails = raiseDetails;
    this.uploadedDocuments = uploadedDocuments;
  }

  static fromJSON(json: any): Company {
    return new Company(
      json.uid,
      json.name,
      json.email,
      json.companyDetails,
      json.raiseDetails,
      json.uploadedDocuments
    );
  }

  toJSON() {
    return {
      uid: this.uid,
      name: this.name,
      email: this.email,
      userType: this.userType,
      companyDetails: this.companyDetails,
      raiseDetails: this.raiseDetails,
      uploadedDocuments: this.uploadedDocuments,
    };
  }

  calculateProgress(): number {
    const progress =
      (this.raiseDetails.raisedAmount / this.raiseDetails.targetAmount) * 100;
    return parseFloat(progress.toFixed(0));
  }
}
