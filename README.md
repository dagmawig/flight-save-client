# Flight Search and Saving App
This app is used to save one way flight searches and get email alert when lowest price of the saved search is below the given alert price.
The app uses priceline API so the user can go to priceline and buy tickets once they get an email alert.
The app can also be used as one stop place to check current prices of saved flight searches.

# App is published at https://dagmawig.github.io/flight-save-client/

## Server side 
Server side is written in python with Django framework and is located at https://github.com/dagmawig/flight-save-backend
It is hosted on Heroku platform.

### Services and Functions Used
I used TypeScript React to build the frontend.
I used Material UI CSS framework for styling.
I used firebase authentication to verify user email and authenticate using email and password. 
I used axios method to make https request to server side. 
I used MongoDB to store user data. 
I used heroku.com to host server code. 
I used Redux Toolkit to manage global app state. 
I used useState hook to manage local app state. 
I used Priceline API to import flight search result.