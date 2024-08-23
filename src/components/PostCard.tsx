import React, { useState } from 'react';
import { Card, Button, Dropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ChartPiety from './Chart';

const PostCard = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(120);
  const [dislikesCount, setDislikesCount] = useState(10); 
  const [open,setOpen]=useState<boolean>(false);
  const creationDate = 'August 19, 2024'; 

  const handleLike = () => {
    if (!liked) {
      setLikesCount(likesCount + 1);
      if (disliked) setDislikesCount(dislikesCount - 1);
    } else {
      setLikesCount(likesCount - 1);
    }
    setLiked(!liked);
    setDisliked(false);
  };

  const handleDislike = () => {
    if (!disliked) {
      setDislikesCount(dislikesCount + 1);
      if (liked) setLikesCount(likesCount - 1);
    } else {
      setDislikesCount(dislikesCount - 1);
    }
    setLiked(false);
    setDisliked(!disliked);
  };

  return (
    <>
    <Card 
      style={{ 
        width: '100%', 
        maxWidth: '500px', 
        margin: '20px auto', 
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)', 
        borderRadius: '15px', 
        overflow: 'hidden' 
      }}
    >
      <Card.Header className="d-flex align-items-center justify-content-between" 
        style={{ backgroundColor: '#f8f9fa', padding: '10px 15px' }}>
        <div className="d-flex align-items-center">
          <Image 
            src="https://via.placeholder.com/50" 
            roundedCircle 
            style={{ marginRight: '10px', width: '50px', height: '50px' }} 
          />
          <div className="flex-grow-1 ms-3">
                <h5 className="mb-0">Yusuf</h5>
                <span className="text-sm text-muted">Muhafazakar</span>
        </div>
        </div>
        <Dropdown>
            <Dropdown.Toggle as="a"
                className="avtar avtar-xs btn-link-secondary dropdown-toggle arrow-none" style={{cursor:"pointer"}}
                ><i className="material-icons-two-tone f-18">more_vert</i></Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end">
                        <Dropdown.Item href="#">Sil</Dropdown.Item>
                        <Dropdown.Item onClick={(e:any)=>{setOpen(true)}}>İstatistikler</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
      </Card.Header>
      <Card.Body style={{ padding: 0 }}>
        <Card.Img 
          variant="top" 
          src="https://via.placeholder.com/500x300" 
          style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
        />

        <div className="comment-content p-3">
               <h5>Hayvan Hakları Yasası Meclisten Geçti</h5>
                <p className="mb-2 mt-3">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled it t make a type specimen book.
                </p>
        </div>
      </Card.Body>
      <Card.Footer 
        className="d-flex justify-content-between align-items-center flex-column" 
        style={{ backgroundColor: '#f8f9fa', padding: '10px 15px' }}
      >
        <div className="w-100 d-flex justify-content-between">
          <span style={{ fontSize: '0.9em', color: '#6c757d' }}>{creationDate}</span>
          <a
            href='/message'
            type='button'
            style={{ fontSize: '0.9em', padding: '5px 10px',backgroundColor:"grey",color:"white",textDecoration:"none" }}
          >
            Mesajlaş
          </a>
        </div>
        <div className="w-100 d-flex align-items-center mt-3">
        <Link to="#" className="btn btn-link-dark" onClick={(e:any)=>{handleLike()}}>
            <i className="ph-duotone ph-thumbs-up me-1"></i> {likesCount}<small className="text-muted">Doğru Karar</small>
        </Link>
        <Link to="#" className="btn btn-link-dark" onClick={(e:any)=>{handleDislike()}}>
            <i className="ph-duotone ph-thumbs-down me-1"></i> {dislikesCount}<small className="text-muted">Yanlış Karar</small>
        </Link>   
        </div>
      </Card.Footer>
    </Card>
    <ChartPiety open={open} setOpen={setOpen}></ChartPiety>
    </>
  );
};

export default PostCard;
