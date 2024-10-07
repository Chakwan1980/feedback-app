pipeline {
    agent {
        kubernetes {
            label 'jenkins-docker-agent'
            yamlFile 'kubernetes_jenkins/jenkins-pod-template.yaml'
        }
    }

    triggers {
        pollSCM('H/2 * * * *')
    }
    
    environment {
        GITHUB_REPO = 'https://github.com/rosaflores/feedback-app.git'
        DOCKER_IMAGE = 'rosaflores/feedback-app:pipeline-test'
        DOCKER_CREDENTIALS_ID = 'dockerhub-token'
    }
    
    stages {        
        stage('Checkout') {           
            steps {
                script {
                    echo 'Checking out the code from GitHub...'
                    // Hacer un checkout completo
                    git url: "${GITHUB_REPO}", branch: 'main'
                } 
            }            
        }

        stage('List Files') {
            steps {
                echo 'Listing files in workspace...'
                sh 'ls -R' // Listar todos los archivos y directorios
            }
        }
       
        stage('Docker Build') {   
            steps {
                echo 'Building the app...'
                container('docker') {
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
                echo 'Build successful.'
            }    
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing the image to Docker Hub...'
                container('docker') {
                    script {
                        docker.withRegistry('', "${DOCKER_CREDENTIALS_ID}") {
                            sh 'docker push $DOCKER_IMAGE'
                        }
                    }  
                }
                echo 'Push successful.'
            }
        }

        stage('Kubernetes Deploy Dependencies') {
            steps {
                echo 'Deploying dependencies to Kubernetes cluster...'
                container('kubectl') {
                    sh 'kubectl apply -f kubernetes/secret.yaml'
                    sh 'kubectl apply -f kubernetes/configmap.yaml'
                    sh 'kubectl apply -f kubernetes/database-volume.yaml'
                    sh 'kubectl apply -f kubernetes/database-deployment.yaml'
                } 
                echo 'Deployment successful.'
            }
        }

        stage('Kubernetes Deploy API') {
            steps {
                echo 'Deploying API to Kubernetes cluster...'
                container('kubectl') {
                    sh 'kubectl apply -f kubernetes/api-deployment.yaml'
                } 
                echo 'Deployment successful.'
            }
        }

        stage('Integration Tests') {
            steps {
                echo 'Running integration tests...'
                container('k6') {
                    sh 'k6 run --env BASE_URL=http://feedback-app-api-service:3000 ./tests/feedback-api.integration.js'
                }
                echo 'Integration tests completed.'
            }
        }
    }   
}
