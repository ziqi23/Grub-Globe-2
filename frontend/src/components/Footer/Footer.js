import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Footer.css";

const Footer = () => {
  const contributorsInfo = {
    tk: {
      name: "Taisia Karaseva",
      github: "https://github.com/taisiat",
      linkedIn: "https://www.linkedin.com/in/taisiakaraseva/",
    },
    zz: {
      name: "Ziqi Zou",
      github: "https://github.com/ziqi23",
      linkedIn: "https://www.linkedin.com/in/ziqi-zou/",
    },
    ls: {
      name: "Leah Seyoum",
      github: "https://github.com/leahseyoum",
      linkedIn: "https://www.linkedin.com/in/leah-seyoum-958288277/",
    },
    mc: {
      name: "Michelle Chung",
      github: "https://github.com/michellechung099",
      linkedIn: "https://www.linkedin.com/in/michelle-chung-3a915a134/",
    },
    kv: {
      name: "Kat Vu",
      github: "https://github.com/katpvu",
      linkedIn: "https://www.linkedin.com/in/kat-vu-57b50411b/",
    },
  };

  const contributors = Object.values(contributorsInfo);
  return (
    <div id="footer-container">
      {contributors.map((contributor, i) => (
        <div key={i} id="individual-contributor-footer-container">
          <h1>{contributor?.name}</h1>
          <div id="foot-icon-links-container">
            <Link to={{ pathname: contributor.github }} target="_blank">
              <FaGithub className="social-links" />
            </Link>
            <Link to={{ pathname: contributor.linkedIn }} target="_blank">
              <FaLinkedin className="social-links" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Footer;
