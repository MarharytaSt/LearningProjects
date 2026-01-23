import { Button, Card, Row, Col, Typography } from "antd";

const {Title, Text} = Typography;

const MainPage = () => {
    return(
        <div className="main-page" style={{padding: "24px"}}>
            <Button type="primary" size="large" style={{marginBottom: "24px"}} className="main-page_btn">
                Добавить счет
            </Button>

            <Row gutter={[16, 16]}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Col xs={24} sm={12} md={8} key={item}>
                        <Card hoverable>
                            <Title level={4}>Название счёта</Title>
                            <Text strong style={{display: "block", fontSize: 18}}>100$</Text>
                            <Text type="secondary">Участников: 3</Text>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default MainPage;