import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@config/day.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalContextProvider from "./context/GlobalContextProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

// eslint-disable-next-line
const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>

      <ReactQueryDevtoolsProduction
        initialIsOpen={false}
        buttonPosition="bottom-left"
      />
    </QueryClientProvider>
  </React.StrictMode>
);
