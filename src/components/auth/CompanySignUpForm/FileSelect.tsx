import { Box } from "@mui/system";
import React, { useState } from "react";
import fileIconUpdated from "../../../assets/images/fileIconUpdated.svg";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { useAppStatus } from "../../../context/AppStatusContext";
import Company from "../../../models/Company";
import { ImageSection } from "../../../utils/enums";
import { uploadDoc } from "../../../services/dbService";
import { extractFileName } from "../../../utils/functions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface props {
  index: number;
  files: string[];
  setFiles: React.Dispatch<React.SetStateAction<string[]>>;
  user: Company;
  updateUser: (updatedUser: Company) => void;
}

export const FileSelect: React.FC<props> = ({
  index,
  files,
  setFiles,
  user,
}) => {
  const [selectedFileAddress, setSelectedFileAddress] = useState("");
  const { setUploading } = useAppStatus();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const fileUrl = await uploadDoc(
        e.target.files?.[0],
        user.uid,
        ImageSection.Docs,
        setUploading
      );
      setSelectedFileAddress(fileUrl);
      setFiles((prev) => {
        const newFiles = [...prev];
        newFiles[index] = fileUrl;
        return newFiles;
      });
    }
  };

  return (
    <form onSubmit={() => {}}>
      <div>
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
              id={`file-upload-${index}`}
              style={{ display: "none" }}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor={`file-upload-${index}`}>
              <Tooltip title="Upload Image">
                <IconButton
                  color="primary"
                  style={{ width: "100px", height: "100px" }}
                  component="span"
                >
                  <AddCircleOutlineIcon style={{ fontSize: 40 }} />
                </IconButton>
              </Tooltip>
            </label>
            <label style={{ fontSize: "16px" }}>
              {selectedFileAddress ? extractFileName(selectedFileAddress) : ""}
            </label>
          </Grid>
        </Box>
      </div>
    </form>
  );
};
