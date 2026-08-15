# Prompt de reconstruction Retool — CSE Comptes

Copiez ce prompt dans Retool pour recréer l’application dans un autre workspace. Ne joignez jamais à ce prompt des mots de passe, jetons Google, documents comptables réels ou données personnelles.

---

```text
Crée une application Retool interne appelée « CSE Comptes », en français, destinée à un petit comité social et économique (CSE) français. L’application n’est pas publique : elle doit rester accessible uniquement aux utilisateurs authentifiés de l’organisation Retool. Ne crée ni inscription, ni connexion personnalisée, ni lien d’invitation public.

Objectif
Créer un outil de comptabilité de trésorerie simplifiée, sans TVA, avec deux budgets strictement séparés :
1. Compte de fonctionnement
2. Compte des activités sociales et culturelles (ASC), aussi présenté comme « Œuvres sociales »

Utilisateurs
- Trésorier ou trésorière : peut créer, modifier, valider et exporter les écritures.
- Membres élus : peuvent consulter les tableaux de bord et bilans.
- Administrateur : gère les accès et la connexion Google Workspace.
Utiliser les permissions natives de Retool et des comptes individuels. Ne jamais partager un compte Google administrateur entre plusieurs personnes.

Données et persistance
Utiliser une base Retool Database (ou PostgreSQL si elle est explicitement connectée) pour stocker durablement :
- transactions : id, date, libellé, catégorie, compte, montant, fournisseur_contact_id, justificatif_id, statut, commentaire, créé_par, créé_le ;
- contacts : id, type (fournisseur, client, partenaire), raison_sociale, contact, email, téléphone, adresse, notes ;
- justificatifs : id, nom_fichier, url_stockage, type_fichier, transaction_id, déposé_par, déposé_le ;
- chèques_cadeaux : id, campagne, bénéficiaire, date, montant, motif, critère_attribution, justificatif_id, statut ;
- périodes : id, libellé, date_début, date_fin, type (semestriel, annuel), statut, document_google_url.

Utiliser Retool Storage ou un stockage de fichiers approuvé pour les photos de factures et les PDF. Les pièces jointes doivent être téléversables depuis un téléphone. Stocker le fichier et garder son lien dans la base, sans rendre les fichiers publics.

Connexion Google Workspace
Demander à connecter une unique ressource Google Docs avec le compte Google Workspace autorisé du CSE. Prévoir un bouton « Créer le bilan dans Google Docs » qui :
- crée un document Google Docs avec le titre « Bilan CSE — [période] » ;
- insère les recettes, dépenses et soldes des deux comptes ;
- retourne et enregistre le lien du document dans la période ;
- laisse l’utilisateur choisir les autorisations de partage directement dans Google Workspace.
Ne coder aucun mot de passe, jeton ou identifiant Google dans le frontend ou le dépôt.

Règles métier
- Les recettes du budget de fonctionnement peuvent inclure la subvention employeur. L’interface doit rappeler que le taux dépend notamment de l’effectif : 0,20 % de la masse salariale brute pour les entreprises de 50 à moins de 2 000 salariés, et 0,22 % à partir de 2 000 salariés. Le taux ne doit pas être imposé sans paramétrage.
- Les recettes ASC peuvent inclure une redevance trimestrielle liée aux distributeurs automatiques de café.
- Charges courantes de fonctionnement : assurances, protection juridique, avocat, frais bancaires, formation, outils administratifs.
- Dépenses ASC : chèques cadeaux, activités et avantages destinés aux salariés bénéficiaires.
- Chaque transaction doit être affectée à un seul compte et son montant doit être signé : positif pour une recette, négatif pour une dépense.
- Ajouter des catégories paramétrables et les filtres par compte, période, catégorie et justificatif manquant.
- Ne pas calculer ou déclarer de TVA.
- Les calculs et exports doivent indiquer qu’ils sont des outils d’organisation et qu’une validation comptable/juridique reste nécessaire.

Écrans et expérience utilisateur
Construire une interface sobre, professionnelle et accessible, responsive sur mobile et desktop, compatible avec les thèmes clair et sombre Retool.

1. Tableau de bord
- Afficher la date d’arrêté de la période.
- Trois cartes : solde fonctionnement, solde œuvres sociales/ASC, trésorerie totale.
- Afficher recettes, dépenses et solde de chaque compte.
- Afficher les dernières écritures dans un tableau : date, libellé, catégorie, compte, justificatif, montant.
- Actions visibles : « Nouvelle écriture », « Ajouter un justificatif », « Éditer le bilan », « Bilan annuel », « Contacts », « Suivi chèques cadeaux ».

2. Écritures
- Tableau filtrable, triable et paginé.
- Formulaire de création/modification avec date, libellé, montant, compte, catégorie, contact, commentaire et téléversement du justificatif.
- Afficher une alerte si une dépense n’a pas de justificatif.

3. Bilans
- Sélecteur de période semestrielle ou annuelle.
- Présenter par compte : recettes, dépenses et résultat de la période.
- Exporter un bilan dans Google Docs depuis un modèle simple.
- Conserver le lien vers le document et un statut de validation.

4. Contacts
- Répertoire fournisseurs, clients et partenaires avec coordonnées partageables aux membres autorisés.

5. Chèques cadeaux
- Enregistrer campagnes, bénéficiaires, valeur, date, motif, critères et statut de remise.
- Inclure un rappel : vérifier les conditions d’exonération URSSAF applicables avant chaque campagne.

Sécurité et données personnelles
- Ne pas construire de système de connexion, de mot de passe ou de SMS personnalisé : utiliser l’authentification et le MFA de Retool/Google Workspace.
- Limiter les droits d’écriture par rôle Retool.
- Afficher un avertissement de confidentialité avant l’ajout de justificatifs contenant des données personnelles.
- Ne pas afficher de données comptables réelles dans des exemples, documents de démonstration ou pages GitHub Pages.
- Prévoir un journal simple : auteur et date de création/modification des écritures.

Contexte légal indicatif à mettre dans une page « Aide & conformité »
- Code du travail, article L2312-78 : subvention de fonctionnement du CSE.
- Code du travail, article L2312-81 : activités sociales et culturelles.
- Code du travail, articles L2315-64 à L2315-77 : obligations comptables des CSE selon leur taille.
- Code du travail, articles D2315-33 et suivants : présentation simplifiée des comptes pour les CSE concernés.
- RGPD, notamment articles 5, 13 et 32.
- Ajouter des liens vers Legifrance, l’URSSAF et la CNIL.
- Ajouter un avertissement clair : « Ce logiciel ne remplace pas le conseil d’un expert-comptable, avocat ou conseil compétent. »

Contraintes techniques
- Utiliser React, TypeScript strict, Tailwind et les composants shadcn/ui fournis par Retool.
- Utiliser les icônes Lucide ; ne pas créer de SVG personnalisé.
- Créer les pages dans /frontend/pages et les fonctions backend dans /backend.
- Utiliser des fonctions backend pour toute opération Google Docs, base de données ou stockage.
- Pour les écrans de démonstration sans ressource connectée, utiliser des données fictives clairement signalées, puis demander la connexion de Retool Database/Google Docs/Retool Storage.
- Fournir un README en français avec instructions d’installation Retool, configuration de chaque ressource, limites de sécurité, références juridiques et licence Apache-2.0.

À la fin, résume les ressources à connecter, les tables à créer et les permissions recommandées par rôle.
```

## Recommandation de réutilisation

1. Connectez ce dépôt à la fonctionnalité Git/source control de Retool.
2. Dans le nouveau workspace, importez ou synchronisez la branche souhaitée.
3. Recréez les ressources propres à ce workspace : Google Docs, base de données et stockage de fichiers.
4. Réattribuez les permissions Retool aux membres du nouveau CSE.
5. Testez avec des données fictives avant de charger des écritures ou justificatifs réels.

Les ressources Retool, les comptes Google Workspace et leurs secrets ne doivent jamais être partagés par copie de code ou par Git.
