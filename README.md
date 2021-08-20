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
###### Remarque: AWS Backend 2 source of thruth

Lorsqu'on importe un backend AWS Amplify dans 2 applications différentes,
il faut éviter des modifications conflictuelles du backend dans 2 apps.
Car si une modification est effectué dans le backend de l'app A et que cette modification 
n'est pas importé dans l'app A avant tout autre modification. Cela génére des conflits de configurations.

````shell
Path_to_app_A$ amplify push 
Path_to_app_A$ cd path_to_app_B/
Path_to_app_B$ amplify pull
````

######Solution:

Copier seulement le fichier aws-exports.js qui permet de configurer AWS Amplify du projet A
dans le projet B avant d'importer la configuration.
Ainsi, il existera seulement une seule source de vérité. Tout modification du backend se fera dans l'app A.
````shell
$ cp route_to_app_A/aws-exports.js route_to_app_B/

$ cd route_to_app_B/

$ amplify pull
````

###Todo     

- Logique à faire
  - Variation en latitude/longitude de max 0,00001° == 95,6 m 
  - Change state on driver arrive to pickup & Hide map directions
  - Change state on driver arrive to destination
- 
