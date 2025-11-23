# 🔧 Configurer le Bucket Avatars en Supabase

## ❌ Erreur: "Bucket not found"

Si vous voyez cette erreur, c'est que le bucket `avatars` n'existe pas en Supabase Storage.

**Bonne nouvelle**: L'application a été modifiée pour continuer à fonctionner même sans le bucket ! 

Vous pouvez:
- ✅ Éditer votre nom (sans photo pour le moment)
- ✅ Laisser des avis
- ✅ Voir votre profil

---

## 📁 Option 1: Créer le Bucket Automatiquement (Recommandé)

### Étapes:

1. **Allez sur [https://app.supabase.com](https://app.supabase.com)**
2. **Connectez-vous** à votre projet
3. **Cliquez sur "Storage"** dans le menu latéral gauche
4. **Cliquez sur "New bucket"**

### Configuration du Bucket:

| Field | Value |
|-------|-------|
| **Name** | `avatars` |
| **Public bucket** | ☑️ Cochez cette case |

5. **Cliquez sur "Create bucket"**

### Configurer les Permissions (Policies):

1. **Cliquez sur le bucket `avatars`** que vous venez de créer
2. **Allez à l'onglet "Policies"**
3. **Supprimez la policy existante** (avec "service_role")
4. **Cliquez sur "New Policy"** → **"Create a policy from template"**

#### ⚠️ IMPORTANT: Les 4 Policies Correctes

Créez ces 4 policies exactement:

| # | Nom | Operation | Roles | Condition |
|---|---|---|---|---|
| 1 | Public Read | SELECT | (vide) | `bucket_id = 'avatars'` |
| 2 | Auth Upload | INSERT | authenticated | `bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]` |
| 3 | Auth Update | UPDATE | authenticated | `bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]` |
| 4 | Auth Delete | DELETE | authenticated | `bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]` |

**Voir le fichier `STORAGE_POLICIES.md` pour les détails complets**

---

## 📱 Fichier SQL Alternative

Si vous préférez utiliser SQL, exécutez ceci dans **SQL Editor**:

```sql
-- Créer les policies pour le bucket avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) 
ON CONFLICT DO NOTHING;

-- Policy: Lire les avatars publiquement
CREATE POLICY "Public avatars are viewable by anyone" ON storage.objects 
FOR SELECT USING (bucket_id = 'avatars');

-- Policy: Les utilisateurs peuvent uploader leurs avatars
CREATE POLICY "Users can upload their own avatars" ON storage.objects 
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Les utilisateurs peuvent supprimer leurs avatars
CREATE POLICY "Users can delete their own avatars" ON storage.objects 
FOR DELETE USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

---

## ✅ Vérification

Après avoir créé le bucket:

1. **Allez sur http://localhost:8080**
2. **Connectez-vous**
3. **Allez sur le Dashboard**
4. **Cliquez sur "Edit"** sur votre profil
5. **Cliquez sur "Upload"**
6. **Sélectionnez une image**
7. **Cliquez "Save Changes"**
8. ✅ **L'image doit s'uploader sans erreur**

---

## 🎯 Test Complet

Après avoir configuré le bucket:

### Éditer Profil:
```
1. Dashboard → Edit
2. Change Name: "John Doe"
3. Upload Image: Select a .jpg or .png
4. Click "Save Changes"
✅ Profile saved with image
```

### Laisser un Avis:
```
1. Go to Leaderboard
2. Click on another user
3. Click "Write Review"
4. Select 5 stars ⭐
5. Write: "Great teammate!"
6. Click "Submit Review"
✅ Review appears below
```

---

## 🆘 Troubleshooting

| Problème | Solution |
|----------|----------|
| "Bucket not found" | Créez le bucket `avatars` (voir ci-dessus) |
| Image n'uploade pas | Vérifiez les permissions (Policies) |
| "Forbidden" error | Assurez-vous d'avoir les bonnes permissions |
| Image est vide | Vérifiez que "Public bucket" est coché |

---

## 💡 Sans le Bucket?

L'application fonctionne partiellement sans le bucket:
- ✅ Vous pouvez éditer votre nom
- ✅ Vous pouvez laisser des avis
- ✅ Les avis s'affichent normalement
- ❌ Les images de profil ne s'uploadent pas (avatar par défaut reste)

---

**Status**: Le bucket est optionnel pour l'instant
**Recommandation**: Créez-le pour une meilleure expérience utilisateur
