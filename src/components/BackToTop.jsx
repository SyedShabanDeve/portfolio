import Icon from "./ui/Icon";

export default function BackToTop({ shown }) {
  return (
    <button
      type="button"
      className={`to-top${shown ? " is-shown" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={shown ? 0 : -1}
    >
      <Icon name="arrowUp" size={17} />
    </button>
  );
}
