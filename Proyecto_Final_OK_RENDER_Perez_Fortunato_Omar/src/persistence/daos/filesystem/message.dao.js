import fs from "fs";

export default class MessageDaoFS {
    constructor(path) {
        this.path = path;
    }

    async #getMaxId() {
        let maxId = 0;
        const messages = await this.getAll();
        messages.map((messag) => {
            if (messag.id > maxId) maxId = messag.id;
        });
        return maxId;
    }

    async getAll() {
        try {
            if (fs.existsSync(this.path)) {
                const messages = await fs.promises.readFile(this.path, "utf-8");
                const messagesJSON = JSON.parse(messages);
                return messagesJSON;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const messages = await this.getAll();
            const message = messages.find((x) => x.id === parseInt(id));
            if (message) {
                return message;
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const message = {
                id: (await this.#getMaxId()) + 1,
                ...obj,
            };
            const messagesFile = await this.getAll();
            messagesFile.push(message);
            await fs.promises.writeFile(this.path, JSON.stringify(messagesFile));
            return message;
        } catch (error) {
            console.log(error);
        }
    }

    async update(obj, id) {
        try {
            const messagesFile = await this.getAll();
            const index = messagesFile.findIndex((x) => x.id === id);
            if (index === -1) {
                throw new Error(`Id ${id} not found`);
            } else {
                messagesFile[index] = { ...obj, id };
            }
            await fs.promises.writeFile(this.path, JSON.stringify(messagesFile));
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const messagesFile = await this.getAll();
            if (messagesFile.length > 0) {
                const newArray = messagesFile.filter((x) => x.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            } else {
                throw new Error(`Message id: ${id} not found`);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
