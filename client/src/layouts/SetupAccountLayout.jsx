const SetupAccountLayout = ({ children }) => {
  return (
    <div className="px-[6%] py-6 h-screen overflow-y-auto">
      {/* NAVBAR */}
      <div className="flex justify-between items-center border-gray-700 bg-gray-950 px-4 py-1 border rounded-md">
        <a
          className="font-bold text-[28px] text-brand uppercase tracking-wide"
          href="/"
        >
          Fitnatics
        </a>

        <p className="text-gray-100">
          Already a member?{" "}
          <button type="button" className="text-blue-500">
            Login
          </button>
        </p>
      </div>

      <div className="mt-2.5 rounded-md h-[calc(100vh-113px)]">{children}</div>

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
