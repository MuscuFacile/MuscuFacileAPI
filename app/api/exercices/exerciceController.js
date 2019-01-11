const exerciceModel = require('../../model/exerciceModel');

exports.getExercices = async (filter) => {

    let data = await exerciceModel.getAllExercices();

    let exercices = Object.keys(data).map(el => {
        return { ...data[el], 'id': el, };
    })

    if (filter.category.length != 0) {
        exercices = exercices.filter(el => {
            if (el.category !== undefined) {
                for (let i = 0; i < filter.category.length; i++) {
                    if (el.category === filter.category[i]) {
                        return true;
                    }
                }
            }
            return false;
        })
    }
    if (filter.equipment.length != 0) {
        exercices = exercices.filter(el => {
            if (el.equipment !== undefined) {
                for (let i = 0; i < filter.equipment.length; i++) {
                    if (el.equipment.includes(filter.equipment[i])) {
                        return true;
                    }
                }
            }
            return false;
        })
    }
    if (filter.muscle.length != 0) {
        exercices = exercices.filter(el => {
            if (el.muscles !== undefined) {
                for (let i = 0; i < filter.muscle.length; i++) {
                    if (el.muscles.includes(filter.muscle[i])) {
                        return true;
                    }

                    if(el.muscles_secondary !==undefined){
                        if(el.muscles_secondary.includes(filter.muscle[i])){
                            return true;
                        }
                    }
                }
            }
            return false;
        })
    }

    return { status: 200, data: exercices };
}
