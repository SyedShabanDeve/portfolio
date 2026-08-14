import { useState } from "react";
import { PROFILE } from "../data/site";
import Icon from "./ui/Icon";

const EMPTY = { name: "", email: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * No backend to leak or rot: a valid submission hands the whole message to the
 * visitor's own mail client, already composed.
 */
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please tell me your name";
    if (!values.email.trim()) next.email = "An email address is required";
    else if (!EMAIL_RE.test(values.email.trim())) next.email = "That email address looks invalid";
    if (!values.message.trim()) next.message = "Please add a short message";
    else if (values.message.trim().length < 12) next.message = "A few more words would help";
    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);

    const firstError = Object.keys(found)[0];
    if (firstError) {
      document.getElementById(`f-${firstError}`)?.focus();
      return;
    }

    const subject = values.subject.trim() || `Portfolio enquiry from ${values.name.trim()}`;
    const body = [
      values.message.trim(),
      "",
      "—",
      `Name:  ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Sent from ${PROFILE.site}`,
    ].join("\r\n");

    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__row">
        <div className="field">
          <label htmlFor="f-name">Name</label>
          <input
            id="f-name"
            className={`input${errors.name ? " is-invalid" : ""}`}
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "e-name" : undefined}
          />
          {errors.name && (
            <span className="field-error" id="e-name">
              {errors.name}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="f-email">Email</label>
          <input
            id="f-email"
            className={`input${errors.email ? " is-invalid" : ""}`}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "e-email" : undefined}
          />
          {errors.email && (
            <span className="field-error" id="e-email">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-subject">
          Subject <span className="opt">(optional)</span>
        </label>
        <input
          id="f-subject"
          className="input"
          type="text"
          name="subject"
          placeholder="Role, project or collaboration"
          value={values.subject}
          onChange={update("subject")}
        />
      </div>

      <div className="field">
        <label htmlFor="f-message">Message</label>
        <textarea
          id="f-message"
          className={`input${errors.message ? " is-invalid" : ""}`}
          name="message"
          rows={5}
          placeholder="What are you building, and what do you need from me?"
          value={values.message}
          onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "e-message" : undefined}
        />
        {errors.message && (
          <span className="field-error" id="e-message">
            {errors.message}
          </span>
        )}
      </div>

      <div className="form__foot">
        <p className={`form__note${sent ? " is-sent" : ""}`} role="status">
          {sent
            ? `Your mail app should be open with the message ready. If nothing happened, write to ${PROFILE.email} directly.`
            : "This opens your own mail app with everything filled in — nothing is sent through a third party."}
        </p>
        <button className="btn btn--primary" type="submit">
          Send message
          <Icon name="arrowRight" size={15} />
        </button>
      </div>
    </form>
  );
}
