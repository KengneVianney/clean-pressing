# 🧺 CleanPressing — Application de Gestion de Pressing

Projet ICT202 — Développement Mobile  
Groupe 9x — 8 membres (4 binômes)

---

## 📌 Présentation

Application web de gestion de pressing permettant :
- gestion des commandes clients
- suivi des statuts
- calcul automatique des prix
- dashboard de statistiques

---

## 🛠️ Stack technique

- React + TypeScript
- React Router
- IndexedDB
- Yup (validation)
- Recharts (dashboard)

---

## 👥 Répartition des tâches

🔵 BINÔME 2 — UI + STABILISATION (PLUS DE REFACTOR)

👤 Dev 1 — Routing avancé + intégration
Tâches :
vérifier routing existant
ajouter route :
/orders/:id (détail commande)
gérer navigation active (highlight menu)
corriger bugs de navigation
Fichiers :
App.tsx
routes config
pages/OrderDetailsPage.tsx

👤 Dev 2 — UI SYSTEM + DESIGN
Tâches :
améliorer Sidebar (active state)
créer composants UI :
Button
Card
Badge (statuts)
uniformiser design

Fichiers :
components/ui/Button.tsx
components/ui/Card.tsx
components/ui/Badge.tsx


🟢 BINÔME 1 — BASE DE DONNÉES

👤 Dev 3 — IndexedDB setup + types
Tâches :
créer type Order strict
créer schema IndexedDB
définir object store "orders"
Fichiers :
types/Order.ts
database/db.ts

👤 Dev 4 — CRUD + Hook
Tâches :
addOrder
getOrders
updateOrder
deleteOrder
filtrage par status
hook useOrders

Fichiers :
services/orders.service.ts
hooks/useOrders.ts


🟡 BINÔME 4 — FORMULAIRES + VALIDATION + LOGIQUE
👤 Dev 5 — Formulaire création
Tâches :
form nouvelle commande
champs :
client
téléphone
article
quantité
service
UI propre

Fichiers :
components/forms/OrderForm.tsx

👤 Dev 6 — Validation + calcul prix
Tâches :
validation avec Yup
règles :
téléphone valide
quantité > 0
calcul automatique :
total = quantité × prix service

Fichiers :
schemas/order.schema.ts
utils/pricing.ts

🔴 BINÔME 3 — DASHBOARD + UX FINALE
👤 Dev 7 — Dashboard stats
Tâches :
total commandes
commandes par statut
chiffre d’affaires estimé
résumé global

Fichiers :
pages/DashboardPage.tsx
components/dashboard/StatsCard.tsx

👤 Dev 8 — Liste commandes + UX
Tâches :
OrderList
OrderCard
StatusBadge
recherche par client
filtre par statut

Fichiers :
components/orders/OrderList.tsx
components/orders/OrderCard.tsx
components/orders/StatusBadge.tsx

---

## 🚀 Installation

```bash
npm install
npm run dev
