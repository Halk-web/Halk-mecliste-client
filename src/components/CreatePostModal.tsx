//chatgbt mesaj önce bir ekrana yazdırayım dedim ama hata verdi
// Uncaught runtime errors:
// ERROR
// Buffer is not defined
// ./src/components/CreatePostModal.tsx/CreatePostModal/handleSubmit/reader.onload@http://localhost:3000/main.14672c490c34080fb467.hot-update.js:49:24
// EventHandlerNonNull*handleSubmit@http://localhost:3000/main.14672c490c34080fb467.hot-update.js:47:7
// callCallback@http://localhost:3000/static/js/bundle.js:47716:18
// invokeGuardedCallbackDev@http://localhost:3000/static/js/bundle.js:47760:20
// invokeGuardedCallback@http://localhost:3000/static/js/bundle.js:47817:35
// invokeGuardedCallbackAndCatchFirstError@http://localhost:3000/static/js/bundle.js:47831:29
// executeDispatch@http://localhost:3000/static/js/bundle.js:51974:46
// processDispatchQueueItemsInOrder@http://localhost:3000/static/js/bundle.js:52000:26
// processDispatchQueue@http://localhost:3000/static/js/bundle.js:52011:41
// dispatchEventsForPlugins@http://localhost:3000/static/js/bundle.js:52020:27
// ./node_modules/react-dom/cjs/react-dom.development.js/dispatchEventForPluginEventSystem/<@http://localhost:3000/static/js/bundle.js:52180:16
// batchedUpdates$1@http://localhost:3000/static/js/bundle.js:66598:16
// batchedUpdates@http://localhost:3000/static/js/bundle.js:47564:16
// dispatchEventForPluginEventSystem@http://localhost:3000/static/js/bundl

import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const CreatePostModal = (props: any) => {
    const [title,setTitle]=useState<string>("");
    const [description,setDescription]=useState<string>("");
    const [file, setFile] = useState(null);
    const { open, setOpen } = props;

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChange=(e:any)=>{
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (event:any) => {
        event.preventDefault();

        if (file) {
            const reader = new FileReader();
            reader.onload = async function(e:any){
                const arrayBuffer = e.target.result;
                const buffer = Buffer.from(arrayBuffer);
                const postData = {
                    title,
                    description,
                    image: buffer.toString('base64'),  // Buffer'ı Base64 formatına çevir ve gönder
                };

                try {
                    console.log("Post data=",postData)
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            };
            reader.readAsArrayBuffer(file);  // Dosyayı ArrayBuffer olarak oku
        } else {
            console.error('No file selected');
        }
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
