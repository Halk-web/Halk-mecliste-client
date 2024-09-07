
import React, { useEffect, useState,useMemo } from 'react';
import { Button, Card, Dropdown, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ChartPiety from './Chart';
import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { DeletePostThunk, DislikePostThunk, LikePostThunk } from '../store/Thunk/PostThunk';
import { AppDispatch } from '../store/store';
import moment from "moment";
import "moment/locale/tr";
import "moment-timezone";
import { database } from '../config/FireRTDB.config';
import { usePosts } from '../contexts/PostContext';

moment.locale("tr");

const PostCard = (props: any) => {
  const { profile, title, description, created_at, image, id, liked_by, disliked_by } = props.post;
  const {removePost}=usePosts();
  const [likesCount, setLikesCount] = useState<any>();
  const [dislikesCount, setDislikesCount] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [postUser, setPostUser] = useState<any>();
  const {findOneById ,user,updateOneUserById} = useAuth();
  const [liked, setLiked] = useState<boolean|null>();
  const [disliked, setDisliked] = useState<boolean>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate=useNavigate();
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    liked_by.some((item: any) => item?.user_id === user?.id) ? setLiked(true) : setLiked(false);
    disliked_by.some((item: any) => item?.user_id === user?.id) ? setDisliked(true) :setDisliked(false);
    setLikesCount(liked_by.length);
    setDislikesCount(disliked_by.length);
  }, [user,props.post]);

    // Memoize image source
    const imageSrc = useMemo(() => {
      return image ? `data:image/jpeg;base64,${image}` : 'https://via.placeholder.com/500x300';
    }, [image]);
  
    // Memoize formatted date
    const formattedDate = useMemo(() => {
      return created_at ? formatToTurkishDate(created_at) : '';
    }, [created_at]);
  

    const fetchData = useMemo(async () => {
    const userId = profile.user_id;
    console.log("props post=", props.post);

    try {
      const userData = await findOneById(userId);
      setPostUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [profile.user_id, findOneById]);

  
  function utcToLocal(utcdateTime: any, tz: any) {
    var zone = moment.tz(tz).format("Z");
    var zoneValue = zone.replace(/[^0-9: ]/g, "");
    var operator = zone && zone.split("") && zone.split("")[0] === "-" ? "-" : "+"; // operator for addition subtraction
    var localDateTime;
    var hours = zoneValue.split(":")[0];
    var minutes = zoneValue.split(":")[1];
    if (operator === "-") {
      localDateTime = moment(utcdateTime).subtract(hours, "hours").subtract(minutes, "minutes").format("YYYY-MM-DD HH:mm:ss");
    } else if (operator) {
      localDateTime = moment(utcdateTime).add(hours, "hours").add(minutes, "minutes").format("YYYY-MM-DD HH:mm:ss");
    } else {
      localDateTime = "Invalid Timezone Operator";
    }
    return localDateTime;
  }
  
  // UTC tarih ve saati Türkiye saat dilimine dönüştürüp istenen formata çeviren fonksiyon
  function formatToTurkishDate(utcdateTime: any) {
    // Türkiye saat dilimine dönüştür
    const localDateTime = utcToLocal(utcdateTime, 'Europe/Istanbul');
    
    // Dönüştürülmüş tarihi moment ile formatlayın
    const formattedDate = moment(localDateTime, 'YYYY-MM-DD HH:mm').format('DD MMMM YYYY HH.mm');
    
    // Türkçe ay isimlerini içeren sözlük
    const monthTranslations : { [key: string]: string }= {
      'January': 'Ocak',
      'February': 'Şubat',
      'March': 'Mart',
      'April': 'Nisan',
      'May': 'Mayıs',
      'June': 'Haziran',
      'July': 'Temmuz',
      'August': 'Ağustos',
      'September': 'Eylül',
      'October': 'Ekim',
      'November': 'Kasım',
      'December': 'Aralık'
    };
  
    // Ay isimlerini İngilizce'den Türkçe'ye çevirin
    const month = moment(formattedDate, 'DD MMMM YYYY HH.mm').format('MMMM');
    const translatedMonth = month;
    return formattedDate.replace(month, translatedMonth);
  }

  
  const handleLike = async () => {
    if (!user?.profile.id) return;

    setLoading(true);

    console.log("Liked here=",liked);
    console.log("disliked here=",disliked);
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
            setDislikesCount((prevCount:any)=>prevCount+1);
            setLiked(false);
            setDisliked(true);
        }
    } catch (error) {
        console.error('Error liking post:', error);
    }
    finally{
      setLoading(false);
    }
};

const handleDislike = async () => {
  if (!user?.profile.id) return;

  setLoading(true);
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
            const response = await dispatch(LikePostThunk({ post_id: id, profile_id: user?.profile.id }));
              setDislikesCount((prevCount:any)  => prevCount - 1);
              setLikesCount((prevCount:any)=>prevCount+1);
              setDisliked(false);
              setLiked(true);
            
        }
    } catch (error) {
        console.error('Error disliking post:', error);
    }
    finally{
      setLoading(false);
    }
};

//deletions

const deleteMessagesByPostId = async (postId: string) => {
  try {
    const messageRef = database.ref(`messages/${postId}`);
    await messageRef.remove();
    console.log(`Post ID ${postId} ile ilişkili tüm mesajlar başarıyla silindi.`);
  } catch (error) {
    console.error("Mesajlar silinirken hata oluştu:", error);
  }
};


const handleDelete = async () => {
  try {
    const deletedPost = await dispatch(DeletePostThunk(props.post.id));
    if (deletedPost) {
      removePost(id);
      if(user?.id){
        const updatedUser = await updateOneUserById(user?.id, { numberOfPosts: (user.numberOfPosts || 0) - 1 });
      }
      await deleteMessagesByPostId(id);
    }
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

const handleOnSetUser=async()=>{
  navigate(`/profile/${postUser?.id}`);
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
          <div className="d-flex align-items-center" onClick={handleOnSetUser}>
            <Image
              src={(postUser && postUser.profile.profile_img) || "https://via.placeholder.com/50"}
              roundedCircle
              style={{ marginRight: '10px', width: '50px', height: '50px' ,cursor:"pointer"}}
            />
            <div className="flex-grow-1 ms-3">
              <h5 className="mb-0">{postUser && postUser.username}</h5>
              <span className="text-sm text-muted">{postUser && postUser.profile.politicalView}</span>
            </div>
          </div>
          <Dropdown>
            <Dropdown.Toggle as="a"
              className="avtar avtar-xs btn-link-secondary dropdown-toggle arrow-none" style={{ cursor: "pointer",textDecoration:"none" }}
            ><i className="material-icons-two-tone f-18">more_vert</i></Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end">
              {(postUser && (postUser.id === user?.id)) ? <Dropdown.Item href="#" onClick={handleDelete}>Sil</Dropdown.Item> : ""}
              <Dropdown.Item onClick={() => { setOpen(true) }}>İstatistikler</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body style={{ padding: 0 }}>
          <Card.Img
            variant="top"
            src={props.post.image ? `data:image/jpeg;base64,${props.post.image}` : 'https://via.placeholder.com/500x300'}
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
            <span style={{ fontSize: '0.9em', color: '#6c757d' }}>{created_at && formatToTurkishDate(created_at)}</span>
            <Button
              as='a'
              variant='primary'
              href={`/message/${id}`}
              type='button'
              style={{ fontSize: '0.9em', padding: '5px 10px', color: "white", textDecoration: "none" }}
            >
             <i className="bi bi-chat-dots-fill"></i>
            </Button>
          </div>
          <div className="w-100 d-flex align-items-center mt-3">
            <span  className="btn btn-link-dark" onClick={handleLike}>
              <i className={`ph-duotone ph-thumbs-up me-1 ${liked ? 'text-primary' : ''}`}></i> {likesCount}<small className="text-muted">Doğru Karar</small>
            </span>
            <span className="btn btn-link-dark" onClick={handleDislike}>
              <i className={`ph-duotone ph-thumbs-up me-1 ${disliked ? 'text-danger' : ''}`}></i> {dislikesCount}<small className="text-muted">Yanlış Karar</small>
            </span>
          </div>
        </Card.Footer>
      </Card>
      <ChartPiety open={open} setOpen={setOpen} post={props.post}></ChartPiety>
    </>
  );
};

export default PostCard;
