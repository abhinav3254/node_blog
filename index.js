const express = require('express');
const PORT = 9000;

const app = express();

app.use(express.json());

app.get('', (req, res) => {
    res.send('hello')
})

app.listen(PORT, () => {
    console.log(`APP IS UP AND LISTENING TO PORT NUMBER ${PORT}`)
});