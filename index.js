const fs = require("fs");
const jsYaml = require('js-yaml');

const {
    texture_File,
    lang_File,
    font_File,
    plugin_File,
    Start,
    twemoji_directory
} = require("./Config.json");


const twemoji_files = fs.readdirSync(twemoji_directory);

// Unicode 私用領域 (57344 から 63743)
const file = require("./util/file");
const code = require("./util/code");


//リソースパック ディレクトリ作成
file.mkdir(texture_File);
file.mkdir(lang_File);
file.mkdir(font_File);
file.mkdir(plugin_File);

const emojis = require("./util/emojis_data.json");


const font = [];
const lang = {};
const plugin = [];

let TextCode = Start;

let count = 0;


const keys = Object.keys(emojis);
for (let loop1 = 0; loop1 < keys.length; loop1++) {

    const key = keys[loop1];

    const name = code.HTML.encode(emojis[key]);


    if (twemoji_files.some(file => file == `${name}.png`)) {

        const unicode = `\\u${TextCode.toString(16)}`;


        console.log(`${emojis[key]}   ${key}   ${name}   ${unicode}`);


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
        plugin.push(key);

        count++;
        fs.copyFileSync(`${twemoji_directory}/${name}.png`, `${texture_File}/${name}.png`);
    }

}

const lang_Json = code.JSON.stringify(lang);
const font_Json = code.JSON.stringify({ providers: font });
const plugin_Yaml = jsYaml.dump({ emojis: plugin });


console.log(count);

//-----en_us.json-----//
file.writeFile(`${lang_File}/en_us.json`, lang_Json);

//-----default.json-----//
file.writeFile(`${font_File}/default.json`, font_Json);

//-----config.yml-----//
file.writeFile(`${plugin_File}/config.yml`, plugin_Yaml);