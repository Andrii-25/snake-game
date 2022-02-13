import { PageHeader, Button, Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SoundOffButton from "../SoundOffButton/SoundOffButton";
import SoundOnButton from "../SoundOnButton/SoundOnButton";

const StyledPageHeader = styled(PageHeader)`
  height: 70px;
  background-color: #2a324e;
`;

const StyledH2 = styled.h2`
  color: #1890ff;
`;

export default function Header({ isAuth, onLogout, restartGame, isSoundOff }) {
  function handleRestartGame() {
    if (window.confirm("Restart the game?")) {
      restartGame();
    }
  }

  const soundButton = isSoundOff ? (
    <SoundOffButton key="4" />
  ) : (
    <SoundOnButton key="4" />
  );
  return (
    <StyledPageHeader
      className="site-page-header"
      backIcon={false}
      title={
        <Row>
          <Link to="/">
            <StyledH2>Snake Game</StyledH2>
          </Link>
        </Row>
      }
      extra={
        isAuth
          ? [
              <Button key="1" onClick={handleRestartGame}>
                Restart game
              </Button>,
              <Link key="2" to="/scores">
                <Button>Best scores</Button>
              </Link>,
              <Button key="3" onClick={onLogout}>
                Logout
              </Button>,
              soundButton,
            ]
          : null
      }
    ></StyledPageHeader>
  );
}
