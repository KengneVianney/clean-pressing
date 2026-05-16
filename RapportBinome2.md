# Rapport BINÔME 2 — UI + STABILISATION

## Membres

- **Dev 1** — Routing avancé + intégration
- **Dev 2** — UI System + Design

---

## Travail effectué

### Dev 1 — Routing avancé + intégration

#### 1. Vérification du routing existant

Le routing d'origine dans `App.tsx` contenait 4 routes :

| Route | Page | Statut |
|---|---|---|
| `/` | DashboardPage | ✅ Conservée |
| `/orders` | OrdersPage | ✅ Conservée |
| `/new` | NewOrderPage | ✅ Conservée |
| `/reports` | ReportsPage | ✅ Conservée |

**Problème identifié** : la page `OrderDetailsPage.tsx` existait dans le projet mais n'était reliée à aucune route.

#### 2. Ajout de la route `/orders/:id`

**Fichier** : `src/App.tsx`

```tsx
<Route path="/orders/:id" element={<OrderDetailsPage />} />
```

- Le paramètre dynamique `:id` permet d'accéder au détail d'une commande via son identifiant
- Import du composant `OrderDetailsPage` ajouté

#### 3. Gestion de la navigation active (highlight)

**Fichier** : `src/layouts/MainLayout.tsx`

Avant (ancien système) :
```tsx
<Link to="/orders" style={{ color: "white", textDecoration: "none" }}>Orders</Link>
```

Après (nouveau système avec `NavLink`) :
```tsx
<NavLink
  to="/orders"
  style={({ isActive }) => ({
    color: isActive ? "#fff" : colors.textLight,
    backgroundColor: isActive ? colors.sidebarActive : "transparent",
  })}
>
  Orders
</NavLink>
```

Détails techniques :
- Remplacement de `<Link>` par `<NavLink>` de `react-router-dom`
- Utilisation du callback `style` avec `isActive` pour appliquer un style différent selon l'état actif/inactif
- La route `/` utilise la propriété `end` pour éviter un match partiel (ex: `/orders` ne doit pas activer le lien Dashboard)
- Couleurs : fond bleu (`#2563eb`) pour l'élément actif, texte gris clair pour les inactifs
- Animation CSS `transition: all 0.15s ease` pour le confort visuel

#### 4. Correction des bugs de navigation

- **Bug potentiel corrigé** : `Link` standard ne permettait pas le highlight automatique → remplacement par `NavLink`
- **Bug potentiel corrigé** : route `/orders/:id` manquante → ajoutée dans le `Routes`
- **Amélioration** : le layout est maintenant sticky (`position: sticky; top: 0; height: 100vh`) → la sidebar reste visible pendant le scroll

---

### Dev 2 — UI System + Design

#### 1. Amélioration de la Sidebar

**Fichier** : `src/layouts/MainLayout.tsx`

Améliorations appliquées :
- **Largeur** : passage de `240px` → `260px` pour plus d'espace
- **Structure** : division en 3 zones (en-tête, navigation, footer)
- **En-tête** : ajout du sous-titre "Gestion de Pressing" et d'un séparateur
- **Footer** : ajout d'une mention "ICT202 — Groupe 9x" en bas de la sidebar
- **Couleurs** : utilisation des tokens du thème (`colors.sidebar`, `colors.sidebarHover`, `colors.textLight`)
- **Navigation active** : `NavLink` avec highlight visuel (voir section Dev 1)

#### 2. Création des composants UI

##### Systeme de design tokens

**Fichier** : `src/styles/theme.ts`

Centralisation de tous les tokens de design :

```typescript
export const colors = {
  primary: "#2563eb",
  primaryHover: "#1d4ed8",
  sidebar: "#1e2937",
  sidebarHover: "#334155",
  sidebarActive: "#2563eb",
  background: "#f1f5f9",
  surface: "#ffffff",
  text: "#1e293b",
  textSecondary: "#64748b",
  textLight: "#94a3b8",
  border: "#e2e8f0",
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
  // + couleurs de fond pour chaque statut
};
```

Autres tokens : `spacing` (xs→xxl), `borderRadius` (sm→full), `shadows` (sm→lg).

##### Button

**Fichier** : `src/components/ui/Button.tsx`

| Prop | Valeurs possibles | Défaut |
|---|---|---|
| `variant` | `primary`, `secondary`, `outline`, `ghost`, `danger` | `primary` |
| `size` | `sm`, `md`, `lg` | `md` |
| `disabled` | `boolean` | `false` |
| `type` | `button`, `submit`, `reset` | `button` |
| `onClick` | fonction | — |
| `style` | `CSSProperties` | — |

- Hover effects : `primary` s'assombrit, `outline` obtient un fond bleu léger
- `disabled` réduit l'opacité et bloque le clic (`cursor: not-allowed`)

##### Card

**Fichier** : `src/components/ui/Card.tsx`

| Prop | Type |
|---|---|
| `children` | `ReactNode` |
| `title?` | `string` (optionnel) |
| `style?` | `CSSProperties` (optionnel) |

- Fond blanc, bord arrondi (`12px`), ombre légère, padding `24px`
- Si un `title` est fourni, un en-tête `h3` est affiché

##### Badge (statuts)

**Fichier** : `src/components/ui/Badge.tsx`

| Prop | Type |
|---|---|
| `status` | `string` (clé de `statusConfig`) |
| `label?` | `string` (optionnel, surcharge le libellé par défaut) |

Status supportés :

| Clé | Libellé | Couleur | Fond |
|---|---|---|---|
| `pending` | En attente | Jaune | `#fffbeb` |
| `processing` | En cours | Bleu | `#eff6ff` |
| `completed` | Terminé | Vert | `#f0fdf4` |
| `delivered` | Livré | Vert | `#f0fdf4` |
| `cancelled` | Annulé | Rouge | `#fef2f2` |

- Affiche un indicateur circulaire coloré + texte
- Si le `status` n'existe pas, fallback avec valeurs neutres

#### 3. Uniformisation du design

- **Toutes les couleurs** sont centralisées dans `theme.ts` et importées par tous les composants
- **Tous les espacements** utilisent le système de `spacing` (xs=`4px`, sm=`8px`, md=`16px`, lg=`24px`, xl=`32px`)
- **La zone de contenu** utilise `colors.background` (`#f1f5f9`) et `spacing.xl` pour le padding
- **Page OrderDetails** utilise `Card` et `Button` pour une apparence cohérente

---

### Fichiers modifiés / créés

| Fichier | Action | Description |
|---|---|---|
| `src/styles/theme.ts` | **CRÉÉ** | Design tokens (couleurs, espacements, ombres, status) |
| `src/components/ui/Button.tsx` | **CRÉÉ** | Bouton avec 5 variants et 3 tailles |
| `src/components/ui/Card.tsx` | **CRÉÉ** | Carte avec titre optionnel |
| `src/components/ui/Badge.tsx` | **CRÉÉ** | Badge de statut avec 5 états prédéfinis |
| `src/layouts/MainLayout.tsx` | **MODIFIÉ** | Sidebar sticky, NavLink avec highlight, footer |
| `src/App.tsx` | **MODIFIÉ** | Ajout route `/orders/:id` |
| `src/pages/OrderDetailsPage.tsx` | **MODIFIÉ** | Page complète avec useParams, grille de Cards |

---

### Vérification

- ✅ Build TypeScript : `tsc -b` — **0 erreurs**
- ✅ Build Vite : `vite build` — **succès** (238.53 kB gzipped: 76.23 kB)
- ✅ Lint ESLint : `eslint .` — **0 erreurs**
