import { CHALLENGES } from "../data/site";

/** Problems from real projects, each told as what broke, what I did and what changed. */
export default function Challenges() {
  return (
    <section id="problems" className="section challenges">
      <div className="container">
        <p className="eyebrow" data-reveal>
          <span>06</span> Problems
        </p>
        <h2 className="title" data-reveal>
          Problems I have <em>solved</em>
        </h2>

        <ol className="challenges__grid">
          {CHALLENGES.map((c) => (
            <li key={c.problem} className="challenge glass" data-reveal="tilt">
              <p className="challenge__project">{c.project}</p>
              <dl>
                <div>
                  <dt>Problem</dt>
                  <dd>{c.problem}</dd>
                </div>
                <div>
                  <dt>What I did</dt>
                  <dd>{c.fix}</dd>
                </div>
                <div className="challenge__result">
                  <dt>Result</dt>
                  <dd>{c.result}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
