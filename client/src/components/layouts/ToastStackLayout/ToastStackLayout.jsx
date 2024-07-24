import Toast from "@shared/core/Toast/Toast";

// const demoToast = {
//   id: "1001",
//   type: "info",
//   title: "Something went wrong!",
//   message: "Something went wrong while generating the tokens",
// };

const ToastStackLayout = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-[1000] space-y-3">
      {toasts?.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          removeToast={() => removeToast(toast.id)}
        />
      ))}

      {/* <Toast
        type={"info"}
        title={"OTP Resended!"}
        message={"A new OTP is sent to your email"}
        removeToast={() => removeToast(demoToast.id)}
      />

      <Toast
        type={"warning"}
        title={"Action not Allowed!"}
        message={demoToast.message}
        removeToast={() => removeToast(demoToast.id)}
      />

      <Toast
        type={"error"}
        title={"6 Digit OTP Required!"}
        message={"A 6 digit OTP is required for authentication"}
        removeToast={() => removeToast(demoToast.id)}
      />

      <Toast
        type={"success"}
        title={"Account Created!"}
        message={demoToast.message}
        removeToast={() => removeToast(demoToast.id)}
      /> */}
    </div>
  );
};

export default ToastStackLayout;
