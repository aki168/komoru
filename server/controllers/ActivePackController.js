const configController = require("./_ConfigController")
const activePackModel = require("../models/ActivePackModel");

// -----------------------------------------------------------
// 2022-06-28 MJ
// 獲得活動包data by activePackType, cityId
exports.getActivePackData = async (req, res) => {
    let data = req.body
    let packType = data['activePackType']
    let cityId = data['cityId']
    if (packType) {
        let done = await activePackModel.getActivePackDataByTypeAndCity(packType, cityId)
        configController.sendJsonMsg(res, true, '', done)

    }
    else {
        configController.sendJsonMsg(res, false, 'activePackType有誤', [])
    }
}