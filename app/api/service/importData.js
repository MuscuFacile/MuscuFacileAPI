const https = require('https');
const axios = require('axios');
exports.insertMuscleDB =async () => {
    let data= await axios.get('https://wger.de/api/v2/muscle/');
    let muscleList=data.data.results;
    muscleList.map(el=>{
        
    })
    return data.data;
}