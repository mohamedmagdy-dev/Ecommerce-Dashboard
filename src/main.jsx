// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Redux
import { Provider } from "react-redux";
import { store } from "./store.js";
// Pages
import App from "./App.jsx";
// React Router
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
