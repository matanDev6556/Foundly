import React, { ChangeEvent, useState, useEffect } from 'react';
import { useUser } from '../../../context/UserContext';
import { useAppStatus } from '../../../context/AppStatusContext';
import { RaisePurpose } from '../../../utils/constant';
import Company, { CompanyDetails, RaiseDetails } from '../../../models/Company';
import Slider from '@mui/material/Slider';
import { format } from 'date-fns';
import ListSelector from '../../cummon/list-selector/ListSelector';

export const RaiseContentForm: React.FC = () => {
  const { setLoading, setError } = useAppStatus();
  const { user, setUser } = useUser();
  const [raisedAmount, setRaisedAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(1000);
  const [deadLine, setDeadline] = useState(new Date());
  const [minInvestment, setMinInvestment] = useState(1000);
  const [raisePurpose, setRaisePurpose] = useState<string[]>([]);

  // useEffect(() => {
  //   if (user instanceof Company) {
  //     setMoneyRaised(user.raiseDetails.raisedAmount || 0);
  //     setTargetAmount(user.raiseDetails.targetAmount || 0);
  //     setDeadline(user.raiseDetails.deadline);
  //     setCountry(user.companyDetails.country || "");
  //     setCategory(user.companyDetails.category || "");
  //     setAbout(user.companyDetails.about || "");
  //     setRegistered(user.companyDetails.registrarOfCompanies || false);
  //   }
  // }, [user]);

  useEffect(() => {
    setUser((prev) => {
      const company = prev as Company;

      // Only update if registered value has actually changed
      if (company.raiseDetails?.raisePurpose !== raisePurpose) {
        console.log('regi changed');
        return new Company(
          company.uid,
          company.name,
          company.email,
          company.companyDetails,
          {
            ...company.raiseDetails,
            raisePurpose: raisePurpose,
          },
          company.uploadedDocuments
        );
      }

      return prev;
    });
  }, [raisePurpose, setUser]);

  const setAttr = (
    attrName: string,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setUser((prev) => {
      const company = prev as Company;
      const value = e.target.value;
      const updatedRaiseDetails = {
        ...company.raiseDetails,
        [attrName]: value,
      };

      return new Company(
        company.uid,
        company.name,
        company.email,
        company.companyDetails,
        updatedRaiseDetails,
        company.uploadedDocuments
      );
    });
  };

  const formatValueLabel = (value: number) => {
    if (value >= 1000000) {
      return `${value / 1000000}M`;
    } else {
      return `${value / 1000}K`;
    }
  };
  return (
    <form onSubmit={() => {}}>
      <label>How much money did the company raise untill now?</label>
      <input
        type="text"
        required
        value={raisedAmount}
        onChange={(event) => {
          console.log(user);
          setRaisedAmount(parseInt(event.target.value as string, 10));
          setAttr('raisedAmount', event);
        }}
      />
      <label>How much money does the company wants to raise?</label>
      <Slider
        aria-label="Restricted values"
        defaultValue={targetAmount}
        step={1000}
        valueLabelDisplay="off"
        min={1000}
        max={6000000}
        onChange={(e, newValue) => {
          if (typeof newValue === 'number') {
            setTargetAmount(newValue);
            setAttr('targetAmount', {
              target: { value: newValue.toString() },
            } as ChangeEvent<HTMLInputElement>);
          }
        }}
        valueLabelFormat={formatValueLabel}
      />
      <input
        type="text"
        required
        value={formatValueLabel(targetAmount)}
        onChange={(e) => {
          setTargetAmount(parseInt(e.target.value as string, 10));
          setAttr('targetAmount', e);
        }}
        style={{
          textAlign: 'center',
          color: `var(--primary-color)`,
          fontWeight: 'bold',
        }}
      />
      <label>What's your estimated deadline for the raise?</label>
      <input
        type="date"
        required
        value={format(deadLine, 'dd-mm-yyyy')}
        onChange={(e) => setAttr('deadline', e)}
      />
      <label>Minimum investment per person?</label>
      <Slider
        aria-label="Restricted values"
        defaultValue={minInvestment}
        step={1000}
        valueLabelDisplay="off"
        min={1000}
        max={1000000}
        onChange={(e, newValue) => {
          if (typeof newValue === 'number') {
            setMinInvestment(newValue);
            setAttr('minInvestment', {
              target: { value: newValue.toString() },
            } as ChangeEvent<HTMLInputElement>);
          }
        }}
        valueLabelFormat={formatValueLabel}
      />
      <input
        type="text"
        required
        value={formatValueLabel(minInvestment)}
        onChange={(e) => {
          setMinInvestment(parseInt(e.target.value as string, 10));
          setAttr('minInvestment', e);
        }}
        style={{
          textAlign: 'center',
          color: `var(--primary-color)`,
          fontWeight: 'bold',
        }}
      />
      <label>What's the raise purpose?</label>
      <ListSelector list={RaisePurpose} setList={setRaisePurpose} />
    </form>
  );
};
