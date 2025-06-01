pipeline {
    agent any

    tools {
        // El “Name” que diste en Jenkins Admin → Tools → NodeJS
        nodejs 'NodeJS_24'
    }

    stages {
        stage('Clone') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    git branch: 'main',
                        credentialsId: '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',
                        url: 'https://github.com/eberthrosales/Test.git'
                }
            }
        }

        // A partir de aquí, entramos en turismo-frontend
        stage('Install dependencies') {
            steps {
                dir('turismo-frontend') {
                    sh 'npm install'
                }
            }
        }

		stage('Unit test') {
		  steps {
			dir('turismo-frontend') {
			  sh 'npm run test -- --watch=false --browsers=ChromeHeadless --code-coverage'
			}
		  }
		}


        stage('Build') {
            steps {
                dir('turismo-frontend') {
				
                    sh 'npm run build'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                dir('turismo-frontend') {
						withSonarQubeEnv('sonarqube') {
							sh 'npx sonar-scanner'
						}
					
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

   
}
