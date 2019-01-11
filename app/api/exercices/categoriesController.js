const categoryModel = require('../../model/categoryModel');

exports.getCategories = async () =>{
    let data= await categoryModel.getAllCategories();
    let categories = Object.keys(data).map(el=>{
        return {
            'id': el,
            'name':data[el].name,
        };
    })
    return {status: 200, data: categories};
}
