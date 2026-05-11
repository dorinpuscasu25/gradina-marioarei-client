# Grădina Mărioarei

Next.js site cu CMS/admin pe Supabase.

## Local

1. `npm install`
2. Copiază `.env.example` în `.env.local` și completează cheile Supabase.
3. Rulează SQL-ul din `supabase/migrations/0001_enterprise_cms.sql` în Supabase SQL Editor.
4. Creează primul user în Supabase Auth.
5. Setează primul user ca owner:

```sql
update public.admin_profiles
set role = 'owner', is_active = true
where email = 'emailul-tau@example.com';
```

6. `npm run dev`
7. Deschide `/admin`.

## Ce este editabil din admin

- Cazări: titlu, descriere, preț, reducere, capacitate, facilități, imagini, activ/inactiv, ordine.
- Texte statice: orice cheie din site poate fi suprascrisă în `ro`, `en`, `ru`.
- Fișiere: upload în Supabase Storage cu preview și URL public.
- Rezervări: formularul public salvează cereri în Supabase, iar adminul le poate confirma/anula/arhiva.
- Membri: owner/admin poate crea și șterge conturi pentru alți membri.

Site-ul are fallback la conținutul hardcodat, deci build-ul merge și fără Supabase configurat.
