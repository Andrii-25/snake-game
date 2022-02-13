import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import styles from "./Layout.module.scss";
import Header from "../Header";

function Layout({ children }) {
  const { store } = useContext(Context);

  function handleLogout() {
    store.logout();
  }

  return (
    <>
      <Header
        isAuth={store.isAuth}
        onLogout={handleLogout}
        restartGame={store.restartGame}
        isSoundOff={store.isSoundOff}
      />
      <div className={styles.mainContainer}>{children}</div>
    </>
  );
}

export default observer(Layout);
