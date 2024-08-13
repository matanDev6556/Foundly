import "./CompanyContact.css";
interface props {
  companyId: string;
}

export const CompanyContact: React.FC<props> = ({ companyId }) => {
  return (
    <>
      <div className="contact-section">
        <h2>Contact</h2>
        <form className="contact-form">
          <div className="form-group">
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows={4}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button">
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
