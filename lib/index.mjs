import fs from "fs";
import Tokenizr from "tokenizr";


let lexer = new Tokenizr();

lexer.rule(/class ([A-Z][A-Za-z0-9]*)/, (ctx, match) => {
  ctx.accept("class", match[1]);
});
lexer.rule(/export.*from '(.*)'/, (ctx, match) => {
  ctx.accept("from", match[1]);
});

lexer.rule(/import.*from '(.*)'/, (ctx, match) => {
  ctx.accept("from", match[1]);
});
lexer.rule(/[ \t\r\n]+/, (ctx, match) => {
  ctx.ignore();
});
lexer.rule(/./, (ctx, match) => {
  ctx.ignore();
});

let cfg = fs.readFileSync("example/index.ts", "utf8");

lexer.input(cfg);
lexer.tokens().forEach((token) => {
  if (token.value.toString().length > 0) {
    let file = fs.readFileSync("example/" + token.value + ".ts", "utf8");
    lexer.input(file);

    lexer.tokens().forEach((token) => {
      console.log(token.toString());
    });
  }
});
