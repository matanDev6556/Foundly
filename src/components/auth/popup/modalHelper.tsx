import StepperForm from '../CompanySignUpForm/StepperForm';
import PreferencesStep from '../InvestorSignUpForm/PreferencesStep';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';

// function for know the contetnt of the pop up (ligin | sign Up As Invstor | Company)
// based on the user type and the step of the sign up
export const renderForm = (
  modalType: string,
  userType: string,
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>
) => {
  if (modalType === 'Login') {
    return <LoginForm />;
  } else if (modalType === 'Sign Up As') {
    if (userType === 'Investor') {
      return step === 1 ? (
        <SignUpForm moveStep={() => setStep(2)} userType="Investor" />
      ) : (
        <PreferencesStep />
      );
    }

    if (userType === 'Company') {
      return step === 1 ? (
        <SignUpForm moveStep={() => setStep(2)} userType="Company" />
      ) : (
        <StepperForm />
      );
    }
  } else if (modalType === 'Profile' && userType === 'Investor') {
    return <h1> investor Profile</h1>;
  } else if (modalType === 'My Investment') {
    return <h1> My Investment</h1>;
  } else if (modalType === 'Profile' && userType === 'Company') {
    return <h1> Company Profile</h1>;
  }
};

// function for get the title of the pop up (login | sign up based on usert type and step)
export const getTitle = (modalType: string, userType: string, step: number) => {
  if (step > 1) {
    return userType === 'Investor' ? 'Preferences' : 'Verification process';
  }
  return modalType;
};

// fucntion for sign up button (Company | Investor)
export const renderSignUpAsButtons = (
  userType: string,
  setUserType: (type: string) => void
) => (
  <div className="sign-up-as">
    <button
      className={
        userType === 'Company' ? 'activeSignUpButton' : 'unActiveSignUpButton'
      }
      onClick={() => setUserType('Company')}
    >
      Company
    </button>
    <button
      className={
        userType === 'Investor' ? 'activeSignUpButton' : 'unActiveSignUpButton'
      }
      onClick={() => setUserType('Investor')}
    >
      Investor
    </button>
  </div>
);
