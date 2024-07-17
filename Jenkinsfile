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

        stage('Run Tests') {
            steps {
                sh 'npx jest --verbose --outputFile=test-reports/results.xml --json'
            }
            post {
                always {
                    junit 'test-reports/results.xml'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
