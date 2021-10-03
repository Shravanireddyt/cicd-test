const pool = require("../utils/db-connect")
const JIMP = require("jimp")

exports.getDocs = (data) => {
    let sql = `SELECT * FROM uploaded_images WHERE user_key='${data.user_key}'`
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
            // console.log(err)
            if (err) { return reject(err) }
            resolve(result)
        })
    })
}


exports.convertToTiff = (data) => {
    return new Promise(async(resolve, reject) => {
        // EX: value = "http://uat.takeoff.in/docs/025db780fb5f5f750de599e187c074a/1614770685_h4-slide.png"
        let pathArray = data.value.trim().split('/')
        let oldImageName = pathArray[pathArray.length - 1] //1614770685_h4-slide.png
        try {
            // load image
            let image = await JIMP.read(`${docsPath}/${oldImageName}`)

            // get the image name without extension
            let newImageName = oldImageName.split('.')[0]
            pathArray.pop()
            let newPath = pathArray.join('/') + newImageName + '.tiff'

            // create the tiff image with the image name with tiff extension
            await image.resize(600, 600)
            image = await image.write(`${docsPath}/${newImageName}.tiff`)

            let sql = `UPDATE uploaded_images SET ${data.key} = '${newPath}' WHERE user_key = '${data.user_key}'`

            pool.query(sql, (err, result) => {
                if (err) { reject(err) }
                resolve(result)
            })
        } catch (error) {
            reject(error)
        }
    })
}

// let promises = []
// return new Promise(async(resolve, reject) => {
//     let { user_key, ...rest } = data
//     for (let [key, value] of Object.entries(rest)) {
//         // EX: value = "http://uat.takeoff.in/docs/025db780fb5f5f750de599e187c074a/1614770685_h4-slide.png"
//         let pathArray = value.split('/')
//         let oldImageName = pathArray[pathArray.length - 1]
//         try {
//             // load image
//             let image = await JIMP.read(`${docsPath}/${oldImageName}`)

//             // get the image name without extension
//             let newImageName = oldImageName.split('.')[0]
//             pathArray.pop()
//             let newPath = pathArray.join('/') + newImageName + '.tiff'

//             // create the tiff image with the image name with tiff extension
//             await image.resize(600, 600)
//             image = await image.write(`${docsPath}/${newImageName}.tiff`)
//             promises.push(createPromise(key, newPath))
//         } catch (error) {
//             reject(error)
//         }
//     }
//     // console.log(promises, "yes")
//     Promise.all(promises).then(data => resolve(data)).catch(err => reject(err))

//     function createPromise(key, value) {
//         return new Promise((success, failure) => {
//             let sql = `UPDATE uploaded_images SET ${key} = '${value}' WHERE user_key = '${data.user_key}'`
//             pool.getConnection((err, con) => {
//                 if (err) { return failure(err) }
//                 con.query(sql, (err, data) => {
//                     // console.log("second")
//                     if (err) { return failure(err) }
//                     success(data)
//                 })
//             })
//         })
//     }
// })