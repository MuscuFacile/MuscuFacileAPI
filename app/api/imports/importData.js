const https = require('https');
const axios = require('axios');
const muscleModel = require('../../model/muscleModel');
const exerciceModel = require('../../model/exerciceModel');
const equipmentModel = require('../../model/equipmentModel');
const categoryModel = require('../../model/categoryModel');
const _ = require('lodash');

exports.insertMusclesDB = async () => {

    let musclesUrl = 'https://wger.de/api/v2/muscle/';
    let muscleList = [];
    let check = [];
    //Gathering all data from the wger api for all muscles
    do {
        let data = await axios.get(musclesUrl);
        muscleList = muscleList.concat(data.data.results);
        musclesUrl = data.data.next;
    } while (musclesUrl !== null);

    //importing data to database
    muscleList.map(el => {
        check.push(muscleModel.insertMuscle(el));
    })

    //wait that all data is imported to the DB 
    await Promise.all(check);
    return "Success";
}

exports.insertExercicesDB = async () => {

    let mainExerciceUrl = 'https://wger.de/api/v2/exercise/?language=2&status=2';
    let imageExerciceUrl = 'https://wger.de/api/v2/exerciseimage/';
    let excerciceList = [];
    let excerciceImageList = [];
    let check = [];

    //Gathering all data from the wger api for all exercices
    do {
        let data = await axios.get(mainExerciceUrl);
        excerciceList = excerciceList.concat(data.data.results);
        mainExerciceUrl = data.data.next;
    } while (mainExerciceUrl !== null);

    //Gathering all data from the wger api for all exercices images
    do {
        data = await axios.get(imageExerciceUrl);
        excerciceImageList = excerciceImageList.concat(data.data.results);
        imageExerciceUrl = data.data.next;
    } while (imageExerciceUrl !== null);

    //associating the images to the corresponding exercices
    for (let i = 0; i < excerciceList.length; i++) {
        excerciceList[i].images = _.filter(excerciceImageList, ['exercise', excerciceList[i].id]).map(el => el.image);
    }

    //importing data to database
    excerciceList.map(el => {
        check.push(exerciceModel.insertExercice(el));
    })

    //wait that all data is imported to the DB
    await Promise.all(check);

    return "Success";
}

exports.insertEquipmentsDB = async () => {
    let mainEquipmentUrl = 'https://wger.de/api/v2/equipment/';
    let equipmentList = [];
    let check = [];

    //Gathering all data from the wger api for all equipments    
    do {
        let data = await axios.get(mainEquipmentUrl);
        equipmentList = equipmentList.concat(data.data.results);
        mainEquipmentUrl = data.data.next;
    } while (mainEquipmentUrl !== null);

    //importing data to database
    equipmentList.map(el => {
        check.push(equipmentModel.insertEquipment(el));
    })

    //wait that all data is imported to the DB
    await Promise.all(check);

    return "Success";
};

exports.insertCategoriesDB = async () => {

    let categoryUrl = 'https://wger.de/api/v2/exercisecategory/';
    let categoryList = [];
    let check = [];

    //Gathering all data from the wger api for all Categories
    do {
        let data = await axios.get(categoryUrl);
        categoryList = categoryList.concat(data.data.results);
        categoryUrl = data.data.next;
    } while (categoryUrl !== null);

    //importing data to database
    categoryList.map(el => {
        check.push(categoryModel.insertCategory(el));
    })

    //wait that all data is imported to the DB
    await Promise.all(check);

    return "Success";
};