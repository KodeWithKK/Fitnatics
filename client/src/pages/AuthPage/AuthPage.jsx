import RootAuthLayout from "@layouts/RootAuthLayout";
import AuthForm from "@components/Forms/AuthForm/AuthForm";

const AuthHome = () => {
  return (
    <RootAuthLayout>
      <AuthForm />
    </RootAuthLayout>
  );
};

export default AuthHome;
