import { v4 as uuidv4 } from 'uuid';

class Invest {
  investId: string;
  investorUid: string;
  companyUid: string;
  investNumber: number;
  investAmount: number;

  constructor(
    investorUid: string,
    companyUid: string,
    investNumber: number,
    investAmount: number,
    investId?: string
  ) {
    this.investId = investId ?? uuidv4();
    this.investorUid = investorUid;
    this.companyUid = companyUid;
    this.investNumber = investNumber;
    this.investAmount = investAmount;
  }

  toJson() {
    return {
      investId: this.investId,
      investorUid: this.investorUid,
      companyUid: this.companyUid,
      investNumber: this.investNumber,
      investAmount: this.investAmount,
    };
  }

  static fromJson(json: { [key: string]: any }): Invest {
    return new Invest(
      json.investorUid,
      json.companyUid,
      json.investNumber,
      json.investAmount,
      json.investId
    );
  }
}

export default Invest;