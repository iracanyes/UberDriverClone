# UberDriverClone
## React Native apps with AWS Amplify Backend

### Infos

GraphQL endpoint: https://wsb4r6hl6zccvm7342tdapv6j4.appsync-api.eu-west-1.amazonaws.com/graphql

Hosted UI Endpoint: https://uberclonefe348119-fe348119-dev.auth.eu-west-1.amazoncognito.com/
Test Your Hosted UI Endpoint: https://uberclonefe348119-fe348119-dev.auth.eu-west-1.amazoncognito.com/login?response_type=code&client_id=32hr4s5tg3g58cc8kj8vf5o4bl&redirect_uri=http://localhost:8081/



### Erreur

#### Erreur 1: Intégration à un projet front-end existant d'un backend AWS Amplify

``Parameters: [hostedUIDomainName, oAuthMetadata, authProvidersUserPool, hostedUIProviderMeta, hostedUIProviderCreds] do not exist in the template``

Suite à une intégration d'un backend AWS Amplify existant à un projet, 
il faut mettre à jour des données (client key, secret key) des socials providers 
pour le service d'authentification. Avant de pousser les changements vers le serveur distant

````shell
$ amplify pull --appId [project_id] --envName dev

$ amplify update api

$ amplify push
````
