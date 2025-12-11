// src/pages/Home/index.tsx
import React, { Suspense } from "react";
const Container = React.lazy(() => import("../../common/Container"));
const LocDashboard = React.lazy(() => import("../../components/LocDashboard"));

const Home = () => {
  return (
    <Suspense fallback={null}>
      <Container>
        <LocDashboard />
      </Container>
    </Suspense>
  );
};

export default Home;
