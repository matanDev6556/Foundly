// src/components/PreferencesStep.tsx
import React, { useState } from 'react';
import CategorySelector from './categorySelector/CategorySelector';
import YesNoSelector from './yes-no/YesNoSelector';
import Investor from '../../../models/Investor';
import { InvesmentsCategories } from '../../../utils/constant';
import InvestmentRangeSelector from './investRange/InvestSlector';
import { useUser } from '../../../context/UserContext';
import { useModal } from '../../../context/popupContext';
import { useAppStatus } from '../../../context/AppStatusContext';
import { ClipLoader } from 'react-spinners';
import { saveUserToDb } from '../../../services/dbService';

const PreferencesStep: React.FC = () => {
  const { user, setUser } = useUser();
  //control the popup vissability
  const { closeModal } = useModal();
  const { loading, setLoading, error, setError } = useAppStatus();

  // set data from form
  const [categories, setCategories] = useState<string[]>([]);
  const [investmentRange, setInvestmentRange] = useState<string>('0-100k');
  const [preferenceCountry, setPreferenceCountry] = useState<string>('Israel');
  const [investInPublicCompanies, setInvestInPublicCompanies] =
    useState<boolean>(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(user);
    event.preventDefault();
    if (user?.userType === 'Investor') {
      const updatedUser = new Investor(user.uid, user.name, user.email, {
        categories,
        investmentRange,
        preferenceCountry,
        investInPublicCompanies,
      });

      //save the user to db
      try {
        setLoading(true);
        await saveUserToDb(updatedUser);
        //set user localy
        setUser(updatedUser);
        closeModal();
      } catch (error) {
        setError('Error saving user preferences');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>Choose Categories</label>
      <CategorySelector
        list={InvesmentsCategories}
        setCategories={setCategories}
      />
      <label>Investment range</label>
      <InvestmentRangeSelector setInvestmentRange={setInvestmentRange} />
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
      <YesNoSelector setYesNo={setInvestInPublicCompanies} />
      {loading ? (
        <ClipLoader color="#39958c" loading={loading} size={50} />
      ) : (
        <button type="submit">Let's Start!</button>
      )}
    </form>
  );
};

export default PreferencesStep;
