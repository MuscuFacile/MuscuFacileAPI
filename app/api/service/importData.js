const https = require('https');
const axios = require('axios');
const muscleModel = require('../../model/muscleModel');
const exerciceModel = require('../../model/exerciceModel');


exports.insertMuscleDB =async () => {
    let data= await axios.get('https://wger.de/api/v2/muscle/');
    let muscleList=data.data.results;
    let check =[];
    muscleList.map(el=>{
        check.push(muscleModel.insertMuscle(el));
    })
    console.log(check);
    return data.data;
}

exports.insertExerciceDB =async () => {
    let mainUrl='https://wger.de/api/v2/exercise/?language=2';
    do{
        let data= await axios.get(mainUrl);
        let excerciceList=data.data.results;
        let check =[];
        excerciceList.map(el=>{
            check.push(exerciceModel.insertExercice(el));
        })
        await Promise.all(check);
        mainUrl=data.data.next;
    }while(mainUrl !== null);    
    return "Success";
}
