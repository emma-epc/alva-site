/* =====================================================================
   ALVA — Configuration globale
   Modifiez ici les infos communes à tout le site (email, réseaux, IDs).
   ===================================================================== */
const ALVA_CONFIG = {
  email: "contact@alva-communaute.fr",
  instagram: "https://instagram.com/alva.cognac",
  instagramHandle: "@alva.cognac",
  // Remplacez VOTRE_ID par l'identifiant de votre formulaire Formspree
  // (https://formspree.io). Sert pour les formulaires contact / partenaire
  // et les confirmations d'inscription.
  formspreeId: "VOTRE_ID",
  ville: "Cognac · Charente",
  annee: "2026",
  statut: "Association ALVA · Loi 1901",
  // ── Carte ───────────────────────────────────────────────────────────
  // Laissez vide pour la carte Leaflet (gratuite, sans clé, déjà active).
  // Pour passer à une VRAIE Google Maps stylisée : créez une clé sur
  // https://console.cloud.google.com (API « Maps JavaScript »), activez la
  // facturation, puis collez-la ci-dessous. La carte basculera automatiquement.
  googleMapsKey: "",
};

ALVA_CONFIG.formspreeUrl = "https://formspree.io/f/" + ALVA_CONFIG.formspreeId;

// Accessible partout (les fichiers de données sont chargés en <script> classiques)
window.ALVA_CONFIG = ALVA_CONFIG;
