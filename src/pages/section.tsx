import { useLocation } from "react-router-dom";
import "../App.css";
import CardSection from "./CardSection";

const Section=()=>{
  const location=useLocation();

  if(location.state){
    return <div style={{marginTop:"120px"}}>
    <h6 style={{textAlign:"center"}}>BULUNAN OTURUMLAR</h6>
    <CardSection posts={location.state.payload}></CardSection>
    <div style={{marginTop:"120px"}}>
    </div>
    </div>
  }
  return (
    <>
    <CardSection></CardSection>
    <div style={{marginTop:"120px"}}>
    </div>
    </>
  )
}

export default Section;