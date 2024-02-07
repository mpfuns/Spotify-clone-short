import React, { useEffect, useState } from 'react'
 import axios from 'axios';

export default function useAuth( code) {
    
   const[accessToken, setAccessToken] = useState();
   const[ refreshToken, setRefreshToken] = useState();
   const[ expireIn, setExpiresIn] = useState();

     /*async function  getdata(){
         axios .post('http://localhost:3001/login', {  code,})
      .then(res =>{
       console.log(res.data)
         setAccessToken(res.data.accessToken)
         setRefreshToken(res.data.refreshToken)
         setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, null, '/');
     }) . catch((err) => {
     console.log(err);  }) 
      
       
    } */

   useEffect(() => {
      axios .post('http://localhost:3001/login', {  code,})
      .then(res =>{
       console.log(res.data)
         setAccessToken(res.data.accessToken)
         setRefreshToken(res.data.refreshToken)
         setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, null, '/');
     }) . catch((err) => {
     console.log(err);  }) 
      
    
   },[code])

 useEffect(() => {
   axios
   .post('http://localhost:3001/refresh', { 
       refreshToken,
  }).then(res =>{
       setAccessToken(res.data.accessToken)
       setRefreshToken(res.data.refreshToken)
       setExpiresIn(res.data.expiresIn)
      window.history.pushState({}, null, '/');
   }). catch((err) => {
    window.location ='/'
   }) 

}, [refreshToken, expireIn])


    return accessToken 
}
