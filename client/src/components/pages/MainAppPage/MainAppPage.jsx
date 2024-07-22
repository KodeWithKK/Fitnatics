import { useMemo, createContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import MainAppPageLayout from "@layouts/MainAppPageLayout/MainAppPageLayout";
import MainAppPageRoutes from "@routes/MainAppPageRoutes";

export const MainAppPageContext = createContext();

const MainAppPage = () => {
  const queryClient = useQueryClient();
  const user = useMemo(() => queryClient.getQueryData(["user"]), [queryClient]);

  const value = useMemo(() => {
    return {};
  }, []);

  return (
    <MainAppPageContext.Provider value={value}>
      <MainAppPageLayout>
        <MainAppPageRoutes role={user.role} />
      </MainAppPageLayout>
    </MainAppPageContext.Provider>
  );
};

export default MainAppPage;
