# 🧪 Guide Pratique de Test

## Avant de Commencer

### 1️⃣ Démarrer l'Application
```bash
npm run dev
```
L'application sera accessible à `http://localhost:5173`

### 2️⃣ Se Connecter
- Email: Un email valide configuré dans Supabase
- Password: Votre mot de passe

---

## ✅ Test 1: Édition du Profil

### Accéder à l'Édition
1. Une fois connecté, cliquez sur votre **avatar ou votre nom** en haut à droite
2. Vous arrivez sur **votre profil personnel**
3. Vous devriez voir un bouton **"Edit Profile"** (avec icône crayon)

### Tester la Modification du Nom
1. Cliquez sur **"Edit Profile"**
2. Une modale s'ouvre
3. Dans le champ **"Full Name"**, tapez un nouveau nom
4. Cliquez sur **"Save Changes"**
5. ✅ Vérifier que:
   - Un message "Profile updated successfully!" apparaît
   - Le nom change immédiatement sur la page
   - La page se rafraîchit et le nom persiste

### Tester l'Upload de Photo
1. Cliquez sur **"Edit Profile"**
2. Cliquez sur le bouton **"Upload"** (sous votre avatar)
3. Sélectionnez une image depuis votre ordinateur
   - Formats acceptés: JPG, PNG, GIF, WebP
   - Taille max: 5MB
4. Un aperçu de l'image s'affiche
5. Cliquez sur **"Save Changes"**
6. ✅ Vérifier que:
   - L'image s'affiche comme avatar
   - L'image persiste après rafraîchissement
   - Un message de succès s'affiche

### Tester la Suppression de Photo
1. Cliquez sur **"Edit Profile"**
2. Cliquez sur le bouton **"Remove"** (si une image est uploadée)
3. Cliquez sur **"Save Changes"**
4. ✅ Vérifier que:
   - L'avatar revient au fallback (initiale du nom)
   - Les données en base sont mises à jour

### Tester les Validations
1. Cliquez sur **"Edit Profile"**
2. Essayez d'uploader:
   - ❌ Un fichier > 5MB → Message d'erreur "File size must be less than 5MB"
   - ❌ Un fichier non-image → Message d'erreur "Please select an image file"
3. Laissez le nom vide et sauvegardez → Le nom sera "Member" par défaut

---

## ✅ Test 2: Système d'Avis

### Accéder à un Autre Profil
1. Allez sur la **Leaderboard**
2. Cliquez sur un autre utilisateur (pas vous)
3. Vous arrivez sur son profil
4. Vous devriez voir un bouton **"Write Review"** (avec icône commentaire)

### Tester la Création d'Avis
1. Cliquez sur **"Write Review"**
2. Une modale s'ouvre avec:
   - 5 étoiles pour noter
   - Zone de texte pour le commentaire
   - Compteur de caractères (0/500)

### Laisser une Évaluation
1. **Cliquez sur une étoile** (1-5)
   - L'étoile sélectionnée devient jaune
   - ✅ Vérifier que vous pouvez changer la note en cliquant ailleurs
2. Écrivez un **commentaire**: "C'est un super collègue !"
3. Cliquez sur **"Submit Review"**
4. ✅ Vérifier que:
   - Un message "Review submitted successfully!" s'affiche
   - La modale se ferme
   - Votre avis apparaît dans la section "Reviews"

### Affichage de l'Avis
Scroll vers le bas et regardez la section **"Reviews"**
✅ Vous devriez voir:
- Votre avatar
- Votre nom
- La date et heure (ex: "Nov 23, 2025 at 2:30 PM")
- Les étoiles avec couleur jaune (si note ≥ 4)
- Votre commentaire

### Tester le Code Couleur des Étoiles
1. Laissez plusieurs avis avec différentes notes:
   - 5 étoiles → Vert 🟢
   - 4 étoiles → Vert 🟢
   - 3 étoiles → Orange 🟠
   - 2 étoiles → Rouge 🔴
   - 1 étoile → Rouge 🔴

### Tester les Validations

#### ❌ Ne pas pouvoir s'auto-reviewer
1. Allez sur votre propre profil
2. Le bouton **"Write Review"** ne doit PAS apparaître
3. Essayez d'accéder directement via URL ou console:
   - Message d'erreur: "You cannot review yourself"

#### ❌ Max 500 caractères
1. Cliquez sur "Write Review"
2. Essayez de coller un texte > 500 caractères
3. Le compteur affiche "500/500" et refuse les caractères supplémentaires

#### ❌ Comment dupliqué par personne
1. Laissez un avis sur un utilisateur
2. Retournez sur le même profil
3. Cliquez sur "Write Review" à nouveau
4. Laissez un nouvel avis
5. ✅ Vérifier qu'un message d'erreur s'affiche (pas 2 avis du même auteur)

#### ❌ Commentaire obligatoire
1. Cliquez sur "Write Review"
2. Sélectionnez une note
3. Ne tapez rien dans le commentaire
4. Le bouton "Submit Review" reste grisé/désactivé
5. ✅ Vous êtes forcé d'écrire quelque chose

---

## ✅ Test 3: Affichage des Avis

### Sur le Profil d'un Utilisateur
1. Allez sur le profil d'un utilisateur qui a reçu des avis
2. Scroll vers le bas → Section **"Reviews (X)"** où X = nombre d'avis
3. ✅ Vérifier que vous voyez:
   - Tous les avis triés par date (récents en premier)
   - Chaque avis affiche: avatar, nom, date, étoiles, commentaire
   - Les étoiles ont la bonne couleur

### Compteur d'Avis
- Le titre affiche: "Reviews (3)" s'il y a 3 avis
- ✅ Le compteur se met à jour après chaque nouvel avis

### Pas d'Avis
- Si l'utilisateur n'a pas encore d'avis → Message: "No reviews yet. Be the first to review this member!"

---

## ✅ Test 4: Responsivité

### Mobile (< 768px)
1. Ouvrez les outils de développement (F12)
2. Sélectionnez un appareil mobile (iPhone 12, etc.)
3. Testez:
   - Les modals s'affichent bien
   - Les boutons sont cliquables
   - Les textes sont lisibles
   - Les images ne débordent pas

### Tablet (768px - 1024px)
1. Redimensionnez à 800x600px
2. Testez que tout s'affiche correctement
3. Les modals doivent rester centrées

### Desktop (1920px+)
1. Testez en plein écran
2. Vérifiez que la mise en page est symétrique

---

## ✅ Test 5: Cas d'Erreur

### Erreur Réseau
1. Ouvrez les outils de développement (F12)
2. Allez à l'onglet **Network**
3. Sélectionnez **Offline**
4. Essayez de sauvegarder un profil ou un avis
5. ✅ Un message d'erreur doit s'afficher

### Erreur de Permissions
1. Essayez de modifier le profil d'un autre utilisateur (hack)
   - En changeant l'URL ou via console
2. ✅ L'erreur doit s'afficher: "Failed to update profile"

---

## 🔍 Vérifications en Console

### Ouvrir la Console (F12)
- Appuyez sur **F12** dans votre navigateur
- Allez à l'onglet **Console**

### Vérifier les Logs
1. Laissez un avis
2. ✅ Vous ne devez voir aucune erreur rouge
3. Des logs informatifs peuvent apparaître

### Vérifier le Stockage
1. Allez à l'onglet **Application** → **Local Storage**
2. ✅ Les données de session doivent être présentes

---

## 📊 Checklist Complète de Test

### Édition de Profil
- [ ] Bouton "Edit Profile" visible sur son profil
- [ ] Bouton "Edit Profile" absent sur autres profils
- [ ] Modification du nom fonctionne
- [ ] Upload d'image fonctionne
- [ ] Suppression d'image fonctionne
- [ ] Validation taille fichier (< 5MB)
- [ ] Validation type fichier (images uniquement)
- [ ] Données persistent après rafraîchissement

### Système d'Avis
- [ ] Bouton "Write Review" visible sur autres profils
- [ ] Bouton "Write Review" absent sur son propre profil
- [ ] Sélection des étoiles fonctionne
- [ ] Écriture commentaire fonctionne
- [ ] Compteur de caractères fonctionne (0-500)
- [ ] Bouton "Submit" est grisé si commentaire vide
- [ ] Avis s'affiche après création
- [ ] Impossible de laisser 2 avis au même utilisateur
- [ ] Impossible de s'auto-reviewer
- [ ] Code couleur des étoiles correct

### Affichage
- [ ] Avis triés par date (récents en premier)
- [ ] Avatar du reviewer s'affiche
- [ ] Nom du reviewer s'affiche
- [ ] Date formatée correctement
- [ ] Commentaire s'affiche complet
- [ ] Compteur "Reviews (X)" correct
- [ ] "No reviews yet" message si aucun avis

### Responsivité
- [ ] Mobile (< 768px) OK
- [ ] Tablet (768-1024px) OK
- [ ] Desktop (1920px+) OK

### Erreurs
- [ ] Message d'erreur si erreur réseau
- [ ] Message d'erreur si fichier invalide
- [ ] Message d'erreur si permissions insuffisantes
- [ ] Aucune erreur JavaScript en console

---

## 🚨 Troubleshooting Rapide

| Problème | Solution |
|----------|----------|
| "Edit Profile" ne s'affiche pas | Vérifiez que vous êtes sur votre profil (userId actuel) |
| "Write Review" n'apparaît pas | Vérifiez que vous êtes sur un autre profil (userId ≠ actuel) |
| Image n'upload pas | Vérifiez: < 5MB, format image, bucket `avatars` existe |
| Avis n'apparaît pas | Actualiser la page, vérifier la console pour erreurs |
| "File size too large" | Utilisez une image < 5MB (compressez-la) |
| Avis dupliqué rejected | Normal, un seul avis par reviewer autorisé |

---

## 💡 Tips de Test

1. **Testez avec 2 utilisateurs**: Ouvrez 2 onglets, connectez-vous avec des comptes différents
2. **Testez les cas limites**: Noms très longs, commentaires max length, etc.
3. **Testez offline**: Débranchez le réseau pour tester la gestion d'erreur
4. **Testez rapidement**: Cliquez rapidement sur "Submit" plusieurs fois pour tester la debounce
5. **Testez le rollback**: Changez quelque chose, actualiser la page, ça doit revenir à l'ancien état si erreur

---

**Bon Test! 🎉**
