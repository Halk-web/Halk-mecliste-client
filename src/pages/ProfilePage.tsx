import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Image, Form } from "react-bootstrap";
import useAuth from '../hooks/useAuth';

const ProfilePage = () => {
  const {user}=useAuth();
  
  const [isEditing, setIsEditing] = useState({
    name: false,
    city: false,
    politicalView: false,
    email: false,
    party: false,
    profilePicture: false,
  });

  const [userInfo, setUserInfo] = useState({
    name: user?.username,
    city: user?.city,
    politicalView: user?.politicalView,
    email: user?.email,
    party: user?.party,
    profilePicture: "https://via.placeholder.com/80", // Varsayılan profil resmi
  });

  const [isChanged, setIsChanged] = useState(false);

  const handleEdit = (field:any) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleChange = (field:any, value:any) => {
    setUserInfo({ ...userInfo, [field]: value });
    setIsChanged(true);
  };

  const handleSave = () => {
    setIsEditing({
      name: false,
      city: false,
      politicalView: false,
      email: false,
      party: false,
      profilePicture: false,
    });
    setIsChanged(false);
  };

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("profilePicture", reader.result);
      };
      reader.readAsDataURL(file);
      setIsChanged(true);
    }
  };

  return (
    <>
      <Card style={{ width: "70%", margin: "auto", padding: "30px", marginTop: "160px" }}>
        <Card style={{ marginBottom: "30px" }}>
          <Card.Header className="d-flex align-items-center">
            <div className="position-relative">
              <Image 
                src={userInfo.profilePicture} 
                roundedCircle 
                style={{ marginRight: "15px", cursor: "pointer", width: "80px", height: "80px" }}
                onClick={() => handleEdit("profilePicture")}
              />
              {isEditing.profilePicture && (
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-2"
                />
              )}
            </div>
            <h5 className="mb-0">Kullanıcı Profili</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <p className="mb-1 text-muted">Kullanıcı ismi</p>
                {isEditing.name ? (
                  <Form.Control
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                ) : (
                  <p className="mb-0">{userInfo.name}</p>
                )}
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <Button variant="outline-primary" onClick={() => handleEdit("name")}>
                  <i className="bi bi-pencil"></i> {/* Kalem ikonu için */}
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <h5>Kişisel Detaylar</h5>
          </Card.Header>
          <Card.Body>
            <ul className="list-group list-group-flush">
              <li className="list-group-item px-0">
                <Row>
                  <Col md={6}>
                    <p className="mb-1 text-muted">Şehir</p>
                    {isEditing.city ? (
                      <Form.Control
                        type="text"
                        value={userInfo.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                      />
                    ) : (
                      <p className="mb-0">{userInfo.city}</p>
                    )}
                  </Col>
                  <Col md={6} className="d-flex justify-content-end">
                    <Button variant="outline-primary" onClick={() => handleEdit("city")}>
                      <i className="bi bi-pencil"></i> {/* Kalem ikonu için */}
                    </Button>
                  </Col>
                </Row>
              </li>
              <li className="list-group-item px-0">
                <Row>
                  <Col md={6}>
                    <p className="mb-1 text-muted">Siyasi Görüş</p>
                    {isEditing.politicalView ? (
                      <Form.Control
                        type="text"
                        value={userInfo.politicalView}
                        onChange={(e) => handleChange("politicalView", e.target.value)}
                      />
                    ) : (
                      <p className="mb-0">{userInfo.politicalView}</p>
                    )}
                  </Col>
                  <Col md={6} className="d-flex justify-content-end">
                    <Button variant="outline-primary" onClick={() => handleEdit("politicalView")}>
                      <i className="bi bi-pencil"></i> {/* Kalem ikonu için */}
                    </Button>
                  </Col>
                </Row>
              </li>
              <li className="list-group-item px-0">
                <Row>
                  <Col md={6}>
                    <p className="mb-1 text-muted">Email</p>
                    {isEditing.email ? (
                      <Form.Control
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    ) : (
                      <p className="mb-0">{userInfo.email}</p>
                    )}
                  </Col>
                  <Col md={6} className="d-flex justify-content-end">
                    <Button variant="outline-primary" onClick={() => handleEdit("email")}>
                      <i className="bi bi-pencil"></i> {/* Kalem ikonu için */}
                    </Button>
                  </Col>
                </Row>
              </li>
              <li className="list-group-item px-0">
                <Row>
                  <Col md={6}>
                    <p className="mb-1 text-muted">Parti</p>
                    {isEditing.party ? (
                      <Form.Control
                        type="text"
                        value={userInfo.party}
                        onChange={(e) => handleChange("party", e.target.value)}
                      />
                    ) : (
                      <p className="mb-0">{userInfo.party}</p>
                    )}
                  </Col>
                  <Col md={6} className="d-flex justify-content-end">
                    <Button variant="outline-primary" onClick={() => handleEdit("party")}>
                      <i className="bi bi-pencil"></i> {/* Kalem ikonu için */}
                    </Button>
                  </Col>
                </Row>
              </li>
            </ul>
          </Card.Body>
        </Card>

        <div className="d-flex justify-content-end mt-3">
          <Button 
            variant="success" 
            onClick={handleSave} 
            disabled={!isChanged}
          >
            Kaydet
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ProfilePage;
