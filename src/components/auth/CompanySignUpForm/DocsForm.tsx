import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useAppStatus } from "../../../context/AppStatusContext";
import { FileSelect } from "./FileSelect";
import Company from "../../../models/Company";
interface props {
  user: Company;
  updateUser: (updatedUser: Company) => void;
}

export const DocsForm: React.FC<props> = ({ user, updateUser }) => {
  const [files, setFiles] = useState<string[]>([]);
  const { error } = useAppStatus();
  const [done] = useState(false);
  const [fileContent] = useState("");
  const [numOfFiles, setNumOfFiles] = useState(1);

  useEffect(() => {
    const updatedUser = new Company(
      user.uid,
      user.name,
      user.email,
      user.companyDetails,
      user.raiseDetails,
      files
    );
    updateUser(updatedUser);
  }, [files]);
  return (
    <div>
      <h4 style={{ color: "#7fcbc4" }}> Last step and we finish!</h4>
      <Box display="flex" flexWrap="wrap" gap={2} p={2}>
        <Grid container direction="row" spacing={5}>
          {[...Array(numOfFiles)].map((_, index) => (
            <Grid item xs={4} key={index} gap={2} p={2}>
              <FileSelect
                index={index}
                files={files}
                setFiles={setFiles}
                user={user}
                updateUser={updateUser}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        mt={2}
      >
        <Button
          variant="contained"
          style={{ width: "auto" }}
          onClick={() => setNumOfFiles((prev) => prev + 1)}
        >
          Add document
        </Button>
      </Box>

      {fileContent && (
        <div>
          <Typography variant="h6">File Content:</Typography>
          <pre>{fileContent}</pre>
        </div>
      )}
      {error && <Typography color="error">{error}</Typography>}
      {done && (
        <Typography color="primary">
          File content saved successfully!
        </Typography>
      )}
    </div>
  );
};
