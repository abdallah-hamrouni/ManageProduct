pipeline {
  agent any

  environment {
    BACK_IMAGE  = "abdallahhamrouni/products-backend:${BUILD_NUMBER}"
    FRONT_IMAGE = "abdallahhamrouni/products-frontend:${BUILD_NUMBER}"
    BACK_LATEST  = "abdallahhamrouni/products-backend:latest"
    FRONT_LATEST = "abdallahhamrouni/products-frontend:latest"
  }

  stages {

    stage("Checkout") {
      steps {
        checkout scm
      }
    }

    stage("Docker login") {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-creds',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
        }
      }
    }

    stage("Build backend image") {
      steps {
        sh """
          docker build -t $BACK_IMAGE ./back-product
          docker tag $BACK_IMAGE $BACK_LATEST
        """
      }
    }

    stage("Build frontend image") {
      steps {
        sh """
          docker build -t $FRONT_IMAGE ./front-product
          docker tag $FRONT_IMAGE $FRONT_LATEST
        """
      }
    }

    stage("Push images") {
      steps {
        sh """
          docker push $BACK_IMAGE
          docker push $BACK_LATEST
          docker push $FRONT_IMAGE
          docker push $FRONT_LATEST
        """
      }
    }
  }

  post {
    always {
      sh "docker logout || true"
    }
  }
}
