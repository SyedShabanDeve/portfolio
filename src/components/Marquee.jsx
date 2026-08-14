import { CORE_STACK } from "../data/site";

/** The list is rendered twice so the loop has no visible seam. */
export default function Marquee() {
  const lane = [...CORE_STACK, ...CORE_STACK];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {lane.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
