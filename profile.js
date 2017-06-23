// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
//require https 
const https = require('https');
const http = require('http');

//Print Error Message
function errorMsg(error){
  console.error(error.message);
}

function printMessage(region, temp, humidity ){
  const message = `${region} has ${temp} °C and ${humidity} is Hummidity`; 
  console.log(message);
}

function get(region){
  try{
  //Connect to the API URL
  const request = https.get(`https://api.apixu.com/v1/current.json?key=04424279e031422287a63311172206&q=${region}`, response =>{  
    if (response.statusCode === 200){
                let body = "";
                response.on('data', data =>{
                              body+=data.toString();
                            });
                response.on('end', () => {
                  try{
                            const profile = JSON.parse(body);
                            printMessage(region, profile.current.temp_c,profile.current.humidity);
                            //console.log(response.statusCode);
                  }catch(error){
                    errorMsg(error);
                  }
                });
    }else{
      const message = `There was an error getting info for ${region} (${http.STATUS_CODES[response.statusCode]})`;
      const statusCodeError = new Error(message);
      errorMsg(statusCodeError);
    }
              });

              request.on('error',errorMsg);

}catch (error){
  errorMsg(error);}
}
module.exports.get = get;