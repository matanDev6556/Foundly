import React, { useEffect, useState, ChangeEvent } from "react";
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

  useEffect(() => {
    if (user instanceof Company) {
      setCompanyName(user.companyDetails.companyName || "");
      setWebsite(user.companyDetails.website || "");
      setYoutubeSite(user.companyDetails.promoVideoLink || "");
      setCountry(user.companyDetails.country || "");
      setCategory(user.companyDetails.category || "");
      setAbout(user.companyDetails.about || "");
      setRegistered(user.companyDetails.registrarOfCompanies || false);
    }
  }, [user]);

  useEffect(() => {
    setUser((prev) => {
      const company = prev as Company;

      // Only update if registered value has actually changed
      if (company.companyDetails?.registrarOfCompanies !== registered) {
        console.log("regi changed");
        return new Company(
          company.uid,
          company.name,
          company.email,
          {
            ...company.companyDetails,
            registrarOfCompanies: registered,
          },
          company.raiseDetails,
          company.uploadedDocuments
        );
      }

      return prev;
    });
  }, [registered, setUser]);

  const setAttr = (
    attrName: string,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setUser((prev) => {
      const company = prev as Company;

      // Cast the event target to the appropriate type to access the value property
      const value = e.target.value;

      // Create a new object for companyDetails
      const updatedCompanyDetails = {
        ...company.companyDetails,
        [attrName]: value,
      };

      return new Company(
        company.uid,
        company.name,
        company.email,
        updatedCompanyDetails,
        company.raiseDetails,
        company.uploadedDocuments
      );
    });
  };

  return (
    <form onSubmit={() => {}}>
      <label>Images</label>
      <label>Company name</label>
      <input
        required
        type="text"
        name="companyName"
        value={companyName}
        onChange={(event) => {
          setCompanyName(event.target.value);
          setAttr("companyName", event);
        }}
      />
      <label>Company's website</label>
      <input
        required
        type="text"
        name="website"
        value={website}
        onChange={(event) => {
          setWebsite(event.target.value);
          setAttr("website", event);
        }}
      />
      <label>Youtube promotional video</label>
      <input
        required
        name="youtubeSite"
        value={youtubeSite}
        onChange={(event) => {
          setYoutubeSite(event.target.value);
          setAttr("promoVideoLink", event);
        }}
      />
      <label>Country</label>
      <select
        className="select"
        value={country}
        onChange={(event) => {
          setCountry(event.target.value);
          setAttr("country", event);
        }}
      >
        <option value="Israel">Israel</option>
        <option value="Others">Others</option>
      </select>
      <label>Is the company registered in the Companies Registry?</label>
      <YesNoSelector setYesNo={setRegistered} />
      <label>Category</label>
      <select
        className="select"
        name="category"
        value={category}
        onChange={(event) => {
          setCategory(event.target.value);
          setAttr("category", event);
        }}
      >
        {InvesmentsCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <label>Few words about the company</label>
      <textarea
        required
        name="about"
        rows={10}
        cols={50}
        value={about}
        onChange={(event) => {
          setAbout(event.target.value);
          setAttr("about", event);
        }}
        style={{ width: "100%", height: "80px" }}
      />
    </form>
  );
};
