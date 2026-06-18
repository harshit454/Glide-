import logo from "../../assets/hero.png";
export default function SplashScreen() {
  return (
    <div className = "splash">
     <div>
      <img scr={logo} alt ="Glide" width={200} height={100}></img>
    <h1>GLIDE</h1>
     </div>
    </div>
  );
}