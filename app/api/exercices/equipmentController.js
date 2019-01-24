const equipmentModel = require('../../model/equipmentModel');

exports.getEquipments = async () =>{
    let data= await equipmentModel.getAllEquipment();
    let equipments = Object.keys(data).map(el=>{
        return {
            'id': el,
            'name':data[el].name,
        };
    })
    return {status: 200, data: equipments};
}
