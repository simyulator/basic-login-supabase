import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./utils/ErrorBoundary";

const queryClient = new QueryClient();
const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ErrorBoundary fallback={<ErrorPage />}>
              <App />
            </ErrorBoundary>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </StrictMode>
  );
}
