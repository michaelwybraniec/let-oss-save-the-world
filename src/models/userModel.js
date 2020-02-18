"use strict";
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const userModel = () => {
  const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      first_name: {
        type: String,
        required: true
      },
      last_name: {
        type: String,
        required: true
      },
      role: {
        type: { enum: ["User", "Admin", "SuperAdmin"] },
        required: true
      },

      status_active: {
        type: Boolean,
        required: true
      }
    },
    {
      timestamps: true
    }
  );

  userSchema.pre("save", function(next) {
    let user = this;
    //Only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) {
      return next();
    }
    let salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
  });

  userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
  };

  userSchema.plugin(uniqueValidator);

  return mongoose.model("User", userSchema);
};

module.exports = userModel();
