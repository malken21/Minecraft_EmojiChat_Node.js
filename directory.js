const fs = require("fs");

exports.create = (directory_String) => {

    const directory_Array = directory_String.split("/").slice(1);


    for (let loop1 = 0; loop1 < directory_Array.length; loop1++) {

        let directory = ".";

        for (let loop2 = 0; loop2 <= loop1; loop2++) {
            directory += `/${directory_Array[loop2]}`;
        }
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
            console.log(`CreateDirectory: ${directory}`)
        }
    }
}