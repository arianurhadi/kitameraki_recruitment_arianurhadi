const fs = require('fs')
const getNewId = (array) => {
    if (array.length > 0) {
        return array[0].id + 1
    } else {
        return 1
    }
}

const newDate = () => new Date().toString()

function mustBeInArray(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id)
        if (!row) {
            reject({
                message: 'data not found',
                status: 404
            })
        }
        resolve(row)
    })
}

function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

function sortBy(array, type) {
    if (type == 'DESC') {
        return array.sort(function(a, b){return new Date(b.createdAt) - new Date(a.createdAt)})
    } else {
        return array.sort(function(a, b){return new Date(a.createdAt) - new Date(b.createdAt)})
    }
}

module.exports = {
    getNewId,
    newDate,
    mustBeInArray,
    writeJSONFile,
    sortBy,
}