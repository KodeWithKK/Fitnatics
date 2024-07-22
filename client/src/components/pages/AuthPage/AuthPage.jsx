import RootAuthLayout from "@layouts/RootAuthLayout/RootAuthLayout";
import AuthForm from "@features/Forms/AuthForm/AuthForm";

const AuthHome = () => {
  return (
    <RootAuthLayout>
      <AuthForm />
    </RootAuthLayout>
  );
};

export default AuthHome;
