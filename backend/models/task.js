let tasks = require('../data/tasks.json')
const filename = './data/tasks.json'
const helper = require('../helpers/helper')

function getTasks() {
    return new Promise((resolve, reject) => {
        if (tasks.length === 0) {
            reject({
                message: 'no tasks available',
                status: 202
            })
        }
        resolve(tasks)
    })
}
function getTask(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(tasks, id)
        .then(task => resolve(task))
        .catch(err => reject(err))
    })
}
function insertTask(newTask) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(tasks) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        } 
        newTask = { ...id, ...date, ...newTask }
        tasks.push(newTask)
        helper.writeJSONFile(filename, tasks)
        resolve(newTask)
    })
}
function updateTask(id, newTask) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(tasks, id)
        .then(task => {
            const index = tasks.findIndex(t => t.id == task.id)
            id = { id: task.id }
            const date = {
                createdAt: task.createdAt,
                updatedAt: helper.newDate()
            } 
            tasks[index] = { ...id, ...date, ...newTask }
            helper.writeJSONFile(filename, tasks)
            resolve(tasks[index])
        })
        .catch(err => reject(err))
    })
}
function deleteTask(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(tasks, id)
        .then(() => {
            tasks = tasks.filter(t => t.id !== id)
            helper.writeJSONFile(filename, tasks)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertTask,
    getTasks,
    getTask, 
    updateTask,
    deleteTask
}