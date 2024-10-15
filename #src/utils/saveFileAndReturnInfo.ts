import { UploadedFile } from "express-fileupload";
import * as fs from "async-file";
import { generateChar } from "./generateChar";
import { wrap } from "./wrap";
import File from "../models/File";
import path from "path";


// TODO переделать метод заменив dbQuery на wrap + sequelize

export async function saveFileAndReturnInfo(
    file: UploadedFile,
): Promise<[File, null] | [null, any]> {
    // Ваша логика обработки каждого файла
    const type = file.name.split(".")[file.name.split(".").length - 1];
    const genName = generateChar(35) + "." + type;
    const filePath = path.join(global.uploadDir, genName)

    console.log(`Путь: ${filePath}`);

    if (! await fs.exists(global.uploadDir)){
        await fs.mkdir(global.uploadDir);
    }    

    try {
        await fs.writeFile(filePath, file.data);

    } catch (e) {
        console.log('Ошибка\n', e);
        
    }

    const [result, err] = await wrap(
        File.create({name: file.name, url: genName }, {returning: true})
    )

    if (result === null) return [null, err]

    return [result, null];
}
