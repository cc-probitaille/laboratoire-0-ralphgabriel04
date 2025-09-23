// Vous devez insérer les nouveaux tests ici
import request from 'supertest';
import app from '../../src/app'; // ajuste le chemin selon ton projet
import 'jest-extended';

describe('GET /api/v1/jeu/redemarrerJeu', () => {

  // Précondition : créer deux joueurs avant les tests
  beforeAll(async () => {
    await request(app).get('/api/v1/jeu/demarrerJeu?nom=Alice');
    await request(app).get('/api/v1/jeu/demarrerJeu?nom=Bob');
  });

  it("devrait réussir le scénario principal (status 200 et JSON)", async () => {
    const res = await request(app).get('/api/v1/jeu/redemarrerJeu');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  it("devrait respecter la postcondition (aucun joueur restant)", async () => {
    const res = await request(app).get('/api/v1/jeu/joueurs');
    expect(res.status).toBe(200);
    expect(res.body).toBeArrayOfSize(0); 
  });

});
