-- CreateEnum
CREATE TYPE "ZoneType" AS ENUM ('sec', 'frais', 'surgele');

-- CreateEnum
CREATE TYPE "ExpeditionStatut" AS ENUM ('PREPAREE', 'EXPEDIEE', 'LIVREE', 'ANNULEE');

-- CreateTable
CREATE TABLE "zones" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "capacite" DOUBLE PRECISION NOT NULL,
    "type" "ZoneType" NOT NULL,

    CONSTRAINT "zones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "reference" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "poids" DOUBLE PRECISION NOT NULL,
    "qteStock" INTEGER NOT NULL DEFAULT 0,
    "zoneId" INTEGER NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preparateurs" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "zoneId" INTEGER NOT NULL,

    CONSTRAINT "preparateurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expeditions" (
    "id" SERIAL NOT NULL,
    "preparateurId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,
    "dateExpedition" TIMESTAMP(3) NOT NULL,
    "adresseLivraison" TEXT NOT NULL,
    "statut" "ExpeditionStatut" NOT NULL DEFAULT 'PREPAREE',

    CONSTRAINT "expeditions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "zones_code_key" ON "zones"("code");

-- CreateIndex
CREATE UNIQUE INDEX "articles_reference_key" ON "articles"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "preparateurs_email_key" ON "preparateurs"("email");

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "zones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preparateurs" ADD CONSTRAINT "preparateurs_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "zones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expeditions" ADD CONSTRAINT "expeditions_preparateurId_fkey" FOREIGN KEY ("preparateurId") REFERENCES "preparateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expeditions" ADD CONSTRAINT "expeditions_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
