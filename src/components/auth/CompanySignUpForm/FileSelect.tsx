import { Box } from "@mui/system";
import React, { ChangeEvent, useEffect, useState } from "react";
import fileIconUpdated from "../../../assets/images/fileIconUpdated.svg";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useAppStatus } from "../../../context/AppStatusContext";
import { useUser } from "../../../context/UserContext";
import Company from "../../../models/Company";
import { ImageSection } from "../../../utils/enums";
import { uploadDoc } from "../../../services/dbService";
interface props {
  key: number;
  files: string[];
  setFiles: React.Dispatch<React.SetStateAction<string[]>>;
  user: Company;
  updateUser: (updatedUser: Company) => void;
}
interface FileObject {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  content: string;
}

export const FileSelect: React.FC<props> = ({
  files,
  setFiles,
  user,
  updateUser,
}) => {
  const [selectedFileAddress, setSelectedFileAddress] = useState(
    user.companyDetails.logo || ""
  );
  const { uploading, setUploading, error, setError } = useAppStatus();
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const fileUrl = await uploadDoc(
        e.target.files?.[0],
        user.uid,
        ImageSection.Docs,
        setUploading
      );
      setSelectedFileAddress(fileUrl);
      setFiles((prev) => [...prev, selectedFileAddress]);
    }
  };
  return (
    <form onSubmit={() => {}}>
      <Box>
        <Grid container direction="column" spacing={2}>
          <img
            src={fileIconUpdated}
            alt="Main Illustration"
            className="main-section__image"
            style={{ width: "20%", height: "30%" }}
          />
        </Grid>
        <Grid container direction="column" spacing={2}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(e)}
          />
        </Grid>
      </Box>
    </form>
  );
};
