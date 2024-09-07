import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { createPostThunk } from "../store/Thunk/PostThunk";
import { usePosts } from "../contexts/PostContext";

const CreatePostModal = (props: any) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const { user ,updateOneUserById} = useAuth();
    const {addPost}=usePosts();
    const dispatch = useDispatch();
    const { open, setOpen } = props;

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files ? e.target.files[0] : null);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const postData: any = {
            title,
            description,
            profile_id: user?.profile.id
        };

        if (file) {
            const reader = new FileReader();
            reader.onload = async function(e: ProgressEvent<FileReader>) {
                const arrayBuffer = e.target?.result as ArrayBuffer;
                const base64String = arrayBufferToBase64(arrayBuffer);
                postData.image = base64String;  // Görüntüyü base64 olarak ekle
                try {
                    const new_post=await dispatch(createPostThunk(postData) as any);
                    if(user?.id){
                        const updatedUser = await updateOneUserById(user?.id, { numberOfPosts: (user.numberOfPosts || 0) + 1 });
                    }
                    addPost({...new_post.payload,liked_by:[],disliked_by:[],profile:user?.profile});
                    setOpen(false); // Başarılı olduysa modalı kapat
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            };
            reader.readAsArrayBuffer(file);
        } else {
            try {
                const new_post=await dispatch(createPostThunk(postData) as any);
                if(user?.id){
                    const updatedUser = await updateOneUserById(user?.id, { numberOfPosts: (user.numberOfPosts || 0) + 1 });
                }
                addPost({...new_post.payload,liked_by:[],disliked_by:[],profile:user?.profile});
                setOpen(false);
            } catch (error) {
                console.error('Error uploading post:', error);
            }
        }
    };
    
    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    return (
        <Modal
            show={open}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ maxHeight: '80vh', overflowY: 'auto' }}
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
    );
}

export default CreatePostModal;
