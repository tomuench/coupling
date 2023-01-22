import Tokenizr from "tokenizr";
import fs from "fs";

const IMPORT_TYPE = "from";
const FILE_FORMAT = "utf8";


export class ProjectReader {

    /**
     * Default-Constructor
     * needs a root file to index all relevant projecct files
     * @param {string} rootFile
     */
    constructor(rootFile) {
        this._rootFile = rootFile;
        this._files = {};
        this._lexer = new Tokenizr();
        this._configureRules();
    }

    /**
     * @private
     * Configures the Tokenizr to read 
     * all imports from the rootFile and
     * go through all referenced files recursiv
     */
    _configureRules() {
        this._lexer.rule(/export.*from ["'](.*)["']/, (ctx, match) => {
            ctx.accept(IMPORT_TYPE, match[1]);
        });

        this._lexer.rule(/import.*from ["'](.*)["']/, (ctx, match) => {
            ctx.accept(IMPORT_TYPE, match[1]);
        });

        this._lexer.rule(/[ \t\r\n]+/, (ctx, match) => {
            ctx.ignore();
        });
        this._lexer.rule(/./, (ctx, match) => {
            ctx.ignore();
        });
    }

    /**
     * Returns all found files. If there is no file, it returns
     * an empty array
     * @return {Array<string>}
     */
    get files() {
        return Object.keys(this._files);
    }

    /**
     * Index all relevant project files
     */
    loadProjectFiles() {
        this._importProcess(this._rootFile)
    }


    /**
     * @private
     * Iterate through all found files recursive.
     * Builds an internal List called _files, which contains
     * every found file just once
     * @param {string} file 
     */
    _importProcess(file) {
        this._files[file] = true;

        let fileToImport = fs.readFileSync(file, FILE_FORMAT);

        this._lexer.input(fileToImport);

        // TODO Remove File extension and relative path
        let importedFiles = this._lexer.tokens()
            .filter((token) => token.type === IMPORT_TYPE)
            .map((token) => "example/" + token.value + ".ts");

        importedFiles.forEach((subFile) => {
            this._importProcess(subFile)
        });
    }
}