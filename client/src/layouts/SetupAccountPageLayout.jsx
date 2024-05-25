import { useLogoutUser } from "@hooks/useLogoutUser";

const SetupAccountLayout = ({ children }) => {
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

      {/* <form
        className="space-y-10 border-2 border-gray-800/[.5] mx-auto px-[6%] py-8 border-dashed rounded-md max-w-[586px] h-fit text-gray-200"
        onSubmit={formSubmitHandle}
      >
        <h1 className="font-bold text-3xl text-center text-gray-200">
          Setup your Account
        </h1>

        <div className="flex gap-3">
          <button
            type="button"
            className="bg-gray-800/[0.8] p-2.5 rounded-md w-full font-semibold"
          >
            Go Home
          </button>
          <button
            type="submit"
            className="bg-brand/[0.75] p-2.5 rounded-md w-full font-semibold"
          >
            Next
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default SetupAccountLayout;
