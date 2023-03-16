 # Custom url with Open AI APIs
## This repo allow you to custom URL with method GET
### Featrue
- Allow you to custom URL
- Custom your Auth Key
- JSON fomat supported
- Model support gpt-3.5-turbo and text-davinci-003
## How to setup
#####1. Go to index.js and insert your APIs key and ORG key

```javascript
const apikey = "Enter your OpenAI APIs";
const orgkey = "Enter your ORGs key";
const oauth = "type your custom password here";
const openport = 80;//you can change port default port is 80
```

#####2. Install module from npm

`npm i`
or
`sudo npm i`

##### 3. Start APIs
`npm start`
or
`sudo npm start`

### How to call APIs?

Yes, very simple you can Request directly from browser with GET method

`http://localhost/?user=<your text here>&authkey=<your authkey>&ver=<models>`
### Error code
here for some error code when you request to APIs

|  Error Code |  Respone | Detals  |
| :------------ | :------------ | :------------ |
|  `401`  | Unauthorized  |  Check your auth key input correctly and set in config |
|  `500` | Internal Server Error  | There are error with APIs or GET body was missing or not compeleted  |



