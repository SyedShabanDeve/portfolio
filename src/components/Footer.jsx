import { useEffect, useState } from "react";
import { PROFILE } from "../data/site";
import Icon from "./ui/Icon";
import Logo from "./ui/Logo";

const lahoreTime = () =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit" }).format(new Date());

export default function Footer() {
  const [time, setTime] = useState(lahoreTime);

  useEffect(() => {
    const id = setInterval(() => setTime(lahoreTime()), 20000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__big" aria-hidden="true">
          SHABAN
        </p>
        <div className="footer__row">
          <p className="footer__brand">
            <Logo size={28} /> © {new Date().getFullYear()} {PROFILE.fullName}
          </p>
          <p>
            Lahore · <span className="footer__time">{time}</span> PKT
          </p>
          <p className="footer__built">Built with React, three.js and GSAP</p>
          <a className="footer__top" href="#home" data-cursor="Up">
            Back to top <Icon name="arrowUp" size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
