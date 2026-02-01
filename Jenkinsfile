pipeline {
    agent any

    tools {
        nodejs 'nodejs-18'
    }

    parameters {
        string(name: 'APP_PORT', defaultValue: '3000', description: 'Numéro de port pour le backend')
    }

    environment {
        SERVER_USER = 'root'           
        SERVER_IP   = '192.168.1.50'  
        SSH_CRED    = 'vm-ssh-key'     
        APP_PORT    = "${params.APP_PORT}"  
    }

    stages {

        stage('Clean workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                echo "Récupération du code depuis GitHub"
                git branch: 'exercice6',
                    url: 'https://github.com/tojo2803/CiCdProject.git'
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

        stage('Package Frontend') {
            steps {
               sh 'tar --exclude=Backend/frontend.tar.gz -czf frontend.tar.gz Frontend'
            }
        }

        stage('Package Backend') {
            steps {
                sh '''
                    tar --exclude=Backend/node_modules -czf backend.tar.gz Backend
                '''
            }
        }

        stage('Deploy Frontend') {
            steps {
                sshagent(credentials: [env.SSH_CRED]) {
                    sh """
                        # Copier l’archive sur la VM
                        scp frontend.tar.gz ${SERVER_USER}@${SERVER_IP}:/tmp/

                        # Déployer dans /var/www/html
                        ssh ${SERVER_USER}@${SERVER_IP} "
                            sudo rm -rf /var/www/html/*
                            sudo tar -xzf /tmp/frontend.tar.gz -C /var/www/html --strip-components=1
                        "
                    """
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                sshagent(credentials: [env.SSH_CRED]) {
                    sh """
                        scp backend.tar.gz ${SERVER_USER}@${SERVER_IP}:/tmp/

                        ssh ${SERVER_USER}@${SERVER_IP} "
                            rm -rf /opt/backend/*
                            tar -xzf /tmp/backend.tar.gz -C /opt/backend --strip-components=1
                            cd /opt/backend
                            npm install

                            # Définir le port du backend via la variable Jenkins
                            export PORT=${APP_PORT}

                            pm2 restart backend || pm2 start index.js --name backend --env PORT=${APP_PORT}
                        "
                    """
                }
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: '*.tar.gz'
            echo '🚀 Déploiement continu réussi'
        }
        failure {
            echo '❌ Déploiement échoué'
        }
    }
}
