import { useInView } from "../../hooks/useInView";

/** Fades content up the first time it enters the viewport. */
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
