import React, { useEffect, useState } from "react";
import "./MiddleSection.css";
import { useUser } from "../../../../context/UserContext";
import { fetchForUser } from "../../../../services/dbService";
import Company from "../../../../models/Company";
import Invest from "../../../../models/Invest";
import {
  calculateRemainingDays,
  formatRemainingTime,
  formatTargetAmount,
} from "../../../../utils/functions";

const MiddleSection = () => {
  const { user } = useUser();
  const [data, setData] = useState({
    target: 0,
    total: 0,
    investoramount: 0,
    daysToComplete: 0,
    remainingTimeValue: "",
    remainingTimeUnit: "",
  });

  useEffect(() => {
    const getData = async () => {
      if (user) {
        try {
          const company = user as Company;
          const investoramount = await fetchForUser(
            "investments",
            "companyUid",
            company.uid,
            Invest.fromJson
          );
          const targetPrecent = company.calculateProgress();
          const totalRaised = company.raiseDetails.currentInvestmentsAmount;
          const daysComplete = calculateRemainingDays(
            company.raiseDetails.deadline
          );
          const { value: remainingTimeValue, unit: remainingTimeUnit } =
            formatRemainingTime(daysComplete);

          setData({
            target: targetPrecent,
            total: totalRaised,
            investoramount: investoramount.length,
            daysToComplete: daysComplete,
            remainingTimeValue,
            remainingTimeUnit,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    getData();
  }, [user]);

  return (
    <div className="middle-section">
      <div className="content">
        <div className="information">
          <p className="target">
            <span>{data.target}%</span>
            <span>מהיעד</span>
          </p>
          <p className="total">
            <span>{formatTargetAmount(data.total)}$</span>
            <span>הושקעו</span>
          </p>
          <p className="investors">
            <span>{data.investoramount}</span>
            <span>משקיעים</span>
          </p>
          <p className="days">
            <span>
              {data.remainingTimeValue} {data.remainingTimeUnit}
            </span>
            <span>נותרו</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiddleSection;
