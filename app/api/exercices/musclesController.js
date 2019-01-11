const muscleModel = require('../../model/muscleModel');

exports.getMuscles = async () =>{
    let data= await muscleModel.getAllMuscles();
    let equipments = Object.keys(data).map(el=>{
        return {
            'id': el,
            'name':data[el].name,
        };
    })
    return {status: 200, data: equipments};
}