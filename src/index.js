const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const Database = require("./utils/Database")
const ApiRouter = require("./routes/routes.config")

const app = express();

app.use(morgan('combined'));

const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080'];
app.use(cors({
    credentials:true,
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
          return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use("/api", ApiRouter);

app.listen(3000, () => {
    console.log('listening on port 3000');
});