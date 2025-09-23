import 'jest-extended';
import { JeuDeDes } from '../../src/core/jeuDeDes';

describe('JeuDeDesTest', () => {
  let controller: JeuDeDes;

  beforeEach(async () => {
    controller = new JeuDeDes();
  });

  it('demarrerJeu et jouer avec 3 dés', async () => {
    const result = controller.demarrerJeu('yvan');
    expect(result).toEqual(
      "{\"nom\":\"yvan\",\"lancers\":0,\"lancersGagnes\":0}"
    );

    // Vérifie que le même joueur ne peut pas être créé deux fois
    expect(() => { controller.demarrerJeu('yvan'); })
      .toThrow("Joueur 'yvan' existe déjà.");

    // Lancer une partie
    const resultat = controller.jouer('yvan');
    const resultatObj = JSON.parse(resultat);

    // Vérifie que le nb de lancers est bien incrémenté
    expect(resultatObj.lancers).toEqual(1);

    // Vérifie la présence des 3 dés
    expect(resultatObj).toHaveProperty("v1");
    expect(resultatObj).toHaveProperty("v2");
    expect(resultatObj).toHaveProperty("v3");

    // Vérifie que la somme est cohérente
    expect(resultatObj.somme).toBe(resultatObj.v1 + resultatObj.v2 + resultatObj.v3);

    // Vérifie la règle de victoire (<= 10)
    if (resultatObj.somme <= 10) {
      expect(resultatObj.message).toContain("gagné");
    } else {
      expect(resultatObj.message).toContain("perdu");
    }

    // Vérifie que le joueur est bien mis à jour dans la liste
    const joueurs = JSON.parse(controller.joueurs);
    expect(joueurs[0].lancers).toEqual(1);
  });
});
