import { useLogoutUser } from "@hooks/useLogoutUser";

const GettingStartedPageLayout = ({ children }) => {
  const { logoutUser } = useLogoutUser();

  return (
    <div className="px-[6%] py-4 h-screen overflow-y-auto">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center gap-4 border-gray-900 bg-gray-950 px-4 py-1 border rounded-md">
        <h3 className="font-bold text-[28px] text-brand uppercase tracking-wide">
          Fitnatics
        </h3>

        <p className="text-gray-100">
          Already a member?{" "}
          <button type="button" className="text-blue-500" onClick={logoutUser}>
            Login
          </button>
        </p>
      </nav>

      <div className="mt-2 h-[calc(100vh-95px)] overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default GettingStartedPageLayout;
