# Gestion Entrepôt Logistique – API REST

API Node.js / Express de gestion d'entrepôt logistique (zones, articles, préparateurs, expéditions).

---

##  Lancer l'application localement

```bash
# 1. Cloner le dépôt
git clone https://github.com/<TON_USERNAME>/gestion_entrepot_logist.git
cd gestion_entrepot_logist

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Renseigner DATABASE_URL, PORT, etc.

# 4. Générer le client Prisma et migrer la base
npx prisma generate
npx prisma migrate dev

# 5. Démarrer en mode développement
npm run dev
```

---

##  Lancer avec Docker

```bash
# Builder l'image
docker build -t gestion-entrepot-logist .

# Lancer le container (en passant les variables d'env)
docker run -p 3000:3000 --env-file .env gestion-entrepot-logist
```

---

##  CI/CD – GitHub Actions

Le workflow `.github/workflows/ci.yml` se déclenche automatiquement à chaque push sur `main` et effectue les étapes suivantes :

1. Checkout du code
2. Connexion à Docker Hub
3. Build de l'image Docker
4. Push sur Docker Hub avec deux tags :
   - `<username>/gestion-entrepot-logist:<SHA_COMMIT>` ← tag unique par commit
   - `<username>/gestion-entrepot-logist:latest`

###  Configurer les secrets GitHub

Aller dans **Settings → Secrets and variables → Actions** du dépôt GitHub et ajouter :

| Nom du secret        | Valeur                                      |
|----------------------|---------------------------------------------|
| `DOCKERHUB_USERNAME` | Ton nom d'utilisateur Docker Hub            |
| `DOCKERHUB_TOKEN`    | Un Access Token Docker Hub (pas ton mot de passe) |

> **Créer un Access Token Docker Hub :** Hub.docker.com → Account Settings → Security → New Access Token

---

##  Convention de branches

| Type       | Exemple                          |
|------------|----------------------------------|
| `feature/` | `feature/docker-ci-setup`        |
| `fix/`     | `fix/cors-configuration`         |
| `chore/`   | `chore/update-dependencies`      |
| `docs/`    | `docs/update-readme`             |

##  Convention de commits

```
feat: add Dockerfile for Node.js Express app
ci: add GitHub Actions workflow for Docker build and push
fix: correct port exposure in Dockerfile
docs: add Docker and CI setup instructions
```

---

## Structure du projet

```
.
├── .github/
│   └── workflows/
│       └── ci.yml          ← Workflow GitHub Actions
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── validations/
├── .dockerignore
├── Dockerfile
└── package.json
```
