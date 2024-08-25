
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { createPostThunk } from "../store/Thunk/PostThunk";
import { useNavigate } from "react-router-dom";

const CreatePostModal = (props: any) => {
    const [title,setTitle]=useState<string>("");
    const [description,setDescription]=useState<string>("");
    const [file, setFile] = useState(null);
    const {user}=useAuth();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { open, setOpen } = props;

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChange=(e:any)=>{
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (file) {
            const reader = new FileReader();
            reader.onload = async function(e: ProgressEvent<FileReader>) {
                const arrayBuffer = e.target?.result as ArrayBuffer;
                const base64String = arrayBufferToBase64(arrayBuffer);
                console.log("Loggined user=",user);
    
                const postData = {
                    title,
                    description,
                    image: base64String,
                    profile_id:user?.profile.id
                };
    
                try {
                    console.log("Post data=", postData);
                    const new_post = await dispatch(createPostThunk(postData) as any);
                    setOpen(false);
                    alert("Oturum başarıyla oluşturuldu!");
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            };
            reader.readAsArrayBuffer(file);
        } else {
            console.error('No file selected');
        }
    };
    
    
    // ArrayBuffer'ı Base64 formatına dönüştüren yardımcı fonksiyon
    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };
    

    return (
        <>
            <Modal
                show={open}
                onHide={handleClose}
                size="lg" // Modal genişliğini artırır
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ maxHeight: '80vh', overflowY: 'auto' }} // Yüksekliği artırır ve taşan içerik için kaydırma ekler
            >
                <Modal.Header closeButton>
                    <Modal.Title>Yeni bir Oturum Başlat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Yasa veya önerge başlığı</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Resim yükle (isteğe bağlı)</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Yasa tanımı</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}/>
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" type="submit">Oturum Başlat</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreatePostModal;
