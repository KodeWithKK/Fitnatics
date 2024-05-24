const SetupAccountFormLayout = ({ displayStep, children }) => {
  return (
    <div className="flex border-gray-900 bg-gray-950 border rounded-md h-full">
      <SideNavbar />

      <div className="border-gray-900 bg-gray-900/[.55] border-l rounded-md w-full">
        {children}
      </div>
    </div>
  );
};

function SideNavbar() {
  return (
    <aside className="px-4 w-[396px]">
      <div className="mt-4 pb-2 text-center nb-1">
        <h5 className="font-semibold text-[21px] text-gray-100">
          Let&apos;s Get you Started
        </h5>
        <p className="mt-0.5 text-gray-600 text-sm">
          Enter the details to get going
        </p>
      </div>

      <div className="flex gap-4 mt-[22px] h-fit">
        <div className="relative bg-gray-800 rounded-full w-[3px]">
          <div className="bg-blue-500 rounded-full w-full h-[calc(100%/3)]"></div>
        </div>

        {/* FORM NAV BUTTONS */}
        <div className="flex flex-col">
          <button type="button" className="py-1.5 text-brand text-left">
            Personal Details
          </button>
          <button type="button" className="py-1.5 text-gray-600 text-left">
            Select Gym
          </button>
          <button type="button" className="py-1.5 text-gray-600 text-left">
            Payment
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SetupAccountFormLayout;
