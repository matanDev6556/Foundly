// src/services/dbService.ts
import { db } from '../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Admin from '../models/Admin';
import Company from '../models/Company';
import Investor from '../models/Investor';
import User from '../models/User';
import { UserType } from '../utils/enums';


export const saveUserToDb = async (user: User) => {
  try {
    await setDoc(doc(db, 'users', user.uid), user.toJSON());
    console.log('User data saved successfully');
  } catch (error) {
    console.error('Error saving user data: ', error);
    throw error;
  }
};

export const fetchUserFromDb = async (uid: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const { userType, name, email } = userData;

      switch (userType) {
        case UserType.Investor:
          return Investor.fromJSON(userData);
        case UserType.Company:
          return Company.fromJSON(userData);
        case UserType.Admin:
          return new Admin(uid, name, email, userType);
        default:
          return new User(uid, name, email, userType);
      }
    }
  } catch (error) {
    console.error('Error fetch user feom db: ', error);
    throw error;
  }

  return null;
};
