import "./global.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import axios from "axios";
import { CustomThemeProvider } from "./components/provider/themeProvider.tsx";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CustomThemeProvider>
    <App />
  </CustomThemeProvider>
);
