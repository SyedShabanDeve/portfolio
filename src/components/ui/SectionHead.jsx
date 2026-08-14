import Reveal from "./Reveal";

export default function SectionHead({ index, eyebrow, title, lede, children }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">
        {index ? `${index} — ` : ""}
        {eyebrow}
      </p>
      <h2 className="section-title">{title}</h2>
      {lede && <p className="section-lede">{lede}</p>}
      {children}
    </Reveal>
  );
}
