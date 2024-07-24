import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useApiFetch from "./useApiFetch";
import useApiMutation from "./useApiMutation";

function useApiManager({ role, data }) {
  const queryClient = useQueryClient();

  const fetchedUser = useMemo(
    () => queryClient.getQueryData(["user"]),
    [queryClient],
  );

  const fetchedUserData = useMemo(() => {
    return {
      name: fetchedUser?.personalDetails?.name ?? "",
      avatar: fetchedUser?.personalDetails?.avatar ?? "",
      email: fetchedUser?.email ?? "",
    };
  }, [fetchedUser?.personalDetails, fetchedUser?.email]);

  const isEmailVerifiedInitially = useMemo(() => !!fetchedUser?.email, []); // eslint-disable-line

  const { isLoading, membershipPlans } = useApiFetch();
  const { isSetupAccountPending, setupAccountHandler } = useApiMutation({
    role,
    data,
  });

  return {
    fetchedUserData,
    isEmailVerifiedInitially,
    isLoading,
    membershipPlans,
    isSetupAccountPending,
    setupAccountHandler,
  };
}

export default useApiManager;
