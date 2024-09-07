
//chatgbt mesaj=
//register ile kayıt olmaya çalışırken hata alıyorum

import { useEffect, useState } from "react";
import { useLocation ,useNavigate} from "react-router-dom";
import "../styles/login.css";
import useAuth from "../hooks/useAuth";
import { cities } from "../consts/cities";
import { parties } from "../consts/parties";
import { politicalViews } from "../consts/politicalViews";

const SignupV2 = () => {
    const [city, setCity] = useState<string>("");
    const [politicalView, setPoliticalView] = useState<string>("");
    const [party, setParty] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [err, setErr] = useState<string | null>(null);
    const location = useLocation();
    const {register,login}=useAuth();
    const navigate=useNavigate();
    
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (!city || !politicalView || !gender) {
            setErr("Lütfen tüm alanları doldurunuz!");
        } else {
            setErr(null);
            const {username,email,password}=location.state;
            try{
                await register(
                    email,
                    password,
                    username,
                    city,
                    party,
                    politicalView,
                    gender
                );

                await navigate("/");
            
            }
            catch(err){
                console.log(err);
                setErr("Kullanıcı kaydedilirken hata oluştu!");;
            }
        }
    };

    return (
        <div className="login-box">
            <h4 className="f-w-500 mb-1">MECLISE KAYDI TAMAMLA</h4>

            <div style={{ color: "red", marginBottom: "15px" }}>
                {err ? err : ""}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <small>Şehir</small>
                    <select 
                        className="form-control" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)}
                    >
                        <option value="">Bir şehir seçin</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group ">
                    <small>Siyasi Görüş</small>
                    <select 
                        className="form-control" 
                        value={politicalView} 
                        onChange={(e) => setPoliticalView(e.target.value)}
                    >
                        <option value="">Bir siyasi görüş seçin</option>
                        {politicalViews.map((view, index) => (
                            <option key={index} value={view}>
                                {view}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group ">
                    <small>Parti</small>
                    <select 
                        className="form-control" 
                        value={party} 
                        onChange={(e) => setParty(e.target.value)}
                    >
                        <option value="">Bir parti seçin</option>
                        {parties.map((view, index) => (
                            <option key={index} value={view}>
                                {view}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group" style={{width:"55%",maxWidth:"200px"}}>
    <small>Cinsiyet</small>
    <div className="gender-options">
        <label> 
            <input 
                type="radio" 
                value="Erkek" 
                checked={gender === "Erkek"} 
                onChange={() => setGender("Erkek")}
            />
            Erkek
        </label>
        <label>
            <input 
                type="radio" 
                value="Kadın" 
                checked={gender === "Kadın"} 
                onChange={() => setGender("Kadın")}
            />
            Kadın
        </label>
    </div>
</div>


                <button type="submit">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    MECLISE KAYIT OL
                </button>
            </form>
        </div>
    );
};

export default SignupV2;
