import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import NewOrderPage from "./pages/NewOrderPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ReportsPage from "./pages/ReportsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppLayout><DashboardPage /></AppLayout>} />
        <Route path="/app/orders" element={<AppLayout><OrdersPage /></AppLayout>} />
        <Route path="/app/orders/:id" element={<AppLayout><OrderDetailsPage /></AppLayout>} />
        <Route path="/app/new" element={<AppLayout><NewOrderPage /></AppLayout>} />
        <Route path="/app/reports" element={<AppLayout><ReportsPage /></AppLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
