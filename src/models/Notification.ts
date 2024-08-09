import { Timestamp, FirestoreDataConverter } from 'firebase/firestore';

class Notification {
  constructor(
    public userId: string,
    public subject: string,
    public description: string,
    public createdAt: Timestamp = Timestamp.now()
  ) {}

  toJson(): object {
    return {
      userId: this.userId,
      subject: this.subject,
      description: this.description,
      createdAt: this.createdAt, // Firestore can directly store Timestamp objects
    };
  }

  static fromJson(json: any): Notification {
    return new Notification(
      json.userId,
      json.subject,
      json.description,
      json.createdAt instanceof Timestamp ? json.createdAt : Timestamp.now()
    );
  }
}

export default Notification;
