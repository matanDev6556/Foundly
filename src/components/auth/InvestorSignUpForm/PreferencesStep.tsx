// src/components/PreferencesStep.tsx
import React, { useState } from "react";
import CategorySelector from "./categorySelector/CategorySelector";
import YesNoSelector from "./yes-no/YesNoSelector";
import Investor from "../../../models/Investor";
import { InvesmentsCategories } from "../../../utils/constant";
import InvestmentRangeSelector from "./investRange/InvestSlector";
import { useUser } from "../../../context/UserContext";
import { useModal } from "../../../context/popupContext";
import { useAppStatus } from "../../../context/AppStatusContext";
import { ClipLoader } from "react-spinners";
import { saveUserToDb } from "../../../services/dbService";

interface PreferencesStepProps {
  isEditing?: boolean;
}

const PreferencesStep: React.FC<PreferencesStepProps> = ({
  isEditing = false,
}) => {
  const { user, setUser } = useUser();
  const { closeModal } = useModal();
  const { loading, setLoading, error, setError } = useAppStatus();

  const [categories, setCategories] = useState<string[]>([]);
  const [investmentRange, setInvestmentRange] = useState<string>("0-100k");
  const [preferenceCountry, setPreferenceCountry] = useState<string>("Israel");
  const [investInPublicCompanies, setInvestInPublicCompanies] =
    useState<boolean>(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user?.userType === "Investor") {
      const updatedUser = new Investor(user.uid, user.name, user.email, {
        categories,
        investmentRange,
        preferenceCountry,
        investInPublicCompanies,
      });

      try {
        setLoading(true);
        await saveUserToDb(updatedUser);
        setUser(updatedUser);
        closeModal();
      } catch (error) {
        setError("Error saving user preferences");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label data-testid="check1">Choose Categories</label>
      <CategorySelector
        list={InvesmentsCategories}
        setCategories={setCategories}
        initialCategories={categories}
      />
      <label>Investment range</label>
      <InvestmentRangeSelector
        setInvestmentRange={setInvestmentRange}
        initialRange={investmentRange}
      />
      <label>Country of companies</label>
      <select
        className="select"
        value={preferenceCountry}
        onChange={(e) => setPreferenceCountry(e.target.value)}
      >
        <option value="Israel">Israel</option>
        <option value="Other">Other</option>
      </select>
      <label>Investing in already public companies?</label>
      <YesNoSelector
        setYesNo={setInvestInPublicCompanies}
        initialValue={investInPublicCompanies}
      />
      {loading ? (
        <ClipLoader color="#39958c" loading={loading} size={50} />
      ) : (
        <button type="submit">
          {isEditing ? "Save Changes" : "Let's Start!"}
        </button>
      )}
    </form>
  );
};

export default PreferencesStep;
