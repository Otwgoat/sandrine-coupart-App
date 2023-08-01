import React from "react";
import Metadescription from "../components/Metadescription";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicyPage = () => {
  return (
    <div className="container">
      <Metadescription
        title="Sandrine Coupart - Politique de confidentialité"
        description="Politique de confidentitalité du site web de Sandrine Coupart"
      />
      <Header title="Politique de confidentialité" />
      <main id="privacyPolicyContent" className="legalNoticesContent">
        <h2>
          Sandrine Coupart s'engage à protéger votre vie privée et à respecter
          vos droits en matière de protection des données personnelles.
        </h2>

        <h2>Collecte et Utilisation des Données</h2>
        <p>
          Lorsque vous utilisez notre site web, nous pouvons collecter certaines
          informations personnelles vous concernant, telles que votre nom, votre
          adresse e-mail et votre adresse IP.
        </p>
        <p>
          Nous utilisons ces informations pour améliorer votre expérience sur
          notre site et pour vous fournir les services que vous avez demandés.
        </p>

        <h2>Consentement</h2>
        <p>
          En utilisant notre site, vous consentez à la collecte et à
          l'utilisation de vos données personnelles conformément à cette
          politique de confidentialité.
        </p>
        <p>
          Si vous ne souhaitez pas que vos données personnelles soient
          collectées ou utilisées, veuillez ne pas utiliser notre site.
        </p>

        <h2>Partage des Données</h2>
        <p>
          Nous ne transmettrons pas vos données personnelles à des tiers sans
          votre consentement préalable, sauf dans les cas prévus par la loi.
        </p>

        <h2>Stockage des Données</h2>
        <p>
          Nous conservons vos données personnelles aussi longtemps que
          nécessaire pour fournir les services que vous avez demandés et pour
          respecter nos obligations légales.
        </p>
        <p>
          Nous prendrons toutes les mesures raisonnables pour protéger vos
          données personnelles contre tout accès non autorisé, utilisation,
          altération ou destruction.
        </p>
        <h2>Liens Externes</h2>
        <p>
          Notre site peut contenir des liens vers des sites externes. Nous ne
          sommes pas responsables du contenu ou des pratiques de confidentialité
          de ces sites. Nous vous encourageons à lire les politiques de
          confidentialité de ces sites avant de fournir toute information
          personnelle.
        </p>

        <h2>Droits des Utilisateurs</h2>
        <p>
          Vous avez le droit de demander l'accès, la rectification ou la
          suppression de vos données personnelles détenues par Cuisine Santé.
          Pour exercer ces droits, veuillez nous contacter à l'adresse indiquée
          ci-dessous.
        </p>

        <h2>Contact</h2>
        <p>
          Pour toute question ou demande concernant notre politique de
          confidentialité, veuillez nous contacter à l'adresse suivante :
          sandrine.coupart@gmail.com
        </p>
        <span className="underLine"></span>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
