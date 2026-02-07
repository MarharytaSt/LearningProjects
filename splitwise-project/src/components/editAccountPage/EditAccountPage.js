import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Divider, Form, Space, Modal, Input, message, Typography } from "antd";
import { MainPageRoute, AddTransactionPageRoute } from '../../settings/appRoutes';
import splitwiseApi from '../../api/splitwiseApi';


const { Text } = Typography;


const EditAccountPage = () => {
    const { id } = useParams();
    const [account, setAccount] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteInput, setDeleteInput] = useState("");

    const navigate = useNavigate();

    const splitTypeLabels = {
        equally: 'Поровну',
        shares: 'Долями'
    };

    useEffect(() => {
        const load = async () => {
            const data = await splitwiseApi.getAccountById(id);
            setAccount(data);
        };
        load();
    }, [id])

    if (!account) return <div>Загрузка...</div>

    const handleConfirmDelete = async () => {
        if (deleteInput !== account.name) {
            message.error("Название не совпадает!");
            return;
        }

        await splitwiseApi.deleteAccount(id);
        navigate(MainPageRoute);
    }

    return (
        <div className="edit-account-page" style={{ padding: "24px", maxWidth: 600, margin: "0 auto" }}>
            <Form layout='vertical'>
                <Form.Item label="Название счёта:">
                    <div
                        style={{
                            padding: "10px 14px",
                            background: "#fafafa",
                            borderRadius: 6,
                            border: "1px solid #e8e8e8"
                        }}
                    >
                        <Text strong>{account.name}</Text>
                    </div>
                </Form.Item>

                <Form.Item label="Тип разделения:">
                    <div
                        style={{
                            padding: "10px 14px",
                            background: "#fafafa",
                            borderRadius: 6,
                            border: "1px solid #e8e8e8"
                        }}
                    >
                        <Text strong>{splitTypeLabels[account.splitType]}</Text>
                    </div>
                </Form.Item>

                <Form.Item label="Общая сумма:">
                    <div
                        style={{
                            padding: "10px 14px",
                            background: "#fafafa",
                            borderRadius: 6,
                            border: "1px solid #e8e8e8"
                        }}
                    >
                        <Text strong style={{ fontSize: 20 }}>
                            {account.total || 0} $
                        </Text>
                    </div>
                </Form.Item>

                <Divider />

                <Form.Item>
                    <Space>
                        <Button type="primary" onClick={() => navigate(AddTransactionPageRoute(id))}>Добавить транзакцию</Button>
                        <Button>История транзакций</Button>
                        <Button danger onClick={() => setIsDeleteModalOpen(true)}>Удалить счёт</Button>
                        <Button onClick={() => navigate(MainPageRoute)}>
                            Назад
                        </Button>
                    </Space>
                </Form.Item>

                <Divider />

                <Card title="Баланс участников:" size="small">
                    <Space orientation='vertical' style={{ width: "100%" }}>
                        {account.participants.map((p => (
                            <div
                                key={p.name}
                                style={{
                                    padding: "8px 12px",
                                    background: "#fff",
                                    border: "1px solid #f0f0f0",
                                    borderRadius: 6
                                }}
                            >
                                <strong>{p.name}</strong>{""}
                                <span style={{ color: p.balance < 0 ? "red" : "green" }}>
                                    {p.balance} $
                                </span>

                            </div>
                        )))}
                    </Space>
                </Card>
            </Form>

            <Modal
                title={
                    <span style={{ color: "red", dispaly: "flex", alignItems: "center", gap: 8 }}>
                        Удалить счёт?
                    </span>}
                open={isDeleteModalOpen}
                onCancel={() => setIsDeleteModalOpen(false)}
                okText="Удалить"
                okType="danger"
                cancelText="Отмена"
                onOk={handleConfirmDelete}
            >
                <p>
                    Чтобы подтвердить удаление, введите название счёта
                </p>

                <Input
                    placeholder='Введеите название счёта'
                    value={deleteInput}
                    onChange={(e) => setDeleteInput(e.target.value)}
                />

            </Modal>
        </div>

    )
}

export default EditAccountPage;