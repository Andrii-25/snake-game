import { useContext, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Layout from "../components/Layout";

function ScoresPage() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <>
      <Layout></Layout>
    </>
  );
}

export default observer(ScoresPage);
