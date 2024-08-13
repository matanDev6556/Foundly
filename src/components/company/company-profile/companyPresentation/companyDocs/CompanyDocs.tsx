import Company from "../../../../../models/Company";
import pdfIcon from "../../../../../assets/images/fileIcon.png";
import { extractFileName } from "../../../../../utils/functions";
import fileNoPlus from "../../../../../assets/images/file_No_Plus.jpg";
import "./CompanyDocs.css";
interface docsProps {
  company: Company;
}
export const CompanyDocs: React.FC<docsProps> = ({ company }) => {
  const { uploadedDocuments } = company;

  return (
    <>
      <div className="docs-container">
        <h2 className="docs-title">Docs</h2>
        <div className="document-links">
          {uploadedDocuments.map((docAddress, index) => (
            <a href={docAddress} key={index} className="document-card" download>
              <img src={fileNoPlus} alt="PDF icon" />
              <div className="title">{extractFileName(docAddress)}</div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
