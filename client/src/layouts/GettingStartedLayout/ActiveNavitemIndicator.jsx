function ActiveNavitemIndicator({ currStep }) {
  return (
    <div
      className={`top-0 absolute w-full bg-blue-500 transition-all duration-700 rounded-full`}
      style={{ height: `calc(100% / 3 * ${currStep})` }}
    ></div>
  );
}

export default ActiveNavitemIndicator;
