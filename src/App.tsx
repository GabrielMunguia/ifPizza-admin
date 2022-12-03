import {useContext,useEffect} from "react";
import AdminLayout from "./components/layouts/AdminLayout";
import { PrivateRouter } from "./routes/PrivateRouter";
import { BrowserRouter } from "react-router-dom";
import { ApplicationProvider } from "./context/ApplicationProvider";
import { AppContext } from "./context/AppContext";
import { Login } from "./pages/Login";
import { AppRouter } from "./routes/AppRouter";
export const App = () => {




  
 

  return (
    
    <ApplicationProvider>
      <AppRouter />
 
    </ApplicationProvider>
  );
};
export default App;
