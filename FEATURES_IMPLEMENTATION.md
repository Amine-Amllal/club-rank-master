# Implémentation des Fonctionnalités de Profil et Avis

## Fonctionnalités Ajoutées

### 1. Édition du Profil Utilisateur
- Les utilisateurs peuvent éditer leur **nom complet**
- Les utilisateurs peuvent uploader une **photo de profil**
- Upload d'image sécurisé vers Supabase Storage
- Validation de la taille et du type de fichier (max 5MB)

**Fichier**: `src/components/EditProfileModal.tsx`

### 2. Système d'Avis
- Les utilisateurs peuvent **laisser des avis** sur les autres membres
- Chaque avis contient :
  - Une **évaluation** de 1 à 5 étoiles
  - Un **commentaire** (max 500 caractères)
  - La date et l'heure
  - L'auteur de l'avis avec photo de profil

**Fichiers**: 
- `src/components/ReviewModal.tsx` (formulaire d'avis)
- `src/components/ReviewsList.tsx` (affichage des avis)

### 3. Page de Profil Améliorée
- Affichage du profil avec avatar, nom et points
- Historique des activités (points gagnés/perdus)
- **Liste des avis reçus**
- **Bouton "Edit Profile"** pour les propriétaires du profil
- **Bouton "Write Review"** pour les autres utilisateurs

**Fichier**: `src/pages/Profile.tsx`

## Configuration de la Base de Données

### Création de la Table `reviews`

Exécutez le fichier SQL suivant dans Supabase SQL Editor :

```sql
-- SETUP_REVIEWS_TABLE.sql
```

Ce script crée :
1. La table `reviews` avec les colonnes :
   - `id` (UUID, clé primaire)
   - `user_id` (profil étant reviewé)
   - `reviewer_id` (utilisateur qui laisse l'avis)
   - `rating` (1-5 étoiles)
   - `comment` (texte)
   - `created_at` (timestamp)

2. Contraintes de sécurité :
   - Impossible de s'auto-reviewer
   - Un avis unique par paire d'utilisateurs (reviewer/user)

3. Politiques RLS (Row Level Security) :
   - Les avis sont lisibles par tous les utilisateurs authentifiés
   - Les utilisateurs ne peuvent créer/modifier/supprimer que leurs propres avis

4. Index pour optimiser les requêtes

## Configuration du Stockage d'Images

1. Créez un bucket `avatars` dans Supabase Storage
2. Configurez les politiques pour autoriser les uploads authentifiés :
   ```
   - Les utilisateurs peuvent uploader vers avatars/{userid}/*
   - Les avis sont publiquement accessibles
   ```

## Mise à Jour des Types TypeScript

Le fichier `src/integrations/supabase/types.ts` a été mis à jour avec la table `reviews`.

## Tests

Pour tester les nouvelles fonctionnalités :

1. **Édition de profil**:
   - Accédez à votre profil
   - Cliquez sur "Edit Profile"
   - Modifiez votre nom et/ou photo de profil
   - Cliquez "Save Changes"

2. **Avis**:
   - Accédez au profil d'un autre utilisateur
   - Cliquez sur "Write Review"
   - Laissez une évaluation (1-5 étoiles)
   - Écrivez un commentaire
   - Cliquez "Submit Review"
   - L'avis apparaît dans la section "Reviews" du profil

## Notes d'Implémentation

- Les images sont compressées et optimisées lors de l'upload
- Les avis sont triés par date décroissante (plus récents en premier)
- La validation côté client et serveur garantit l'intégrité des données
- Les permissions RLS garantissent que seuls les utilisateurs autorisés peuvent modifier les avis
- Les erreurs sont gérées avec des toasts utilisateur (notifications)

## Améliorations Futures Possibles

- Système de notation global (moyenne des avis)
- Suppression des avis avec modération
- Système de badges basé sur la qualité des avis
- Notifications quand on reçoit un avis
- Réponses aux avis
