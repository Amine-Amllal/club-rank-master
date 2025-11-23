# 🚀 Démarrage Rapide - 5 Minutes

## Étape 1: Configuration Supabase (1 min)

### Dans Supabase SQL Editor:
1. Copier-coller le contenu de `SETUP_REVIEWS_TABLE.sql`
2. Cliquer **RUN**
3. ✅ Message: "executed successfully"

### Dans Supabase Storage:
1. Créer bucket `avatars`
2. Cocher "Public bucket"
3. ✅ Bucket créé

---

## Étape 2: Lancer l'App (30 sec)

```bash
cd c:\Users\khali\OneDrive\Bureau\Art\club\GENOS\club-rank-master
npm run dev
```

✅ App en local à `http://localhost:5173`

---

## Étape 3: Se Connecter (1 min)

1. Accédez à `http://localhost:5173`
2. Email + Password de votre compte Supabase
3. Cliquez "Login"

---

## Étape 4: Test d'Édition (1 min)

### Accéder au profil:
1. Cliquez sur votre **avatar en haut à droite**
2. Vous êtes sur votre profil

### Tester l'édition:
1. Cherchez le bouton **"Edit Profile"** (crayon ✏️)
2. Cliquez dessus
3. Modale s'ouvre
4. Changez votre nom: "John Doe"
5. Cliquez "Save Changes"
6. ✅ Vous voyez "Profile updated successfully!"
7. Le nom change sur la page

### Tester la photo:
1. Cliquez "Edit Profile" à nouveau
2. Cliquez "Upload"
3. Sélectionnez une image (.jpg, .png)
4. Aperçu s'affiche
5. Cliquez "Save Changes"
6. ✅ Avatar change

---

## Étape 5: Test d'Avis (1 min)

### Aller sur un autre profil:
1. Cliquez **"Leaderboard"** (en haut)
2. Cliquez sur **un autre utilisateur** (pas vous)
3. Vous êtes sur son profil

### Tester l'avis:
1. Cherchez le bouton **"Write Review"** (💬)
2. Cliquez dessus
3. Modale s'ouvre

### Laisser une note:
1. **Cliquez sur 5 étoiles** ⭐⭐⭐⭐⭐
2. Dans le champ texte tapez: "Great teammate! 👍"
3. Cliquez "Submit Review"
4. ✅ Message: "Review submitted successfully!"

### Voir l'avis:
1. Modale se ferme
2. Scroll vers le **bas** de la page
3. Vous voyez section **"Reviews (1)"**
4. ✅ Votre avis apparaît avec:
   - Votre avatar
   - Votre nom
   - 5 étoiles jaunes ⭐
   - Votre commentaire

---

## ✅ Tout Fonctionne !

Si vous voyez cela, **tout est correctement installé** 🎉

---

## 🆘 Si Ca Ne Marche Pas

### L'app refuse de démarrer
```bash
npm install
npm run dev
```

### "Table reviews not found"
→ Vous avez oublié de run `SETUP_REVIEWS_TABLE.sql`
→ Allez dans Supabase SQL Editor et exécutez-le

### "Edit Profile" n'apparaît pas
→ Vérifiez que vous êtes connecté
→ Vérifiez que vous êtes sur **votre** profil (pas un autre)

### Image n'upload pas
→ L'image est > 5MB ? Compressez-la
→ C'est un .jpg/.png/.gif ? Oui ?
→ Le bucket `avatars` existe ? Vérifiez dans Supabase

### "Write Review" n'apparaît pas
→ Vérifiez que vous êtes sur le profil de **quelqu'un d'autre**
→ Pas sur votre propre profil

### Avis n'apparaît pas
→ Actualiser la page (F5)
→ Vérifier la console (F12) pour erreurs rouges

---

## 📞 Besoin d'Aide ?

Consultez les guides complets:
- `TESTING_GUIDE.md` - Tests détaillés
- `SETUP_INSTRUCTIONS.md` - Configuration complète
- `FEATURES_IMPLEMENTATION.md` - Documentation technique

---

**Status**: ✅ Prêt à tester !
