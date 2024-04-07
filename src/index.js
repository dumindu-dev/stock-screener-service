const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const Database = require("./utils/Database")
const ApiRouter = require("./routes/routes.config")

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());

const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080','https://console.choreo.dev'];
app.use(cors({
    credentials:true,
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
          return callback(new Error("origin error"), false);
        }
        return callback(null, true);
    }
}));

app.use("/api", ApiRouter);

app.listen(3000, () => {
    console.log('listening on port 3000');
});