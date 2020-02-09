"use strict";
const debug = require("debug")("userService:");
const UserDAO = require("../daos/userDAO");

const add = async user => {
  let res = await UserDAO.add(user);
  res.password = undefined;
  return res;
};

const updateOneById = async (userId, updatedUserObj) => {
  return await UserDAO.updateOneById(userId, updatedUserObj);
};

const deactivateOneById = async (userId, statusActive) => {
  return await UserDAO.deactivateOneById(userId, statusActive);
};

const deleteOneById = async userId => {
  return await UserDAO.deleteOneById(userId);
};

const deleteByEmail = async email => {
  let res = await UserDAO.deleteByEmail(email);
  return res.ok;
};

const findByEmail = async email => {
  return await UserDAO.findOneByEmail(email);
};

const findAll = async () => {
  return await UserDAO.findAll();
};

module.exports = {
  add: add,

  deleteByEmail: deleteByEmail,
  deleteOneById: deleteOneById,

  updateOneById: updateOneById,
  deactivateOneById: deactivateOneById,

  findAll: findAll,
  findByEmail: findByEmail
};
