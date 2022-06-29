const acorn = require('acorn');
const Parser = acorn.Parser;
const TokenType = acorn.TokenType;

// 注册一个新的 token 类型来标识它
Parser.acorn.keywordTypes["guang"] = new TokenType("guang",{ keyword: "guang" });

// 编写关键字插件
var guangKeyword = function(Parser) {
    return class extends Parser {
        // 入口
        parse(program) {
            var newKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this const class extends export import super";
            newKeywords += " guang"; // 增加一个关键字
            this.keywords = new RegExp("^(?:" + newKeywords.replace(/ /g, '|') + ")$");
            
            return (super.parse(program));
        }
        // acorn 是基于递归下降的思路实现的，也就是 parse 到不同类型的节点会调用不同的 parseXxx 方法，这样递归的解析
        parseStatement(context, topLevel, exports) {
            var tokenType = this.type;
            if (tokenType == Parser.acorn.keywordTypes["guang"]) {
                var node = this.startNode(); // 创建 AST 节点是用 this.startNode()，
                return this.parseGuangStatement(node);
            } else { // 如果不是我们扩展的 token，则调用父类的 parseStatement 处理
                return(super.parseStatement(context, topLevel, exports));
            }
        }

        parseGuangStatement(node) {
            // 返回用 guang 这个 token 来创建的 AST 节点
            this.next();
            return this.finishNode({ value: 'guang' }, 'GuangStatement');
        }
        // 模拟 babel 扩展 NumericLiteral 和 StringLiteral
        parseLiteral(...args) {
            const node = super.parseLiteral(...args);
            switch(typeof node.value) {
                case 'number':
                    node.type = 'NumericLiteral';
                    break;
                case 'string':
                    node.type = 'StringLiteral';
                    break;
            }
            return node;
        }
    }
}

// 使用插件
const newParser = Parser.extend(guangKeyword);

var program = 
`
guang
const a = 1
`;

const ast = newParser.parse(program);
console.log(ast);

