import { PageHeader, Button, Row } from "antd";
import styled from "styled-components";

export default function Header() {
  const StyledPageHeader = styled(PageHeader)`
    height: 70px;
    background-color: #2a324e;
  `;

  const StyledH2 = styled.h2`
    color: #1890ff;
  `;

  return (
    <StyledPageHeader
      className="site-page-header"
      backIcon={false}
      title={
        <Row>
          <StyledH2>Snake Game</StyledH2>
        </Row>
      }
      extra={[
        <Button key="2">Register</Button>,
        <Button key="1" type="primary">
          Login
        </Button>,
      ]}
    ></StyledPageHeader>
  );
}
