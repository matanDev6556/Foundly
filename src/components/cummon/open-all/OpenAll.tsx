import React from "react";
import { useNavigate } from "react-router-dom";
import "./OpenAll.css";
interface OpenAllProps {
  title: string;
  navigatePath: string;
  isBold?: boolean;
}
const OpenAll: React.FC<OpenAllProps> = ({
  title,
  navigatePath,
  isBold = true,
}) => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <button className="allButton" onClick={() => navigate(navigatePath)}>
        הכל
      </button>

      <h2 className="title" style={{ fontWeight: isBold ? "bold" : "normal" }}>
        {title}
      </h2>
    </div>
  );
};

export default OpenAll;
