import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Spinner() {
  const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return <Spin indicator={spinIcon} />;
}
