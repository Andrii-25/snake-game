import { PageHeader, Button, Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledPageHeader = styled(PageHeader)`
  height: 70px;
  background-color: #2a324e;
`;

const StyledH2 = styled.h2`
  color: #1890ff;
`;

export default function Header({ isAuth, onLogout }) {
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
              <Link key="1" to="/scores">
                <Button>Best scores</Button>
              </Link>,
              <Button key="2" onClick={onLogout}>
                Logout
              </Button>,
            ]
          : null
      }
    ></StyledPageHeader>
  );
}
