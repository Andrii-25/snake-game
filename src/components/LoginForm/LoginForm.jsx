import React, { useContext, useState } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import styles from "./LoginForm.module.scss";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { store } = useContext(Context);
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="Username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
        />
        <div className={styles.buttonWrapper}>
          <button onClick={() => store.login(username, password)}>Login</button>
          <button onClick={() => store.registration(username, password)}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(LoginForm);
