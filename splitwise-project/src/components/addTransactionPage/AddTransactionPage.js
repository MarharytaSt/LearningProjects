import { Button, Form, Space, Input, Select, Typography, InputNumber } from "antd";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { EditAccountRoute } from "../../settings/appRoutes";
import splitwiseApi from '../../api/splitwiseApi';


const { Text } = Typography;

const AddTransactionPage = () => {
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

    const onFinish = async (values) => {
        await splitwiseApi.addTransaction(id, {
            participant: values.participant,
            amount: Number(values.sumOfTransaction)
        });

        navigate(EditAccountRoute(id));
    }

    return (
        <div className="add-transaction-page" style={{ padding: "24px", maxWidth: 600, margin: "0 auto" }}>
            <Form onFinish={onFinish}>
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

                <Form.Item
                    label="Имя участника из списка:"
                    name="participant"
                    rules={[
                        { required: true, message: "Выберите участника!" }
                    ]}
                >

                    <Select
                        placeholder="Выберите участника"
                        style={{ width: 200 }}
                        options={account.participants.map(p => ({
                            value: p.name,
                            label: p.name
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    label="Сумма транзакции"
                    name="sumOfTransaction"
                    rules={[
                        { required: true, message: "Введите сумму транзакции!" },
                        {
                            validator(_, value) {
                                if(!value || Number(value) <= 0) {
                                    return Promise.reject("Сумма должна быть больше 0!");
                                }
                                const num = Number(value);

                                if(isNaN(num)) {
                                    return Promise.reject("Введите корректное число!");
                                }

                                if(num <= 0) {
                                    return Promise.reject("Сумма должна быть больше 0!");
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                >
                    <Input
                        style={{ width: "100%" }}
                        placeholder='Введите сумму транзакции'
                    />
                </Form.Item>

                <Form.Item>
                    <Space style={{ dispaly: "flex", justifyContent: "flex-end" }}>
                        <Button
                            type="primary"
                            htmlType='submit'
                        >
                            Сохранить</Button>
                        <Button onClick={() => navigate(EditAccountRoute(id))}>Назад</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddTransactionPage;