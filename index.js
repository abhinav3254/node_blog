const express = require('express');
const PORT = 9000;
require('./src/db/db-pg')

const app = express();

app.use(express.json());

app.get('', (req, res) => {
    res.send('hello abhinav')
})

app.listen(PORT, () => {
    console.log(`APP IS UP AND LISTENING TO PORT NUMBER ${PORT}`)
});