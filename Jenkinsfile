pipeline {
     agent any

    tools {
        nodejs 'nodejs-18'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Récupération du code depuis GitHub"
                git branch: 'main', url: 'https://github.com/tojo2803/CiCdProject.git'
            }
        }

        stage('Install Backend') {
            steps {
                dir('Backend') {
                    echo "Installation des dépendances backend"
                    sh 'npm install'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('Backend') {
                    echo "Lancement des tests unitaires et d’intégration"
                    sh 'npm test'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline terminé avec succès 🎉'
        }
        failure {
            echo 'Pipeline échoué ❌'
        }
    }
}
