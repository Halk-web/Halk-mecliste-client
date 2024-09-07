
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Dropdown, Form, Image } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import "../styles/messages.css";
import { database } from "../config/FireRTDB.config";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import "moment/locale/tr";
import { v4 as uuidv4 } from 'uuid';
import receiveSound from "../assets/audios/message-sound.mp3";

moment.locale("tr");

const Message = () => {
    const [curMessage, setCurMessage] = useState("");
    const { postId } = useParams<any>();
    const [messages, setMessages] = useState<any[]>([]);
    const { user } = useAuth();
    const [replyToMessage, setReplyToMessage] = useState<any>(null); // Yanıtlanan mesajı tutan state

    const receiveAudio = new Audio(receiveSound);

    const playSound = () => {
        const audio = new Audio(receiveSound);
        audio.play().catch(error => {
            console.error("Failed to play the sound:", error);
        });
    };

    useEffect(() => {
        const messageRef = database.ref(`messages/${postId}`);
        const fetchAllMessages = async () => {
            if (postId) {
                try {
                    messageRef.on("value", (snapshot: any) => {
                        const data = snapshot.val();
                        const messageList = data ? Object.values(data).sort((a: any, b: any) => {
                            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                        }) : [];
                        setMessages(messageList);

                        // Ses çalma
                        if (messageList.length > messages.length) {
                            const latestMessage: any = messageList[messageList.length - 1];
                            if (latestMessage.user_id !== user?.id) {
                                playSound();
                            }
                        }
                    });
                } catch (error) {
                    console.error("Failed to fetch messages:", error);
                }
            }
        };

        fetchAllMessages();
        return () => messageRef.off();
    }, [postId]);

    const handleChangeMessage = (e: any) => {
        setCurMessage(e.target.value);
    };

    const formatDate = (date: string) => {
        const messageDate = moment(date);
        if (messageDate.isSame(moment(), "day")) {
            return "Bugün";
        } else if (messageDate.isSame(moment().subtract(1, "days"), "day")) {
            return "Dün";
        } else {
            return messageDate.format("LL");
        }
    };

    const groupMessagesByDate = (messages: any[]) => {
        return messages.reduce((groups: any, message: any) => {
            const date = formatDate(message.created_at);
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
            return groups;
        }, {});
    };

    const addMessage = async (e: any) => {
        e.preventDefault();

        const uuid = uuidv4();
        const messageRef = database.ref(`messages/${postId}/${uuid}`);
        if (postId && user?.username && user?.id && curMessage.trim() !== "") {
            const messageData = {
                id: uuid,
                username: user?.username,
                user_id: user?.id,
                message_title: curMessage,
                post_id: postId,
                created_at: new Date().toISOString(),
                reply_to: replyToMessage ? replyToMessage.id : null, // Yanıtlanan mesaj ID'si
            };

            await messageRef.set(messageData);
            setCurMessage("");
            setReplyToMessage(null); // Yanıtlanan mesaj sıfırlanır
        }
    };

    const deleteMessage = async (messageId: string) => {
        try {
            const messageRef = database.ref(`messages/${postId}/${messageId}`);
            await messageRef.remove();
        } catch (error) {
            console.error("Failed to delete message:", error);
        }
    };

    const handleReply = (message: any) => {
        setReplyToMessage(message); // Yanıtlanan mesaj set ediliyor
    };

    const groupedMessages = groupMessagesByDate(messages);

    return (
        <>
            <div className="chat-content" style={{ marginTop: "60px" }}>
                <Card className="bg-body shadow-none mb-0">
                    <SimpleBar className="scroll-block chat-message message-outer" data-simplebar="init" style={{ height: "70vh" }}>
                        <Card.Body>
                            {Object.keys(groupedMessages).map((date) => (
                                <div key={date}>
                                    <div className="text-center text-muted mb-3">{date}</div>
                                    {groupedMessages[date].map((message: any) => (
                                        <React.Fragment key={message.id}>
                                            {message.user_id === user?.id ? (
                                                <div className="message-out">
                                                    <div className="d-flex align-items-end flex-column">
                                                        <p className="mb-1 text-muted"><small>{moment(message.created_at).format("HH:mm")}</small></p>
                                                        <div className="message d-flex align-items-end flex-column">
                                                            {message.reply_to && (
                                                                <div className="reply-message">
                                                                    <p className="mb-0 text-muted">Yanıtlanan: {messages.find(m => m.id === message.reply_to)?.message_title}</p>
                                                                </div>
                                                            )}
                                                            <div className="d-flex align-items-center mb-1 chat-msg">
                                                                <div className="flex-shrink-0">
                                                                    <ul className="list-inline ms-auto mb-0 chat-msg-option">
                                                                        <li className="list-inline-item">
                                                                            <Dropdown>
                                                                                <Dropdown.Toggle as="a" className="avtar avtar-xs btn-link-secondary arrow-none" href="#" style={{textDecoration:"none"}}>
                                                                                    <i className="ti ti-dots-vertical f-18"></i>
                                                                                </Dropdown.Toggle>
                                                                                <Dropdown.Menu>
                                                                                    <Dropdown.Item onClick={() => deleteMessage(message.id)}><i className="ti ti-copy"></i> Sil</Dropdown.Item>
                                                                                </Dropdown.Menu>
                                                                            </Dropdown>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="flex-grow-1 ms-3">
                                                                    <div className="msg-content bg-primary">
                                                                        <p className="mb-0">{message.message_title}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p className="mb-0 text-muted"><small>Siz</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="message-in">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1 mx-3">
                                                            <div className="d-flex align-items-start flex-column">
                                                                <p className="mb-1 text-muted"><small>{moment(message.created_at).format("HH:mm")}</small></p>
                                                                <div className="message d-flex align-items-start flex-column">
                                                                    {message.reply_to && (
                                                                        <div className="reply-message">
                                                                            <p className="mb-0 text-muted">Yanıtlanan: {messages.find(m => m.id === message.reply_to)?.message_title}</p>
                                                                        </div>
                                                                    )}
                                                                    <div className="d-flex align-items-center mb-1 chat-msg">
                                                                        <div className="flex-shrink-0">
                                                                            <ul className="list-inline ms-auto mb-0 chat-msg-option">
                                                                                <li className="list-inline-item">
                                                                                    <Dropdown>
                                                                                        <Dropdown.Toggle as="a" className="avtar avtar-xs btn-link-secondary arrow-none" href="#" style={{textDecoration:"none"}}>
                                                                                            <i className="ti ti-dots-vertical f-18"></i>
                                                                                        </Dropdown.Toggle>
                                                                                        <Dropdown.Menu>
                                                                                            <Dropdown.Item href={`/profile/${message?.user_id}`}><i className="ti ti-copy"></i> Profili Ziyaret Et</Dropdown.Item>
                                                                                            <Dropdown.Item onClick={() => handleReply(message)}><i className="ti ti-copy"></i> Cevap Ver</Dropdown.Item>
                                                                                        </Dropdown.Menu>
                                                                                    </Dropdown>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div className="flex-grow-1 me-3">
                                                                            <div className="msg-content card mb-0">
                                                                                <p className="mb-0">{message.message_title}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <p className="mb-0 text-muted"><small>{message.username}</small></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            ))}
                        </Card.Body>
                    </SimpleBar>
                </Card>
                {replyToMessage && (
                    <div className="replying-to">
                        <p>Yanıtlanan: {replyToMessage.message_title}</p>
                        <button className="btn btn-primary" onClick={() => setReplyToMessage(null)}>iptal et</button>
                    </div>
                )}
                <div className="card-footer border-top pt-2 px-3 pb-0">
                        <div className="input-group align-items-center">
                            <ul className="list-inline me-auto mb-0">
                                
                                <li className="list-inline-item">
                                    <Link to={`/profile/${user?.id}`} className="avtar avtar-xs btn-link-secondary" style={{textDecoration:"none"}}>

                                    <div className="position-relative">
                                        <Image 
                                        src={`${user?.profile.profile_img || "https://via.placeholder.com/80"}`}
                                        roundedCircle 
                                        style={{ marginRight: "15px", width: "40px", height: "40px" }}
                                       />
                                     </div>
                                        
                                    </Link>
                                </li>
                               
                            </ul>
                            <Form.Control type="text" className="shadow-none border-0 bg-transparent" placeholder="Mesajınızı yazın..." value={curMessage} onChange={(e:any)=>handleChangeMessage(e)} />
                            <ul className="list-inline ms-auto mb-0">
                                <li className="list-inline-item">
                                    <Link to="#" className="avtar avtar-s rounded-circlen btn btn-primary" onClick={addMessage}>
                                        <i className="ti ti-send f-18"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
            </div>
        </>
    );
};

export default Message;

                   

