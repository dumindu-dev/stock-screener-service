const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const Database = require("./utils/Database")
const ApiRouter = require("./routes/routes.config")

const app = express();

app.use(cors());
app.use(morgan('combined'));

app.use("/api", ApiRouter);

app.listen(3000, () => {
    console.log('listening on port 3000');
});