# 🔐 Policies Correctes pour le Bucket Avatars

## Copier-coller ces policies dans Supabase

Allez dans **Storage → avatars → Policies** et créez 4 policies:

---

## Policy 1: Lecture Publique (Tout le monde peut voir les avatars)

```sql
-- Policy: Public Read
-- For: SELECT
-- Target roles: Leave empty (public)

bucket_id = 'avatars'
```

---

## Policy 2: Upload Authentifié (Utilisateurs peuvent uploader)

```sql
-- Policy: Allow authenticated uploads
-- For: INSERT
-- Target roles: authenticated

bucket_id = 'avatars' AND 
auth.uid()::text = (storage.foldername(name))[1]
```

---

## Policy 3: Modifier Propres Fichiers

```sql
-- Policy: Allow users to update their own files
-- For: UPDATE
-- Target roles: authenticated

bucket_id = 'avatars' AND 
auth.uid()::text = (storage.foldername(name))[1]
```

---

## Policy 4: Supprimer Propres Fichiers

```sql
-- Policy: Allow users to delete their own files
-- For: DELETE
-- Target roles: authenticated

bucket_id = 'avatars' AND 
auth.uid()::text = (storage.foldername(name))[1]
```

---

## 📋 Résumé Visuel

| # | Policy Name | For | Roles | Condition |
|---|---|---|---|---|
| 1 | Public Read | SELECT | (empty) | `bucket_id = 'avatars'` |
| 2 | Allow authenticated uploads | INSERT | authenticated | `bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]` |
| 3 | Allow users to update their own files | UPDATE | authenticated | `bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]` |
| 4 | Allow users to delete their own files | DELETE | authenticated | `bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]` |

---

## 🎯 Étapes à Suivre:

1. **Allez dans Supabase → Storage → avatars**
2. **Onglet "Policies"**
3. **Supprimez la policy actuelle** (avec service_role)
4. **Créez 4 nouvelles policies** selon le tableau ci-dessus
5. **Sauvegardez chacune**

---

## ✅ Après Configuration:

- ✅ Tout le monde peut **voir** les avatars
- ✅ Les utilisateurs authentifiés peuvent **uploader** leurs avatars
- ✅ Chaque utilisateur ne peut **modifier/supprimer** que ses propres fichiers
- ✅ L'application fonctionne parfaitement !

---

**Status**: Configuration requise
**Urgence**: ⏰ Facile - 2 minutes max
