module.exports = function(babel) {
    var t = babel.types;
    function moriMethod(name) {
        var expr = t.memberExpression(
            t.identifier('mori'),
            t.identifier(name)
        );
      
      expr.isClean = true;
      return expr;
    }
    return {
        visitor: {
            ArrayExpression: function(path) {
                path.replaceWith(
                    t.callExpression (
                        t.memberExpression(t.identifier('mori'), t.identifier('vector')),
                        path.node.elements
                    )
                )
            },
            ObjectExpression: function(path) {
                var props = [];
                path.node.properties.forEach(function(prop) {
                    props.push(
                      t.stringLiteral(prop.key.name),
                      prop.value
                	);
                });
              
                path.replaceWith(
                	t.callExpression(
                        t.memberExpression(t.identifier('mori'), t.identifier('hashMap')),
                        props
                    )
                );
            },
            AssignmentExpression: function(path) {
                var lhs = path.node.left;
                var rhs = path.node.right;
                if (t.isMemberExpression(lhs)) {
                    lhs.property = t.stringLiteral(lhs.property.name);
                }
              
             	path.replaceWith(
					t.callExpression(
                        t.memberExpression(t.identifier('mori'), t.identifier('assoc')),
                        [lhs.object, lhs.property, rhs]
                    )
                )
            },
            MemberExpression: function(path) {
                if (path.node.isClean) return;
                if(t.isAssignmentExpression(path.parent)) return;

                if(t.isIdentifier(path.node.property)) {
                    path.node.property = t.stringLiteral(path.node.property.name);
                }

                path.replaceWith(
                    t.callExpression(
                        moriMethod('get'),
                        [path.node.object, path.node.property]
                    )
                );
            }
        }
    }
}