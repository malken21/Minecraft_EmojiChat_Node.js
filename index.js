const Config = require("./Config.json");
const fs = require("fs");

const twemoji_directory = "./twemoji-master/assets/72x72";

const twemoji_files = fs.readdirSync(twemoji_directory);

// Unicode 私用領域 (57344 から 63743)
const directory = require("./directory");



const texture_File = "./ResourcePack/assets/minecraft/textures/font/emoji";
const lang_File = "./ResourcePack/assets/minecraft/lang";
const font_File = "./ResourcePack/assets/minecraft/font";



//リソースパック ディレクトリ作成
directory.create(texture_File);
directory.create(lang_File);
directory.create(font_File);



const code = require("./code");

let test = [];
/*for (let loop = 0; loop < twemoji_files.length; loop++) {
    console.log(code.HTML.encode(twemoji_files[loop]))
}*/

const discord_emoji = require("discord-emoji");

const emoji_type = Object.keys(discord_emoji);


const font = [];
const lang = {};



let TextCode = Config.Start;

let count = 0;
for (let loop1 = 0; loop1 < emoji_type.length; loop1++) {

    const type = emoji_type[loop1];

    const item = discord_emoji[type];
    const item_keys = Object.keys(item);

    for (let loop2 = 0; loop2 < item_keys.length; loop2++) {

        const key = item_keys[loop2];
        const emoji = item[key];
        const name = code.HTML.encode(emoji);


        if (twemoji_files.some(file => file == `${name}.png`)) {
            console.log(name + emoji + key);

            const unicode = `\\u${TextCode.toString(16)}`;

            console.log(unicode)

            lang[`:${key}:`] = unicode;
            TextCode++;



            const font_data = {
                type: "bitmap",
                file: `minecraft:font/emoji/${name}.png`,
                ascent: 8,
                height: 9,
                chars: [
                    unicode
                ]
            }

            font.push(font_data);

            count++;
            fs.copyFileSync(`${twemoji_directory}/${name}.png`, `${texture_File}/${name}.png`);
        }
    }
}




const lang_Json = code.JSON.stringify(lang);

const font_Json = code.JSON.stringify({ providers: font });



console.log(lang_Json)
console.log(font_Json)
console.log(count)

fs.writeFile(`${lang_File}/en_us.json`, lang_Json, function (err) {
    if (!err) {
        console.log(`${lang_File}/en_us.json`)
    } else {
        console.log(err);
    }
});

fs.writeFile(`${font_File}/default.json`, font_Json, function (err) {
    if (!err) {
        console.log(`${font_File}/default.json`)
    } else {
        console.log(err);
    }
});


/*
for (let loop = 0; loop < twemoji_files.length; loop++) {
    console.log(twemoji_files[loop]);
    fs.copyFileSync(twemoji_directory + twemoji_files[loop], `${texture_File}/${}.png`);
}*/