pipeline {
    agent {
        kubernetes {
            label 'jenkins-docker-agent'
            defaultContainer 'jnlp'
            yaml """ 
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins: slave
spec:
  containers:
  - name: docker
    image: docker:latest
    resources:
      requests:
        memory: "128Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "250m"
    volumeMounts:
    - name: docker-socket
      mountPath: /var/run/docker.sock
  volumes:
  - hostPath:
      path: /var/run/docker.sock
    name: docker-socket            
"""
        }
    }

    triggers {
        pollSCM('H/2 * * * *')
    }
    
    environment {
        GITHUB_REPO = 'https://github.com/rosaflores/feedback-app.git'
    }
    
    stages {        
        stage('Checkout') {           
            steps {
                script {
                    try {
                        git url: "${GITHUB_REPO}", branch: 'main'
                    } catch (Exception e) {
                        error("Checkout failed: ${e.message}")
                    }
                }            
            }            
        }       
        stage('Docker Build') {   
            steps {
                echo 'Building the app...'
                container('docker') {
                    script {
                        try {
                            sh 'docker build -t rosaflores/feedback-app:pipeline-test .'
                            echo 'Build successful.'
                        } catch (Exception e) {
                            error("Docker build failed: ${e.message}")
                        }
                    }
                }
            }    
        }
        stage('Docker Push') {
            steps {
                echo 'Pushing the image to Docker Hub...'
                container('docker') {
                    script {
                        try {
                            sh 'docker push rosaflores/feedback-app:pipeline-test'
                            echo 'Push successful.'
                        } catch (Exception e) {
                            error("Docker push failed: ${e.message}")
                        }
                    }
                }
            }
        }
        stage('Kubernetes Deploy') {
            steps {
                echo 'Deploying to Kubernetes cluster...'
                script {
                    try {
                        sh 'kubectl apply -f kubernetes/api-deployment.yaml'
                        echo 'Deployment successful.'
                    } catch (Exception e) {
                        error("Kubernetes deployment failed: ${e.message}")
                    }
                }
            }
        }
    }   
}
