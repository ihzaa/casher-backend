import user from "../models/User.js";
import { faker } from "@faker-js/faker";

const run = async () => {
    try {
        var data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                full_name: faker.name.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
            });
        }

        const fakeData = await user.insertMany(data);
        console.log("BERHASIL");

    } catch (e) {
        console.log(e);
    }

}

export { run };