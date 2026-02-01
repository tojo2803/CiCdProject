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

        stage('Packager frontend') {
            steps {
               sh 'tar --exclude=Backend/frontend.tar.gz -czf frontend.tar.gz Frontend'
            }
        }

        stage('Packager backend') {
            steps {
                sh '''
                    tar \
                    --exclude=Backend/node_modules \
                    --exclude=Backend/backend.tar.gz \
                    -czf backend.tar.gz \
                    Backend
                '''
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: '*.tar.gz'
            echo '🎉 Livraison continue réussie'
        }
        failure {
            echo '❌ Pipeline échouée'
        }
    }
}
