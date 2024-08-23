import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/messages.css";

const Message = () => {
    return (
        <>
            <Card style={{ width:"85%",margin:"auto",marginTop: "160px"}}>
                <Card.Header>
                    <h6>Sohbet</h6>
                </Card.Header>
                <Card.Body className="message-outer">
                    <ul className="message-body">
                        <li className="my-message">hjdkdhadh djkhd</li>
                        <li className="message">djkashdjkashdk jsdkj sdhjd</li>
                        <li className="my-message">hjdkdhadh djkhd</li>
                        <li className="message">djkashdjkashdk jsdkj sdhjd</li>
                        <li className="my-message">hjdkdhadh djkhd</li>
                        <li className="message">djkashdjkashdk jsdkj sdhjd</li>
                        <li className="message">djkashdjkashdk jsdkj sdhjd</li>
                    </ul>
                </Card.Body>
                <div className="d-flex align-items-center mt-3">
                            <div className="flex-shrink-0">
                            
                            </div>
                            <div className="flex-grow-1 me-3">
                                <div className="input-comment">
                                    <input type="email" className="form-control" placeholder="mesaj yaz..." />
                                    <ul className="list-inline start-0 mb-0">
                                        <li className="list-inline-item border-end pe-2 me-2">
                                            <Link to="#" className="avtar avtar-xs btn-link-warning">
                                                <i className="ti ti-mood-smile f-18"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                    <ul className="list-inline end-0 mb-0">
                                        <li className="list-inline-item">
                                            <Link to="#" className="avtar avtar-xs btn-link-secondary">
                                                <i className="ti ti-photo f-18"></i>
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="#" className="avtar avtar-xs btn-link-secondary">
                                                <i className="ti ti-paperclip f-18"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                            <Link to="#" className="avtar avtar-s btn btn-primary">
                                <i className="ti ti-send f-18"></i>
                            </Link>
                            </div>
                        </div>
            </Card>
        </>
    );
};

export default Message;
