node {
  // branch names are used for Docker images and could be uppercase or slashes, Docker doesn't like that, so we lower case them.
  env.TAG = env.BRANCH_NAME.toLowerCase().replaceAll('%2f','-').replaceAll('/','-')

  // on Pull Requests builds we want to test against the base branch graphql URL
  // Jenkins fills the target into 'CHANGE_TARGET' env variable for pull request builds
  // on regular branch builds this env variable is empty.
  if (env.CHANGE_TARGET != null) {
    env.TARGET_TAG = env.CHANGE_TARGET.toLowerCase().replaceAll('%2f','-').replaceAll('/','-')
  }

  // which project is this.
  env.PROJECT = "antipodia"
  env.BUILD_TAG = env.BUILD_TAG.toLowerCase().replaceAll('%2f','-').replaceAll('/','-')
  env.NAME = "${env.PROJECT}-${env.TAG}" 
  
  // Openshift does not really like names longer then 24 chars, stripping that, but also make sure that if the string is already 
  // less then 24 chars, java is not confused see http://stackoverflow.com/questions/953527/java-substring-string-index-out-of-range
  env.SHORT_NAME = "apia-${env.TAG}"
  if (env.SHORT_NAME.length() > 24) {
    env.SHORT_NAME = env.SHORT_NAME.substring(0, 24)
  }

  // Docker image that is built for testing
  env.IMAGE = "testimage-" + env.BUILD_TAG
  env.JENKINS_BLUE_URL = "${env.JENKINS_URL}/blue/organizations/jenkins/amazeelabs%2Fantipodia/detail/${env.BRANCH_NAME}/${BUILD_ID}/pipeline"

  // OpenShift Defaults
  env.OPENSHIFT_APP_YAML = "app.yml"
  env.OPENSHIFT_REGISTRY = "registry.appuio.ch"
  env.OPENSHIFT_CONSOLE = "console.appuio.ch"
  env.OPENSHIFT_PROJECT = "amze-labs"
  env.OPENSHIFT_ADDITIONAL_ROUTES = ""

  // on Pull Requests builds we want to test against the base branch (like the graphql URL of the base branch)
  // Jenkins fills the target into 'CHANGE_TARGET' env variable for pull request builds
  // on regular branch builds this env variable is empty.
  if (env.CHANGE_TARGET != null) {
    env.TARGET_TAG = env.CHANGE_TARGET.toLowerCase().replaceAll('%2f','-')
  } else {
    env.TARGET_TAG = env.TAG
  }

  stage ('Build info') {
    sh 'env | sort'
  }

  stage ('Checkout') {
    checkout scm
  }

  stage ('Build image') {
    parallel (
      build: {
        try {
          sh "docker build --pull -t ${env.IMAGE} -f Dockerfile ."
        } catch (e) {
          error(e, 'Build image')
        }
      }
    )
  }

  // Updating the OpenShift Recources (they probably already exist, but in case we have some changes)
  stage ('Update resources') {
    try {
      sh """docker run --rm -v $WORKSPACE/.openshift:/tmp -w /tmp/ -e KUBECONFIG=.kubeconfig michelesr/oc sh -c 'oc process  \
          -n ${env.OPENSHIFT_PROJECT} \
          -f ${env.OPENSHIFT_APP_YAML} \
          -v TAG=${env.TAG} \
          -v NAME=${env.NAME} \
          -v SHORT_NAME=${env.SHORT_NAME} \
          -v PROJECT=${env.PROJECT} \
          -v OPENSHIFT_PROJECT=${env.OPENSHIFT_PROJECT} \
          | oc apply -n ${env.OPENSHIFT_PROJECT} -f -'"""
      if (env.OPENSHIFT_ADDITIONAL_ROUTES != "") {
        sh """docker run --rm -v $WORKSPACE/.openshift:/tmp -w /tmp/ -e KUBECONFIG=.kubeconfig michelesr/oc sh -c 'oc process \
          -n ${env.OPENSHIFT_PROJECT} \
          -f ${env.OPENSHIFT_ADDITIONAL_ROUTES} \
          -v TAG=${env.TAG} \
          -v NAME=${env.NAME} \
          -v SHORT_NAME=${env.SHORT_NAME} \
          -v PROJECT=${env.PROJECT} \
          -v OPENSHIFT_PROJECT=${env.OPENSHIFT_PROJECT} \
          | oc apply -n ${env.OPENSHIFT_PROJECT} -f -'"""
      }
    } catch (e) {
      error(e, 'update resources')
    }
  }

  stage ('Tag and push') {
    // The Docker Registry cannot handle multiple pushes at the same time, so we make sure that multiple Jenkins Jobs are not pushing at the same time
    lock("${env.OPENSHIFT_REGISTRY}-${env.OPENSHIFT_PROJECT}-${env.PROJECT}-registry") {
      try {
        sh "docker tag ${env.IMAGE} ${env.OPENSHIFT_REGISTRY}/${env.OPENSHIFT_PROJECT}/${env.PROJECT}:${env.TAG}"
        sh "DOCKER_CONFIG=$WORKSPACE/.openshift docker push ${env.OPENSHIFT_REGISTRY}/${env.OPENSHIFT_PROJECT}/${env.PROJECT}:${env.TAG}"
      } catch (e) {
        error(e, 'Tag and push')
      }
    }
  }

  // Using openshiftVerifyDeployment which will monitor the current deployment and only continue when it is done.
  stage ('Deployment') {
    try {
      OPENSHIFT_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJhbXplLWxhYnMiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlY3JldC5uYW1lIjoiamVua2lucy10b2tlbi0xcHV5ciIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJqZW5raW5zIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiNTJkMzBmZTAtZWViMy0xMWU2LWE4OTctZmExNjNlYzllMjc5Iiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmFtemUtbGFiczpqZW5raW5zIn0.UdVx5y5kHxzY10InS6FwnBA9r2vzHxDC9ZYFwMiq2Q540A_PQu7KkO6S8-M91p5lNxx9DmwWFiIpm7H4U7e0JH-vF7WxCX_1mGspo03PcfegFszf-8C9N6bkgGQ5xt8h_-BeKFmzQmzHphS6E4946-uY_O19_4iF1CQUUrQpkAi2Gdkx_AgcwwTwyL9qhEW3eDNZ14-ZhlNbLdPO-EoOyOwqLYzn-9jBjzyci3Zp8QZ2-7xLzWskQtJ2Mh6KFSvWZ_5Mmgz1LLgBFeO3-NpoVLsqNJEh96EFHzW2YkIWjfQPBqmf2LE1kICf2cGtK7PMscNVh3vEH8Y8zRcHhf_aFg"
      env.SKIP_TLS = true
      openshiftVerifyDeployment apiURL: "https://${env.OPENSHIFT_CONSOLE}", authToken: OPENSHIFT_TOKEN, depCfg: "${env.NAME}", namespace: "${env.OPENSHIFT_PROJECT}", replicaCount: '', verbose: 'false', verifyReplicaCount: 'false', waitTime: '15', waitUnit: 'min', SKIP_TLS: true
    } catch (e) {
      error(e, 'Deployment')
    }
  }

  deployed()

  stage ('Cleanup images') {
    cleanupImage()
  }
}

def error(e, step) {
  currentBuild.result = "FAILED"
  message = ":bangbang: *[${env.PROJECT}/${env.BRANCH_NAME}] <${env.JENKINS_BLUE_URL}|Build #${env.BUILD_NUMBER}> failed* \nStep: ${step} "
  sendSlack('danger', message)
  cleanupImage()
  throw e
}

def success(message) {
  message = ":white_check_mark: *[${env.PROJECT}/${env.BRANCH_NAME}] <${env.JENKINS_BLUE_URL}|Build #${env.BUILD_NUMBER}> passed* \n${message} "
  sendSlack('good', message)
}

def deployed() {
  message = ":new: *[${env.PROJECT}/${env.BRANCH_NAME}] <${env.JENKINS_BLUE_URL}|Build #${env.BUILD_NUMBER}> deployed* \nURL: <http://${env.PROJECT}.${env.TAG}.appuio.amazee.io|${env.PROJECT}.${env.TAG}.appuio.amazee.io>"
  sendSlack('good', message)
}

def sendSlack(color, message) {
  slackSend channel: 'antipodia', color: color, message: message, teamDomain: 'amazee', token: 'xFWAhjdCiXO26K7KXMsBwGT4'
}

def cleanupImage() {
  try {
    sh "docker rmi -f ${env.IMAGE}"
  } catch (e) {
    echo "Removal of image '${env.IMAGE}' failed, ignoring this."
  }
}
