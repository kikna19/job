pipeline {
  agent any
  stages {
    stage('NPM Install') {
      when { branch 'Dev'}
      steps {
        bat 'npm install'
      }
    }

    stage('Build') {
      when { branch 'Dev'}
      steps {
        sh 'ng build --configuration="production" --aot="true" --output-path="D:\\PublishFoldersAndScripts\\JobBoard_FrontEnd"'
      }
    }    

    stage('Publish_Development') {
      when { branch 'Dev'}
      steps {
        bat 'powershell.exe -ExecutionPolicy Bypass -Command "D:\\PublishFoldersAndScripts\\Publish_JobBoard_Dev_Front.ps1"'
      }
    }

    stage('Clear WorkSpase') {
      steps {
        deleteDir()
      }
    }
  }
}