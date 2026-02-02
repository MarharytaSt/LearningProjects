import { Layout, Typography } from "antd";
import { useLocation } from 'react-router-dom';


const { Header: AntHeader } = Layout;
const { Title } = Typography;


const Header = () => {
    const location = useLocation();

    const titles = {
        "/": "Splitwise Helper",
        "/create-account": "Создание счёта"
    };

    let title = titles[location.pathname];

    if(location.pathname.startsWith("/edit-account/")) {
        title = "Управление счётом";
    }
    
    return (
        <AntHeader style={{ background: "#1677ff", padding: "0 24px", height: 60, display: "flex", alignItems: "center" }}>
            <Title level={3} style={{ color: "white", margin: 0 }}>
                {title}
            </Title>
        </AntHeader>
    )
}

export default Header;