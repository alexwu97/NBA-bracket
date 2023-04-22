## NBA Bracket Predictor 
#### Full Stack Web App (JavaScript/Java)

A responsive web app that lets you predict the NBA playoff bracket

#### Preview:

The login screen and instructions:

![login](https://user-images.githubusercontent.com/50474208/77386708-af0a9280-6d48-11ea-9754-358d33ace031.gif)

Revealing the current status of the bracket:

![preview](https://user-images.githubusercontent.com/50474208/77387213-06f5c900-6d4a-11ea-8bda-0b1d27ae07cc.gif)

Predicting the bracket:

![predict](https://user-images.githubusercontent.com/50474208/77387275-37d5fe00-6d4a-11ea-93d1-870df29552fa.gif)

#### Instructions:

The app uses Maven and can be opened in IDE by opening the pom.xml file located in NBA-bracket > complete > pom.xml
Run the Application.java to start the app.

#### MongoDB:

As the app uses a MongoDB NoSQL database, you will need to create a database in MongoDB Atlas, their cloud native DB as a service. Once you've registered and created a database in MongoDB, you will need to go to applications.properties in src and update the properties to point to your database. The parameters that you will need to put in is identified by <> brackets.

Once set up, depending on your JDK version, you may need to add the environment variable -Djdk.tls.client.protocols=TLSv1.2 as there might be certificate issues with MongoDB when trying to run the application.

#### Navigating the App:
The app's login is not implemented fully, therefore there is no need to register an account and you can enter anything in the username and password to proceed. You can also select the learn more button to learn how to enter your predictions in the bracket.
