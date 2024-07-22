import useApiManager from "./useApiManager";

function useMainAppPageHooks() {
  const { isLoading, todaysDiet } = useApiManager();
  return { isLoading, todaysDiet };
}

export default useMainAppPageHooks;
