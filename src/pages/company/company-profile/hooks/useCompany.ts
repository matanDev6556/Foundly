import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCompanyList } from '../../../../context/CompanyListContext';
import Company from '../../../../models/Company';


export const useCompany = (companyId: string | undefined) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const { companies } = useCompanyList();

  useEffect(() => {
    const getCompany = () => {
      setIsLoading(true);
      setError(null);

      if (location.state?.company) {
        setCompany(Company.fromJson(location.state.company));
      } else if (companyId) {
        const foundCompany = companies.find((c) => c.uid === companyId);
        if (foundCompany) {
          setCompany(Company.fromJson(foundCompany));
        } else {
          setError('החברה לא נמצאה');
        }
      } else {
        setError('מזהה החברה חסר');
      }

      setIsLoading(false);
    };

    getCompany();
  }, [companyId, location.state, companies]);

  return { company, isLoading, error };
};