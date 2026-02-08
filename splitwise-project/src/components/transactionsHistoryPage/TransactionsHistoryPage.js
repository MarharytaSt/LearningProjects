import { Button, Space, Typography, Card, Table, Modal, Input, Select } from "antd";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { EditAccountRoute } from "../../settings/appRoutes";
import splitwiseApi from '../../api/splitwiseApi';

const { Text } = Typography;

const TransactionsHistoryPage = () => {
    const { id } = useParams();
    const [account, setAccount] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        transactionId: "",
        participant: "",
        amount: "",
        date: ""
    });

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
            transactionId: t._id,
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
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => {
                            setEditForm({
                                transactionId: record.transactionId,
                                participant: record.participant,
                                amount: record.amount,
                                date: record.date
                            });
                            setIsEditModalOpen(true);
                        }}
                    >
                        Редактировать</Button>
                    <Button
                        danger
                        type="link"
                        onClick={() => {
                            setTransactionToDelete(record.transactionId);
                            setIsDeleteModalOpen(true);
                        }}
                    >
                        Удалить</Button>
                </Space>
            ),
        },
    ];

    const handleDelete = async () => {
        await splitwiseApi.deleteTransaction(id, transactionToDelete);

        const updated = await splitwiseApi.getAccountById(id);
        setAccount(updated);

        setIsDeleteModalOpen(false);
    }

    const handleEdit = async () => {
        await splitwiseApi.updateTransaction(id, editForm);

        const updated = await splitwiseApi.getAccountById(id);
        setAccount(updated);

        setIsEditModalOpen(false);
    }

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
            <Modal
                title={
                    <span style={{ color: "red", dispaly: "flex", alignItems: "center", gap: 8 }}>
                        Удалить историю этой транзакции?
                    </span>}
                open={isDeleteModalOpen}
                onCancel={() => setIsDeleteModalOpen(false)}
                okText="Удалить"
                okType="danger"
                cancelText="Отмена"
                onOk={handleDelete}
            >
            </Modal>
            <Modal
                title="Редактировать транзакцию"
                open={isEditModalOpen}
                onCancel={() => setIsEditModalOpen(false)}
                okText="Сохранить"
                cancelText="Отмена"
                onOk={handleEdit}
            >
                <Space orientation='vertical' style={{ width: "100%" }}>
                    <Select
                        value={editForm.participant}
                        onChange={(value) => setEditForm({ ...editForm, participant: value })}
                        style={{ width: "100%" }}
                    >
                        {account.participants.map((p) => (
                            <Select.Option key={p.name} value={p.name}>
                                {p.name}
                            </Select.Option>
                        ))}
                    </Select>

                    <Input
                        value={editForm.amount}
                        onChange={(e) =>
                            setEditForm({ ...editForm, amount: e.target.value })
                        }
                        placeholder="Сумма"
                    />

                    <Input
                        type="datetime-local"
                        value={editForm.date.slice(0, 16)}
                        onChange={(e) =>
                            setEditForm({ ...editForm, date: e.target.value })
                        }
                        placeholder="Сумма"
                    />
                </Space>
            </Modal>
        </div>
    )
}

export default TransactionsHistoryPage;