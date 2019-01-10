const https = require('https');
const axios = require('axios');
const muscleModel = require('../../model/muscleModel');
const exerciceModel = require('../../model/exerciceModel');
const _=require('lodash');

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
    let mainExerciceUrl='https://wger.de/api/v2/exercise/?language=2';
    let imageExerciceUrl='https://wger.de/api/v2/exerciseimage/';
    let excerciceList=[];
    let excerciceImageList=[];
    do{
        let data= await axios.get(mainExerciceUrl);
        excerciceList=excerciceList.concat(data.data.results);
        mainExerciceUrl=data.data.next;
    }while(mainExerciceUrl !== null);   

    do{
        data= await axios.get(imageExerciceUrl);
        excerciceImageList=excerciceImageList.concat(data.data.results);
        imageExerciceUrl=data.data.next;
    }while(imageExerciceUrl !== null);   

    for(let i=0 ; i<excerciceList.length ; i++){
        excerciceList[i].images=_.filter(excerciceImageList, ['exercise', excerciceList[i].id]).map(el => el.image);
    }

    let check =[];
    excerciceList.map(el=>{
        check.push(exerciceModel.insertExercice(el));
    })
    await Promise.all(check);
    return "Success";
}
