import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useModal } from "../../../context/popupContext";
import { useAppStatus } from "../../../context/AppStatusContext";
import { InfoContentForm } from "./InfoContentForm";
import { RaiseContentForm } from "./RaiseContentForm";
import { DocsForm } from "./DocsForm";
import { saveUserToDb } from "../../../services/dbService";
import { useUser } from "../../../context/UserContext";
import Company from "../../../models/Company";
import { User } from "firebase/auth";

const primaryColor = "#39958c";
const secondaryColor = "#7fcbc4";
const softColor = "#D0EBEA";
const style = {
  width: "100%",
  height: "70vh",
  padding: "10px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none",
  "scrollbar-width": "none",
};
// custome them for stepper
const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          "&.Mui-active": {
            color: secondaryColor, // צבע שלב פעיל
          },
          "&.Mui-completed": {
            color: primaryColor, // צבע שלב שהושלם
          },
          "&.Mui-disabled": {
            color: softColor, // צבע שלב שאינו פעיל
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          "&.Mui-active": {
            color: primaryColor, // צבע טקסט של שלב פעיל
          },
          "&.Mui-completed": {
            color: secondaryColor, // צבע טקסט של שלב שהושלם
          },
          "&.Mui-disabled": {
            color: "#e0e0e0", // צבע טקסט של שלב שאינו פעיל
          },
        },
      },
    },
  },
});

const steps = ["Info", "Rais", "Docs"];

interface StepContentProps {
  step: number;
}

const StepContent: React.FC<StepContentProps> = ({ step }) => {
  switch (step) {
    case 0:
      return (
        <div>
          <InfoContentForm />
        </div>
      );
    case 1:
      return (
        <div>
          <RaiseContentForm />
        </div>
      );
    case 2:
      return <DocsForm />;
    default:
      return <div>Unknown Step</div>;
  }
};

const StepperForm: React.FC = () => {
  const { user, setUser } = useUser();
  const [activeStep, setActiveStep] = useState(0);
  const { closeModal } = useModal();
  const { loading, setLoading, error, setError } = useAppStatus();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const saveDataInDb = async () => {
    setLoading(true); //
    //TODO : call to SaveUserToDb from services.ts
    await saveUserToDb(user as Company);
    // finish to save the user in db
    setLoading(false);
    // close the pop up
    closeModal();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={style}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ marginTop: 2 }}>
          <Box>
            <StepContent step={activeStep} />
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (activeStep < steps.length - 1) {
                    handleNext();
                  } else {
                    saveDataInDb();
                  }
                }}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default StepperForm;
