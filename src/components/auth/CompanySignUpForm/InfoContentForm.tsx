import React, { useState } from "react";
import { useUser } from "../../../context/UserContext";
import { useModal } from "../../../context/popupContext";
import { useAppStatus } from "../../../context/AppStatusContext";
import { ClipLoader } from "react-spinners";
import { saveUserToDb } from "../../../services/dbService";
import YesNoSelector from "../InvestorSignUpForm/yes-no/YesNoSelector";
import { InvesmentsCategories } from "../../../utils/constant";
import Company, { CompanyDetails, RaiseDetails } from "../../../models/Company";
export const InfoContentForm: React.FC = () => {
  const { setLoading, setError } = useAppStatus();
  const { user, setUser } = useUser();
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [youtubeSite, setYoutubeSite] = useState("");
  const [country, setCountry] = useState("");
  const [registered, setRegistered] = useState(false);
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const companyDetails: CompanyDetails = {
      companyName: companyName,
      website: website,
      promoVideoLink: youtubeSite,
      country: country,
      registrarOfCompanies: registered,
      category: category,
      description: about,
      about: about,
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
    if (user != null) {
      const updatedUser = new Company(
        user.uid,
        user.name,
        user.email,
        companyDetails,
        raiseDetails,
        []
      );
      setUser(updatedUser);
      try {
        setLoading(true);
        await saveUserToDb(updatedUser);
      } catch (e) {
        setError("error saving user Info Content");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <form onSubmit={handleSubmitForm}>
      <label>Images</label>
      <label>Company name</label>
      <input
        required
        type="text"
        name="Company_name"
        value={companyName}
        onChange={(event) => setCompanyName(event.target.value)}
      />
      <label>Company's website</label>
      <input
        required
        type="text"
        name="website"
        value={website}
        onChange={(e) => {
          setWebsite(e.target.value);
        }}
      />
      <label>Youtube promotional video</label>
      <input
        required
        name="youtube_site"
        value={youtubeSite}
        onChange={(e) => setYoutubeSite(e.target.value)}
      />
      <label>Country</label>
      <select
        className="select"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option>Israel</option>
        <option>Others</option>
      </select>
      <label>Is the company registered in the Companies Registry?</label>
      <YesNoSelector setYesNo={setRegistered} />
      <label>Category</label>
      <select
        className="select"
        name="category"
        onChange={(e) => setCategory(e.target.value)}
      >
        {InvesmentsCategories.map((category) => (
          <option>{category}</option>
        ))}
      </select>
      <label>Few words about the company</label>
      <textarea
        required
        name="about"
        rows={10}
        cols={50}
        value={about}
        onChange={(e) => {
          setAbout(e.target.value);
        }}
        style={{ width: "100%", height: "80px" }}
      />
    </form>
  );
};
