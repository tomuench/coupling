import { Component } from "../models/component.mjs";
import { TokenReader } from "./tokenReader.mjs";

export class WebComponentParser {
  /**
   * Default-Contructor
   * initializes attributes with default values
   */
  constructor() {
    this._tokenReader = new TokenReader();
    this._analyzedComponents = [];
  }

  /**
   * Getter for analyzedComponents
   * After a project is parsed, the analyzedComponents attribute gets
   * populated
   * @return {Array<Component>}
   */
  get analyzedComponents() {
    return this._analyzedComponents;
  }

  /**
   * Parse a whole project.
   * Iterates over the third party project and is loading all files.
   * Internal adds found component to the attribute `analyzedComponents`.
   *
   * @param {string} entryFilePath - First index for the third party project
   */
  parseProject(entryFilePath) {
    this._tokenReader.readFile(entryFilePath);

    this._analyzedComponents = this._tokenReader.foundClasses.map(
      (className) => new Component("", className)
    );
  }
}
