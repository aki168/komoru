const db = require("./_ConfigDB");

// -------------------------------------------
// 2022-06-24 MJ
// 取得人格測驗答案並對照資料表給出相應活動包
/** 傳入資料格式 JSON
{
    "is_active" : "0",
    "memberId" : 3,
    "qOneAnsValue" : "0",
    "qTwoAnsValue" : "ESTJ"
}
 */
exports.getPersonality = (data) => {
    var personality = data['qTwoAnsValue']
    // return new Promise(function (reslove, reject) {
    switch (personality) {
        case 'ESFP':
        case 'INTJ':
            return {
                "personality": "藝術家",
                "personalityDescribe": "藝術家描述",
                "activePackType": "0"
            }

        case 'ENFJ':
        case 'ENTJ':
        case 'ESFJ':
        case 'ESTJ':
        case 'ESTP':
            return {
                "personality": "霸道總裁",
                "personalityDescribe": "霸道總裁描述",
                "activePackType": "1"
            }

        case 'INFP':
        case 'ISFJ':
        case 'ISTJ':
            return {
                "personality": "內向輔助",
                "personalityDescribe": "內向輔助描述",
                "activePackType": "2"
            }

        case 'ENFP':
        case 'ENTP':
        case 'INFJ':
            return {
                "personality": "能言善道",
                "personalityDescribe": "能言善道描述",
                "activePackType": "3"
            }

        case 'INTP':
        case 'ISFP':
        case 'ISTP':
            return {
                "personality": "冒險家",
                "personalityDescribe": "冒險家描述",
                "activePackType": "4"
            }
    }

    // return new Promise(function (reslove, reject) {
    //     let sql = "SELECT " + "`active_pack_type`" +
    //         "FROM `Personality` " + "WHERE `q_two_ans_value` = ?"
    //     db.con.query(sql, personality, (err, rows, fields) => {
    //         if (err) {
    //             reject(err)
    //         }
    //         reslove(db.rowDataToCamelData(rows))
    //     })
    // })
}

// 取得活動包後將資料存入ExamItem資料表中
exports.saveExamData = (data) => {
    return new Promise((reslove, reject) => {
        // 駝峰轉換_ Func.
        function decamelize(string, options) {
            options = options || {};
            var separator = options.separator || '_'
            var split = options.split || /(?=[A-Z])/
            return string.split(split).join(separator).toLowerCase()
        }
        // 創建日期
        data['createDatetime'] = db.getDateTimeNow()

        // 駝峰轉換_
        for (key in data) {
            var newKey = decamelize(key)
            if (newKey) {
                data[newKey] = data[key]
                delete data[key]
            }
        }

        // 把資料存入SQL
        db.con.query('INSERT INTO ExamItem SET ?', data, function (error, results, fields) {
            if (error) {
                reject(error)
            }
            reslove(
                console.log('The solution is: ', results)
            )
        })
    })
}