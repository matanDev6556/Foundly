import React from "react";
import OpenAll from "../../components/cummon/open-all/OpenAll";
import { RoutePath } from "../../utils/enums";

const AdminHome: React.FC = () => {
  return (
    <>
      <h1 style={{ textAlign: "center", color: "#728f9e" }}>Managment Panel</h1>
      <OpenAll
        title={"Last Invetments"}
        navigatePath={RoutePath.InvetmentsTable}
        isBold={false}
      ></OpenAll>
      <OpenAll
        title={"Users"}
        navigatePath={RoutePath.UsersTable}
        isBold={false}
      ></OpenAll>
    </>
  );
};

export default AdminHome;
