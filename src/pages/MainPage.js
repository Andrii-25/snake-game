import { useContext, useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import UserService from "../service/UserService";
import { message } from "antd";
import Header from "../components/Header";
import Grid from "../components/GameField";

function MainPage() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
      message.success("Successfully fetched users!");
    } catch (e) {
      console.log(e);
      message.error(e.message);
    }
  }

  function handleLogout() {
    setUsers([]);
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
      <Header isAuth={store.isAuth} onLogout={handleLogout}/>
      <Grid />
    </>
  );
}

export default observer(MainPage);
