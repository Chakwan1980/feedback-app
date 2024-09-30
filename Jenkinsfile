pipeline {
    agent{
        kubernetes{
            label 'jenkins-docker-agent'
            defaultContainer 'jnpl'
            yaml ""
        }
    }
    }
    
    environment {
        GITHUB_REPO = 'https://github.com/Chakwan1980/feedback-app.git'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git url: "${GITHUB_REPO}", branch: 'main'
            }
        }
        
        stage('Docker Build') {
            steps {
                echo 'Building the app ..'
                sh 'docekr build -t rosaflores/feedback-app:latest'
                echo 'Build successful'
            }
        }
         stage('Docker Push') {
            steps {
                echo 'Pushing the image to Docker Hub.'
                sh 'docker push rosaflores/feedback-app:pipepline-latest'
                echo ' Push successful'
            }
         }

         stage ('Kubernetes Deploy'){
            steps{
                echo 'Deploying to Kubernetess cluster ..'
                sh ' kubectl '
            }
         }
    
    }
}
