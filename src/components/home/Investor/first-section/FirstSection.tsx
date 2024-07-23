// src/components/MainSection.tsx
import React from "react";
import "./FirstSection.css";
import analyticImg from "../../../../assets/images/analytic_image.png";
import { useUser } from "../../../../context/UserContext";
import { useModal } from "../../../../context/popupContext";
import { UserType } from "../../../../utils/enums";

const MainSection: React.FC = () => {
  const { user } = useUser();
  const { openModal, setUserType } = useModal();
  return (
    <section className="main-section">
      <div data-testid="check" className="main-section__content">
        <img
          src={analyticImg}
          alt="Main Illustration"
          className="main-section__image"
        />
        <div className="main-section__text">
          <h1>
            השקיעו היום בחברות הפרטיות של{" "}
            <span className="highlight">המחר</span>
          </h1>
          <p>
            קל להשקיע בסטארטאפים ישראליים ולהפוך לשותפים אמיתיים בהצלחה.
            הפלטפורמה שלנו מציעה גיוס כספים שקוף וממוקד עם מידע רגולטורי מלא
            לגיבוי כל החלטת השקעה.
          </p>
          {!user && (
            <div className="main-section__buttons">
              <button
                className="main-section__button raise_bttn"
                onClick={() => {
                  openModal("Sign Up As");
                  setUserType(UserType.Company);
                }}
              >
                רוצה לגייס
              </button>

              <button
                className="main-section__button invest_bttn"
                onClick={() => {
                  openModal("Sign Up As");
                  setUserType(UserType.Investor);
                }}
              >
                רוצה להשקיע
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainSection;
