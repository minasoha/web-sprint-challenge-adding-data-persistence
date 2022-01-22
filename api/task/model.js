// build your `Task` model here
const db = require('../../data/dbConfig');

const get = async () => {
    const rows = await db('tasks as t')
        .leftJoin('projects as p', 't.project_id', 'p.project_id')
        .select(
            'task_id', 
            'task_description', 
            'task_notes', 
            'task_completed', 
            'project_name', 
            'project_description');
    const result = []
    rows.forEach(row => {
        if (row.task_completed) {
            result.push({
                ...row,
                task_completed: true
            })
        } else {
            result.push({
                ...row,
                task_completed: false
            })
        }
    })
    return result;
}

const getById = async (id) => {
    const result = await db('tasks').where('task_id', id).first();
    return result;
}

const create = async (task) => {
    const [id] = await db('tasks').insert(task);
    const newTask = await getById(id);
    const converter = (task) => { 
        if (task.task_completed) {
            return {
                ...task,
                task_completed: true
            }
        } else {
            return {
            ...task,
            task_completed: false
            }
        }
    }
    return converter(newTask)
}

module.exports = {
    get,
    getById,
    create
}