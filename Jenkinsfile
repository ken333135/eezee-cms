pipeline {
    agent none
    environment {
        APP_ENV = ""
        dockerImage = ""
        DOCKER_IMAGE_TAG = ""
        NAMESPACE = ""
        NAMESPACED_DEPLOYMENT_FILENAME = ""
        K8S_REPLICAS = ""
        DATABASE_URL = ""
        PROJECT_ID = ""
        CRON_PROJECT_ID = ""
        CRON_NAMESPACE = ""
        CRON_NAMESPACED_DEPLOYMENT_FILENAME = ""
    }

    stages {

        // Check Git Changes
        stage('Setup') {
            agent {
                docker {
                    image 'alpine:latest'
                    reuseNode true
                }
            }
            steps {
                sh 'printenv'
                script {
                    
                    if (env.GIT_PREVIOUS_SUCCESSFUL_COMMIT == env.GIT_COMMIT ) {
                        throw "No Changes found in git"
                    }

                }
            }
        }


        stage('BACKUP DEFAULT ENV TEMPLATE') {
            agent {
                docker {
                    image 'alpine:latest'
                    reuseNode true
                }
            }
            steps {
                sh 'cp .env template.env'
            }
        }

        // // ------ STAGING ------
        // stage('[STAGE] ENV SETUP') {
        //     agent {
        //         docker {
        //             image 'alpine:latest'
        //             reuseNode true
        //         }
        //     }
        //     steps {
        //         script {
        //             // EDITABLE
        //             APP_ENV = 'staging'
        //             K8S_REPLICAS = "1"
        //             PROJECT_ID = "ez-search"

        //             // todo to use jenkins' built in credentials
        //             // @@KEN TODO
        //             DATABASE_URL = "postgresql://eezee_search:c1b96e43-4a27-456b-ae0e-2a258608144b@172.20.144.18:5432/eezee_search"

        //             // NON EDITABLE
        //             NAMESPACE = "${PROJECT_ID}-${APP_ENV}".toLowerCase()
        //             NAMESPACED_DEPLOYMENT_FILENAME = "./k8s-deploy-${APP_ENV}.yml".toLowerCase()

        //             CRON_PROJECT_ID = "${PROJECT_ID}-cron"
        //             CRON_NAMESPACE = "${CRON_PROJECT_ID}-${APP_ENV}".toLowerCase()
        //             CRON_NAMESPACED_DEPLOYMENT_FILENAME = "./k8-deploy-cron-${APP_ENV}.yml".toLowerCase()

        //             DOCKER_IMAGE_TAG = "latest-${APP_ENV}".toLowerCase()
                    
        //         }
        //         sh 'cp template.env .env'
        //         sh "sed -i \"s#{DATABASE_URL}#${DATABASE_URL}#g\" .env"
        //         sh "sed -i \"s/{APP_ENV}/${APP_ENV}/g\" .env"
        //         sh "sed -i \"s/{BUILD_NUMBER}/${BUILD_NUMBER}/g\" .env"

        //     }
        // }
        // stage('[STAGE] HTTPSERVER - Build Docker Image') {
        //     steps{
        //         script {
        //             dockerImage = docker.build("eezee-client/${PROJECT_ID}", "-f ./Dockerfile.httpServer .")
        //             dockerImageCron = docker.build("eezee-client/${CRON_PROJECT_ID}", "-f ./Dockerfile.cron .")
        //         }
        //     }
        // }
        // stage('[STAGE] HTTPSERVER - Push & Deploy') {
        //     agent any
        //     steps{
        //         sh "cp ./k8s-deploy.yml ${NAMESPACED_DEPLOYMENT_FILENAME}"
        //         sh "sed -i \"s/{K8S_REPLICAS}/${K8S_REPLICAS}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"
        //         sh "sed -i \"s/{NAMESPACE}/${NAMESPACE}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"
        //         sh "sed -i \"s/{BUILD_NUMBER}/${BUILD_NUMBER}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"
        //         sh "sed -i \"s/{PROJECT_ID}/${PROJECT_ID}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"
        //         sh "sed -i \"s/{DOCKER_IMAGE_TAG}/${DOCKER_IMAGE_TAG}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"

        //         script {
        //             docker.withRegistry('https://asia.gcr.io', "gcr:eezee-client") {

        //                 dockerImage.push(DOCKER_IMAGE_TAG)

        //             }
        //         }
        //         step([
        //             $class: 'KubernetesEngineBuilder',
        //             projectId: "eezee-client",
        //             clusterName: "gke-cluster",
        //             location: "asia-southeast1-a",
        //             manifestPattern: "${NAMESPACED_DEPLOYMENT_FILENAME}",
        //             credentialsId: "eezee-client",
        //             verifyDeployments: true
        //         ])

        //     }
        // }
        // stage('[STAGE] CRON - Push & Deploy') {
        //     agent any
        //     steps{
        //         sh "cp ./k8s-deploy-cron.yml ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"
        //         sh "sed -i \"s/{NAMESPACE}/${CRON_NAMESPACE}/g\" ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"
        //         sh "sed -i \"s/{BUILD_NUMBER}/${BUILD_NUMBER}/g\" ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"
        //         sh "sed -i \"s/{PROJECT_ID}/${CRON_PROJECT_ID}/g\" ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"
        //         sh "sed -i \"s/{DOCKER_IMAGE_TAG}/${DOCKER_IMAGE_TAG}/g\" ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"

        //         script {
        //             docker.withRegistry('https://asia.gcr.io', "gcr:eezee-client") {

        //                 dockerImageCron.push(DOCKER_IMAGE_TAG)

        //             }
        //         }
        //         step([
        //             $class: 'KubernetesEngineBuilder',
        //             projectId: "eezee-client",
        //             clusterName: "gke-cluster",
        //             location: "asia-southeast1-a",
        //             manifestPattern: "${CRON_NAMESPACED_DEPLOYMENT_FILENAME}",
        //             credentialsId: "eezee-client",
        //             verifyDeployments: true
        //         ])

        //     }
        // }


        // ------ PRODUCTION ------
        stage('[PROD] ENV SETUP') {
            agent {
                docker {
                    image 'alpine:latest'
                    reuseNode true
                }
            }
            steps {
                script {
                    // EDITABLE
                    APP_ENV = 'production'
                    K8S_REPLICAS = "2"
                    PROJECT_ID = "ez-cms"

                    // todo to use jenkins' built in credentials
                    DATABASE_NAME= "eezee_cms"
                    DATABASE_USER= "eezee_cms"
                    DATABASE_PASSWORD= "3d5bb24b-1231-40eb-8d52-5ee70743b254"
                    INSTANCE_CONNECTION_NAME= "172.20.144.24"

                    // NON EDITABLE
                    NAMESPACE = "${PROJECT_ID}-${APP_ENV}".toLowerCase()
                    NAMESPACED_DEPLOYMENT_FILENAME = "./k8s-deploy-${APP_ENV}.yml".toLowerCase()

                    CRON_PROJECT_ID = "${PROJECT_ID}-cron"
                    CRON_NAMESPACE = "${CRON_PROJECT_ID}-${APP_ENV}".toLowerCase()
                    CRON_NAMESPACED_DEPLOYMENT_FILENAME = "./k8-deploy-cron-${APP_ENV}.yml".toLowerCase()

                    DOCKER_IMAGE_TAG = "latest-${APP_ENV}".toLowerCase()
                    
                }
                sh 'cp template.env .env'
                sh "sed -i \"s#{DATABASE_NAME}#${DATABASE_NAME}#g\" .env"
                sh "sed -i \"s#{DATABASE_USER}#${DATABASE_USER}#g\" .env"
                sh "sed -i \"s#{DATABASE_PASSWORD}#${DATABASE_PASSWORD}#g\" .env"
                sh "sed -i \"s#{INSTANCE_CONNECTION_NAME}#${INSTANCE_CONNECTION_NAME}#g\" .env"
                sh "sed -i \"s/{APP_ENV}/${APP_ENV}/g\" .env"
                sh "sed -i \"s/{BUILD_NUMBER}/${BUILD_NUMBER}/g\" .env"

            }
        }
        stage('[PROD] HTTPSERVER - Build Docker Image') {
            steps{
                script {
                    dockerImage = docker.build("eezee-client/${PROJECT_ID}", "-f ./Dockerfile.httpServer .")
                    dockerImageCron = docker.build("eezee-client/${CRON_PROJECT_ID}", "-f ./Dockerfile.cron .")
                }
            }
        }
        stage('[PROD] HTTPSERVER - Push & Deploy') {
            agent any
            steps{
                sh "cp ./k8s-deploy.yml ${NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{K8S_REPLICAS}/${K8S_REPLICAS}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{NAMESPACE}/${NAMESPACE}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{BUILD_NUMBER}/${BUILD_NUMBER}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{PROJECT_ID}/${PROJECT_ID}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{DOCKER_IMAGE_TAG}/${DOCKER_IMAGE_TAG}/g\" ${NAMESPACED_DEPLOYMENT_FILENAME}"

                script {
                    docker.withRegistry('https://asia.gcr.io', "gcr:eezee-client") {

                        dockerImage.push(DOCKER_IMAGE_TAG)

                    }
                }
                step([
                    $class: 'KubernetesEngineBuilder',
                    projectId: "eezee-client",
                    clusterName: "gke-cluster",
                    location: "asia-southeast1-a",
                    manifestPattern: "${NAMESPACED_DEPLOYMENT_FILENAME}",
                    credentialsId: "eezee-client",
                    verifyDeployments: true
                ])

            }
        }
        stage('[PROD] CRON - Push & Deploy') {
            agent any
            steps{
                sh "cp ./k8s-deploy-cron.yml ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{NAMESPACE}/${CRON_NAMESPACE}/g\" ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{BUILD_NUMBER}/${BUILD_NUMBER}/g\" ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{PROJECT_ID}/${CRON_PROJECT_ID}/g\" ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"
                sh "sed -i \"s/{DOCKER_IMAGE_TAG}/${DOCKER_IMAGE_TAG}/g\" ${CRON_NAMESPACED_DEPLOYMENT_FILENAME}"

                script {
                    docker.withRegistry('https://asia.gcr.io', "gcr:eezee-client") {

                        dockerImageCron.push(DOCKER_IMAGE_TAG)

                    }
                }
                step([
                    $class: 'KubernetesEngineBuilder',
                    projectId: "eezee-client",
                    clusterName: "gke-cluster",
                    location: "asia-southeast1-a",
                    manifestPattern: "${CRON_NAMESPACED_DEPLOYMENT_FILENAME}",
                    credentialsId: "eezee-client",
                    verifyDeployments: true
                ])

            }
        }

    }
}