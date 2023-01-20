import { WebComponentParser } from "./webComponentParser.mjs";


/**
 * ParserFactory
 * creates parsers for different project types.
 */
export class ParserFactory {

    /**
     * Creates a WebComponentParser
     * @return {WebComponentParser}
     */
    static createWebComponentsParser() {
        return new WebComponentParser()
    }
}