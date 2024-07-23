import { Box } from "@mui/system";
import React, { ChangeEvent, useEffect, useState } from "react";
import fileIconUpdated from "../../../assets/images/fileIconUpdated.svg";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useAppStatus } from "../../../context/AppStatusContext";
import { useUser } from "../../../context/UserContext";
import Company from "../../../models/Company";
interface props {
  key: number;
  files: File[];
}

export const FileSelect: React.FC<props> = ({ files }) => {
  const { user, setUser } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null
  );
  const { uploading, setUploading, error, setError } = useAppStatus();
  interface FileObject {
    name: string;
    size: number;
    type: string;
    lastModified: number;
    content: string;
  }

  function fileToJSON(file: File, content: string): FileObject {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      content: content,
    };
  }
  async function readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file); // Reads the file as a data URL (base64 encoded)
    });
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setSelectedFile(file);
  };
  useEffect(() => {
    setError("");
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("11111" + selectedFile);
    if (selectedFile) {
      const content = await readFileContent(selectedFile);
      const fileObject = fileToJSON(selectedFile, content);
      const newUplodedDocs = (user as Company).uploadedDocuments;
      newUplodedDocs.push(JSON.stringify(fileObject));
      setUser((prev) => {
        const company = prev as Company;
        return new Company(
          company.uid,
          company.name,
          company.email,
          company.companyDetails,
          company.raiseDetails,
          newUplodedDocs
        );
      });
      // Process the file here (e.g., upload to a server)
      console.log("File selected:", selectedFile.name);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
            accept="application/json"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={(e) => {
              handleFileChange(e);
            }}
          />
        </Grid>
        <Grid container direction="column" spacing={2}>
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              style={{ width: "30%", height: "40%" }}
              component="span"
            >
              Select File
            </Button>
          </label>
        </Grid>
        <Grid container direction="column" spacing={2}>
          {
            <TextField
              disabled
              value={selectedFile?.name}
              variant="outlined"
              margin="normal"
            />
          }
        </Grid>
        {
          <Grid container direction="column" spacing={2} paddingTop="30px">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={uploading}
              sx={{ width: "100px" }}
            >
              {uploading ? <CircularProgress size={24} /> : "Upload"}
            </Button>
          </Grid>
        }
      </Box>
    </form>
  );
};
