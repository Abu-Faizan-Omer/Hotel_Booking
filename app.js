console.log("Hi this is app.js")
const dotenv=require("dotenv").config()
const express=require("express")
const app=express()
const cors=require("cors")
const bodyparser = require("body-parser")
const path=require("path")
const sequelize=require("./utils/database")


//path
const currentDirectory=path.join(__dirname,"public")

//routes
const userRoutes=require("./routes/user")
const hotelRoutes = require('./routes/hotel');
const bookingRoutes = require('./routes/booking');
const reviewRoutes = require('./routes/review');
const adminRoutes = require('./routes/admin');

//models
const User=require("./models/user")
const Hotel = require('./models/hotel');
const Booking = require('./models/booking');
const Review = require('./models/review');

//middleware
app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname, 'public')))



app.use("/user",userRoutes)
app.use('/hotel', hotelRoutes);
app.use('/booking', bookingRoutes);
app.use('/review', reviewRoutes);
app.use('/admin', adminRoutes);



// Serve home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));  // Home page is home.html
});

// Serve HTML files dynamically from /views folder
app.get("/:page", (req, res) => {
    const page = req.params.page;
    res.sendFile(path.join(__dirname, 'views', `${page}.html`), (err) => {
        if (err) {
            res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
        }
    });
});


// Define relationships
User.hasMany(Booking);
Booking.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Hotel.hasMany(Booking);
Booking.belongsTo(Hotel);

Hotel.hasMany(Review);
Review.belongsTo(Hotel);

sequelize.sync()
.then((result)=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is runnig on PORT  ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Error in synching",err)
})
