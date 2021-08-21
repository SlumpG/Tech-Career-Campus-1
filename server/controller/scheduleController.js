const ScheduleModel = require('../model/scheduleModel');

const getAllClasses = async (req, res) => {

    await ScheduleModel.find({}, (err, result) => {
        if (err) throw err;
        res.json({ massage: "success", data: result })

    })
}


const postClasses = async (req, res) => {
    try {
        await ScheduleModel.insertMany(req.body.schedule, (err, result) => {
            if (err) throw err;
            res.json({ massage: "add class", data: result });
        })
    }
    catch (err) {
        res.json({ massage: "adding class failing", error: err })
    }
}



const updateClasses = async (req, res) => {
    const taken = { $set: { isTaken: req.body.isTaken === true ? false : true } }
    try {
        await ScheduleModel.findByIdAndUpdate(req.body.id , taken ,(err, result) => {
            if (err) throw err,
                res.status(200).json({ massage: "success",data: result})
        })
    }
    catch (err) {
        res.json({ massage: "problem with update", error: err })
    }
}

module.exports = {
    getAllClasses,
    updateClasses,
    postClasses
}
