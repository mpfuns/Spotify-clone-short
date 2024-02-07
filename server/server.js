const express = require('express');
const  cors = require('cors');
 const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.post('/refresh_token', (req, res) => {
   const refreshToken = req.body.refreshToken;
   const spotifyApi =  new SpotifyWebApi(
    { redirectUri: 'http://localhost:3000/',
    clientId: '194a37f32c5c4913ae2a689f9a2dd67c',
    clientSecret: '65b658ac1215438aad9d0b792c99beb7',
    refreshToken
})
spotifyApi.refreshAccessToken().then(
    (data) => {
      console.log( data.body);

    }).catch(() => { 
        res.sendStatus(400)})  
 

})
app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi =  new SpotifyWebApi(
        { redirectUri: 'http://localhost:3000/',
        clientId: '194a37f32c5c4913ae2a689f9a2dd67c',
        clientSecret: '65b658ac1215438aad9d0b792c99beb7'
    })

    spotifyApi.authorizationCodeGrant(code)
 .then(data => {
    res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
    })
  }). catch((err) => { 
     console.log(err);
     res.sendStatus(400)
  })
})

app.listen(3001)
