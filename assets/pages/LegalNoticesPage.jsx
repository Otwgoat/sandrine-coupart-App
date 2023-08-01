import React from "react";
import Metadescription from "../components/Metadescription";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LegalNoticePage = () => {
  return (
    <div className="container">
      <Metadescription
        description="Mentions légales du site web de Sandrine Coupart"
        title="Sandrine Coupart - Mentions légales"
      />
      <Header title="Mentions légales" />
      <main className="legalNoticesContent">
        <h2>Éditeur du site</h2>
        <p>Nom de l'entreprise : Lucas Jouffroy</p>
        <p>Adresse : 31 les pierres blanches, 19240 Allassac</p>
        <p>Téléphone : +33 6 20 05 74 19</p>
        <p>Email : lucas.jouffroy@gmail.com</p>

        <h2>Hébergeur du site</h2>
        <p>Nom de l'hébergeur : Heroku</p>
        <p>Adresse : 456 Avenue de l'Hébergement, 75002 Paris, France</p>
        <p>Téléphone : +33 1 98 76 54 32</p>
        <p>Email : support@hebergementweb.com</p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Tous les éléments du site (textes, images, logos, icônes, etc.) sont
          la propriété exclusive de Sandrine Coupart ou de leurs propriétaires
          respectifs.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication,
          adaptation de tout ou partie des éléments du site, quel que soit le
          moyen ou le procédé utilisé, est interdite, sauf autorisation écrite
          préalable de Sandrine Coupart.
        </p>

        <h2>Données personnelles</h2>
        <p>
          Sandrine Coupart s'engage à protéger vos données personnelles et à les
          utiliser uniquement dans le cadre de la finalité pour laquelle elles
          ont été collectées.
        </p>
        <p>
          Nous ne transmettrons pas vos données à des tiers sans votre
          consentement préalable.
        </p>
        <p>
          Pour plus d'informations sur notre politique de confidentialité,
          veuillez consulter notre page dédiée.
        </p>

        <h2>Modification des mentions légales</h2>
        <p>
          Sandrine Coupart se réserve le droit de modifier à tout moment les
          présentes mentions légales. Nous vous recommandons de consulter
          régulièrement cette page pour vous tenir informé des éventuelles mises
          à jour.
        </p>

        <h2>Contact</h2>
        <p>
          Pour toute question ou demande concernant les mentions légales du
          site, veuillez nous contacter à l'adresse suivante :
          sandrine.coupart@gmail.com
        </p>
        <span className="underLine"></span>
      </main>

      <Footer />
    </div>
  );
};

export default LegalNoticePage;
