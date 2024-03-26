import { connect, set } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { DrugModel } from "../models/drug.model.js";
import { sample_users } from "../data.js";
import { sample_med } from "../data.js";
import bcrypt from "bcryptjs";

const PASSWORD_HASH_SALT_ROUNDS = 10;

set("strictQuery", true);

const URI="mongodb://localhost:27017/drugStore-db"

export const dbconnect = async () => {
  try {
    connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await seedUsers();
    await seedDrugs();
    console.log("connect successfully---");
  } catch (error) {
    console.log(error);
  }
};


async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log('Users seed is already done!');
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }

  console.log('Users seed is done!');
}


async function seedDrugs() {
  const drugs = await DrugModel.countDocuments();
  if (drugs > 0) {
    console.log("Drugs seed is already done!");
    return;
  }
  for (const drug of sample_med) {
    drug.imageURL = `/medicine/${drug.imageURL}`;
    await DrugModel.create(drug);
  }
  console.log("Drug seed is Done!");
}
