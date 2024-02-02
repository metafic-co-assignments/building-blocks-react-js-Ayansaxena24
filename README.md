# Application template

[About](#about)  
[Deployment](#deployment)  
[Secret management](docs/secrets.md)  
[Setup](#setup)  
[Environment variables](#environment-variables)  
[Custom DNS names](https://gitlab.builder.ai/devops/template-app/blob/master/docs/cnames.md)  
[Configure backend URL](/docs/backend_url.md)  
[Configure mobile app metadata](/docs/metadata.md) 

## About  

Provide a template for an application.  
The template included a bare bones rails application that can be contanarised and deployed to kubernetes.

The repository is setup with a Dockerfile and will build and image and push it to the internal repository.

A helm chart in the `app-deploy-fe` folder will also deploy the application to your kubernetes cluster.

## Deployment

The repository contains all the components for a fully automated build and deploy system.  
Once the kubernetes cluster is created, merges to master will be automatically tagged with a version and deployed.

[Deployment workflow](docs/deployment.md)  

### Secret management

[Secrets](docs/secrets.md)  


## Setup

Clone (make a copy) of this repository.

Choose a name specific to your project, it must start with a letter and only contain letters, numbers or hyphens ( - ) and underscores ( _ )

In your project under settings, set the following variables

## Environment Variables

The following are made available to your pod as environment variables:  

TEMPLATEAPP_DATABASE  
The name of the database created.  

TEMPLATEAPP_DATABASE_USER  
User to authenticate with database.  

TEMPLATEAPP_DATABASE_PASSWORD  
Password for database authentication.  

TEMPLATE_DATABASE_HOSTNAME  
Database hostname to connect to.  

### User defined variables

You can define vaules to pass to your applicaiton in the app-deploy-fe/vaules.yml file, with "appExtConfig".  
For example:  
```yaml
appExtConfig:
  extval1: "example1"
  EXTVAL2: "example2"
```

This will expose environment variables in your pod such as :
```bash
# echo $EXTVAL2
example2
```
You may add any many variables as you need, using names of your choosing.  


## DEPLOY_TOKEN AND USER
You must generate the value here from within the Gitlab web interface. Go to:  
Under Settings -> Repository, select all scopes. Click "Create deploy token"

**IMPORTANT**: set the name of the token to `gitlab-deploy-token` as this will ensure it gets injected to the pipeline automatically.

## Deployment only

To use this repo to function as just a deployment :  
* Make a copy of your application repo into a new repository.
* Add the existing gitab-ci variables to the new repo
  * If deploying to a new cluser, ensure you replace the KUBECONFIG variable to point to the new cluster
* Remove the application code and Dockerfile
* Remove the build stage in the .gitlab-ci.yml file
* Set the gitlab-ci variable `CONTAINER_IMAGE` to your image name, e.g.
  * `CONTAINER_IMAGE=gitlab.builder.ai:5000/ruby-app`
* Set the gitlab-ci variable `APP_VERSION` to the version you wish to deploy e.g.
  * `APP_VERSION=0.0.12`

## Customisation

All of the component relating to build the container and deploying it are included in this repository.  

Make only the changes that you need and remember, "with great power comes great responsibility"




