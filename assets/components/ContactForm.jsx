import React, { useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Button from "./Button";

function ContactForm() {
  const [messageSubmited, setMessageSubmited] = useState(false);
  const [state, handleSubmit] = useForm("mbjvlpzb");
  if (state.succeeded) {
    return (
      <div className="submissionSucceeded">
        <p>Message envoyé</p>
        <Button path="/" title="Retour à l'accueil" />
        <Button path="/recettes" title="Voir les recettes" />
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        id="firstname"
        type="text"
        name="firstname"
        placeholder="Votre prénom"
      />
      <input
        id="lastname"
        type="text"
        name="lastname"
        placeholder="Votre nom"
      />
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Votre adresse email"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <textarea id="message" name="message" placeholder="Votre message" />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <button className="ctaButton" type="submit" disabled={state.submitting}>
        Envoyer
      </button>
    </form>
  );
}
export default ContactForm;
