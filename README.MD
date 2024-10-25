# API GERENCIAMENTO DE INSCRIÇÃO DE ALUNOS E PROFESSORES

## Techs
* NodeJs v20.10.0
* Express 4.18.3
* TypeScript 5.3.3
* Mysql 8.3.0
* Sequelize 6.37.1
* Npm 10.5.0
* Docker

## Mandadory Commands 

* __npm install__ (Install application packets)
* __npm build__ (Will be need to make a build of the  application cause the CLI of sequelize only function with default javascript)
* __cp .env.example .env__ (Will create an example .env with all the need things for run the project)
* __docker compose up -d__ (Run the mysql database on the background)
* __npx sequelize-cli db:create__ (Create  the database with the specification of the .env archieve)
* __npx sequelize-cli db:migrate__ (Create thhe  database table)
* __npx  sequelize-cli init:seeders__  (Create the users for test the application)
* __npm run dev__ (Run the application on developer mode)

