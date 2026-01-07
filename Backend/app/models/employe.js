class Employe {
    constructor(nom, prenom, salaire) {
        this.nom = nom;
        this.prenom = prenom;
        this.setSalaire(salaire);
    }

    setSalaire(salaire) {
        if (salaire < 0) {
            throw new Error("Le salaire ne peut pas être négatif");
        }
        this.salaire = salaire;
    }
}

module.exports = Employe;
