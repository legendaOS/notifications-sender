import 'dotenv/config'
import axios from 'axios'
import express from 'express'
import cors from 'cors'


async function sendMessage(text) {
    const url = `https://api.telegram.org/bot${tg.token}/sendMessage` // The url to request

    const obj = {
        chat_id: tg.chat_id, // Telegram chat id
        text: text // The text to send
    };

    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    });
}

let tg = {
    token: process.env.tg_token, // Your bot's token that got from @BotFather
    chat_id: process.env.chat_id // The user's(that you want to send a message) telegram chat id
}

const port = process.env?.port ? process.env?.port : 3000

const app = express()

app.use(cors())
app.use(express.json())

app.post('/', async (req, res) => {
    try{
        await sendMessage(req.body?.text)
        res.json(req.body?.text)
    }
    catch{
        res.status(500)
    }
})

app.listen(port, () => {
    console.log(`Backend for Legenda BOT Sender notifications listening on port ${port}`)
})