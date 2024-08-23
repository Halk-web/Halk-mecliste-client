
//chatgbt mesaj=
//register ile kayıt olmaya çalışırken hata alıyorum
// Uncaught runtime errors:
// ERROR
// Request failed with status code 400
// AxiosError@http://localhost:3000/static/js/bundle.js:174202:18
// settle@http://localhost:3000/static/js/bundle.js:174861:12
// onloadend@http://localhost:3000/static/js/bundle.js:173527:66
// EventHandlerNonNull*dispatchXhrRequest@http://localhost:3000/static/js/bundle.js:173540:7
// ./node_modules/axios/lib/adapters/xhr.js/__WEBPACK_DEFAULT_EXPORT__<@http://localhost:3000/static/js/bundle.js:173491:10
// dispatchRequest@http://localhost:3000/static/js/bundle.js:174687:10
// _request@http://localhost:3000/static/js/bundle.js:174119:77
// request@http://localhost:3000/static/js/bundle.js:174010:25
// httpMethod@http://localhost:3000/static/js/bundle.js:174153:19
// wrap@http://localhost:3000/static/js/bundle.js:175256:15
// register@http://localhost:3000/static/js/bundle.js:2973:81
// handleSubmit@http://localhost:3000/static/js/bundle.js:4243:13
// callCallback@http://localhost:3000/static/js/bundle.js:47668:18
// invokeGuardedCallbackDev@http://localhost:3000/static/js/bundle.js:47712:20
// invokeGuardedCallback@http://localhost:3000/static/js/bundle.js:47769:35
// invokeGuardedCallbackAndCatchFirstError@http://localhost:3000/static/js/bundle.js:47783:29
// executeDispatch@http://localhost:3000/static/js/bundle.js:51926:46
// processDispatchQueueItemsInOrder@http://localhost:3000/static/js/bundle.js:51952:26
// processDispatchQueue@http://localhost:3000/static/js/bundle.js:51963:41
// dispatchEventsForPlugins@http://localhost:3000/static/js/bundle.js:51972:27
// ./node_modules/react-dom/cjs/react-dom.development.js/dispatchEventForPluginEventSystem/<@http://localhost:3000/static/js/bundle.js:52132:16
// batchedUpdates$1@http://localhost:3000/static/js/bundle.js:66550:16
// batchedUpdates@http://localhost:3000/static/js/bundle.js:47516:16
// dispatchEventForPluginEventSystem@http://localhost:3000/static/js/bundle.js:52131:21
// dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay@http://localhost:3000/static/js/bundle.js:49638:42
// dispatchEvent@http://localhost:3000/static/js/bundle.js:49632:88
// dispatchDiscreteEvent@http://localhost:3000/static/js/bundle.js:49609:22
// EventListener.handleEvent*addEventBubbleListener@http://localhost:3000/static/js/bundle.js:49831:14
// addTrappedEventListener@http://localhost:3000/static/js/bundle.js:52054:33
// listenToNativeEvent@http://localhost:3000/static/js/bundle.js:51998:30
// ./node_modules/react-dom/cjs/react-dom.development.js/listenToAllSupportedEvents/<@http://localhost:3000/static/js/bundle.js:52009:34
// listenToAllSupportedEvents@http://localhost:3000/static/js/bundle.js:52004:25
// createRoot@http://localhost:3000/static/js/bundle.js:69311:33
// createRoot$1@http://localhost:3000/static/js/bundle.js:69669:14
// ./node_modules/react-dom/client.js/exports.createRoot@http://localhost:3000/static/js/bundle.js:69745:16
// ./src/index.tsx@http://localhost:3000/static/js/bundle.js:3249:60
// options.factory@http://localhost:3000/static/js/bundle.js:190851:31
// __webpack_require__@http://localhost:3000/static/js/bundle.js:190272:32
// @http://localhost:3000/static/js/bundle.js:191433:56
// @http://localhost:3000/static/js/bundle.js:191435:12


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/login.css";
import useAuth from "../hooks/useAuth";

const cities = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", 
    "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", 
    "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", 
    "Hakkâri", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", 
    "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", 
    "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", 
    "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", 
    "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", 
    "Düzce"
];

const politicalViews = [
    "Liberal", "Komünist", "İslamcı", "Atatürkçü", "Muhafazakâr", "Sosyal Demokrat", "Milliyetçi", "Feminist","Tarafsız"
];

const parties=[
    "AKP","CHP","MHP","İYİ PARTİ","SAADET PARTİSİ","DEM PARTİ","tarfsız"
]

const SignupV2 = () => {
    const [city, setCity] = useState<string>("");
    const [politicalView, setPoliticalView] = useState<string>("");
    const [party, setParty] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [err, setErr] = useState<string | null>(null);
    const location = useLocation();
    const navigate=useNavigate();
    const {register}=useAuth();

    useEffect(() => {
        console.log(location.state);
    }, [location.state]);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (!city || !politicalView || !gender) {
            setErr("Lütfen tüm alanları doldurunuz!");
        } else {
            setErr(null);
            const {username,email,password}=location.state;
            await register(
                username,
                email,
                password,
                city,
                politicalView,
                party,
                gender
            );
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
