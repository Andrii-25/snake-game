import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import styles from "./Layout.module.scss";
import Header from "../Header";

function Layout({ children, isGamePaused }) {
  const { store } = useContext(Context);

  function handleLogout() {
    store.logout();
  }

  return (
    <>
      <Header isAuth={store.isAuth} onLogout={handleLogout} />
      {/* {isGamePaused ? (
        <h1 style={{ marginBottom: "0" }}>||</h1>
      ) : null} */}
      <div className={styles.mainContainer}>{children}</div>
    </>
  );
}

export default observer(Layout);
