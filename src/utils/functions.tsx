import { differenceInDays } from "date-fns";
import { Timestamp } from "firebase/firestore";

export const formatTargetAmount = (amount: number): string => {
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(0) + "M";
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(0) + "K";
  } else {
    return amount.toString();
  }
};

export const calculateRemainingDays = (date: Timestamp): number => {
  const now = new Date();
  const toDate = date.toDate();
  return Math.max(0, differenceInDays(toDate, now));
};

export const formatRemainingTime = (
  days: number
): { value: string; unit: string } => {
  if (days >= 365) {
    const years = Math.floor(days / 365);
    return { value: years.toString(), unit: years === 1 ? "שנה" : "שנים" };
  } else if (days >= 30) {
    const months = Math.floor(days / 30);
    return {
      value: months.toString(),
      unit: months === 1 ? "חודש" : "חודשים",
    };
  } else {
    return { value: days.toString(), unit: days === 1 ? "יום" : "ימים" };
  }
};
export const extractFileName = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filenameWithEncodedChars = pathname.substring(
      pathname.lastIndexOf("/") + 1
    );
    const filename = decodeURIComponent(filenameWithEncodedChars);
    const segments = filename.split("?")[0].split("/");
    return segments[segments.length - 1]; // Remove any query parameters if present
  } catch (error) {
    console.error("Invalid URL:", error);
    return "Unknown";
  }
};
