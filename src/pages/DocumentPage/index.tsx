
import React, { Suspense } from "react";
const LocDashboard = React.lazy(() => import("../../components/LocDashboard"));

const DocumentPage: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <LocDashboard />
    </Suspense>
  );
};

export default DocumentPage;
