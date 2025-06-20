import express from 'express'; //import syntax is of module js
//default is require syntax(common js)

//rest object
const app = express();

//route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to OUR JOB PORTAL !</h1>')
})


//listen
app.listen(8080, () => {
    console.log('node server running on port 8080');
})