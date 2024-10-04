pipeline {
    agent {
        kubernetes {
            cloud 'kubernetes'
            label 'jenkins-docker-agent'
            yaml """
            apiVersion: v1
            kind: Pod
            spec:
              containers:
                - name: jnlp
                  image: jenkins/inbound-agent:latest
                  args: ['\$(JENKINS_SECRET)', '\$(JENKINS_NAME)']
                  resourceLimits:
                    cpu: "200m"
                    memory: "512Mi"
                - name: docker
                  image: docker:latest
                  command: ['cat']
                  tty: true
                  resourceLimits:
                    cpu: "500m"
                    memory: "1Gi"
            """
        }
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout del repositorio
                checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    // Comando para construir tu imagen Docker
                    sh 'docker build -t my-image:${env.BUILD_ID} .'
                }
            }
        }
        stage('Push') {
            steps {
                script {
                    // Comando para enviar tu imagen a Docker Hub
                    sh 'docker push my-image:${env.BUILD_ID}'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Comando para desplegar la imagen en Kubernetes
                    sh 'kubectl apply -f deployment.yaml'
                }
            }
        }
    }
    
    post {
        always {
            echo 'Limpiando el entorno...'
            cleanWs() // Limpia el workspace
        }
        success {
            echo 'Pipeline ejecutado con éxito!'
        }
        failure {
            echo 'El pipeline ha fallado!'
        }
    }
}
