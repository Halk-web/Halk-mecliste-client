import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import SimpleBar from "simplebar-react";
import "../styles/Navbar.css";
import CreatePostModal from "./CreatePostModal";
import useAuth from "../hooks/useAuth";


const TopBar = () => {
    const [open,setOpen]=useState<boolean>(false);
    const {logout}=useAuth();

    const handleLogout=(e:any)=>{
        logout();
    }
   
    return (
        <React.Fragment>
            <header className="pc-header" style={{ position: "fixed", top: 0, left: 0, right: 0 }}>
                <div className="header-wrapper">
                    <div className="me-auto pc-mob-drp">
                        <ul className="list-unstyled">
                            <li className="pc-h-item pc-sidebar-collapse">
                               <h4 style={{ marginRight: "25px" }}>
                                    Meclise Geldik<h6><small>yasamız var</small></h6>
                                </h4>
                            </li>
                            <Dropdown as="li" className="pc-h-item d-inline-flex d-md-none">
                                <Dropdown.Toggle as="a" className="pc-head-link arrow-none m-0" data-bs-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="false" aria-expanded="false">
                                    <i className="ph-duotone ph-magnifying-glass"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="pc-h-dropdown drp-search">
                                    <form className="px-3">
                                        <div className="form-group mb-0 d-flex align-items-center">
                                            <input type="search" className="form-control border-0 shadow-none" placeholder="Search here. . ." />
                                            <button className="btn btn-light-secondary btn-search">Search</button>
                                        </div>
                                    </form>
                                </Dropdown.Menu>
                            </Dropdown>
                            <li className="pc-h-item d-none d-md-inline-flex">
                                <form className="form-search">
                                    <i className="ph-duotone ph-magnifying-glass icon-search"></i>
                                    <input type="search" className="form-control" placeholder="Tasarı Ara..." />
                                    <button className="btn btn-search" style={{ padding: "0" }}><kbd>ctrl+k</kbd></button>
                                </form>
                            </li>
                        </ul>
                    </div>

                    <div className="ms-auto">
                        <ul className="list-unstyled">
                            <Dropdown as="li" className="dropdown pc-h-item d-none d-md-inline-flex">
                                <Dropdown.Toggle as="a" className="pc-head-link dropdown-toggle arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="false" aria-expanded="false">
                                    <i className="ph-duotone ph-circles-four"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown-qta dropdown-menu-end pc-h-dropdown">
                                    <div className="overflow-hidden">
                                        <div className="qta-links m-n1">
                                            <Dropdown.Item href="/" className="dropdown-item">
                                                <i className="ph-duotone ph-lifebuoy"></i>
                                                <span>Ana Sayfa</span>
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={(e:any)=>{setOpen(true)}} className="dropdown-item">
                                                <i className="ph-duotone ph-lifebuoy"></i>
                                                <span>Oturum başlat</span>
                                            </Dropdown.Item>
                                            <Dropdown.Item href="/profile" className="dropdown-item">
                                                <i className="ph-duotone ph-scroll"></i>
                                                <span>Profilim</span>
                                            </Dropdown.Item>

                                            <Dropdown.Item href="/" className="dropdown-item">
                                                <i className="ph-duotone ph-identification-badge"></i>
                                                <span>Siyasi Ortaklarım</span>
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#!" className="dropdown-item">
                                                <i className="ph-duotone ph-chats-circle"></i>
                                                <span>Sohbetlerim</span>
                                            </Dropdown.Item>

                                            <Dropdown.Item href="#!" className="dropdown-item">
                                                <i className="ph-duotone ph-user-circle"></i>
                                                <span>Kullanıcılar</span>
                                            </Dropdown.Item>
                                        </div>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                            <li className="pc-h-item">
                                <a className="pc-head-link pct-c-btn" href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvas_pc_layout">
                                    <i className="ph-duotone ph-gear-six"></i>
                                </a>
                            </li>
                            <Dropdown as="li" className="pc-h-item">
                                <Dropdown.Toggle as="a" className="pc-head-link arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="false" aria-expanded="false">
                                    <i className="ph-duotone ph-diamonds-four"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end pc-h-dropdown">
                                   <Dropdown.Item href="/">
                                    <i className="ph-duotone ph-gear"></i>
                                        <span>Ana sayfa</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/profile">
                                    <i className="ph-duotone ph-gear"></i>
                                        <span>Profilim</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/">
                                        <i className="ph-duotone ph-user"></i>
                                        <span>Meclis</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={(e:any)=>{setOpen(true)}} >
                                        <i className="ph-duotone ph-lock-key"></i>
                                        <span>Oturum oluştur</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={(e:any)=>{handleLogout(e)}}>
                                        <i className="ph-duotone ph-power"></i>
                                        <span>Çıkış yap</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            
                            <Dropdown as="li" className="pc-h-item header-user-profile">
                                <Dropdown.Toggle className="pc-head-link arrow-none me-0" data-bs-toggle="dropdown" href="#"
                                    aria-haspopup="false" data-bs-auto-close="outside" aria-expanded="false" style={{ border: "none" }}>
                                                              </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-user-profile dropdown-menu-end pc-h-dropdown">
                                    <div className="dropdown-header d-flex align-items-center justify-content-between">
                                        <h4 className="m-0">Profile</h4>
                                    </div>
                                    <div className="dropdown-body">
                                        <SimpleBar className="profile-notification-scroll position-relative" style={{ maxHeight: "calc(100vh - 225px)" }}>
                                            <ul className="list-group list-group-flush w-100">
                                                <li className="list-group-item">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            
                                                        </div>
                                                        <div className="flex-grow-1 mx-3">
                                                            <h5 className="mb-0">Carson Darrin</h5>
                                                            <a className="link-primary" href="mailto:carson.darrin@company.io">carson.darrin@company.io</a>
                                                        </div>
                                                        <span className="badge bg-primary">PRO</span>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <Dropdown.Item>
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-key"></i>
                                                            <span>Change password</span>
                                                        </span>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-envelope-simple"></i>
                                                            <span>Recently mail</span>
                                                        </span>
                                                        <div className="user-group">
                                                       
                                                  
                                                        </div>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-calendar-blank"></i>
                                                            <span>Schedule meetings</span>
                                                        </span>
                                                    </Dropdown.Item>
                                                </li>
                                                <li className="list-group-item">
                                                    <Dropdown.Item>
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-heart"></i>
                                                            <span>Favorite</span>
                                                        </span>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-arrow-circle-down"></i>
                                                            <span>Download</span>
                                                        </span>
                                                        <span className="avtar avtar-xs rounded-circle bg-danger text-white">10</span>
                                                    </Dropdown.Item>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="dropdown-item">
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-globe-hemisphere-west"></i>
                                                            <span>Languages</span>
                                                        </span>
                                                        <span className="flex-shrink-0">
                                                            <select className="form-select bg-transparent form-select-sm border-0 shadow-none">
                                                                <option value="1">English</option>
                                                                <option value="2">Spain</option>
                                                                <option value="3">Arbic</option>
                                                            </select>
                                                        </span>
                                                    </div>
                                                    <Dropdown.Item>
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-flag"></i>
                                                            <span>Country</span>
                                                        </span>
                                                    </Dropdown.Item>
                                                    <div className="dropdown-item">
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-moon"></i>
                                                            <span>Dark mode</span>
                                                        </span>
                                                        <div className="form-check form-switch form-check-reverse m-0">
                                                            <input className="form-check-input f-18" id="dark-mode" type="checkbox"
                                                                role="switch" />
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <Dropdown.Item>
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-user-circle"></i>
                                                            <span>Edit profile</span>
                                                        </span>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-star text-warning"></i>
                                                            <span>Upgrade account</span>
                                                            <span className="badge bg-light-success border border-success ms-2">NEW</span>
                                                        </span>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-bell"></i>
                                                            <span>Notifications</span>
                                                        </span>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-gear-six"></i>
                                                            <span>Settings</span>
                                                        </span>
                                                    </Dropdown.Item>
                                                </li>
                                                <li className="list-group-item">
                                                    <Dropdown.Item>
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-plus-circle"></i>
                                                            <span>Add account</span>
                                                        </span>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-power"></i>
                                                            <span>Logout</span>
                                                        </span>
                                                    </Dropdown.Item>
                                                </li>
                                            </ul>
                                        </SimpleBar>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ul>
                    </div>
                </div>
            </header>
            <CreatePostModal open={open} setOpen={setOpen}></CreatePostModal>
        </React.Fragment>
    );
};

export default TopBar;