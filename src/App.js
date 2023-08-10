import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protectedRoute";
import RootRedirectRoute from "./components/rootRedirectRoute";
import Login from "./Login";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditListing from "./components/EditListing";
import Readmore from "./components/ReadMore";

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/home/mylistings/:id"
              element={
                <ProtectedRoute>
                  <EditListing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home/feed/:id"
              element={
                <ProtectedRoute>
                  <Readmore />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <RootRedirectRoute>
                  <Login />
                </RootRedirectRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
