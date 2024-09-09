import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from "@mantine/notifications";
import AppRouter from "./routes/route.jsx";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import "./index.css";

const theme = createTheme({});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={theme}> 
      <Notifications />
      <AppRouter />
    </MantineProvider>
  </StrictMode>
);
