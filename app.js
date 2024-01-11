import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { connectDB } from "./data/database.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

config({
  path: "./data/config.env",
});

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Use cors middleware to handle CORS headers
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(userRouter);
app.use(taskRouter);
app.use(errorMiddleware); // using error middleware

app.listen(process.env.PORT, () => {
  console.log(`Server is working on port :${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

// mongoose.connect("mongodb://127.0.0.1:27017", {
//     dbName: "backendapi",
// }).then(() =>
//     console.log("Database Connected")).catch((e) => console.log(e));

  //Using Middleware.

// const schema = new mongoose.Schema({
//     name:String,
//     email:String,
//     password:String,
// })





// const User = mongoose.model("User",schema);

// app.get("/",(req,res)=>{
//     res.send("Nice Working");
// });

// app.get("/users/all",async(req,res)=>{

//     const users = await User.find({})
//     res.json({
//         success:true,
//         users,
//     })
// })

// app.post("/users/new",async(req,res)=>{
//     const {name,email,password} = req.body;
//      await User.create({
//         name,
//         email,
//         password    
//     });

//     res.status(201).json({
//         success:true,
//         message:"Regestered Successfully"
//     })
// })

// app.get("/userid",async(req,res)=>{
//     const id = req.body.id;
//     const user = await User .findById(id);
//     res.json({
//         success:true,
//         user,
//     })
// })

// app.get("/userid/:id",async(req,res)=>{
//      const {id} = req.params;
//     const user = await User .findById(id);
//     res.json({
//         success:true,
//         user,
//     })
// })

// app.listen(4000,()=>{
//     console.log("Server is Working")
// })
