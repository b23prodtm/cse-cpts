# CSE Comptes

Application Retool interne en français pour la comptabilité de trésorerie simplifiée d'un CSE, sans TVA, avec séparation stricte des budgets **fonctionnement** et **œuvres sociales / ASC**.

## Contenu du dépôt

- `/frontend/pages` : pages Retool React/TypeScript en français.
- `/backend` : fonctions backend pour la base, le stockage privé et Google Docs.
- `/backend/schema.sql` : schéma SQL des tables à créer.
- `/shared` : types métier communs.

## Ressources Retool à connecter

1. **Retool Database** (recommandé) ou **PostgreSQL** explicitement connecté
   - persistance des transactions, contacts, justificatifs, chèques cadeaux et périodes ;
   - exécuter `backend/schema.sql`.
2. **Retool Storage** ou stockage privé approuvé
   - téléversement privé des justificatifs PDF / images ;
   - compatible mobile pour les photos de factures.
3. **Google Docs / Google Workspace**
   - une seule ressource Google Docs connectée avec le compte Workspace autorisé du CSE ;
   - aucune clé, jeton ni identifiant en frontend ou dans le dépôt.

## Installation dans Retool

1. Créer une application Retool interne nommée **CSE Comptes**.
2. Limiter son accès aux utilisateurs authentifiés de l'organisation Retool.
3. Créer les pages avec les composants de `/frontend/pages`, y compris la page **Installation & connecteurs**.
4. Créer les fonctions backend à partir des fichiers du dossier `/backend`.
5. Enregistrer les connecteurs suivants dans Retool :
   - `retool_db_or_postgres` : ressource **Retool Database** ou **PostgreSQL** privée ;
   - `retool_storage_private` : ressource **Retool Storage** privée pour les justificatifs ;
   - `google_workspace_cse_docs` : ressource **Google Docs** connectée au compte Workspace autorisé du CSE.
6. Exécuter le script `backend/schema.sql` sur la base retenue.
7. Vérifier les permissions par rôle avant usage :
   - Trésorier / Trésorière : lecture/écriture/validation/export ;
   - Membres élus : lecture seule ;
   - Administrateur : gestion des accès et des connecteurs.
8. Remplacer les données fictives de démonstration par les appels backend réels.

## Procédure de connexion des ressources

### 1. Retool Database ou PostgreSQL

- Créer ou connecter une ressource privée.
- Lui donner le nom interne `retool_db_or_postgres`.
- Exécuter `/home/runner/work/cse-cpts/cse-cpts/backend/schema.sql`.
- Tester l'accès en lecture/écriture depuis les fonctions backend uniquement.

### 2. Retool Storage

- Activer un stockage privé pour les justificatifs.
- Lui donner le nom interne `retool_storage_private`.
- Utiliser un dossier logique `justificatifs`.
- Vérifier le téléversement depuis mobile sans exposition publique du fichier.

### 3. Google Docs / Google Workspace

- Connecter une unique ressource Google Docs.
- Lui donner le nom interne `google_workspace_cse_docs`.
- Utiliser le compte Google Workspace autorisé du CSE.
- Ne stocker aucun secret Google dans le dépôt ni dans le frontend.
- Tester la création d'un document `Bilan CSE — [période]` puis laisser le partage au niveau Google Workspace.

## Comportement fonctionnel attendu

- Deux comptes strictement séparés : **fonctionnement** et **ASC**.
- Montant signé sur chaque écriture : positif pour une recette, négatif pour une dépense.
- Aucune gestion ni déclaration de TVA.
- Alerte si une dépense n'a pas de justificatif.
- Export du bilan via Google Docs avec le titre `Bilan CSE — [période]`.
- Journal simple sur les écritures : auteur/date de création et modification.
- Mention visible : outil d'organisation interne nécessitant validation comptable et juridique.

## Permissions recommandées par rôle

### Trésorier / trésorière
- lecture / écriture sur écritures, justificatifs, bilans, contacts et chèques cadeaux ;
- droit d'export Google Docs ;
- droit de validation et d'export des écritures.

### Membres élus
- lecture seule sur tableaux de bord, bilans, contacts et suivi des chèques cadeaux ;
- pas de droit de modification sur les écritures ni sur les pièces jointes.

### Administrateur
- gestion des accès Retool et de la connexion Google Workspace ;
- aucun partage de compte Google administrateur ;
- maintenance des ressources connectées et des rôles Retool.

## Limites de sécurité

- Ne pas créer d'inscription, connexion personnalisée, SMS ou lien public d'invitation.
- Activer l'authentification native Retool et, si possible, le MFA / SSO Google Workspace.
- Ne jamais rendre publics les justificatifs ni les données comptables réelles.
- Afficher un avertissement de confidentialité avant tout téléversement contenant des données personnelles.
- Restreindre les droits d'écriture par rôle Retool et journaliser auteur/date.

## Références juridiques indicatives

- Code du travail, article L2312-78 : subvention de fonctionnement du CSE.
- Code du travail, article L2312-81 : activités sociales et culturelles.
- Code du travail, articles L2315-64 à L2315-77 : obligations comptables selon la taille du CSE.
- Code du travail, articles D2315-33 et suivants : présentation simplifiée des comptes.
- RGPD, articles 5, 13 et 32.
- Legifrance : https://www.legifrance.gouv.fr/
- URSSAF : https://www.urssaf.fr/
- CNIL : https://www.cnil.fr/

> Ce logiciel ne remplace pas le conseil d'un expert-comptable, avocat ou conseil compétent.

## Ressources, tables et permissions — récapitulatif final

### Ressources à connecter
- Retool Database ou PostgreSQL
- Retool Storage (ou stockage privé approuvé)
- Google Docs / Google Workspace

### Tables à créer
- `transactions`
- `contacts`
- `justificatifs`
- `chèques_cadeaux`
- `périodes`

### Permissions recommandées
- **Trésorier / trésorière** : lecture/écriture, validation, export
- **Membres élus** : lecture seule
- **Administrateur** : gestion des accès et des ressources

## Licence

Apache-2.0
