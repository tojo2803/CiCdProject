document.addEventListener('DOMContentLoaded', () => {

    window.getEmploye = function () {
        fetch('http://localhost:3000/api/employe')
            .then(response => response.json())
            .then(employe => {

                const nom = document.getElementById('nom');
                const prenom = document.getElementById('prenom');
                const salaire = document.getElementById('salaire');
                const blocEmploye = document.getElementById('employe');

                if (!nom || !prenom || !salaire || !blocEmploye) {
                    console.error("Un ou plusieurs éléments HTML sont introuvables");
                    return;
                }

                nom.textContent = employe.nom;
                prenom.textContent = employe.prenom;
                salaire.textContent = employe.salaire;

                blocEmploye.style.display = 'block';
            })
            .catch(error => {
                alert("Erreur lors du chargement de l'employé");
                console.error(error);
            });
    };

});
