// build your `Resource` model here
const db = require("../../data/dbConfig");

const get = () => {
 return db("resources");
};

const getById = async (id) => {
 const result = await db("resources").where("resource_id", id).first();
 return result;
};

const create = async (resource) => {
 const [id] = await db("resources").insert(resource);
 const newResource = await getById(id);
 return newResource;
};

module.exports = {
 get,
 getById,
 create,
};
