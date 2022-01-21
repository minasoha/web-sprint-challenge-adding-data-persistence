const db = require("../../data/dbConfig");

const get = async () => {
 const rows = await db("projects");
 const result = [];
 rows.forEach((row) => {
  if (row.project_completed) {
   result.push({
    ...row,
    project_completed: true,
   });
  } else {
   result.push({
    ...row,
    project_completed: false,
   });
  }
 });
 return result;
};

const getById = async (id) => {
 const result = await db("projects").where("project_id", id).first();
 return result;
};

const create = async (project) => {
 const [id] = await db("projects").insert(project);
 const newProject = await getById(id);
 const converter = (project) => {
  if (project.project_completed) {
   return {
    ...project,
    project_completed: true,
   };
  } else {
   return {
    ...project,
    project_completed: false,
   };
  }
 };
 return converter(newProject);
};

module.exports = {
 get,
 getById,
 create,
};
