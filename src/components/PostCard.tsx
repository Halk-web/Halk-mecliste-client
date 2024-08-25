import React, { useEffect, useState } from 'react';
import { Card, Dropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ChartPiety from './Chart';
import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { DislikePostThunk, LikePostThunk } from '../store/Thunk/PostThunk';
import { AppDispatch } from '../store/store';

const PostCard = (props: any) => {
  const { profile, title, description, created_at, image, id, liked_by, disliked_by } = props.post;
  const [likesCount, setLikesCount] = useState(liked_by.length);
  const [dislikesCount, setDislikesCount] = useState(disliked_by.length);
  const [open, setOpen] = useState<boolean>(false);
  const [postUser, setPostUser] = useState<any>();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const {findOneById ,user} = useAuth();
  const [liked, setLiked] = useState(liked_by.some((item: any) => item.user_id === user?.id));
  const [disliked, setDisliked] = useState(disliked_by.some((item: any) => item.user_id === user?.id));
  const dispatch = useDispatch<AppDispatch>();


  const fetchData = async () => {
    const userId = profile.user_id;

    if (image) {
      setImageSrc(`data:image/jpeg;base64,${image}`);
    }

    try {
      const userData = await findOneById(userId);
      setPostUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    console.log("posts=",props.post);
    console.log(`liked=${liked} disliked=${disliked}`);
    fetchData();
  }, [user]);


  const handleLike = async () => {
    try {
        if (!liked) {
            if (disliked) {
                await dispatch(DislikePostThunk({ post_id: id, profile_id: user?.profile.id }));
                setDislikesCount((prevCount:any) => prevCount - 1);
                setDisliked(false);
            }
            const response = await dispatch(LikePostThunk({ post_id: id, profile_id: user?.profile.id }));
            setLikesCount((prevCount:any)  => prevCount + 1);
            setLiked(true);
        } else {
            const response = await dispatch(DislikePostThunk({ post_id: id, profile_id: user?.profile.id }));
            setLikesCount((prevCount:any)  => prevCount - 1);
            setLiked(false);
        }
    } catch (error) {
        console.error('Error liking post:', error);
    }
};

const handleDislike = async () => {
    try {
        if (!disliked) {
            if (liked) {
                await dispatch(DislikePostThunk({ post_id: id, profile_id: user?.profile.id }));
                setLikesCount((prevCount:any)  => prevCount - 1);
                setLiked(false);
            }
            else{
              await dispatch(DislikePostThunk({ post_id: id, profile_id: user?.profile.id }));
            }
            
            setDislikesCount((prevCount:any)  => prevCount + 1);
            setDisliked(true);
          
        } else {
            const response = await dispatch(DislikePostThunk({ post_id: id, profile_id: user?.profile.id }));
            
              setDislikesCount((prevCount:any)  => prevCount - 1);
              setDisliked(false);
            
        }
    } catch (error) {
        console.error('Error disliking post:', error);
    }
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
              <h5 className="mb-0">{postUser && postUser.username}</h5>
              <span className="text-sm text-muted">{postUser && postUser.politicalView}</span>
            </div>
          </div>
          <Dropdown>
            <Dropdown.Toggle as="a"
              className="avtar avtar-xs btn-link-secondary dropdown-toggle arrow-none" style={{ cursor: "pointer" }}
            ><i className="material-icons-two-tone f-18">more_vert</i></Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end">
              {(postUser && (postUser.id === user?.id)) ? <Dropdown.Item href="#">Sil</Dropdown.Item> : ""}
              <Dropdown.Item onClick={() => { setOpen(true) }}>İstatistikler</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body style={{ padding: 0 }}>
          <Card.Img
            variant="top"
            src={imageSrc ? imageSrc : 'https://via.placeholder.com/500x300'}
            style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
          />

          <div className="comment-content p-3">
            <h5>{title}</h5>
            <p className="mb-2 mt-3">
              {description}
            </p>
          </div>
        </Card.Body>
        <Card.Footer
          className="d-flex justify-content-between align-items-center flex-column"
          style={{ backgroundColor: '#f8f9fa', padding: '10px 15px' }}
        >
          <div className="w-100 d-flex justify-content-between">
            <span style={{ fontSize: '0.9em', color: '#6c757d' }}>{created_at && created_at}</span>
            <a
              href='/message'
              type='button'
              style={{ fontSize: '0.9em', padding: '5px 10px', backgroundColor: "grey", color: "white", textDecoration: "none" }}
            >
              Mesajlaş
            </a>
          </div>
          <div className="w-100 d-flex align-items-center mt-3">
            <Link to="#" className="btn btn-link-dark" onClick={handleLike}>
              <i className="ph-duotone ph-thumbs-up me-1"></i> {likesCount}<small className="text-muted">Doğru Karar</small>
            </Link>
            <Link to="#" className="btn btn-link-dark" onClick={handleDislike}>
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
