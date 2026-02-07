import {useState, useEffect} from 'react';
import { Button, Card, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";
import splitwiseApi from "../../api/splitwiseApi";
import { useNavigate } from 'react-router-dom';
import {EditAccountRoute} from '../../settings/appRoutes';

const { Title, Text } = Typography;

const MainPage = () => {

    const [accounts, setAccounts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const loadAccounts = async () => {
            const data = await splitwiseApi.getAccounts();
            if(data) {
                setAccounts(data);
            }
        };
        loadAccounts();
    }, []);

    return (
        <div className="main-page" style={{ padding: "24px" }}>
            <Link to="/create-account">
                <Button type="primary" size="large" style={{ marginBottom: "24px" }} className="main-page_btn">
                    Добавить счет
                </Button>
            </Link>


            <Row gutter={[16, 16]}>
                {accounts.map((acc) => (
                    <Col xs={24} sm={12} md={8} key={acc._id}>
                        <Card 
                        hoverable
                        onClick={() => navigate(EditAccountRoute(acc._id))}
                        >
                            <Title level={4}>{acc.name}</Title>
                            <Text strong style={{ display: "block", fontSize: 18 }}>{acc.total}</Text>
                            <Text type="secondary">Участников: {acc.participants.length}</Text>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default MainPage;