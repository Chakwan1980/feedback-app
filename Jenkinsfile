pipeline {
    agent {
        kubernetes {
            label 'jenkins-docker-agent'  // Verifica que este label esté configurado en tu clúster
            yamlFile 'kubernetes_jenkins/jenkins-pod-template.yaml'  // Asegúrate de que la ruta sea correcta
        }
    }

    triggers {
        pollSCM('H/2 * * * *')  // Revisa cada 2 minutos por cambios en el repositorio
    }
    
    environment {
        GITHUB_REPO = 'https://github.com/Chakwan1980/feedback-app.git'
        DOCKER_IMAGE = 'rosaflores/feedback-app:pipeline-test'
        DOCKER_CREDENTIALS_ID = 'dockerhub-token'  // Verifica que este ID de credenciales esté configurado en Jenkins
    }
    
    stages {        
        stage('Checkout') {           
            steps {
                git url: "${GITHUB_REPO}", branch: 'main'  // Clona el repositorio
            }            
        }       
        stage('Docker Build') {   
            steps {
                echo 'Building the app...'
                container('docker') {
                    sh 'docker build -t $DOCKER_IMAGE .'  // Construye la imagen Docker
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
                            sh 'docker push $DOCKER_IMAGE'  // Empuja la imagen a Docker Hub
                        }
                    }  
                }
                echo 'Push successful.'
            }
        }
        stage('Kubernetes Deploy Dependencies') {
            steps {
                echo 'Deploying to Kubernetes cluster...'
                container('kubectl') {
                    // Verifica que el archivo YAML existe antes de aplicar
                    sh 'ls -la kubernetes/'  // Listar archivos para verificar que los archivos existen
                    sh 'kubectl apply -f kubernetes/secret.yaml'  // Despliega secretos
                    sh 'kubectl apply -f kubernetes/configmap.yaml'  // Despliega ConfigMaps
                    sh 'kubectl apply -f kubernetes/database-volume.yaml'  // Despliega volúmenes de base de datos
                    sh 'kubectl apply -f kubernetes/database-deployment.yaml'  // Despliega la base de datos
                } 
                echo 'Deployment successful.'
            }
        }
        stage('Kubernetes Deploy API') {
            steps {
                echo 'Deploying to Kubernetes cluster...'
                container('kubectl') {
                    sh 'kubectl apply -f kubernetes/api-deployment.yaml'  // Despliega la API
                } 
                echo 'Deployment successful.'
            }
        }
        stage('Integration Tests') {
            steps {
                echo 'Running integration tests...'
                container('k6') {
                    sh 'k6 run --env BASE_URL=http://feedback-app-api-service:3000 ./tests/feedback-api.integration.js'  // Ejecuta pruebas de integración
                }
                echo 'Integration tests ready.'
            }
        }
    }   
}
