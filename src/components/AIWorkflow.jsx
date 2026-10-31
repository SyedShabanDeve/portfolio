import { AI_USE } from "../data/site";
import Icon from "./ui/Icon";

/** How AI fits into the work: the tools, where they help, and the limits I keep. */
export default function AIWorkflow() {
  return (
    <section id="ai" className="section ai">
      <div className="container">
        <p className="eyebrow" data-reveal>
          <span>03</span> AI
        </p>
        <h2 className="title" data-reveal>
          How I use <em>AI</em> at work
        </h2>
        <p className="ai__intro" data-reveal>
          {AI_USE.intro}
        </p>

        <ul className="ai__grid">
          {AI_USE.items.map((item, i) => (
            <li key={item.title} className="ai__card glass" data-reveal="tilt">
              <span className="ai__num">{String(i + 1).padStart(2, "0")}</span>
              <Icon name={item.icon} size={22} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
