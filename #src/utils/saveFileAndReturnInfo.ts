import { UploadedFile } from "express-fileupload";
import * as fs from "async-file";
import { generateChar } from "./generateChar";

import { dbQuery } from "../models/dbModel";

export async function saveFileAndReturnInfo(
    file: UploadedFile,
): Promise<[{ url: string; name: string }, null] | [null, any]> {
    // Ваша логика обработки каждого файла
    const type = file.name.split(".")[file.name.split(".").length - 1];
    const genName = generateChar(35) + "." + type;
    const filePath = global.uploadDir + "/" + genName;
    await fs.writeFile(filePath, file.data);

    let timestamp = new Date().getTime();

    const [result, err] = await dbQuery(
        `/* SQL */ INSERT INTO files (name, url, timestamp) VALUES ($1, $2, $3) RETURNING *`,
        [file.name, genName, timestamp]
    );

    if (result === null) return [null, err]

    return [result.rows[0], null];
}
