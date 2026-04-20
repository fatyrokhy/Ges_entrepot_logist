import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Entrepôt LOGIS 221',
      version: '1.0.0',
      description: 'Gestion des zones, articles, préparateurs et expéditions',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Serveur de développement',
      },
            {
        url: '',
        description: 'Serveur de production',
      },
    ],
    components: {
      schemas: {
        Zone: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            code: { type: 'string' },
            libelle: { type: 'string' },
            capacite: { type: 'number' },
            type: { type: 'string', enum: ['sec', 'frais', 'surgele'] },
          },
        },
        Article: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            reference: { type: 'string' },
            libelle: { type: 'string' },
            poids: { type: 'number' },
            qteStock: { type: 'integer' },
            zoneId: { type: 'integer' },
          },
        },
        Preparateur: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            prenom: { type: 'string' },
            nom: { type: 'string' },
            email: { type: 'string' },
            telephone: { type: 'string' },
            zoneId: { type: 'integer' },
          },
        },
        Expedition: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            preparateurId: { type: 'integer' },
            articleId: { type: 'integer' },
            quantite: { type: 'integer' },
            dateExpedition: { type: 'string', format: 'date' },
            adresseLivraison: { type: 'string' },
            statut: { type: 'string', enum: ['PREPAREE', 'EXPEDIEE', 'LIVREE', 'ANNULEE'] },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js' , "./src/controllers/*.js"], // chemin vers vos routes pour la documentation automatique
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;