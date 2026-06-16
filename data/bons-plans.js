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

/* AVANTAGES — vide pour l'instant : aucun avantage n'est affiché sur le site.
   Un modèle est conservé ci-dessous (masqué) pour réactiver la rubrique :
   il suffit d'ajouter des objets dans le tableau AVANTAGES ci-dessous.

   MODÈLE (à dupliquer) :
   { partenaire:"Café des Arts", icon:"cup", categorie:"Gourmand",
     description:"Café de spécialité en plein centre.", avantage:"-15% sur la première commande" }
   Icônes possibles : cup, book, wine, lotus, paddle, bike, flower, music…
   Catégories : Gourmand, Culture, Sport & bien-être, Mobilité, Maison. */
const AVANTAGES = [];

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
  { icon:"school", titre:"École & crèche", texte:"Pour les écoles publiques, le Pôle Éducation-Jeunesse se trouve au Couvent des Récollets, 53 rue d'Angoulême. Contact : 05 45 36 55 41. Pour les crèches, le premier interlocuteur est le Relais Petite Enfance, 6 rue de la Prédasse, au 06 37 08 02 69." },
  { icon:"health", titre:"Santé",          texte:"Pour chercher un médecin ou prendre un premier rendez-vous, le Centre de santé municipal est situé au 8 rue Camille Godard. Standard : 09 82 99 18 16. En cas d'urgence vitale, composez le 15." },
  { icon:"basket", titre:"Marché",          texte:"Les Halles de Cognac, place d'Armes, sont ouvertes du mardi au vendredi de 8h à 13h, et le week-end de 8h à 13h. Le marché de plein vent a lieu place du Champ de Foire les mardis et vendredis matin, de 8h à 13h." },
  { icon:"phone",  titre:"Transports & déchets", texte:"Pour le bus, le réseau Transcom permet d'acheter ses titres sur l'application Modalis. L'agence Transcom est place Gambetta et joignable au 0 800 881 691. Pour les déchets, les bacs noirs sont collectés le lundi matin à Cognac, et les bacs jaunes le jeudi matin. En hypercentre : noirs les mardis et vendredis, jaunes le mercredi. Pensez à sortir les bacs la veille au soir." },
  { icon:"bag",    titre:"Où acheter quoi", texte:"Pour les commerces du quotidien, commencez par le centre-ville, la rue Aristide Briand, les Halles et les rues autour de la place François Ier. Pour les grandes courses, l'équipement, la maison ou la voiture, regardez aussi du côté de Châteaubernard et d'Aushopping Cognac." },
  { icon:"people", titre:"Se faire des amis", texte:"Le plus simple : un premier rendez-vous ALVA. C'est fait pour ça !" }
];

window.AVANTAGES = AVANTAGES;
window.AGENDA_COGNAC = AGENDA_COGNAC;
window.COUPS_DE_COEUR = COUPS_DE_COEUR;
window.TIPS_ARRIVEE = TIPS_ARRIVEE;
