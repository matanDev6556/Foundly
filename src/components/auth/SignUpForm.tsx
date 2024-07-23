// src/components/SignUpForm.tsx
import React, { useState, useEffect } from "react";
import User, { UserType } from "../../models/User";
import { useUser } from "../../context/UserContext";
import { registerUser } from "../../services/authService";
import ClipLoader from "react-spinners/ClipLoader";
import { useAppStatus } from "../../context/AppStatusContext";
import { handleFirebaseError } from "../../services/FirebaseErrorService";
import { FirebaseError } from "firebase/app";
import Company, { CompanyDetails, RaiseDetails } from "../../models/Company";

interface SignUpFormProps {
  userType: UserType;
  moveStep: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ userType, moveStep }) => {
  const { setUser } = useUser();
  const { loading, setLoading, error, setError } = useAppStatus();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (userType == "Company") {
      console.log(userType);
      const companyDetails: CompanyDetails = {
        companyName: "",
        website: "",
        promoVideoLink: "",
        country: "",
        registrarOfCompanies: false,
        category: "",
        description: "",
        about: "",
        image: "",
        logo: "",
      };
      const raiseDetails: RaiseDetails = {
        targetAmount: 0,
        deadline: "",
        minInvestment: 0,
        raisePurpose: [],
        raisedAmount: 0,
      };

      const updatedUser = new Company(
        "",
        "",
        "",
        companyDetails,
        raiseDetails,
        []
      );
      setUser(updatedUser);
    }
  }, [userType]);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      // register user and get his credentinal
      const userCredential = await registerUser(email, password, name);
      //take the uid that firebase create for the user
      const { uid } = userCredential.user;
      // and asign the uuid in the new user
      const newUser = new User(uid, name, email, userType);
      //set user locall
      setUser(newUser);

      setLoading(false);
      ////move to step 2
      moveStep();
    } catch (error: any) {
      setError(handleFirebaseError(error as FirebaseError));
      console.error("Error signing up: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>{userType} Name</label>
      <input
        required
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Email</label>
      <input
        required
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        required
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {loading ? (
        <ClipLoader color="#39958c" loading={loading} size={50} />
      ) : (
        <button type="submit">Sign Up</button>
      )}
    </form>
  );
};

export default SignUpForm;
