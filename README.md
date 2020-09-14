# testApp

This application is a Node.js Express template to help you build your service application 

## Getting Started

These instructions will get you a template of the project up and running on your virtual machine for development and testing purposes.

### Prerequisites

To run the application you will need to have the following packages installed :

- node
- npm
- mariadb
- mocha
- swagger
- docker


### Installing

To install the project follow those steps :

- Clone the repository

- Go in the repository 
```bash
cd [repository_name]
```

- Install node modules (please check you are inside the repository before installing the modules)
```bash
npm install
```

### Run Application

To run the application :
- Check you are at the root of the repository
- Run the following command :
```bash
npm start
```

### Configure

Put your local variables in **/config/.en.local**

Key | Description
--- | -----------
DB_PORT|Database port
DB_NAME|Database name
DB_HOST|Database Uri
DB_USER|Database user (with write/read privileges on DB_NAME)
DB_PASSWORD|Database password


## Commit

### Format 
```bash
type($scope): $message

$body
```
### Type

Must be one of the following:

Key | Description
--- | -----------
**build**| Changes that affect the build system or external dependencies
**ci**| Changes to our CI configuration files and scripts 
**docs**| Documentation only changes
**feat**| A new feature
**fix**| A bug fix
**perf**| A code change that improves performance
**refactor**| A code change that neither fixes a bug nor adds a feature
**style**| Changes that do not affect the meaning of the code
**test**| Adding missing tests or correcting existing tests

### Example
```bash
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```
## Branch

### Format
```bash
(feature|fix|hotfix|release)/$scope
```

### Type

Must be one of the following:

Key | Description
--- | -----------
**build**| Changes that affect the build system or external dependencies
**ci**| Changes to our CI configuration files and scripts 
**docs**| Documentation only changes
**feat**| A new feature
**fix**| A bug fix
**perf**| A code change that improves performance
**refactor**| A code change that neither fixes a bug nor adds a feature
**style**| Changes that do not affect the meaning of the code
**test**| Adding missing tests or correcting existing tests

## Running the tests

To run the test the application :
- Check you are at the root of the repository
- Run the following command :
```bash
npm test
```


### Break down into end to end tests

Use the IDE WebSorm. More information about WebSotrm in the documentation about it.

## Running the code coverage with yours tests

To start the coverage the application :
- Check you are at the root of the repository
- Run the following command :
```bash
npm run coverage
```

## Acces to the API documentation

To run the application :
- Check you are at the root of the repository
- Run the following command :
```bash
npm start
```

After open your browse like Chrome and acces to this endpoint: http://localhost:4000/api-docs/

### And coding style tests



## Deployment



## Contributing

Please keep in mind that master branch need to stay stable release or be use only for minor bug fix


## Versioning


## Authors

* **Equipe Socle technique URSI SIGL2021** - *Initial work* 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Express js : https://expressjs.com/fr/
