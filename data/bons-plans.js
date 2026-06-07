/* =====================================================================
   ALVA — « La Vie à Cognac » : le carnet de la communauté
   --------------------------------------------------------------------
   Tout se gère ici, sans toucher au code :
     AVANTAGES        gestes réservés à la communauté militaire (PAS de codes
                      à copier : l'avantage s'obtient sur présentation de la
                      carte militaire — la sienne ou celle du conjoint).
                      `categorie` sert au regroupement interactif.
                      `icon` = nom d'icône ALVA (cup, book, lotus, bike,
                      flower, paddle, wine, music…).
     AGENDA_COGNAC    sorties, expos, marchés, concerts (moteur de recherche)
     COUPS_DE_COEUR   les 3 coups de cœur du mois prochain (mis en avant)
     TIPS_ARRIVEE     conseils pratiques pour les nouvelles familles
   ===================================================================== */

const AVANTAGES = [
  { partenaire:"Café des Arts",        icon:"cup",    categorie:"Gourmand",          description:"Le QG des nouveaux arrivants, café de spécialité en plein centre.", avantage:"-15% sur la première commande" },
  { partenaire:"Brûlerie de Cognac",   icon:"cup",    categorie:"Gourmand",          description:"Torréfaction maison, le meilleur café de la ville à emporter.", avantage:"Le 10e paquet offert" },
  { partenaire:"La Table du Marché",   icon:"wine",   categorie:"Gourmand",          description:"Cuisine de saison et produits d'ici, à deux pas des Halles.", avantage:"Le café offert au déjeuner" },
  { partenaire:"Librairie du Château", icon:"book",   categorie:"Culture",           description:"Indépendante, rayon jeunesse et conseils aux petits oignons.", avantage:"-10% sur les livres jeunesse" },
  { partenaire:"Musée des arts du cognac", icon:"book", categorie:"Culture",         description:"Pour comprendre la ville et son histoire en une visite.", avantage:"Entrée à tarif réduit" },
  { partenaire:"Studio Mouvement",     icon:"lotus",  categorie:"Sport & bien-être", description:"Yoga, pilates et danse, dans une ambiance bienveillante.", avantage:"1er cours d'essai offert" },
  { partenaire:"Base nautique",        icon:"paddle", categorie:"Sport & bien-être", description:"Canoë et paddle sur la Charente, encadrés et accessibles.", avantage:"-15% sur la location" },
  { partenaire:"Vélos de la Charente", icon:"bike",   categorie:"Mobilité",          description:"Location et réparation, idéal pour explorer les quais.", avantage:"-20% sur la location week-end" },
  { partenaire:"Fleurs & Cie",         icon:"flower", categorie:"Maison",            description:"Pour fleurir un nouveau chez-soi ou remercier un hôte.", avantage:"-10% toute l'année" }
];

const AGENDA_COGNAC = [
  { titre:"Marché des producteurs", date:"Tous les samedis matin", lieu:"Les Halles · Cognac", categorie:"Marché",
    tags:["marché","producteurs","local","samedi","famille"], lien:"https://www.tourism-cognac.com" },
  { titre:"Festival Coup de Chauffe", date:"Septembre 2026", lieu:"Centre-ville · Cognac", categorie:"Festival",
    tags:["festival","rue","spectacle","gratuit","famille"], lien:"https://www.avantscene.com" },
  { titre:"Blues Passions", date:"Juillet 2026", lieu:"Jardin de l'Hôtel de Ville · Cognac", categorie:"Concert",
    tags:["concert","musique","blues","plein air","soir"], lien:"https://www.bluespassions.com" },
  { titre:"Exposition au Musée des arts", date:"À l'affiche ce mois-ci", lieu:"Musée des arts du cognac", categorie:"Expo",
    tags:["exposition","culture","musée","art"], lien:"https://www.musees-cognac.fr" },
  { titre:"Balade contée sur les quais", date:"Un dimanche par mois", lieu:"Quais de la Charente · Cognac", categorie:"Balade",
    tags:["balade","famille","nature","dimanche","gratuit"], lien:"https://www.tourism-cognac.com" }
];

/* Les 3 coups de cœur du mois prochain — éditez librement (titre, quand, lieu, texte, lien, icon). */
const COUPS_DE_COEUR = [
  { icon:"music", titre:"Blues Passions", quand:"3 soirs · début juillet", lieu:"Jardin de l'Hôtel de Ville",
    description:"Des têtes d'affiche sous les étoiles, et l'occasion rêvée d'une première sortie tous ensemble.", lien:"https://www.bluespassions.com" },
  { icon:"wheat", titre:"Marché nocturne des producteurs", quand:"Tous les jeudis de juillet", lieu:"Les quais",
    description:"On y dîne sur le pouce, les pieds au bord de l'eau, au son des guinguettes. Notre rituel de l'été.", lien:"https://www.tourism-cognac.com" },
  { icon:"paddle", titre:"Descente de la Charente en canoë", quand:"Week-ends d'été", lieu:"Base nautique de Cognac",
    description:"Une matinée sur la rivière pour voir la ville autrement. Accessible, même avec les enfants.", lien:"https://www.tourism-cognac.com" }
];

const TIPS_ARRIVEE = [
  { icon:"school", titre:"École & crèche", texte:"Inscriptions en mairie. Les crèches affichent vite complet : anticipez dès l'annonce de mutation." },
  { icon:"health", titre:"Médecin",        texte:"Pensez à la Maison de santé pour trouver un médecin traitant plus facilement." },
  { icon:"basket", titre:"Marché",          texte:"Le samedi matin aux Halles : produits frais et premiers contacts avec les habitués." },
  { icon:"phone",  titre:"Apps utiles",     texte:"L'appli de la ville pour les déchets et événements, et le réseau de bus local." },
  { icon:"bag",    titre:"Où acheter quoi", texte:"Centre-ville pour les indépendants, zone nord pour les grandes surfaces." },
  { icon:"people", titre:"Se faire des amis", texte:"Le plus simple : un premier rendez-vous ALVA. C'est fait pour ça !" }
];

window.AVANTAGES = AVANTAGES;
window.AGENDA_COGNAC = AGENDA_COGNAC;
window.COUPS_DE_COEUR = COUPS_DE_COEUR;
window.TIPS_ARRIVEE = TIPS_ARRIVEE;
