import { PROFILE } from "../data/site";
import Icon from "./ui/Icon";

/** Fixed social links on the left and the email on the right, desktop only. */
export default function SideRail() {
  return (
    <>
      <ul className="rail rail--left" aria-label="Profiles">
        <li>
          <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub" data-cursor="GitHub">
            <Icon name="github" size={19} />
          </a>
        </li>
        <li>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-cursor="LinkedIn">
            <Icon name="linkedin" size={19} />
          </a>
        </li>
        <li>
          <a href={`mailto:${PROFILE.email}`} aria-label="Email" data-cursor="Mail">
            <Icon name="mail" size={19} />
          </a>
        </li>
      </ul>
      <div className="rail rail--right">
        <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
      </div>
    </>
  );
}
