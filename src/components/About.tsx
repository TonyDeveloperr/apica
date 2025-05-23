import image1 from "/assets/About_image1.png";
import image2 from "/assets/About_image2.jpg";
import { IoMdSchool } from "react-icons/io";
import { IoGlassesOutline } from "react-icons/io5";
import { LiaUserSecretSolid } from "react-icons/lia";
import { CiRead } from "react-icons/ci";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="aboutContainer">
      <h1 className="aboutTitle">APICA</h1>
      <h2 className="aboutSubtitle">
        Asociația Profesorilor Împotriva Corupției și Abuzului
      </h2>
      <div className="aboutBox">
        <h3 className="aboutPTitle">Ce este APICA</h3>
        <IoMdSchool size={50} className="aboutIcons" />
        <p className="aboutDesc">
          APICA (Asociația Profesorilor Împotriva Corupției și Abuzului) este o
          platformă online ce permite cadrelor didactice, părinților și elevilor
          să își exprime părerile despre educație.
        </p>
        <img src={image1} alt="" className="aboutPic" />
      </div>
      <div className="aboutBox">
        <h3 className="aboutPTitle">
          Postează-ți experiențele în calitate de cadru didactic, părinte sau
          elev
        </h3>
        <IoGlassesOutline size={50} className="aboutIcons" />
        <p className="aboutDesc">
          <Link to="/sign-in"> Creează un cont gratuit</Link> și postează
          folosind interfața intuitivă!
        </p>
        <img id="aboutPic2" src={image2} alt="" className="aboutPic" />
      </div>

      <div className="aboutBox">
        <h3 className="aboutPTitle">Citește postările altor utilizatori</h3>
        <Link to="/posts">
          <CiRead size={50} className="aboutIcons" />
        </Link>

        <p className="aboutDesc">
          Explorează postările altor profesori, părinți sau elevi și află despre
          școlile recomandate. Folosește filtrul pentru a vedea postări doar din
          anumite orașe.
        </p>
        <img src="" alt="" className="aboutPic" />
      </div>

      <div className="aboutBox">
        <h3 className="aboutPTitle">100% anonim</h3>
        <LiaUserSecretSolid size={50} className="aboutIcons" />
        <p className="aboutDesc">
          APICA îți ascunde identitatea astfel încât poți posta fără a avea
          nicio grijă!
        </p>
        <img src="" alt="" className="aboutPic" />
      </div>
    </div>
  );
};
