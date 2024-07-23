import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useAppStatus } from '../../../context/AppStatusContext';
import { useUser } from '../../../context/UserContext';
import { FileSelect } from './FileSelect';

export const DocsForm: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { error, setError } = useAppStatus();
  const [done, setDone] = useState(false);
  const [fileContent, setFileContent] = useState('');
  const [numOfFiles, setNumOfFiles] = useState(1);
  const { user, setUser } = useUser();

  return (
    <div>
      <Box display="flex" flexWrap="wrap" gap={2} p={2}>
        <Grid container direction="row" spacing={2}>
          {[...Array(numOfFiles)].map((_, index) => (
            <Grid item xs={4} key={index} gap={2} p={2}>
              <FileSelect files={files} key={index} />
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
          style={{ width: '10px' }}
          onClick={() => setNumOfFiles((prev) => prev + 1)}
        >
          +
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
