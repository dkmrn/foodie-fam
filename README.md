
![FoodieFamImage](https://github.com/user-attachments/assets/88e388c1-be9a-4056-8c48-df8681ccdd1b)
# Foodie Fam!
<table>
<tr>
<td>
 Foodie Fam is a web app built atop a MERN stack that aims to connect people to share a meal with.

 Have you ever wanted to try multiple dishes from a restaurant while on a solo mission?
 Use Foodie Fam to find others to share a meal family style!
</td>
</tr>
</table>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

* **Creating Posts** Create a post with a Restaurant Name, Location, Date, and Time that will be displayed on the Home Page
* **Join Posts** From the Home Page, you can join other groups
* **Search** Search for specific Restaurants by name
* **Log In Authentication** Hash the passwords in our database, Log in/Log out, and Protective Pages
* **Profile** Shows information about user as well as created posts and joined posts
* **Report** Can report other users

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* JavaScipt  <img src="https://github.com/user-attachments/assets/405c8546-aa12-4a54-ba6d-cd6463d883c0" alt="Sample Image" width="50" height="50">
* Node.js  <img src="https://github.com/user-attachments/assets/566f3aea-918c-4799-8fc9-41c86188013d" alt="Sample Image" width="100" height="50">
* React.js  <img src="https://github.com/user-attachments/assets/cb945c51-dde3-4024-8715-4556ce913464" alt="Sample Image" width="50" height="50">
* Express.js  <img src="https://github.com/user-attachments/assets/0d98866a-2b0b-4766-a4ac-4b33c2671de1" alt="Sample Image" width="100" height="50">
* MongoDB  <img src="https://github.com/user-attachments/assets/50652b09-b061-41d2-b54f-167762861c26" alt="Sample Image" width="100" height="50">
* MongoDB Atlas  <img src="https://github.com/user-attachments/assets/3c7fdddc-ee1b-485b-aaac-d4acb7ca74ff" alt="Sample Image" width="100" height="50">
* HTML  <img src="https://github.com/user-attachments/assets/db82671c-8dc6-4e39-90dd-804d84b9d622" alt="Sample Image" width="50" height="50">
* CSS  <img src="https://github.com/user-attachments/assets/d412e0a3-c167-4f80-b09c-5d3c458725ec" alt="Sample Image" width="50" height="50">

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* Must use Node v21.7.2 or newer ```nvm list // to see```
* Chrome Recomended 

### Installation

### Backend

Setup backend dependencies 

```sh
cd server
npm install
```

Main Backend Dependicies

* Express.js
* MongoDB Atlas

Create the file `mern/server/config.env` with your Atlas URI and the server port:
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/retryWrites=true&w=majority
PORT=5050
```

Running
```sh
npm start
```

### Frontend

Setup frontend dependencies

```sh
cd client
npm install
```

Main Frontend Dependicies

* React.js

Running 

```sh
npm run dev
```

