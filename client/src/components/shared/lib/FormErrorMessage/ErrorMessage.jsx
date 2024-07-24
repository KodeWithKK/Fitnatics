function ErrorMessage({ children }) {
  return (
    <p className="mb-3 mt-1 text-[15px] text-sm text-red-400">{children}</p>
  );
}

export default ErrorMessage;
