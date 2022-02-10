import "./App.css";
import Grid from "./components/Grid";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
  return (
    <div className="App">
      <Header />
      <LoginForm />
      <Grid />
    </div>
  );
}

export default App;
