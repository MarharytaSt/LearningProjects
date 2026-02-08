import { Button, Space, Typography, Card, Table } from "antd";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { EditAccountRoute } from "../../settings/appRoutes";
import splitwiseApi from '../../api/splitwiseApi';

const { Text } = Typography;

const TransactionsHistoryPage = () => {
    const { id } = useParams();
    const [account, setAccount] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            const data = await splitwiseApi.getAccountById(id);
            setAccount(data);
        };
        load();
    }, [id])

    if (!account) return <div>Загрузка...</div>

    const transactions = account.participants.flatMap((p) =>
        (p.transactions || []).map((t) => ({
            participant: p.name,
            amount: t.amount,
            date: t.date,
            key: `${p.name}-${t.date}-${t.amount}`,
        }))
    );

    const columns = [
        {
            title: "Участник",
            dataIndex: "participant",
            key: "participant",
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: "Сумма",
            dataIndex: "amount",
            key: "amount",
            render: (value) => <Text strong>{value} $</Text>,
        },
        {
            title: "Дата",
            dataIndex: "date",
            key: "date",
            render: (value) => (
                <Text>{new Date(value).toLocaleString("ru-RU", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                })}
                </Text>
            ),
        },
        {
            title: "Действия",
            key: "actions",
            render: () => (
                <Space>
                    <Button type="link">Редактировать</Button>
                    <Button danger type="link">Удалить</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="transactions-history-page" style={{ padding: "24px", maxWidth: 1000, margin: "0 auto" }}>
            <Card>
                <div
                    style={{
                        padding: "10px 14px",
                        background: "#fafafa",
                        borderRadius: 6,
                        border: "1px solid #e8e8e8"
                    }}
                >
                    <Text strong>Название счёта: </Text>
                    <Text>{account.name}</Text>

                </div>
                <Button
                    style={{ marginTop: 16, marginBottom: 16 }}
                    onClick={() => navigate(EditAccountRoute(id))}
                >
                    Назад
                </Button>

                <Card>
                    <Table
                        dataSource={transactions}
                        columns={columns}
                        pagination={false}
                    />
                </Card>
            </Card>
        </div>
    )
}

export default TransactionsHistoryPage;