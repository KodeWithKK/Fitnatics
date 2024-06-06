function SideNavbar({ currStep, setStep, navItems }) {
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
          <ActiveNavitemIndicator
            currStep={currStep}
            totalSteps={navItems.length}
          />
        </div>

        {/* FORM NAV BUTTONS */}
        <div className="flex flex-col">
          {navItems.map((name, idx) => (
            <button
              key={window.crypto.randomUUID()}
              type="button"
              className="relative py-[4px] text-[15px] text-left"
              onClick={() => setStep(idx + 2)}
            >
              <span
                className={`${currStep === idx + 1 && "text-brand"} ${
                  currStep > idx + 1 && "text-brand opacity-60"
                } ${currStep < idx + 1 && "text-gray-600 "}`}
              >
                {name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function ActiveNavitemIndicator({ currStep, totalSteps }) {
  return (
    <div
      className={`top-0 absolute w-full bg-blue-500 transition-all duration-700 rounded-full`}
      style={{ height: `calc(100% / ${totalSteps} * ${currStep})` }}
    ></div>
  );
}

export default SideNavbar;
