import { useContext, useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Grid from "../components/GameField";
import ScoreBoard from "../components/ScoreBoard/ScoreBoard";
import InfoBoard from "../components/InfoBoard";
import Layout from "../components/Layout";

function MainPage() {
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
      <Layout>
        <InfoBoard />
        <Grid />
        <ScoreBoard />
      </Layout>
    </>
  );
}

export default observer(MainPage);
