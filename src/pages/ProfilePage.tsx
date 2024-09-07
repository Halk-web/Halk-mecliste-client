import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Image, Form } from "react-bootstrap";
import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { UserProfile } from '../store/Types/AuthType';
import { useParams } from 'react-router-dom';
import { updateProfileThunk } from '../store/Thunk/ProfileThunk';
import { cities } from '../consts/cities';
import { parties } from '../consts/parties';
import { politicalViews } from '../consts/politicalViews';


const ProfilePage = () => {
  const { user, findOneById } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const [profileId, setProfileId] = useState<string | undefined>(undefined);

  const { userId } = useParams<{ userId: string }>();

  const [userInfo, setUserInfo] = useState({
    name: "",
    city: "",
    politicalView: "",
    email: "",
    party: "",
    profile_img: "https://via.placeholder.com/80",
  });
  
  const [isEditing, setIsEditing] = useState({
    name: false,
    city: false,
    politicalView: false,
    email: false,
    party: false,
    profile_img: false,
  });

  useEffect(() => {
    const fetchUserById = async () => {
      if (userId) {
        const fetchedUser: UserProfile | null = await findOneById(userId);
        setProfileId(fetchedUser?.profile.id ?? "");
        if (fetchedUser) {
          setUserInfo({
            name: fetchedUser.username ?? "",
            city: fetchedUser.profile.city ?? "",
            politicalView: fetchedUser.profile.politicalView ?? "",
            email: fetchedUser.email ?? "",
            party: fetchedUser.profile.party ?? "",
            profile_img: fetchedUser.profile.profile_img ?? "https://via.placeholder.com/80",
          });
        }
      }
    };
  
    fetchUserById();
  }, [userId]);

  const [isChanged, setIsChanged] = useState(false);

  const handleEdit = (field: string) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleChange = (field: string, value: string) => {
    setUserInfo({ ...userInfo, [field]: value });
    setIsChanged(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("profile_img", reader.result as string);
      };
      reader.readAsDataURL(file);
      setIsChanged(true);
    }
  };

  const handleSave = async () => {
    if (!profileId) {
      console.error("User ID is not defined.");
      return;
    }
  
    try {
      const updatedProfile = await dispatch(updateProfileThunk({ ...userInfo, id: profileId }) as any);
      setIsEditing({
        name: false,
        city: false,
        politicalView: false,
        email: false,
        party: false,
        profile_img: false,
      });
      setIsChanged(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  

  return (
    <>
      <Card style={{ width: "70%", margin: "auto", padding: "30px", marginTop: "160px" }}>
        <Card style={{ marginBottom: "30px" }}>
          <Card.Header className="d-flex align-items-center">
            <div className="position-relative">
              <Image 
                src={userInfo.profile_img} 
                roundedCircle 
                style={{ marginRight: "15px", cursor: `${user?.id === userId ? "pointer" : ""}`, width: "80px", height: "80px" }}
                onClick={() => handleEdit("profile_img")}
              />
              {isEditing.profile_img && (user?.id == userId) && (
                <Form.Control
                  type="file"
                  accept="profile_img/*"
                  onChange={handleFileChange}
                  className="mt-2"
                />
              )}
            </div>
            <h5 className="mb-0">KİŞİSEL DETAYLAR</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <p className="mb-1 text-muted">Kullanıcı ismi</p>
                <p className="mb-0">{userInfo.name}</p>
              </Col>

              <Col md={6}>
                <p className="mb-1 text-muted">Email</p>
                <p className="mb-0">{userInfo.email}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <h5>SİYASİ KİMLİK</h5>
          </Card.Header>
          <Card.Body>
            <ul className="list-group list-group-flush">
              {/* City */}
              <li className="list-group-item px-0">
                <Row>
                  <Col md={6}>
                    <p className="mb-1 text-muted">Şehir</p>
                    {isEditing.city ? (
                      <Form.Control
                        as="select"
                        value={userInfo.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                      >
                        <option value="">Seçiniz</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </Form.Control>
                    ) : (
                      <p className="mb-0">{userInfo.city}</p>
                    )}
                  </Col>
                  <Col md={6} className="d-flex justify-content-end">
                    {user?.id === userId && (
                      <Button variant="outline-primary" onClick={() => handleEdit("city")}>
                        <i className="bi bi-pencil"></i>
                      </Button>
                    )}
                  </Col>
                </Row>
              </li>
              {/* Political View */}
              <li className="list-group-item px-0">
              <Row>
                  <Col md={6}>
                    <p className="mb-1 text-muted">SİYASİ GÖRÜŞ</p>
                    {isEditing.politicalView ? (
                      <Form.Control
                        as="select"
                        value={userInfo.politicalView}
                        onChange={(e) => handleChange("politicalView", e.target.value)}
                      >
                        <option value="">Seçiniz</option>
                        {politicalViews.map(view => (
                          <option key={view} value={view}>{view}</option>
                        ))}
                      </Form.Control>
                    ) : (
                      <p className="mb-0">{userInfo.politicalView}</p>
                    )}
                  </Col>
                  <Col md={6} className="d-flex justify-content-end">
                    {user?.id === userId && (
                      <Button variant="outline-primary" onClick={() => handleEdit("politicalView")}>
                        <i className="bi bi-pencil"></i>
                      </Button>
                    )}
                  </Col>
                </Row>
              </li>
              
              {/* Party */}
              <li className="list-group-item px-0">
                <Row>
                  <Col md={6}>
                    <p className="mb-1 text-muted">Parti</p>
                    {isEditing.party ? (
                      <Form.Control
                        as="select"
                        value={userInfo.party}
                        onChange={(e) => handleChange("party", e.target.value)}
                      >
                        <option value="">Seçiniz</option>
                        {parties.map(party => (
                          <option key={party} value={party}>{party}</option>
                        ))}
                      </Form.Control>
                    ) : (
                      <p className="mb-0">{userInfo.party}</p>
                    )}
                  </Col>
                  <Col md={6} className="d-flex justify-content-end">
                    {user?.id === userId && (
                      <Button variant="outline-primary" onClick={() => handleEdit("party")}>
                        <i className="bi bi-pencil"></i>
                      </Button>
                    )}
                  </Col>
                </Row>
              </li>
            </ul>
          </Card.Body>
        </Card>

        {user?.id === userId ? (
          <div className="d-flex justify-content-end mt-3">
            <Button 
              variant="success" 
              onClick={handleSave} 
              disabled={!isChanged}
            >
              Kaydet
            </Button>
          </div>
        ) : (
          <Button href={`/home/${profileId}`} variant="primary">
            OTURUMLARI GÖRÜNTÜLE
          </Button>
        )}
      </Card>
    </>
  );
}

export default ProfilePage;
