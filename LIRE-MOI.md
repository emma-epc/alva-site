# Site ALVA — guide rapide

Site statique (HTML/CSS/JS). Aucune installation : double-cliquez sur
`index.html` pour l'ouvrir, ou hébergez le dossier tel quel (Netlify, OVH,
Vercel, GitHub Pages…).

## Les pages
| Fichier | Page |
|---|---|
| `index.html` | Accueil (animation du logo + toutes les sections) |
| `les-rendez-vous.html` | Agenda complet (cartes événements) |
| `evenements-passes.html` | Galerie des éditions passées |
| `le-concept.html` | Le concept et les formats |
| `manifeste.html` | Le texte fondateur |
| `partenaires.html` | Lieux, artisans, devenir partenaire |
| `contact.html` | Formulaire + FAQ |

## Le style et les scripts sont partagés
- `assets/alva.css` — toute la mise en forme du site (un seul endroit à modifier).
- `assets/alva.js` — animations : logo, halo, rideaux, curseur, événements.

## Modifier un événement (page d'accueil ou « Les rendez-vous »)
Chaque événement est un bloc `<article class="ev-card">`. Modifiez la date,
le titre, le lieu, le prix, et remplacez `href="#"` par votre lien Google
Forms / Helloasso. La couleur pastel de chaque carte est attribuée
automatiquement selon l'ordre — au survol elle devient « flash » et le texte
passe en blanc ; au clic, les cartes se replient à gauche et le détail
s'ouvre à droite.

## À brancher
- Formulaire de contact : remplacez `votre_id` dans `action="https://formspree.io/f/votre_id"`.
- Photo d'Emma : déposez `images/emma-pouget.jpg` (voir `images/LIRE-MOI.txt`).
- Liens d'inscription : remplacez les `href="#"` des boutons « S'inscrire ».

## Connexion internet
Les polices (Google Fonts) et les librairies d'animation (GSAP, Three.js)
sont chargées depuis le web. Le site a besoin d'une connexion pour afficher
toutes les animations.
