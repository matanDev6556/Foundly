import React, { useState } from "react";
import { useUser } from "../../../context/UserContext";
import { useModal } from "../../../context/popupContext";
import { useAppStatus } from "../../../context/AppStatusContext";
import { ClipLoader } from "react-spinners";
import { saveUserToDb } from "../../../services/dbService";
import YesNoSelector from "../InvestorSignUpForm/yes-no/YesNoSelector";
import { InvesmentsCategories } from "../../../utils/constant";
import Company, { CompanyDetails, RaiseDetails } from "../../../models/Company";
import Slider from "@mui/material/Slider";
import { Stack } from "@mui/system";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeDown";

export const RaiseContentForm: React.FC = () => {
  const { setLoading, setError } = useAppStatus();
  const { user, setUser } = useUser();
  const [moneyRaised, setMoneyRaised] = useState(0);
  const [campaignValue, setCampaignValue] = useState(1000);
  const handleSubmitForn = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {};
  const formatValueLabel = (value: number) => {
    if (value >= 1000000) {
      return `${value / 1000000}M`;
    } else {
      return `${value / 1000}K`;
    }
  };
  return (
    <form onSubmit={handleSubmitForn}>
      <label>How much money did the company raise untill now?</label>
      <input
        type="text"
        required
        value={moneyRaised}
        onChange={(e) => setMoneyRaised(parseInt(e.target.value, 10))}
      />
      <label>How much money does the company wants to raise?</label>
      <Slider
        aria-label="Restricted values"
        defaultValue={campaignValue}
        step={1000}
        valueLabelDisplay="off"
        min={1000}
        max={6000000}
        onChange={(e, newValue) => {
          setCampaignValue(newValue as number);
        }}
        valueLabelFormat={formatValueLabel}
      />
      <input
        type="text"
        required
        value={formatValueLabel(campaignValue)}
        onChange={(e) => setCampaignValue(parseInt(e.target.value, 10))}
        style={{
          textAlign: "center",
          color: `var(--primary-color)`,
          fontWeight: "bold",
        }}
      />
    </form>
  );
};
