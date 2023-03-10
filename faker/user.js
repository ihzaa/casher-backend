import user from "../models/User.js";
import { faker } from "@faker-js/faker";

const run = async () => {
    let newUser = new user({
        full_name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    });

    newUser = await newUser.save();
    if (newUser) {
        console.log(newUser);
    } else {
        console.log('fail');
    }
}

export {run};