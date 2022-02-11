import { useContext, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Layout from "../components/Layout";
import Scores from "../components/Scores/Scores";
import Spinner from "../components/Spinner";

function ScoresPage() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  if (!store.isAuth) {
    return (
      <Layout>
        <LoginForm />
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <Scores />
      </Layout>
    </>
  );
}

export default observer(ScoresPage);
