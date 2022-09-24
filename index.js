const Config = require("./Config.json");
const fs = require("fs");
const jsYaml = require('js-yaml');

const twemoji_directory = "./twemoji-master/assets/72x72";

const twemoji_files = fs.readdirSync(twemoji_directory);

// Unicode 私用領域 (57344 から 63743)
const file = require("./file");


const texture_File = "./ResourcePack/assets/minecraft/textures/font/emoji";
const lang_File = "./ResourcePack/assets/minecraft/lang";
const font_File = "./ResourcePack/assets/minecraft/font";
const plugin_File = "./plugin";


//リソースパック ディレクトリ作成
file.mkdir(texture_File);
file.mkdir(lang_File);
file.mkdir(font_File);
file.mkdir(plugin_File);


const code = require("./code");

const discord_emoji = require("discord-emoji");

const emoji_type = Object.keys(discord_emoji);


const font = [];
const lang = {};
const plugin = [];

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
            plugin.push(`:${key}:`);

            count++;
            fs.copyFileSync(`${twemoji_directory}/${name}.png`, `${texture_File}/${name}.png`);
        }
    }
}

const lang_Json = code.JSON.stringify(lang);

const font_Json = code.JSON.stringify({ providers: font });

const plugin_Yaml = jsYaml.dump({ emojis: plugin });

console.log(lang_Json);
console.log(font_Json);
console.log(count);

//-----en_us.json-----//
file.writeFile(`${lang_File}/en_us.json`,lang_Json);

//-----default.json-----//
file.writeFile(`${font_File}/default.json`,font_Json);

//-----config.yml-----//
file.writeFile(`${plugin_File}/config.yml`,plugin_Yaml);