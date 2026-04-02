import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import AppWorkspacePage from "./pages/AppWorkspacePage.jsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<AppWorkspacePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
