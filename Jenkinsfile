pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "fundly"
        DOCKER_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // stage('Install Dependencies') {
        //     steps {
                
        //         sh 'npm install'
        //     }
        // }

        // stage('Build') {
        //     steps {
               
        //         sh 'npm run build'
        //     }
        // }

        // stage('Docker Build') {
        //     steps {
                
        //         sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
        //     }
        // }

        // stage('Docker Push') {
        //     steps {
                
        //         sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
        //     }
        // }

        // stage('Deploy to Firebase') {
        //     steps {
                
        //         sh 'npm install -g firebase-tools'
        //         sh 'firebase deploy --only hosting'
        //     }
        // }

        // stage('Cleanup') {
        //     steps {
                
        //         sh "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG}"
        //     }
        }
    }

    post {
        always {
            // Clean up workspace after build
            cleanWs()
        }
    }
}
