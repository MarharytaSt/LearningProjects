import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, Input, Select, Space, message } from "antd";
import { Link } from "react-router-dom";
import { MainPageRoute } from '../../settings/appRoutes';
import splitwiseApi from '../../api/splitwiseApi';
import FormItem from 'antd/es/form/FormItem';


const CreateAccountPage = () => {
    const [participants, setParticipants] = useState([
        { name: '', share: 0, transactions: [{ amount: 0, date: '' }] },
        { name: '', share: 0, transactions: [{ amount: 0, date: '' }] }
    ]);
    const [splitType, setSplitType] = useState('equally');
    const [accountName, setAccountName] = useState('');

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleAddParticipants = () => {
        const updated = [...participants, { name: '', share: '' }];
        setParticipants(recalcShares(updated));
    }

    const handleDeleteParticipants = (index) => {
        if (participants.length <= 2) return;

        const updated = participants.filter((_, i) => i !== index);
        setParticipants(recalcShares(updated));
    }

    const recalcShares = (list) => {
        if (splitType !== 'equally') return list;

        const share = (1 / list.length).toFixed(2);
        return list.map(p => ({ ...p, share }));
    };

    const handleSplitTypeChange = (value) => {
        setSplitType(value);

        if (value === 'equally') {
            setParticipants(recalcShares(participants));
        }
    }

    const handleNameChange = (index, value) => {
        setParticipants(prev => {
            const updated = [...prev];
            updated[index].name = value;
            return updated;
        });
    };

    const handleShareChange = (index, value) => {
        setParticipants(prev => {
            if (splitType === 'equally') return;
            const updated = [...prev];
            updated[index].share = value;
            return updated;
        })
    }

    const onSave = async (values) => {
        if (splitType === 'shares') {
            const total = participants.reduce((sum, p) => sum + Number(p.share || 0), 0);

            if (total < 0.99 || total > 1.01) {
                message.error("Сумма долей не верна");
                return;
            }
        }

        const payload = {
            name: values.accountName,
            splitType,
            participants: participants.map(p => ({
                name: p.name,
                share: Number(p.share),
                transactions: p.transactions || []
            }))
        };

        const result = await splitwiseApi.createAccount(payload);

        if (!result) {
            message.error("Ошибка при сохранении аккаунта!");
            return;
        }

        message.success("Аккаунт успешно создан!");

        form.resetFields();
        setParticipants([
            { name: '', share: 0, transactions: [] },
            { name: '', share: 0, transactions: [] }
        ]);
        setSplitType('equally');
        setAccountName('');

        navigate(MainPageRoute);
    }

    const onCancel = () => {
        form.resetFields();
        setParticipants([
            { name: '', share: 0, transactions: [] },
            { name: '', share: 0, transactions: [] }
        ]);
        setSplitType('equally');
        setAccountName('');

        navigate(MainPageRoute);
    }

    useEffect(() => {
        if (splitType === 'equally') {
            setParticipants(recalcShares(participants));
        }
    }, []);

    useEffect(() => {
        if (splitType === 'equally') {
            setParticipants(prev => recalcShares(prev));
        }
    }, [splitType]);


    return (
        <div className="create-account-page" style={{ padding: "24px", maxWidth: 600, margin: "0 auto" }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onSave}
                onFinishFailed={() => message.error("Заполните все поля!")}
            >
                <Form.Item
                    label="Название счёта"
                    name="accountName"
                    rules={[
                        { required: true, message: "Введите название счёта!" }
                    ]}
                >
                    <Input
                        placeholder='Введите название счёта'
                        value={accountName}
                        onChange={e => setAccountName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Тип разделения:">
                    <Select
                        value={splitType}
                        onChange={handleSplitTypeChange}
                        placeholder="Выберите вариант"
                        style={{ width: 200 }}
                        options={[
                            { value: "equally", label: "Поровну" },
                            { value: "shares", label: "Долями" }
                        ]}
                    />
                </Form.Item>
                {participants.map((participant, index) => (
                    <Row gutter={16} key={index}>
                        <Col span={12}>
                            <Form.Item
                                label="Имя участника"
                                name={["participants", index, "name"]}
                                rules={[
                                    { required: true, message: "Введите имя участника!" }
                                ]}
                            >
                                <Input
                                    placeholder="Имя"
                                    value={participant.name}
                                    onChange={e => handleNameChange(index, e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Доля"
                                validateStatus={
                                    splitType === "shares" && (!participant.share || isNaN(participant.share))
                                        ? "error"
                                        : ""
                                }
                                help={
                                    splitType === "shares" && (!participant.share || isNaN(participant.share))
                                        ? "Введите число!"
                                        : ""
                                }
                            >
                                <Input
                                    placeholder="Доля"
                                    value={participant.share}
                                    readOnly={splitType === 'equally'}
                                    inputMode='none'
                                    style={{
                                        color: 'black',
                                        opacity: 1,
                                        cursor: splitType === 'equally' ? 'default' : 'text'
                                    }}
                                    onChange={e => handleShareChange(index, e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        {participants.length > 2 && (
                            <Col span={24}>
                                <FormItem>
                                    <Button
                                        type="dashed"
                                        danger
                                        block
                                        onClick={() => handleDeleteParticipants(index)}
                                    >
                                        Удалить участника
                                    </Button>
                                </FormItem>
                            </Col>
                        )}
                    </Row>
                ))}

                <Form.Item>
                    <Button
                        type="dashed"
                        block
                        onClick={handleAddParticipants}
                    >
                        Добавить участника
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Space style={{ dispaly: "flex", justifyContent: "flex-end" }}>
                        <Button onClick={onCancel}>Отмена</Button>
                        <Button
                            type="primary"
                            htmlType='submit'
                        >
                            Сохранить</Button>
                    </Space>
                </Form.Item>
            </Form>

        </div>
    )
}

export default CreateAccountPage;


// {
//
//                                 }