import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { StyleSheetManager } from "styled-components";

import isPropValid from "@emotion/is-prop-valid";
import GlobalStyles from "./styles/GlobalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Login from "./pages/Login.jsx";
import Account from "./pages/Account.jsx";
import Users from "./pages/Users.jsx";
import Settings from "./pages/Settings.jsx";
import Cabins from "./pages/Cabins.jsx";
import Bookings from "./pages/Bookings.jsx";
import Booking from "./pages/Booking.jsx";
import Checkin from "./pages/Checkin.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // The amount of time the data will stay in the cache (1 min = 60sec * 1000ms)
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <StyleSheetManager
          shouldForwardProp={(propName, elementToBeRendered) => {
            return typeof elementToBeRendered === "string"
              ? isPropValid(propName)
              : true;
          }}>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }>
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="bookings/:bookingId" element={<Booking />} />
                <Route path="checkin/:bookingId" element={<Checkin />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
                <Route path="account" element={<Account />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>

          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </StyleSheetManager>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
