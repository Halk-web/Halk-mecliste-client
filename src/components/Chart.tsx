import React, { useEffect, useState } from 'react';
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
import "../styles/Chart.css";

// Yardımcı fonksiyon: Parti isimlerini kısaltma
const abbreviatePartyName = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
        return parts.map(part => part.charAt(0).toUpperCase()).join('');
    }
    return name.length > 6 ? `${name.slice(0, 3)}...` : name;
};

// Yardımcı fonksiyon: Şehir isimlerini kısaltma
const abbreviateCityName = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
        return parts.map(part => part.charAt(0).toUpperCase()).join('');
    }
    return name.length > 6 ? `${name.slice(0, 3)}...` : name;
};

// Yardımcı fonksiyon: Partileri kısaltmak ve "Diğer" kategorisini eklemek
const processPartyData = (partyData: { party: string, value: number }[]) => {
    const sortedParties = [...partyData].sort((a, b) => b.value - a.value);
    const topThreeParties = sortedParties.slice(0, 3);
    const otherPercentage = sortedParties.slice(3).reduce((acc, party) => acc + party.value, 0);

    const processedData = topThreeParties.map(party => ({
        party: abbreviatePartyName(party.party),
        value: party.value
    }));
    if (otherPercentage > 0) {
        processedData.push({
            party: 'DİĞ',
            value: otherPercentage
        });
    }

    return processedData;
};

// Yardımcı fonksiyon: Şehirleri kısaltmak ve "Diğer" kategorisini eklemek
const processCityData = (cityData: { city: string, value: number }[]) => {
    const sortedCities = [...cityData].sort((a, b) => b.value - a.value);
    const topThreeCities = sortedCities.slice(0, 3);
    const otherPercentage = sortedCities.slice(3).reduce((acc, city) => acc + city.value, 0);

    const processedData = topThreeCities.map(city => ({
        city: abbreviateCityName(city.city),
        value: city.value
    }));
    if (otherPercentage > 0) {
        processedData.push({
            city: 'DİĞ',
            value: otherPercentage
        });
    }

    return processedData;
};

const ChartPiety = (props: any) => {
    const { open, setOpen, post } = props;

    const [partyVoteRight, setPartyVoteRight] = useState<any[]>([]);
    const [partyVoteWrong, setPartyVoteWrong] = useState<any[]>([]);
    const [cityVoteRight, setCityVoteRight] = useState<any[]>([]);
    const [cityVoteWrong, setCityVoteWrong] = useState<any[]>([]);

    const [accordingToGenderRight, setAccordingToGenderRight] = useState([
        { name: 'Erkek', value: 0 },
        { name: 'Kadın', value: 0 },
    ]);

    const [accordingToGenderWrong, setAccordingToGenderWrong] = useState([
        { name: 'Erkek', value: 0 },
        { name: 'Kadın', value: 0 },
    ]);

    useEffect(() => {
        // Cinsiyet dağılımını hesapla
        const femalesRight = post?.liked_by.filter((profile: any) => profile.gender === "Kadın").length;
        const malesRight = post?.liked_by.filter((profile: any) => profile.gender === "Erkek").length;
        const femalesWrong = post?.disliked_by.filter((profile: any) => profile.gender === "Kadın").length;
        const malesWrong = post?.disliked_by.filter((profile: any) => profile.gender === "Erkek").length;
    
        setAccordingToGenderRight([
            { name: 'Erkek', value: ((malesRight * 100) / (femalesRight + malesRight)) },
            { name: 'Kadın', value: ((femalesRight * 100) / (femalesRight + malesRight)) }
        ]);
    
        setAccordingToGenderWrong([
            { name: 'Erkek', value: ((malesWrong * 100) / (femalesWrong + malesWrong)) },
            { name: 'Kadın', value: ((femalesWrong * 100) / (femalesWrong + malesWrong)) }
        ]);
    
        // Reduce ile partileri ve şehirleri grupla
        const { partyMapRight, partyMapWrong, cityMapRight, cityMapWrong } = post?.liked_by.concat(post.disliked_by).reduce(
            (acc: any, profile: any) => {
                const isLiked = post.liked_by.includes(profile);
                const voteType = isLiked ? "Right" : "Wrong";
    
                // Parti gruplama
                acc[`partyMap${voteType}`][profile.party] = (acc[`partyMap${voteType}`][profile.party] || 0) + 1;
    
                // Şehir gruplama
                acc[`cityMap${voteType}`][profile.city] = (acc[`cityMap${voteType}`][profile.city] || 0) + 1;
    
                return acc;
            },
            { partyMapRight: {}, partyMapWrong: {}, cityMapRight: {}, cityMapWrong: {} }
        );
    
        const totalRight = femalesRight + malesRight;
        const totalWrong = femalesWrong + malesWrong;
    
        const partyDataRight = Object.entries(partyMapRight).map(([party, count]) => ({
            party,
            value: (count as number * 100) / totalRight
        }));
        const partyDataWrong = Object.entries(partyMapWrong).map(([party, count]) => ({
            party,
            value: (count as number * 100) / totalWrong
        }));
    
        setPartyVoteRight(processPartyData(partyDataRight));
        setPartyVoteWrong(processPartyData(partyDataWrong));
    
        const cityDataRight = Object.entries(cityMapRight).map(([city, count]) => ({
            city,
            value: (count as number * 100) / totalRight
        }));
        const cityDataWrong = Object.entries(cityMapWrong).map(([city, count]) => ({
            city,
            value: (count as number * 100) / totalWrong
        }));
    
        setCityVoteRight(processCityData(cityDataRight));
        setCityVoteWrong(processCityData(cityDataWrong));
    
    }, [post]);    

    const handleClose = () => {
        setOpen(false);
    }; 

    const COLORS = ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'];

    return (
        <React.Fragment>
            <Row style={{ marginTop: '200px' }}>
                <Modal
                    show={open}
                    onHide={handleClose}
                    dialogClassName="custom-modal"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <div style={{ backgroundColor: 'white', width: '100%' }}>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                <h6>Oyların Dağılımı</h6>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ flex: 1, marginRight: '10px' }}>
                                        <h6>Cinsiyete göre Haklı bulanlar</h6>
                                        <ResponsiveContainer width="100%" height={400}>
                                            <PieChart>
                                                <Pie
                                                    data={accordingToGenderRight}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius="80%"
                                                    labelLine={false}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {accordingToGenderRight.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => `${value}%`} />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div style={{ flex: 1, marginLeft: '10px' }}>
                                        <h6>Cinsiyete göre Haksız bulanlar</h6>
                                        <ResponsiveContainer width="100%" height={400}>
                                            <PieChart>
                                                <Pie
                                                    data={accordingToGenderWrong}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius="80%"
                                                    labelLine={false}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {accordingToGenderWrong.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value:any) => `${value}%`} />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, marginRight: '10px' }}>
                        <h6>Partiye göre Haklı bulanlar</h6>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={partyVoteRight}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="party" />
                                <YAxis />
                                <Tooltip formatter={(value) => `${value}%`} />
                                <Legend />
                                <Bar dataKey="value" fill="#36A2EB" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ flex: 1, marginLeft: '10px' }}>
                        <h6>Partiye göre Haksız bulanlar</h6>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={partyVoteWrong}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="party" />
                                <YAxis />
                                <Tooltip formatter={(value) => `${value}%`} />
                                <Legend />
                                <Bar dataKey="value" fill="#FF6384" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ flex: 1, marginRight: '10px' }}>
                                        <h6>Şehirlere göre Haklı bulanlar</h6>
                                        <ResponsiveContainer width="100%" height={400}>
                                            <BarChart
                                                data={cityVoteRight}
                                                layout="vertical"
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis type="number" />
                                                <YAxis type="category" dataKey="city" />
                                                <Tooltip formatter={(value:any) => `${value.toFixed(2)}%`} />
                                                <Bar dataKey="value" fill="green"/>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div style={{ flex: 1, marginLeft: '10px' }}>
                                        <h6>Şehirlere göre Haksız bulanlar</h6>
                                        <ResponsiveContainer width="100%" height={400}>
                                            <BarChart
                                                data={cityVoteWrong}
                                                layout="vertical"
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis type="number" />
                                                <YAxis type="category" dataKey="city" />
                                                <Tooltip formatter={(value:any) => `${value.toFixed(2)}%`} />
                                                <Bar dataKey="value" fill="red" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </div>
                </Modal>
            </Row>
        </React.Fragment>
    );
};

export default ChartPiety;
