import { useContext, useEffect, useState } from "react";
import styles from "./MainPage.module.scss";
import LoginForm from "../components/LoginForm";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import Grid from "../components/GameField";
import ScoreBoard from "../components/ScoreBoard/ScoreBoard";
import InfoBoard from "../components/InfoBoard";

function MainPage() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  function handleLogout() {
    store.logout();
  }

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <>
      <Header isAuth={store.isAuth} onLogout={handleLogout} />
      <div className={styles.mainContainer}>
        <InfoBoard />
        <Grid />
        <ScoreBoard />
      </div>
    </>
  );
}

export default observer(MainPage);
