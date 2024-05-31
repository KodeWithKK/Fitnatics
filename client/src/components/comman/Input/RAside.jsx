function RAside({ children, className }) {
  return (
    <div
      className={`place-items-center border-gray-900 grid bg-gray-950 px-2.5 border-l rounded-l-[5px] rounded-r-[5px] h-full text-[15px] ${className}`}
    >
      {children}
    </div>
  );
}

export default RAside;
