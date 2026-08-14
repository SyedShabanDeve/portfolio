import { CORE_STACK, SKILL_GROUPS } from "../data/site";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

export default function Skills() {
  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <SectionHead
          index="02"
          eyebrow="Skills"
          title="What I build with"
          lede="The tools I use daily, grouped by where they sit in a build. Everything listed here has shipped in something real."
        />

        <Reveal className="core-stack">
          {CORE_STACK.map((item) => (
            <span className="chip chip--core" key={item}>
              {item}
            </span>
          ))}
        </Reveal>

        <div className="skills__grid">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal className="card card--hover skill-card" key={group.id} delay={70 * i}>
              <div className="skill-card__head">
                <span className="skill-card__icon">
                  <Icon name={group.icon} size={19} />
                </span>
                <h3>{group.label}</h3>
              </div>
              <p className="skill-card__blurb">{group.blurb}</p>
              <div className="skill-card__items">
                {group.items.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
