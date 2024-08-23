
import { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

const SignupV1 = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [apassword, setApassword] = useState<string>("");
    const [err, setErr] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleOnChangeUsername = (text: string) => {
        console.log(text);
        setUsername(text);
    };

    const handleOnChangeEmail = (text: string) => {
        console.log(text);
        setEmail(text);
    };

    const handleOnChangePassword = (text: string) => {
        console.log(text);
        setPassword(text);
    };

    const handleOnChangeaPassword = (text: string) => {
        setApassword(text);
    };

    const handleContinue = () => {
        console.log(username, password, email);
        if (username === "" || password === "" || email === "") {
            setErr("Gerekli alanları doldurun!");
        } else if (password === apassword) {
            navigate("/signup/v2", { state: {username, password, email} });
        } else {
            setErr("Şifreler uyuşmuyor!");
        }
    };

    return (
        <>
            <div className="login-box">
            <h4 className="f-w-500 mb-1">MECLISE KAYDOL</h4>

                <div style={{ color: "red", marginBottom: "15px" }}>{err ? err : ""}</div>

                <form action="" method="POST">
                <div className="mb-3">
                    <input type="text" name="username" className="form-control"  placeholder="KULLANICI ISMI" onChange={(e: any) => handleOnChangeUsername(e.target.value)} />
                </div>

                <div className="mb-3">
                    <input type="email" name="email" className="form-control"  placeholder="EMAIL ADRESI" onChange={(e: any) => handleOnChangeEmail(e.target.value)}/>
                </div>

                <div className="mb-3">
                    <input type="password" name="password" className="form-control"  placeholder="SIFRE" onChange={(e: any) => handleOnChangePassword(e.target.value)}/>
                </div>

                <div className="mb-3">
                    <input type="password" name="password" className="form-control"  placeholder="SIFRE TEKRAR" onChange={(e: any) => handleOnChangeaPassword(e.target.value)}/>
                </div>
                    <button type="button" onClick={() => handleContinue()}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        DEVAM ET
                    </button>
                </form>
            </div>
        </>
    );
};

export default SignupV1;
