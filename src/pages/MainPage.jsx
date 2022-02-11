import { useContext, useEffect } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Grid from "../components/GameField";
import ScoreBoard from "../components/ScoreBoard/ScoreBoard";
import InfoBoard from "../components/InfoBoard";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import LoginPage from "./LoginPage";

function MainPage() {
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
    return <LoginPage />;
  }

  return (
    <>
      <Layout isGamePaused={store.isPaused}>
        <InfoBoard />
        <Grid />
        <ScoreBoard />
      </Layout>
    </>
  );
}

export default observer(MainPage);
