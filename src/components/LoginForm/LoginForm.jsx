import React, { useContext, useState } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import styles from "./LoginForm.module.scss";
import { Button } from "antd";
import styled from "styled-components";

const LoginButton = styled(Button)`
  margin-right: 20px;
`;

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { store } = useContext(Context);
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Register/Login</h1>
        <input
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="Username"
          required={true}
          minLength={3}
          maxLength={30}
        />
        <input
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          required={true}
          minLength={5}
        />
        <div className={styles.buttonWrapper}>
          <LoginButton onClick={() => store.login(username, password)}>
            Login
          </LoginButton>
          <Button
            type="primary"
            onClick={() => store.registration(username, password)}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}

export default observer(LoginForm);
