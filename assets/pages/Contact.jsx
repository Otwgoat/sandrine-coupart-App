import React from "react";
import Metadescription from "../components/Metadescription";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div className="container">
      <Metadescription
        title="Sandrine Coupart - Me contacter"
        description="N'hésitez pas à me contacter pour une consultation ou pour une demande d'information."
      />
      <Header title="Me contacter" />
      <main id="contactPage">
        <p>
          Si vous souhaitez prendre rendez-vous pour votre première ou prochaine
          consultation, n'hesitez pas à me contacter en remplissant ce
          formulaire. Je m'engage à y repondre ou à vous rappeler dans les
          prochaines 48 heures.
        </p>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
