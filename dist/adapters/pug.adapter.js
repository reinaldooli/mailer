"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PugAdapter = void 0;
const path = require("path");
const lodash_1 = require("lodash");
const pug_1 = require("pug");
const inlineCss = require("inline-css");
class PugAdapter {
    compile(mail, callback, mailerOptions) {
        const templateExt = path.extname(mail.data.template) || '.pug';
        const templateName = path.basename(mail.data.template, path.extname(mail.data.template));
        const templateDir = path.dirname(mail.data.template) !== '.'
            ? path.dirname(mail.data.template)
            : lodash_1.get(mailerOptions, 'template.dir', '');
        const templatePath = path.join(templateDir, templateName + templateExt);
        const options = Object.assign(Object.assign({}, mail.data.context), lodash_1.get(mailerOptions, 'template.options', {}));
        pug_1.renderFile(templatePath, options, (err, body) => {
            if (err) {
                return callback(err);
            }
            inlineCss(body, { url: ' ' }).then((html) => {
                mail.data.html = html;
                return callback();
            });
        });
    }
}
exports.PugAdapter = PugAdapter;
