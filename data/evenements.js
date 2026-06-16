/* =====================================================================
   ALVA — Données des événements
   --------------------------------------------------------------------
   POUR AJOUTER / MODIFIER / SUPPRIMER UN ÉVÉNEMENT : éditez UNIQUEMENT
   ce fichier. Toutes les pages qui affichent des événements le lisent.

   Champs d'un événement :
     id              identifiant unique (sans espace ni accent)
     titre           nom affiché
     date            "AAAA-MM-JJ" (sert au tri et au filtre par date)
     heure           ex. "19h30"
     lieu            lieu complet
     type            "signature" | "leger" | "famille"
     prix            nombre en euros (0 = gratuit)
     places          nombre total de places
     placesRestantes nombre de places encore disponibles (0 = complet)
     description      texte de présentation
     tags             mots-clés pour le moteur de recherche (type Airbnb)
     helloassoUrl     lien de paiement/inscription HelloAsso (par événement)
     image            chemin optionnel ex. "images/events/baronnie.jpg"
   ===================================================================== */
const EVENEMENTS = [
  {
    id: "diner-baronnie-juin-2026",
    titre: "Dîner au Domaine de la Baronnie",
    date: "2026-06-19",
    heure: "19h30",
    lieu: "Domaine de la Baronnie · Cognac-Châteaubernard",
    type: "signature",
    prix: 45,
    places: 20,
    placesRestantes: 12,
    description: "Un dîner intimiste pour découvrir un lieu du territoire, rencontrer de nouvelles personnes et vivre une soirée pensée autour de la convivialité, du patrimoine et du goût.",
    tags: ["dîner","gastronomie","soirée","vignes","domaine","patrimoine","dégustation"],
    helloassoUrl: "https://www.helloasso.com/associations/alva/evenements/diner-baronnie",
    image: ""
  },
  {
    id: "pilates-brunch-pin-juin-2026",
    titre: "Pilates & brunch au Domaine du Pin",
    date: "2026-06-28",
    heure: "10h00",
    lieu: "Domaine du Pin · Cognac",
    type: "leger",
    prix: 18,
    places: 12,
    placesRestantes: 5,
    description: "Une matinée douce et accessible pour bouger, respirer et partager un brunch local dans un cadre chaleureux.",
    tags: ["pilates","sport","bien-être","brunch","matin","plein air","détente"],
    helloassoUrl: "https://www.helloasso.com/associations/alva/evenements/pilates-brunch-pin",
    image: ""
  },
  {
    id: "visite-chateau-cognac-juillet-2026",
    titre: "Visite privée du Château de Cognac",
    date: "2026-07-11",
    heure: "15h00",
    lieu: "Château de Cognac · Cognac",
    type: "leger",
    prix: 15,
    places: 15,
    placesRestantes: 0,
    description: "Une visite en petit comité pour découvrir autrement un lieu emblématique de Cognac, entre histoire, transmission et dégustation.",
    tags: ["visite","château","histoire","culture","patrimoine","dégustation","caves"],
    helloassoUrl: "https://www.helloasso.com/associations/alva/evenements/visite-chateau",
    image: ""
  },
  {
    id: "table-ete-charente-juillet-2026",
    titre: "Table d'été au bord de la Charente",
    date: "2026-07-26",
    heure: "19h00",
    lieu: "Quai de la Charente · Bourg-Charente",
    type: "signature",
    prix: 38,
    places: 24,
    placesRestantes: 18,
    description: "Une grande tablée en plein air au coucher du soleil, produits du terroir et rencontres simples, les pieds presque dans l'eau.",
    tags: ["dîner","plein air","été","rivière","terroir","tablée","coucher de soleil"],
    helloassoUrl: "https://www.helloasso.com/associations/alva/evenements/table-ete-charente",
    image: ""
  },
  {
    id: "balade-cafe-septembre-2026",
    titre: "Balade & café entre nouveaux arrivants",
    date: "2026-09-07",
    heure: "10h30",
    lieu: "Départ Place François 1er · Cognac",
    type: "famille",
    prix: 0,
    places: 20,
    placesRestantes: 14,
    description: "Une matinée pour découvrir la ville à pied, repérer les bonnes adresses et faire connaissance autour d'un café.",
    tags: ["balade","marche","café","famille","matin","gratuit","découverte","ville"],
    helloassoUrl: "https://www.helloasso.com/associations/alva/evenements/balade-cafe",
    image: ""
  },
  {
    id: "diner-artisan-septembre-2026",
    titre: "Dîner-rencontre avec un artisan du cognac",
    date: "2026-09-26",
    heure: "20h00",
    lieu: "Maison partenaire · Cognac",
    type: "signature",
    prix: 42,
    places: 18,
    placesRestantes: 9,
    description: "Une soirée au plus près d'un savoir-faire : on partage la table d'un artisan, on écoute son histoire, on goûte sa production.",
    tags: ["dîner","artisan","savoir-faire","cognac","rencontre","dégustation","soirée"],
    helloassoUrl: "https://www.helloasso.com/associations/alva/evenements/diner-artisan",
    image: ""
  }
];

/* ─────────────────────────────────────────────────────────────────────
   AUCUN rendez-vous à venir n'est affiché pour l'instant.
   Les événements ci-dessus sont CONSERVÉS comme modèle (mise en page).
   Pour les réafficher, commentez ou supprimez la ligne suivante : */
EVENEMENTS.length = 0;
/* ───────────────────────────────────────────────────────────────────── */

// Libellés lisibles pour les types d'événement
const EVENT_TYPES = {
  signature: "Signature",
  leger: "Format léger",
  famille: "Famille"
};

/* ----- Événements passés -----
   La page d'accueil & « Les rendez-vous » en affichent les 4 plus récents
   sous forme de « livre » qui tourne ses pages (photo + récit).
   Champ `recit` = le petit texte raconté à côté de la photo. */
const EVENEMENTS_PASSES = [
  { titre: "Dîner intimiste", date: "2026-06-21", annee: "2026", lieu: "Bourg-Charente", image: "",
    recit: "Douze convives, une grande table au bord de l'eau, et cette impression rare de se connaître depuis toujours au moment du dessert." },
  { titre: "Rencontre artisans", date: "2026-06-07", annee: "2026", lieu: "Cognac", image: "",
    recit: "Un après-midi chez ceux qui font Cognac de leurs mains. On a goûté, écouté, posé mille questions — et reparti avec des étoiles plein les yeux." },
  { titre: "Visite confidentielle", date: "2026-05-17", annee: "2026", lieu: "Château de Cognac", image: "",
    recit: "Les portes habituellement fermées se sont ouvertes pour nous. Les caves, l'histoire, le silence : un moment hors du temps, ensemble." },
  { titre: "Brunch des familles", date: "2026-05-03", annee: "2026", lieu: "Domaine du Pin", image: "",
    recit: "Les enfants couraient dans l'herbe, les parents refaisaient le monde autour d'un café. Le genre de matinée qui donne envie de revenir." },
  { titre: "Atelier territoire", date: "2026-04-05", annee: "2026", lieu: "Cognac", image: "",
    recit: "On a dessiné notre carte des bonnes adresses, tous ensemble. La meilleure façon d'apprivoiser une ville : la raconter à plusieurs." },
  { titre: "Soirée de lancement", date: "2026-03-14", annee: "2026", lieu: "Cognac", image: "",
    recit: "La toute première. On ne savait pas combien viendraient. La salle était pleine, et ALVA était née pour de bon." },
  { titre: "Marché de Noël ALVA", date: "2025-12-13", annee: "2025", lieu: "Cognac", image: "",
    recit: "Vin chaud, créateurs d'ici et premières amitiés sous les guirlandes. Un avant-goût de tout ce qui allait suivre." }
];

/* ----- Statistiques (compteurs animés) ----- */
const STATS_PASSES = [
  { valeur: 12, suffixe: "", label: "événements organisés" },
  { valeur: 340, suffixe: "+", label: "participants accueillis" },
  { valeur: 9, suffixe: "", label: "lieux du territoire" }
];

/* ----- Témoignages (carousel) ----- */
const CITATIONS = [
  { texte: "On est arrivés sans connaître personne. Trois dîners plus tard, on avait l'impression d'être d'ici.", auteur: "Camille & Thomas" },
  { texte: "ALVA, c'est la main qu'on aurait aimé qu'on nous tende en arrivant. Simple, chaleureux, sans chichi.", auteur: "Sarah, conjointe de militaire" },
  { texte: "Je suis venue seule au premier brunch. Je suis repartie avec trois numéros et l'envie de revenir.", auteur: "Léa" },
  { texte: "Découvrir le territoire avec des gens qui le font vivre, ça change tout. On se sent vite chez nous.", auteur: "Familles Morel" }
];

window.EVENEMENTS = EVENEMENTS;
window.EVENT_TYPES = EVENT_TYPES;
window.EVENEMENTS_PASSES = EVENEMENTS_PASSES;
window.STATS_PASSES = STATS_PASSES;
window.CITATIONS = CITATIONS;
