import React, { useEffect, useState, useMemo } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserCards = () => {
    const [users, setUsers] = useState<any>([]);
    const { findAll } = useAuth();
    const { user } = useAuth();

    useEffect(() => {
        const fetchAllUsers = async () => {
            const allUsers = await findAll();
            if (allUsers) {
                console.log("all users=", allUsers);
                setUsers(allUsers);
            }
        };
        fetchAllUsers();
    }, [findAll]);

    // Memoizing the mapped user cards to optimize performance
    const userCards = useMemo(() => {
        return users
            ?.filter((item: any) => user?.id !== item?.id) // Avoid showing the current user
            .map((item: any) => (
                <Col md={6} xl={4} key={item?.id}>
                    <Card className="user-card">
                        <Card.Body>
                            <a href={`/profile/${item?.id}`}>
                                <div
                                    className="chat-avtar card-user-image"
                                    style={{ cursor: "pointer" }}
                                >
                                    <img
                                        src={item?.profile?.profile_img || "https://via.placeholder.com/80"}
                                        className="img-thumbnail rounded-circle"
                                        style={{ height: "70px" }}
                                    />
                                    <i className="chat-badge bg-danger"></i>
                                </div>
                            </a>
                            <div className="d-flex">
                                <div className="flex-grow-1 ms-2">
                                    <h6 className="mb-1">{item?.username}</h6>
                                    <p className="text-muted text-sm mb-0">
                                        Mail{" "}
                                        <Link to="#" className="text-primary">
                                            {item?.email}
                                        </Link>
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <a
                                        href={`/home/${item?.profile?.id}`}
                                        className="btn btn-outline-primary btn-sm ms-1"
                                    >
                                        OTURUMLAR
                                    </a>
                                </div>
                            </div>
                            <div className="row g-3 my-2 text-center">
                                <div className="col-4">
                                    <small className="text-muted"></small>
                                </div>
                                <div className="col-4">
                                    <h5 className="mb-0">{item?.numberOfPosts}</h5>
                                    <small className="text-muted">oturum sayısı</small>
                                </div>
                            </div>
                            <div className="saprator my-2">
                                <span>SIYASI</span>
                            </div>
                            <div className="text-center">
                                <span className="badge bg-light-secondary border rounded-pill border-secondary bg-transparent f-14 me-1 mt-1">
                                    {item?.profile?.party}
                                </span>
                                &nbsp;
                                <span className="badge bg-light-secondary border rounded-pill border-secondary bg-transparent f-14 me-1 mt-1">
                                    {item?.profile?.politicalView}
                                </span>
                                &nbsp;
                                <span className="badge bg-light-secondary border rounded-pill border-secondary bg-transparent f-14 me-1 mt-1">
                                    {item?.profile?.city}
                                </span>
                                &nbsp;
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ));
    }, [users, user]);

    return (
        <React.Fragment>
            <Row style={{ marginTop: "100px" }}>
                {userCards} {/* Render memoized user cards */}
            </Row>
        </React.Fragment>
    );
};

export default UserCards;
