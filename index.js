//config//
const apikey = "your API keys";
const orgkey = "your 0RG keys";
const port = 80;
//////////////////////////
const express = require('express')
const fetch = require('node-fetch')
const query = require('readline-sync')
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//gpt-3.5-turbo
async function getOpenAIResponse(user) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apikey,
        'OpenAI-Organization': orgkey
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "user",
            "content": user
          }
        ]
      })
    });
    const data = await response.json();
    const jsonString = JSON.stringify(data);
    const send = jsonString.substring(jsonString.indexOf('"content":') + 11, jsonString.indexOf('"}', jsonString.indexOf('"content":')) + 1);
    return send;
  } catch (error) {
    console.error(error);
    return "Sorry, something went wrong!";
  }
}

//text-davinci-003
async function getOpenAIResponsev3(user) {
  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apikey
      },
      body: JSON.stringify({
        prompt: user,
        max_tokens: 2000,
        n: 1,
        temperature: 0,
        model: 'text-davinci-003',
      })
    });
    const data = await response.json();
    const jsonString = JSON.stringify(data);
    const send = jsonString.slice(jsonString.indexOf('{"text":"'));
    return send;
  } catch (error) {
    console.error(error);
    return "Sorry, something went wrong!";
  }
}
// create image
async function generateImage(user) {
  try {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + apikey,
  'OpenAI-Organization': orgkey
  },
  body: JSON.stringify({
  "model": "image-alpha-001",
  "prompt": "<img src='" + user + "'>",
  "num_images": 1,
  "size": "1024x1024",
  "response_format": "url"
  })
  });
  const data = await response.json();
  return data.data[0].url;
  } catch (error) {
  console.error(error);
  return "Sorry, something went wrong!";
  }
  }

//key main api
app.all('/', async (req, res) => {
  const user = req.body.user || req.query.user;
  if (!user) {
    return res.status(500).send("mày đéo hỏi tao cái gì sao tao biết trả lời ?");
  }
  const authkey = req.body.authkey || req.query.authkey;
  const ver = req.body.ver || req.query.ver;
  console.log("Got request:  " + user + "|" + ver + "|" + authkey);
  if (authkey !== "pk_live_51IkykwJJUWs67pm7krR6XyF") {
    return res.status(401).send(`{"error": "invalid authkey"}`);
  }
  if (ver == "gpt-3.5-turbo") {
    const send = await getOpenAIResponse(user);
    console.log(send);
    res.send("{" + `"msg req data": "${user}` + `","msg rep data": "${send},` + `"    Backend api by stowe"` + "}");
  } else if (ver == "text-davinci-003") {
    const send = await getOpenAIResponsev3(user);
    console.log(send);
    res.send("{" + `"msg req data": "${user}"` + `"msg rep data": "${send}` + "Backend api by stowe" + "}");

  } else if (ver == "image-alpha-001") {
    const send = await generateImage(user);
    console.log(send);
    res.send(send);
  }
  else {
    res.send("missing param <br> what version do you want ?");
  }


});
app.listen(port, () => {
  console.log(`App was running at http://localhost:${port}`)
})
