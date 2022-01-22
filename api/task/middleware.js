const db = require('../../data/dbConfig');

const checkProjectId = async ( req, res, next) => {
    try {
        const possibleProject = await db('projects')
            .where('project_id', req.body.project_id)
            .first()
            if (possibleProject) {
                next()
            } else {
                next({ status: 404, message: 'Could not find project' })
            }
    } catch (err) {
        next(err)
    }
}

const checkTaskPayload = (req, res, next) => {
    const { task_description } = req.body;
    if (!task_description) {
        res.status(400).json({ message: 'task description is missing' })
    } else {
        next()
    }
}

module.exports = {
    checkProjectId,
    checkTaskPayload
}