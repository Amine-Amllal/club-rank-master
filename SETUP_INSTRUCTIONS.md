# 🚀 Guide d'Installation et Configuration

## Étape 1: Créer la Table dans Supabase

### Accès à Supabase SQL Editor
1. Allez sur [https://app.supabase.com](https://app.supabase.com)
2. Connectez-vous à votre projet
3. Cliquez sur **SQL Editor** dans le menu latéral
4. Cliquez sur **New Query**

### Exécuter le Script
1. Ouvrez le fichier `SETUP_REVIEWS_TABLE.sql` dans votre éditeur
2. Copiez tout le contenu
3. Collez-le dans l'éditeur SQL de Supabase
4. Cliquez sur **RUN** ou appuyez sur **Ctrl+Enter**

### Vérification
- Un message de succès s'affichera
- La table `reviews` apparaîtra dans l'onglet **Tables**

## Étape 2: Configurer le Stockage (Avatars)

### Créer le Bucket
1. Dans Supabase, allez à **Storage** (menu latéral)
2. Cliquez sur **New bucket**
3. Nommez-le: `avatars`
4. Cochez **Public bucket** (pour afficher les images)
5. Cliquez sur **Create bucket**

### Configurer les Permissions
1. Cliquez sur le bucket `avatars`
2. Allez à l'onglet **Policies**
3. Cliquez sur **New Policy** → **Create a policy from template**
4. Sélectionnez:
   - Policy name: "Allow authenticated uploads"
   - Allowed operations: SELECT, INSERT, UPDATE, DELETE
   - User ID: `auth.uid()`
5. Cliquez sur **Review**
6. Vérifiez que le POLICY PATH est: `avatars/${user_id}/*`
7. Cliquez sur **Save policy**

## Étape 3: Vérifier les Types TypeScript

Le fichier `src/integrations/supabase/types.ts` a été automatiquement mis à jour avec le type `reviews`.

✅ Aucune action requise - le fichier est déjà modifié

## Étape 4: Tester les Fonctionnalités

### Démarrer le serveur de développement
```bash
npm run dev
```

### Test 1: Édition de Profil
1. Allez sur votre profil personnel (cliquez sur votre avatar/nom en haut)
2. Vous devriez voir un bouton **"Edit Profile"** (avec icône crayon)
3. Cliquez dessus
4. Une modale s'ouvre avec:
   - Votre avatar actuel
   - Boutons "Upload" et "Remove"
   - Champ "Full Name"
   - Champ "Email" (lecture seule)
   - Boutons "Cancel" et "Save Changes"
5. Testez:
   - Modifier votre nom
   - Uploader une nouvelle photo (formats acceptés: JPG, PNG, GIF, WebP)
   - Max 5MB par fichier
6. Cliquez sur "Save Changes"
7. Vérifiez que les modifications sont persistées en actualisant la page

### Test 2: Laisser un Avis
1. Allez sur le profil d'un autre utilisateur (via la Leaderboard)
2. Vous devriez voir un bouton **"Write Review"** (avec icône commentaire)
3. Cliquez dessus
4. Une modale s'ouvre avec:
   - 5 étoiles pour noter
   - Zone de texte pour le commentaire
   - Compteur de caractères
5. Testez:
   - Cliquez sur une étoile (1-5)
   - Écrivez un commentaire
   - Cliquez sur "Submit Review"
6. Un message de succès s'affiche
7. Scroll vers le bas pour voir la section "Reviews"
8. Votre avis apparaît dans la liste

### Test 3: Affichage des Avis
1. Allez sur un profil avec des avis
2. Scroll vers la section "Reviews"
3. Vous verrez:
   - Le nombre d'avis: "Reviews (X)"
   - Une liste de tous les avis
   - Chaque avis affiche:
     - Avatar du reviewer
     - Nom du reviewer
     - Date et heure
     - Nombre d'étoiles (avec couleur)
     - Commentaire

### Test 4: Validations
- [ ] Impossible de s'auto-reviewer (affiche un message d'erreur)
- [ ] Max 500 caractères dans le commentaire
- [ ] Pas possible de laisser 2 avis au même utilisateur (si on essaie de nouveau, un message d'erreur s'affiche)
- [ ] Images max 5MB sinon erreur
- [ ] Images non-image sinon erreur

## Étape 5: Dépannage

### Erreur: "Table reviews not found"
**Solution**: Vérifiez que vous avez bien exécuté le fichier `SETUP_REVIEWS_TABLE.sql`

### Erreur: "Storage error"
**Solution**: Vérifiez que:
- Le bucket `avatars` existe
- Les permissions RLS sont configurées
- Votre utilisateur a les droits d'écriture

### Pas d'avis après création
**Solution**:
- Vérifiez que vous êtes connecté
- Actualiser la page
- Vérifier la console pour les erreurs

### Bouton "Edit Profile" ne s'affiche pas
**Solution**:
- Vérifiez que vous êtes sur votre propre profil
- Actualiser la page

### Erreur "TypeError: Cannot read property 'map' of null"
**Solution**: Une ou plusieurs tables n'ont pas les bonnes données, vérifiez les RLS policies

## Étape 6: Déploiement

### Vercel (déploiement en production)
```bash
npm run build
git add .
git commit -m "feat: Add profile editing and review system"
git push
```

Vercel déploiera automatiquement le site.

### Configuration pour la Production
- ✅ Les variables d'environnement Supabase sont déjà configurées
- ✅ Les politiques RLS sécurisent l'accès aux données
- ✅ Le stockage d'avatars est public mais sécurisé

## Étape 7: Documentation Utilisateur

Vous pouvez partager avec les utilisateurs:

> **Nouvelles Fonctionnalités Disponibles:**
> 
> 1. **Éditer votre Profil** 📝
>    - Allez sur votre profil
>    - Cliquez sur "Edit Profile"
>    - Changez votre nom et/ou ajoutez une photo
>    - Cliquez "Save Changes"
> 
> 2. **Laisser des Avis** ⭐
>    - Allez sur le profil d'un autre utilisateur
>    - Cliquez sur "Write Review"
>    - Donnez une note (1-5 étoiles)
>    - Écrivez un commentaire
>    - Cliquez "Submit Review"

## Fichiers Clés

| Fichier | Description |
|---------|-------------|
| `SETUP_REVIEWS_TABLE.sql` | Script de création de table (à exécuter une seule fois) |
| `src/components/EditProfileModal.tsx` | Composant modal pour éditer le profil |
| `src/components/ReviewModal.tsx` | Composant modal pour créer un avis |
| `src/components/ReviewsList.tsx` | Composant pour afficher les avis |
| `src/pages/Profile.tsx` | Page profil mise à jour |
| `src/integrations/supabase/types.ts` | Types TypeScript (table reviews ajoutée) |

## Support

En cas de problème:
1. Vérifiez les logs de la console (F12)
2. Vérifiez les logs de Supabase (https://app.supabase.com)
3. Consultez la documentation: FEATURES_IMPLEMENTATION.md

---

**Status**: ✅ Prêt pour la production
**Dernière mise à jour**: 2025-11-23
