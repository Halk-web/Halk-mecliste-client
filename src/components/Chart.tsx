import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import { Modal, Row } from 'react-bootstrap';

const ChartPiety = (props: any) => {
    const { open, setOpen } = props;

    const according_to_gender = [
        { name: 'Erkek', value: 40 },
        { name: 'Kadın', value: 60 },
    ];

    const party_vote_right = [
        { party: 'AKP', value: 30 },
        { party: 'CHP', value: 50 },
        { party: 'MHP', value: 10 },
        { party: 'HDP', value: 10 },
    ];

    const party_vote_wrong = [
        { party: 'AKP', value: 20 },
        { party: 'CHP', value: 60 },
        { party: 'MHP', value: 10 },
        { party: 'HDP', value: 10 },
    ];

    const handleClose = () => {
        setOpen(false);
    };

    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

    // Etiketleri özelleştirmek için fonksiyon
    const renderCustomizedLabel = (props: any) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = props;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
        const textAnchor = x > cx ? 'start' : 'end';
        const isFarFromCenter = Math.abs(x - cx) > outerRadius * 0.5;

        return (
            <text
                x={x}
                y={isFarFromCenter ? y : y + 10} // Daha yakın olan metinleri hafif aşağı kaydırarak daha iyi hizalayın
                fill="white"
                textAnchor={textAnchor}
                dominantBaseline="central"
                style={{ fontSize: '12px' }} // Yazı boyutunu biraz küçültün
            >
                {`${according_to_gender[index].name}: ${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <React.Fragment>
            <Row style={{ marginTop: '200px' }}>
                <Modal
                    show={open}
                    onHide={handleClose}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <div style={{ backgroundColor: 'white', width: '100%' }}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h6>Oyların Dağılımı</h6>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h6>Cinsiyete göre Yasayı/önergeyi haklı bulanlar</h6>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <ResponsiveContainer width="50%" height={400}>
                                    <PieChart>
                                        <Pie
                                            data={according_to_gender}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius="80%"
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {according_to_gender.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => `${value}%`} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>

                                <ResponsiveContainer width="50%" height={400}>
                                    <PieChart>
                                        <Pie
                                            data={according_to_gender}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius="80%"
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {according_to_gender.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => `${value}%`} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <h6 style={{ textAlign: 'center', marginTop: '30px' }}>Partilere göre Yasayı haklı bulanlar</h6>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <ResponsiveContainer width="45%" height={300}>
                                    <BarChart
                                        data={party_vote_right}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="party" />
                                        <YAxis />
                                        <Tooltip formatter={(value: number) => `${value}%`} />
                                        <Legend />
                                        <Bar dataKey="value" fill="#36A2EB" />
                                    </BarChart>
                                </ResponsiveContainer>

                                <ResponsiveContainer width="45%" height={300}>
                                    <BarChart
                                        data={party_vote_wrong}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="party" />
                                        <YAxis />
                                        <Tooltip formatter={(value: number) => `${value}%`} />
                                        <Legend />
                                        <Bar dataKey="value" fill="#FF6384" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Modal.Body>
                    </div>
                </Modal>
            </Row>
        </React.Fragment>
    );
};

export default ChartPiety;
