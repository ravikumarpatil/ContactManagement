# ContactManagement

This is a test project used to store contact information. In this project Web API 2.0 used for server side implementation and Angular 6 for front end. This project has repository pattern and dependency injection have implemeneted. Also used Entity framework 6.0 Database first approch.
As sample project I have not implemeneted the authentication and authorization.

## Getting Started

### Project Structure 

- ContactManagement.Api (Web api 2.0 project)
- ContactManagement.Service 
- ContactManagement.Data (Entity framework 6.0 data model mapped to database)
- ContactManagement.Repository (This will contain database repositories used for data operation and returning data entities)
- ContactManagement.WebApp (Front end angular application)

To run this project on local machine below are the Prerequisites needed.

### Prerequisites

What things need to install

```
- Visual studio 2017
- Sql Server and SSMS 2017
- Entity framework 6.0
- NodeJs 8.9.0 or later
- Anglar Cli
```

### Installing and Running the application

To set  database connection, navigate to ContactManagement\ContactManagement.Api project open the Web.config file and change database connetion string.
Also, navigate to ContactManagement\ContactManagement.Data project open the App.config file and change database connetion string.

Now, As we have implemented Code first aprroch in our project lets create Database. 
Open Package Manager Console, select ContactManagement.Data project and execute below commands one by one.

```
Enable-Migrations
Add-Migration Initial
Update-Database
```


Now to install latest Angular Cli, execute below command in command prompt.

```
npm install -g @angular/cli

or 

npm install -g @angular/cli@latest
```

Now in command prompt, change directory and navigate to ContactManagement\ContactManagement.WebApp (where package.json file resides). This folder contains front end angular application.
Run below command to install angular packages for our application.

``` 
npm install
```

Now environment for web api and angular project is set.

### Running the application

In visual studio open solution explorer, Right click on ContactManagement\ContactManagement.Api  project and set it as startup project.
Press F5 key. As home page is not created, Browser will show HTTP Error 403.14 - Forbidden error page but it is fine.
Keep the application running and observe the api url. It should look like. 

```
http://localhost:57443/
```

If the Url is not same (if port number is different), then goto solution explorer, navigate to ContactManagement\ContactManagement.WebApp\src\envoronments\envoronment.ts. And Change the API URL.


To run front end angular web appliation, go back to command prompt, change directory to ContactManagement\ContactManagement.WebApp (where package.json file resides). Run below command
``` 
ng serve --open
```

## Authors

* **Ravikumar Patil** 



