import React from "react";
import Container from "common/components/UI/Container";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import { AdminWrapper, AdminContent } from "./admin.style";
import LeadsData from "./LeadsData";

const AdminContainer = () => {
  return (
    <AdminWrapper id="admin_section">
      <Container>
        <AdminContent>
          <Heading content="Admin Page" />
          <Text content="This is the admin area for BotBuddy Customer Analytics. The design will be implemented later." />

          <LeadsData />
        </AdminContent>
      </Container>
    </AdminWrapper>
  );
};

export default AdminContainer;
