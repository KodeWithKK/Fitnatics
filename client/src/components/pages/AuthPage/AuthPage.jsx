import RootAuthLayout from "@layouts/RootAuthLayout/RootAuthLayout";
import AuthForm from "@features/Forms/Auth/AuthForm";

const AuthHome = () => {
  return (
    <RootAuthLayout>
      <AuthForm />
    </RootAuthLayout>
  );
};

export default AuthHome;
