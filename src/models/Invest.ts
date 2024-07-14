class Invest {
  investorUid: string;
  companyUid: string;
  investNumber: number;
  investAmount: number;
  constructor(
    investorUid: string,
    companyUid: string,
    stockNumber: number,
    investAmount: number
  ) {
    this.investorUid = investorUid;
    this.companyUid = companyUid;
    this.investNumber = stockNumber;
    this.investAmount = investAmount;
  }
}

export default Invest;
