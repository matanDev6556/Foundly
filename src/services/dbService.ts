// src/services/dbService.ts
import { db } from '../firebaseConfig';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore';
import Admin from '../models/Admin';
import Company from '../models/Company';
import Investor from '../models/Investor';
import User from '../models/User';
import { UserType } from '../utils/enums';
import Like from '../models/Like';
import { handleFirebaseError } from './FirebaseErrorService';
import { FirebaseError } from 'firebase/app';

// user
export const saveUserToDb = async (user: User) => {
  try {
    console.log('SaveUserToDb');
    await setDoc(doc(db, 'users', user.uid), user.userToJSON());
    console.log('User data saved successfully');
  } catch (error) {
    console.error('Error saving user data: ', error);
    handleFirebaseError(error as FirebaseError);
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
    handleFirebaseError(error as FirebaseError);
  }

  return null;
};

// investor likes
export const saveLikeToDb = async (like: Like) => {
  try {
    await setDoc(
      doc(db, 'likes', `${like.userId}_${like.companyId}`),
      like.toJson()
    );
    console.log('Like saved successfully');
  } catch (error: any) {
    console.error('Error fetch user feom db: ', error);
    handleFirebaseError(error as FirebaseError);
    throw error;
  }
};

export const deleteLike = async (userId: string, companyId: string) => {
  try {
    await deleteDoc(doc(db, 'likes', `${userId}_${companyId}`));
    console.log('Like deleted successfully');
  } catch (error: any) {
    console.error('Error fetch user feom db: ', error);
    handleFirebaseError(error as FirebaseError);
    throw error;
  }
};

export const fetchLikesForUser = async (userId: string): Promise<Like[]> => {
  try {
    const likesQuery = query(
      collection(db, 'likes'),
      where('userId', '==', userId)
    );
    const likeDocs = await getDocs(likesQuery);
    return likeDocs.docs.map((doc) => Like.fromJson(doc.data()));
  } catch (error: any) {
    console.error('Error fetch user feom db: ', error);
    handleFirebaseError(error as FirebaseError);
    throw error;
  }
};
