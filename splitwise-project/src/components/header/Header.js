import { Layout, Typography } from "antd";


const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = () => {
    return (
        <AntHeader style ={{ background: "#1677ff", padding: "0 24px", height: 60, display: "flex", alignItems: "center"}}>
            <Title level={3} style={{ color: "white", margin: 0 }}>
            Splitwise Helper
            </Title>
        </AntHeader>
    )
}

export default Header;