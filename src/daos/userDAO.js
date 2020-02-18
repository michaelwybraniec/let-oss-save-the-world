"use strict";
const debug = require("debug")("let-oss-save-the-world: userDAO\n");
const User = require("../models/userModel");

//! =========================== ADD ===============================

const add = async user => {
  let newUser = new User(user);
  let result = await newUser.save();
  return result;
};

//! =========================== UPDATE ===============================
const updateOne = async (userEmail, updatedUserObj) => {
  const query = {
    email: userEmail
  };
  return await User.updateOne(query, updatedUserObj);
};

const updateOneById = async (userId, updatedUserObj) => {
  const query = {
    _id: userId
  };

  let user = await User.findOne(query);
  user.email = updatedUserObj.email;
  user.first_name = updatedUserObj.first_name;
  user.last_name = updatedUserObj.last_name;
  user.role = updatedUserObj.role;
  user.status_active = updatedUserObj.status_active;

  if (updatedUserObj.password) {
    user.password = updatedUserObj.password;
  }

  await user.save();
  return user;
};

const deactivateOneById = async (userId, statusActive) => {
  const query = {
    _id: userId
  };
  return await User.findOneAndUpdate(query, {
    status_active: statusActive
  });
};

//! =========================== DELETE ===============================
const deleteOneById = async userId => {
  let res = await User.deleteOne({
    _id: userId
  });
  return res.ok;
};

const deleteByEmail = async email => {
  let res = await User.deleteOne({
    email: email
  });
  return res.ok;
};

//! =========================== FIND ===============================
const findOneByEmail = async email => {
  return await User.findOne({
    email: email
  });
};
const findAll = async () => {
  return await User.find();
};

const deleteAll = async () => {
  let res = await User.deleteMany();
  return res;
};

module.exports = {
  add: add,
  updateOne: updateOne,
  updateOneById: updateOneById,
  findOneByEmail: findOneByEmail,
  findAll: findAll,
  deactivateOneById: deactivateOneById,
  deleteByEmail: deleteByEmail,
  deleteOneById: deleteOneById,
  deleteAll: deleteAll
};
