import app from './app.js';
import { connectToDatabase } from './db/connection.js';

// connections and listners
const PORT = process.env.PORT || 5000;
connectToDatabase().then(()=>{
  app.listen(PORT, ()=>console.log("Server Open")); 
}).catch((error)=>console.log(error))

// 4 types of request 
// Get - fetch data from database 
// Post - create a new data
// Put - update modify or mutate some data
// Delete - send some data to delete something

// req -req object so the frontend or client has requested you something so it is there inside the request
// res - response from server
// next- is used to move to the next availaible middlewares iside the express
// middlewares- are the functions which handle request so next is middleware which is used to move to next middleware this is a simple route

// postman - testing platfrom for teting any kind of api  that could be graphql api or normal api 
app.get("/hello", (req, res, next)=>{
 
  return res.send("hello");
})
app.post("/user/:id", (req, res, next)=>{
  console.log(req.params.id);
  return res.send("Hello world to my life " + req.params.id);
})

