import fs from "fs";
import Tokenizr from "tokenizr";

const FILE_FORMAT = "utf8";
const TAG_REGISTER_TYPE = "register";
export const CLASS_TOKEN_TYPE = "class";

/**
 * TokenReader
 * Reading a project into tokens to determine which
 * components are used.
 */
export class TokenReader {
  constructor() {
    this.lexer = new Tokenizr();
    this._configureRules();
  }

  /**
   * Returning all found classes as an array
   * @return {Array<string>}
   */
  get foundClasses() {
    return this._tokens
      .filter((token) => token.type === CLASS_TOKEN_TYPE)
      .map((token) => token.value);
  }

  /**
   * Getting a tag for a found className
   * @param {string} className 
   * @return {string}
   */
  getFoundTagForClass(className) {
    return this._tokens
      .filter((token) => token.type === TAG_REGISTER_TYPE)
      .filter((token) => token.value && token.value.className === className)
      .map((token) => token.value.tag)[0];
  }

  /**
   * Method to configure different rules for component recognition
   * extracts
   * - imports
   * - class definitions
   * - registration at customElements
   * - type definition
   * - initalization of new types
   *
   * @private
   *
   */
  _configureRules() {
    this.lexer.rule(/class ([A-Z][A-Za-z0-9]*)/, (ctx, match) => {
      ctx.accept(CLASS_TOKEN_TYPE, match[1]);
    });
    this.lexer.rule(/export.*from '(.*)'/, (ctx, match) => {
      ctx.accept("from", match[1]);
    });

    this.lexer.rule(/import.*from '(.*)'/, (ctx, match) => {
      ctx.accept("from", match[1]);
    });

    this.lexer.rule(/customElements\.define\(["']([A-Za-z\-]+)["']\,[ ]*([A-Z][A-Za-z0-9]*)\)/, (ctx, match) => {
      ctx.accept(TAG_REGISTER_TYPE, { tag: match[1], className: match[2] });
    });

    this.lexer.rule(/[ \t\r\n]+/, (ctx, match) => {
      ctx.ignore();
    });
    this.lexer.rule(/./, (ctx, match) => {
      ctx.ignore();
    });
  }

  /**
   * Adding a specific Rule
   * @param {RegExp} regex
   * @param {Function} method
   */
  addRule(regex, method) {
    this.lexer.rule(regex, method);
  }

  readFile(file) {
    this._tokens = [];
    let fileToImport = fs.readFileSync(file, FILE_FORMAT);

    this.lexer.input(fileToImport);

    this.lexer.tokens().forEach((token) => {
      if (token.value.toString().length > 0) {
        let file = fs.readFileSync("example/" + token.value + ".ts", "utf8");
        this.lexer.input(file);

        this.lexer.tokens().forEach((token) => {
          this._tokens.push(token);
          console.log(token.toString());
        });
      }
    });
  }
}
