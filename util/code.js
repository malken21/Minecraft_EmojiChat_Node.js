exports.HTML = { encode };

function encode(text) {
    let result = [];
    for (let loop = 0; loop < text.length; loop++) {
        let codePoint = text.codePointAt(loop);
        if (codePoint < 0xd800 || 0xdfff < codePoint) {
            result.push(codePoint.toString(16));
        }
    }
    return result.join("-");
}


exports.JSON = { stringify };

function stringify(text) {
    return JSON.stringify(
        text
        ,
        null,
        "\t"
    ).replace(/\\\\u/g, "\\u");
}