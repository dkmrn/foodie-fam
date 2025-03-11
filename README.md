
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

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```
5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Site

### Landing Page
Currently it is working on all NSE (India) Stocks, BSE (India) Stocks Symbol will be added soon.

![](https://iharsh234.github.io/WebApp/images/demo/web_app_face.JPG)

### Query Filled Form
![](https://iharsh234.github.io/WebApp/images/demo/demo_query.JPG)

### Charts
![](https://iharsh234.github.io/WebApp/images/demo/demo_chart1.JPG)
![](https://iharsh234.github.io/WebApp/images/demo/demo_chart2.JPG)
![](https://iharsh234.github.io/WebApp/images/demo/demo_chart3.JPG)


## Mobile support
The WebApp is compatible with devices of all sizes and all OS's, and consistent improvements are being made.

![](https://iharsh234.github.io/WebApp/images/demo/mobile.png)




## [Usage](https://iharsh234.github.io/WebApp/) 

### Development
Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request 

### Bug / Feature Request

If you find a bug (the website couldn't handle the query and / or gave undesired results), kindly open an issue [here](https://github.com/iharsh234/WebApp/issues/new) by including your search query and the expected result.

If you'd like to request a new function, feel free to do so by opening an issue [here](https://github.com/iharsh234/WebApp/issues/new). Please include sample queries and their corresponding results.


## Built with 

- [jQuery - Ajax](http://www.w3schools.com/jquery/jquery_ref_ajax.asp) - jQuery simplifies HTML document traversing, event handling, animating, and Ajax interactions for rapid web development.
- [Google Chart API](https://developers.google.com/chart/interactive/docs/quick_start) - Free , Rich Gallery , Customizable and Cross-browser compatible.
- [Bootstrap](http://getbootstrap.com/) - Extensive list of components and  Bundled Javascript plugins.


## To-do
- Add BSE (India) Symbol to the current App.
- Decide comparison models of Stocks. (suggestions are most welcome).
- Another WebApp, capable of comparing at least 10 stocks.

## Team

[![Harsh Vijay](https://avatars1.githubusercontent.com/u/12688534?v=3&s=144)](https://github.com/iharsh234)  | [![Quandl.com](https://github.com/iharsh234/WebApp/blob/master/images/quandl.jpg)](https://www.quandl.com/)
---|---
[Harsh Vijay ](https://github.com/iharsh234) |[Quandl](https://www.quandl.com)

## [License](https://github.com/iharsh234/WebApp/blob/master/LICENSE.md)

MIT © [Harsh Vijay ](https://github.com/iharsh234)

