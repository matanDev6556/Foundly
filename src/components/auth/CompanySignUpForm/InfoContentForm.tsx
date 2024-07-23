import React, { useEffect, useState } from 'react';
import { useAppStatus } from '../../../context/AppStatusContext';
import YesNoSelector from '../InvestorSignUpForm/yes-no/YesNoSelector';
import { InvesmentsCategories } from '../../../utils/constant';
import Company from '../../../models/Company';

interface InfoContentFormProps {
  user: Company;
  updateUser: (updatedUser: Company) => void;
}

export const InfoContentForm: React.FC<InfoContentFormProps> = ({
  user,
  updateUser,
}) => {
  const { setLoading, setError } = useAppStatus();
  const [companyName, setCompanyName] = useState(
    user.companyDetails.companyName || ''
  );
  const [website, setWebsite] = useState(user.companyDetails.website || '');
  const [youtubeSite, setYoutubeSite] = useState(
    user.companyDetails.promoVideoLink || ''
  );
  const [country, setCountry] = useState(user.companyDetails.country || '');
  const [registered, setRegistered] = useState(
    user.companyDetails.registrarOfCompanies || false
  );
  const [category, setCategory] = useState(user.companyDetails.category || '');
  const [about, setAbout] = useState(user.companyDetails.about || '');

  useEffect(() => {
    setCompanyName(user.companyDetails.companyName || '');
    setWebsite(user.companyDetails.website || '');
    setYoutubeSite(user.companyDetails.promoVideoLink || '');
    setCountry(user.companyDetails.country || '');
    setCategory(user.companyDetails.category || '');
    setAbout(user.companyDetails.about || '');
    setRegistered(user.companyDetails.registrarOfCompanies || false);
  }, [user]);

  useEffect(() => {
    const updatedUser = new Company(
      user.uid,
      user.name,
      user.email,
      {
        ...user.companyDetails,
        registrarOfCompanies: registered,
      },
      user.raiseDetails,
      user.uploadedDocuments
    );
    updateUser(updatedUser);
  }, [registered]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const setAttr = (attrName: string, value: string) => {
    const updatedUser = new Company(
      user.uid,
      user.name,
      user.email,
      {
        ...user.companyDetails,
        [attrName]: value,
      },
      user.raiseDetails,
      user.uploadedDocuments
    );
    updateUser(updatedUser);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>Company name</label>
      <input
        required
        type="text"
        name="companyName"
        value={companyName}
        onChange={(event) => {
          setCompanyName(event.target.value);
          setAttr('companyName', event.target.value);
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
          setAttr('website', event.target.value);
        }}
      />
      <label>Youtube promotional video</label>
      <input
        required
        name="youtubeSite"
        value={youtubeSite}
        onChange={(event) => {
          setYoutubeSite(event.target.value);
          setAttr('promoVideoLink', event.target.value);
        }}
      />
      <label>Country</label>
      <select
        className="select"
        value={country}
        onChange={(event) => {
          setCountry(event.target.value);
          setAttr('country', event.target.value);
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
          setAttr('category', event.target.value);
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
          setAttr('about', event.target.value);
        }}
        style={{ width: '100%', height: '80px' }}
      />
    </form>
  );
};
