/* =====================================================================
   ALVA — Lieux du territoire (carte Leaflet illustrée de Cognac)
   --------------------------------------------------------------------
   POUR AJOUTER / MODIFIER UN LIEU : éditez UNIQUEMENT ce fichier.
   La carte (pages Bons plans & Partenaires) le lit.

   La carte est une VRAIE carte interactive (fond OpenStreetMap / CARTO,
   sans clé) habillée d'un rendu « dessiné ». Chaque point est donc placé
   par ses vraies coordonnées GPS — trouvez-les sur Google Maps :
   clic droit sur le lieu → les chiffres en haut sont « lat, lng ».

   Champs d'un lieu :
     id    identifiant unique           name  nom affiché
     cat   "table" | "cafe" | "balade" | "culture"
     lat, lng   coordonnées GPS (Google Maps : clic droit → copier)
     ville commune
     desc  une phrase (ton ALVA)
     url   site internet (facultatif). Si présent → la carte-info est
           cliquable et ouvre le site. Sinon, simple info non cliquable.
     fav   true = « Coup de cœur ALVA » (badge)
   ===================================================================== */
const LIEUX = [
  { id:"chateau",      name:"Château de Cognac",        cat:"culture", lat:45.69807, lng:-0.33000, ville:"Cognac", desc:"Sur la rive, là où l'histoire de la ville a commencé. Visites des caves de la maison Otard.", url:"https://www.chateauxdecognac.com", fav:true },
  { id:"hennessy",     name:"Maison Hennessy",          cat:"culture", lat:45.69633, lng:-0.33173, ville:"Cognac", desc:"Sur les quais : la traversée de la Charente en barque et la dégustation, un incontournable.", url:"https://www.hennessy.com/fr-fr/visites", fav:true },
  { id:"musee",        name:"Musée des arts du cognac", cat:"culture", lat:45.69566, lng:-0.32561, ville:"Cognac", desc:"Pour comprendre la ville et son eau-de-vie en une visite, au cœur du centre ancien.", url:"https://www.musees-cognac.fr", fav:false },
  { id:"halles",       name:"Les Halles de Cognac",     cat:"cafe",    lat:45.69492, lng:-0.32693, ville:"Cognac", desc:"Le marché couvert. Producteurs, café et premiers visages familiers le samedi matin.", url:"", fav:true },
  { id:"brulerie",     name:"Brûlerie de Cognac",       cat:"cafe",    lat:45.69470, lng:-0.32840, ville:"Cognac", desc:"Torréfaction maison en plein centre : le meilleur café de la ville, à emporter.", url:"", fav:false },
  { id:"belle-epoque", name:"La Belle Époque",          cat:"table",   lat:45.69760, lng:-0.32950, ville:"Cognac", desc:"Cuisine de saison au bord de la Charente. Réservez la terrasse au coucher du soleil.", url:"", fav:true },
  { id:"place-fr1",    name:"Place François Ier",       cat:"balade",  lat:45.69321, lng:-0.32565, ville:"Cognac", desc:"Le cœur battant de Cognac. Point de départ idéal pour s'approprier la ville à pied.", url:"", fav:false },
  { id:"jardin",       name:"Jardin public",            cat:"balade",  lat:45.69430, lng:-0.32430, ville:"Cognac", desc:"Le grand poumon vert de la ville, parfait pour une pause ou une matinée en famille.", url:"", fav:true },
  { id:"quais",        name:"Les quais de la Charente", cat:"balade",  lat:45.69740, lng:-0.32760, ville:"Cognac", desc:"Une balade au fil de l'eau, entre les grandes maisons de négoce et les pontons.", url:"", fav:false }
];

const LIEUX_CAT_LABEL = { table:"Table", cafe:"Café & marché", balade:"Balade", culture:"Culture" };

window.LIEUX = LIEUX;
window.LIEUX_CAT_LABEL = LIEUX_CAT_LABEL;
