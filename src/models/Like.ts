// src/models/Like.ts
export default class Like {
  constructor(public userId: string, public companyId: string) {}

  toJson() {
    return {
      userId: this.userId,
      companyId: this.companyId,
    };
  }

  static fromJson(data: any): Like {
    return new Like(data.userId, data.companyId);
  }
}
