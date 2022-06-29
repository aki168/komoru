const configController = require("./_ConfigController")
const examItemModel = require("../models/ExamItemModel");

// -----------------------------------------------------------
// 2022-06-24 MJ
// 取得並儲存心理測驗答案，給出活動包
exports.getAndSaveExamData = async (req, res) => {
    var data = req.body
    if (data.isActive === "1") {
        try {
            // 1. 取得測驗答案
            // 2. 根據答案給活動包
            data['qTwoAnsValue'] = `${data['q2AnsValue']}${data['q3AnsValue']}${data['q4AnsValue']}${data['q5AnsValue']}`
            let done = examItemModel.getPersonality(data)
            configController.sendJsonMsg(res, true, '', done)
            // 刪除多餘資料
            delete data['isActive']
            for (i = 2; i < 6; i++) {
                delete data[`q${i}AnsValue`]
            }
            // 3.取得活動包後將資料存進SQL
            let save = await examItemModel.saveExamData(data)
        } catch (error) {
            configController.sendJsonMsg(res, false, error, '')
            console.log(error)
        }
    }
    else {
        return configController.sendJsonMsg(res, false, 'isActive status error', '')
    }
}
