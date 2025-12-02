# Role authentication FullStack MERN app with JWT

You can visit a deployed version of this app [here](https://demo-auth-react-express.onrender.com/).

To see authentication only with cookies check the branch 'cookies'.
To see authentication only with headers check the branch 'auth_headers'.

### How to start the project

1. Clone the repository:

```bash
   git clone https://github.com/your-repo/demo_auth_react_express.git
   cd demo_auth_react_express
  ```

2. Install server and client dependencies:
```bash
   npm install
   npm run install:client
```

#### Development Mode

1. Configure environment variables:


   Create a `.env` file in the root directory and add the following variables. You can copy the content of `.env.example.development`:
   ```env
    MONGO_URI=mongodb://localhost:27017/bbdd_auth
    MY_TOKEN_SECRET=Op9WwkTeh45k0
    # DB_SSL=true con MongoDB Atlas
    DB_SSL=false
    # Development
    NODE_ENV=development
   ```
2. Start the server and client:
   ```bash
   npm run rev
   ```

The client will be available at [http://localhost:3000](http://localhost:3000) and the server at [http://localhost:5000](http://localhost:5000).

#### Production Mode

1. Create a `.env` file with the following variables. You can copy the content of `.env.example.production`:
   ```env
    MONGO_URI=mongodb://localhost:27017/bbdd_auth
    MY_TOKEN_SECRET=Op9WwkTeh45k0
    # DB_SSL=true con MongoDB Atlas
    DB_SSL=false
    # Production
    NODE_ENV=production
   ```

2. Build the client and start the server:
   ```bash
   npm start
   ```

The server will be available at [http://localhost:5000](http://localhost:5000), serving the client from the `build` folder.

----
## Express
### Routes

1. Routes
* users: manages users
* resources: serves protected resources

<br>

2. MongoDB connection 
* Create MongoDB local or MongoDB Atlas for deployment
* Create Schema

Data structure 
```js
{
    "_id":ObjectId("***************"),
    "password":"example"
    "email":"example"
    "role":"user"
    "createdAt":"2023-03-16T23:47:38.481+00:00"
    "updatedAt":"2023-03-16T23:47:38.481+00:00"
    "__v":0
}
```

3. Middlewares

* **getAccessToken** => inspect cookies and [save the access_token in the request object](https://stackoverflow.com/questions/10983500/how-do-i-store-request-level-variables-in-node-js)
* **decodeToken** => Check that the access_token has a valid signature and decode the payload using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken). Save the decoded payload in the request object.
* **adminRoutes** => used to protect admin routes
* **userRoutes** => used to protect user routes

4. Login

This endpoint must:
- Retrieve user role from the database using provided credentials
- Set Authorization header
- Send cookie


## React 

&lt;Home/&gt; component manages sign up and login. 
Role is allowed to be selected only for learning purposes.

&lt;Main/&gt; component stores the logged and role states.
Admin and Client routes are nested respectively.

# Protected Routes
This component takes a component and the logged-in state as props. 
If logged is true, it renders the component passed as props; otherwise, it renders a message to log in. This usually would redirect to login.  

# Role manager
This component takes an array of allowed roles and a component. If the user role is in the list of allowed roles, it renders the component. Otherwise, it renders an "unauthorized" message.

ProtectedRoutes and RoleManager are nested in the &lt;Route/&gt; components in &lt;Main/&gt;.





