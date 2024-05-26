import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Hearder/Hearder";
import Consent_Conditions from "./ConsentConditions/ConsentConditions";
import Menu from "./Menu/Menu";
import Evaluation_Form from "./Evaluation_Form/Evaluation_Form";
import EvaluationFinish from "./Evaluation_Form/EvaluationFinnish";
import Evaluation2 from "./Evaluation_Form/Evaluation2";
import StudentPage from "./StudentPage/StudentPage";
import Record from "./Record/Record";
import AdminPage from "./Admin/adminpage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/Hearder" element={<Header />} />
      <Route path="/Consent_Conditions" element={<Consent_Conditions />} />
      <Route path="/Menu" element={<Menu />} />
      <Route path="/Evaluation_Form" element={<Evaluation_Form />} />
      <Route path="/Evaluation2" element={<Evaluation2 />} />
      <Route path="/EvaluationFinish" element={<EvaluationFinish />} />
      <Route path="/StudentPage" element={<StudentPage />} />
      <Route path="/Record" element={<Record />} />
      <Route path="/AdminPage" element={<AdminPage />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
