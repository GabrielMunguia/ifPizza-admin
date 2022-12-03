import React from "react";
import AdminLayout from "./components/layouts/AdminLayout";
import { PrivateRouter } from "./routes/PrivateRouter";
import { BrowserRouter } from "react-router-dom";
import { AlertProvider } from "./context/AlertProvider";
export const App = () => {
  return (
    <AlertProvider>
      <BrowserRouter>
        <AdminLayout>
          <PrivateRouter />
        </AdminLayout>
      </BrowserRouter>
    </AlertProvider>
  );
};
export default App;
