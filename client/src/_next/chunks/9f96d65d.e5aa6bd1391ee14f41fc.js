(window.webpackJsonp = window.webpackJsonp || []).push([[4], {
    "+U4B": function(e, t, i) {
        var s;
        s = function() {
            return function(e) {
                var t = {};
                function i(s) {
                    if (t[s])
                        return t[s].exports;
                    var r = t[s] = {
                        exports: {},
                        id: s,
                        loaded: !1
                    };
                    return e[s].call(r.exports, r, r.exports, i),
                    r.loaded = !0,
                    r.exports
                }
                return i.m = e,
                i.c = t,
                i.p = "",
                i(0)
            }([function(e, t, i) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var s = i(1)
                  , r = i(3)
                  , n = i(8)
                  , a = i(15);
                function o(e, t, i) {
                    var a = null
                      , o = function(e, t) {
                        i && i(e, t),
                        a && a.visit(e, t)
                    }
                      , u = "function" === typeof i ? o : null
                      , h = !1;
                    if (t) {
                        h = "boolean" === typeof t.comment && t.comment;
                        var c = "boolean" === typeof t.attachComment && t.attachComment;
                        (h || c) && ((a = new s.CommentHandler).attach = c,
                        t.comment = !0,
                        u = o)
                    }
                    var l, p = !1;
                    t && "string" === typeof t.sourceType && (p = "module" === t.sourceType),
                    l = t && "boolean" === typeof t.jsx && t.jsx ? new r.JSXParser(e,t,u) : new n.Parser(e,t,u);
                    var d = p ? l.parseModule() : l.parseScript();
                    return h && a && (d.comments = a.comments),
                    l.config.tokens && (d.tokens = l.tokens),
                    l.config.tolerant && (d.errors = l.errorHandler.errors),
                    d
                }
                t.parse = o,
                t.parseModule = function(e, t, i) {
                    var s = t || {};
                    return s.sourceType = "module",
                    o(e, s, i)
                }
                ,
                t.parseScript = function(e, t, i) {
                    var s = t || {};
                    return s.sourceType = "script",
                    o(e, s, i)
                }
                ,
                t.tokenize = function(e, t, i) {
                    var s, r = new a.Tokenizer(e,t);
                    s = [];
                    try {
                        for (; ; ) {
                            var n = r.getNextToken();
                            if (!n)
                                break;
                            i && (n = i(n)),
                            s.push(n)
                        }
                    } catch (o) {
                        r.errorHandler.tolerate(o)
                    }
                    return r.errorHandler.tolerant && (s.errors = r.errors()),
                    s
                }
                ;
                var u = i(2);
                t.Syntax = u.Syntax,
                t.version = "4.0.1"
            }
            , function(e, t, i) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var s = i(2)
                  , r = function() {
                    function e() {
                        this.attach = !1,
                        this.comments = [],
                        this.stack = [],
                        this.leading = [],
                        this.trailing = []
                    }
                    return e.prototype.insertInnerComments = function(e, t) {
                        if (e.type === s.Syntax.BlockStatement && 0 === e.body.length) {
                            for (var i = [], r = this.leading.length - 1; r >= 0; --r) {
                                var n = this.leading[r];
                                t.end.offset >= n.start && (i.unshift(n.comment),
                                this.leading.splice(r, 1),
                                this.trailing.splice(r, 1))
                            }
                            i.length && (e.innerComments = i)
                        }
                    }
                    ,
                    e.prototype.findTrailingComments = function(e) {
                        var t = [];
                        if (this.trailing.length > 0) {
                            for (var i = this.trailing.length - 1; i >= 0; --i) {
                                var s = this.trailing[i];
                                s.start >= e.end.offset && t.unshift(s.comment)
                            }
                            return this.trailing.length = 0,
                            t
                        }
                        var r = this.stack[this.stack.length - 1];
                        if (r && r.node.trailingComments) {
                            var n = r.node.trailingComments[0];
                            n && n.range[0] >= e.end.offset && (t = r.node.trailingComments,
                            delete r.node.trailingComments)
                        }
                        return t
                    }
                    ,
                    e.prototype.findLeadingComments = function(e) {
                        for (var t, i = []; this.stack.length > 0 && ((n = this.stack[this.stack.length - 1]) && n.start >= e.start.offset); )
                            t = n.node,
                            this.stack.pop();
                        if (t) {
                            for (var s = (t.leadingComments ? t.leadingComments.length : 0) - 1; s >= 0; --s) {
                                var r = t.leadingComments[s];
                                r.range[1] <= e.start.offset && (i.unshift(r),
                                t.leadingComments.splice(s, 1))
                            }
                            return t.leadingComments && 0 === t.leadingComments.length && delete t.leadingComments,
                            i
                        }
                        for (s = this.leading.length - 1; s >= 0; --s) {
                            var n;
                            (n = this.leading[s]).start <= e.start.offset && (i.unshift(n.comment),
                            this.leading.splice(s, 1))
                        }
                        return i
                    }
                    ,
                    e.prototype.visitNode = function(e, t) {
                        if (!(e.type === s.Syntax.Program && e.body.length > 0)) {
                            this.insertInnerComments(e, t);
                            var i = this.findTrailingComments(t)
                              , r = this.findLeadingComments(t);
                            r.length > 0 && (e.leadingComments = r),
                            i.length > 0 && (e.trailingComments = i),
                            this.stack.push({
                                node: e,
                                start: t.start.offset
                            })
                        }
                    }
                    ,
                    e.prototype.visitComment = function(e, t) {
                        var i = "L" === e.type[0] ? "Line" : "Block"
                          , s = {
                            type: i,
                            value: e.value
                        };
                        if (e.range && (s.range = e.range),
                        e.loc && (s.loc = e.loc),
                        this.comments.push(s),
                        this.attach) {
                            var r = {
                                comment: {
                                    type: i,
                                    value: e.value,
                                    range: [t.start.offset, t.end.offset]
                                },
                                start: t.start.offset
                            };
                            e.loc && (r.comment.loc = e.loc),
                            e.type = i,
                            this.leading.push(r),
                            this.trailing.push(r)
                        }
                    }
                    ,
                    e.prototype.visit = function(e, t) {
                        "LineComment" === e.type ? this.visitComment(e, t) : "BlockComment" === e.type ? this.visitComment(e, t) : this.attach && this.visitNode(e, t)
                    }
                    ,
                    e
                }();
                t.CommentHandler = r
            }
            , function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.Syntax = {
                    AssignmentExpression: "AssignmentExpression",
                    AssignmentPattern: "AssignmentPattern",
                    ArrayExpression: "ArrayExpression",
                    ArrayPattern: "ArrayPattern",
                    ArrowFunctionExpression: "ArrowFunctionExpression",
                    AwaitExpression: "AwaitExpression",
                    BlockStatement: "BlockStatement",
                    BinaryExpression: "BinaryExpression",
                    BreakStatement: "BreakStatement",
                    CallExpression: "CallExpression",
                    CatchClause: "CatchClause",
                    ClassBody: "ClassBody",
                    ClassDeclaration: "ClassDeclaration",
                    ClassExpression: "ClassExpression",
                    ConditionalExpression: "ConditionalExpression",
                    ContinueStatement: "ContinueStatement",
                    DoWhileStatement: "DoWhileStatement",
                    DebuggerStatement: "DebuggerStatement",
                    EmptyStatement: "EmptyStatement",
                    ExportAllDeclaration: "ExportAllDeclaration",
                    ExportDefaultDeclaration: "ExportDefaultDeclaration",
                    ExportNamedDeclaration: "ExportNamedDeclaration",
                    ExportSpecifier: "ExportSpecifier",
                    ExpressionStatement: "ExpressionStatement",
                    ForStatement: "ForStatement",
                    ForOfStatement: "ForOfStatement",
                    ForInStatement: "ForInStatement",
                    FunctionDeclaration: "FunctionDeclaration",
                    FunctionExpression: "FunctionExpression",
                    Identifier: "Identifier",
                    IfStatement: "IfStatement",
                    ImportDeclaration: "ImportDeclaration",
                    ImportDefaultSpecifier: "ImportDefaultSpecifier",
                    ImportNamespaceSpecifier: "ImportNamespaceSpecifier",
                    ImportSpecifier: "ImportSpecifier",
                    Literal: "Literal",
                    LabeledStatement: "LabeledStatement",
                    LogicalExpression: "LogicalExpression",
                    MemberExpression: "MemberExpression",
                    MetaProperty: "MetaProperty",
                    MethodDefinition: "MethodDefinition",
                    NewExpression: "NewExpression",
                    ObjectExpression: "ObjectExpression",
                    ObjectPattern: "ObjectPattern",
                    Program: "Program",
                    Property: "Property",
                    RestElement: "RestElement",
                    ReturnStatement: "ReturnStatement",
                    SequenceExpression: "SequenceExpression",
                    SpreadElement: "SpreadElement",
                    Super: "Super",
                    SwitchCase: "SwitchCase",
                    SwitchStatement: "SwitchStatement",
                    TaggedTemplateExpression: "TaggedTemplateExpression",
                    TemplateElement: "TemplateElement",
                    TemplateLiteral: "TemplateLiteral",
                    ThisExpression: "ThisExpression",
                    ThrowStatement: "ThrowStatement",
                    TryStatement: "TryStatement",
                    UnaryExpression: "UnaryExpression",
                    UpdateExpression: "UpdateExpression",
                    VariableDeclaration: "VariableDeclaration",
                    VariableDeclarator: "VariableDeclarator",
                    WhileStatement: "WhileStatement",
                    WithStatement: "WithStatement",
                    YieldExpression: "YieldExpression"
                }
            }
            , function(e, t, i) {
                "use strict";
                var s = this && this.__extends || function() {
                    var e = Object.setPrototypeOf || {
                        __proto__: []
                    }instanceof Array && function(e, t) {
                        e.__proto__ = t
                    }
                    || function(e, t) {
                        for (var i in t)
                            t.hasOwnProperty(i) && (e[i] = t[i])
                    }
                    ;
                    return function(t, i) {
                        function s() {
                            this.constructor = t
                        }
                        e(t, i),
                        t.prototype = null === i ? Object.create(i) : (s.prototype = i.prototype,
                        new s)
                    }
                }();
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var r = i(4)
                  , n = i(5)
                  , a = i(6)
                  , o = i(7)
                  , u = i(8)
                  , h = i(13)
                  , c = i(14);
                function l(e) {
                    var t;
                    switch (e.type) {
                    case a.JSXSyntax.JSXIdentifier:
                        t = e.name;
                        break;
                    case a.JSXSyntax.JSXNamespacedName:
                        var i = e;
                        t = l(i.namespace) + ":" + l(i.name);
                        break;
                    case a.JSXSyntax.JSXMemberExpression:
                        var s = e;
                        t = l(s.object) + "." + l(s.property)
                    }
                    return t
                }
                h.TokenName[100] = "JSXIdentifier",
                h.TokenName[101] = "JSXText";
                var p = function(e) {
                    function t(t, i, s) {
                        return e.call(this, t, i, s) || this
                    }
                    return s(t, e),
                    t.prototype.parsePrimaryExpression = function() {
                        return this.match("<") ? this.parseJSXRoot() : e.prototype.parsePrimaryExpression.call(this)
                    }
                    ,
                    t.prototype.startJSX = function() {
                        this.scanner.index = this.startMarker.index,
                        this.scanner.lineNumber = this.startMarker.line,
                        this.scanner.lineStart = this.startMarker.index - this.startMarker.column
                    }
                    ,
                    t.prototype.finishJSX = function() {
                        this.nextToken()
                    }
                    ,
                    t.prototype.reenterJSX = function() {
                        this.startJSX(),
                        this.expectJSX("}"),
                        this.config.tokens && this.tokens.pop()
                    }
                    ,
                    t.prototype.createJSXNode = function() {
                        return this.collectComments(),
                        {
                            index: this.scanner.index,
                            line: this.scanner.lineNumber,
                            column: this.scanner.index - this.scanner.lineStart
                        }
                    }
                    ,
                    t.prototype.createJSXChildNode = function() {
                        return {
                            index: this.scanner.index,
                            line: this.scanner.lineNumber,
                            column: this.scanner.index - this.scanner.lineStart
                        }
                    }
                    ,
                    t.prototype.scanXHTMLEntity = function(e) {
                        for (var t = "&", i = !0, s = !1, n = !1, a = !1; !this.scanner.eof() && i && !s; ) {
                            var o = this.scanner.source[this.scanner.index];
                            if (o === e)
                                break;
                            if (s = ";" === o,
                            t += o,
                            ++this.scanner.index,
                            !s)
                                switch (t.length) {
                                case 2:
                                    n = "#" === o;
                                    break;
                                case 3:
                                    n && (i = (a = "x" === o) || r.Character.isDecimalDigit(o.charCodeAt(0)),
                                    n = n && !a);
                                    break;
                                default:
                                    i = (i = i && !(n && !r.Character.isDecimalDigit(o.charCodeAt(0)))) && !(a && !r.Character.isHexDigit(o.charCodeAt(0)))
                                }
                        }
                        if (i && s && t.length > 2) {
                            var u = t.substr(1, t.length - 2);
                            n && u.length > 1 ? t = String.fromCharCode(parseInt(u.substr(1), 10)) : a && u.length > 2 ? t = String.fromCharCode(parseInt("0" + u.substr(1), 16)) : n || a || !c.XHTMLEntities[u] || (t = c.XHTMLEntities[u])
                        }
                        return t
                    }
                    ,
                    t.prototype.lexJSX = function() {
                        var e = this.scanner.source.charCodeAt(this.scanner.index);
                        if (60 === e || 62 === e || 47 === e || 58 === e || 61 === e || 123 === e || 125 === e)
                            return {
                                type: 7,
                                value: o = this.scanner.source[this.scanner.index++],
                                lineNumber: this.scanner.lineNumber,
                                lineStart: this.scanner.lineStart,
                                start: this.scanner.index - 1,
                                end: this.scanner.index
                            };
                        if (34 === e || 39 === e) {
                            for (var t = this.scanner.index, i = this.scanner.source[this.scanner.index++], s = ""; !this.scanner.eof() && (u = this.scanner.source[this.scanner.index++]) !== i; )
                                s += "&" === u ? this.scanXHTMLEntity(i) : u;
                            return {
                                type: 8,
                                value: s,
                                lineNumber: this.scanner.lineNumber,
                                lineStart: this.scanner.lineStart,
                                start: t,
                                end: this.scanner.index
                            }
                        }
                        if (46 === e) {
                            var n = this.scanner.source.charCodeAt(this.scanner.index + 1)
                              , a = this.scanner.source.charCodeAt(this.scanner.index + 2)
                              , o = 46 === n && 46 === a ? "..." : ".";
                            return t = this.scanner.index,
                            this.scanner.index += o.length,
                            {
                                type: 7,
                                value: o,
                                lineNumber: this.scanner.lineNumber,
                                lineStart: this.scanner.lineStart,
                                start: t,
                                end: this.scanner.index
                            }
                        }
                        if (96 === e)
                            return {
                                type: 10,
                                value: "",
                                lineNumber: this.scanner.lineNumber,
                                lineStart: this.scanner.lineStart,
                                start: this.scanner.index,
                                end: this.scanner.index
                            };
                        if (r.Character.isIdentifierStart(e) && 92 !== e) {
                            for (t = this.scanner.index,
                            ++this.scanner.index; !this.scanner.eof(); ) {
                                var u = this.scanner.source.charCodeAt(this.scanner.index);
                                if (r.Character.isIdentifierPart(u) && 92 !== u)
                                    ++this.scanner.index;
                                else {
                                    if (45 !== u)
                                        break;
                                    ++this.scanner.index
                                }
                            }
                            return {
                                type: 100,
                                value: this.scanner.source.slice(t, this.scanner.index),
                                lineNumber: this.scanner.lineNumber,
                                lineStart: this.scanner.lineStart,
                                start: t,
                                end: this.scanner.index
                            }
                        }
                        return this.scanner.lex()
                    }
                    ,
                    t.prototype.nextJSXToken = function() {
                        this.collectComments(),
                        this.startMarker.index = this.scanner.index,
                        this.startMarker.line = this.scanner.lineNumber,
                        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
                        var e = this.lexJSX();
                        return this.lastMarker.index = this.scanner.index,
                        this.lastMarker.line = this.scanner.lineNumber,
                        this.lastMarker.column = this.scanner.index - this.scanner.lineStart,
                        this.config.tokens && this.tokens.push(this.convertToken(e)),
                        e
                    }
                    ,
                    t.prototype.nextJSXText = function() {
                        this.startMarker.index = this.scanner.index,
                        this.startMarker.line = this.scanner.lineNumber,
                        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
                        for (var e = this.scanner.index, t = ""; !this.scanner.eof(); ) {
                            var i = this.scanner.source[this.scanner.index];
                            if ("{" === i || "<" === i)
                                break;
                            ++this.scanner.index,
                            t += i,
                            r.Character.isLineTerminator(i.charCodeAt(0)) && (++this.scanner.lineNumber,
                            "\r" === i && "\n" === this.scanner.source[this.scanner.index] && ++this.scanner.index,
                            this.scanner.lineStart = this.scanner.index)
                        }
                        this.lastMarker.index = this.scanner.index,
                        this.lastMarker.line = this.scanner.lineNumber,
                        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
                        var s = {
                            type: 101,
                            value: t,
                            lineNumber: this.scanner.lineNumber,
                            lineStart: this.scanner.lineStart,
                            start: e,
                            end: this.scanner.index
                        };
                        return t.length > 0 && this.config.tokens && this.tokens.push(this.convertToken(s)),
                        s
                    }
                    ,
                    t.prototype.peekJSXToken = function() {
                        var e = this.scanner.saveState();
                        this.scanner.scanComments();
                        var t = this.lexJSX();
                        return this.scanner.restoreState(e),
                        t
                    }
                    ,
                    t.prototype.expectJSX = function(e) {
                        var t = this.nextJSXToken();
                        7 === t.type && t.value === e || this.throwUnexpectedToken(t)
                    }
                    ,
                    t.prototype.matchJSX = function(e) {
                        var t = this.peekJSXToken();
                        return 7 === t.type && t.value === e
                    }
                    ,
                    t.prototype.parseJSXIdentifier = function() {
                        var e = this.createJSXNode()
                          , t = this.nextJSXToken();
                        return 100 !== t.type && this.throwUnexpectedToken(t),
                        this.finalize(e, new n.JSXIdentifier(t.value))
                    }
                    ,
                    t.prototype.parseJSXElementName = function() {
                        var e = this.createJSXNode()
                          , t = this.parseJSXIdentifier();
                        if (this.matchJSX(":")) {
                            var i = t;
                            this.expectJSX(":");
                            var s = this.parseJSXIdentifier();
                            t = this.finalize(e, new n.JSXNamespacedName(i,s))
                        } else if (this.matchJSX("."))
                            for (; this.matchJSX("."); ) {
                                var r = t;
                                this.expectJSX(".");
                                var a = this.parseJSXIdentifier();
                                t = this.finalize(e, new n.JSXMemberExpression(r,a))
                            }
                        return t
                    }
                    ,
                    t.prototype.parseJSXAttributeName = function() {
                        var e, t = this.createJSXNode(), i = this.parseJSXIdentifier();
                        if (this.matchJSX(":")) {
                            var s = i;
                            this.expectJSX(":");
                            var r = this.parseJSXIdentifier();
                            e = this.finalize(t, new n.JSXNamespacedName(s,r))
                        } else
                            e = i;
                        return e
                    }
                    ,
                    t.prototype.parseJSXStringLiteralAttribute = function() {
                        var e = this.createJSXNode()
                          , t = this.nextJSXToken();
                        8 !== t.type && this.throwUnexpectedToken(t);
                        var i = this.getTokenRaw(t);
                        return this.finalize(e, new o.Literal(t.value,i))
                    }
                    ,
                    t.prototype.parseJSXExpressionAttribute = function() {
                        var e = this.createJSXNode();
                        this.expectJSX("{"),
                        this.finishJSX(),
                        this.match("}") && this.tolerateError("JSX attributes must only be assigned a non-empty expression");
                        var t = this.parseAssignmentExpression();
                        return this.reenterJSX(),
                        this.finalize(e, new n.JSXExpressionContainer(t))
                    }
                    ,
                    t.prototype.parseJSXAttributeValue = function() {
                        return this.matchJSX("{") ? this.parseJSXExpressionAttribute() : this.matchJSX("<") ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute()
                    }
                    ,
                    t.prototype.parseJSXNameValueAttribute = function() {
                        var e = this.createJSXNode()
                          , t = this.parseJSXAttributeName()
                          , i = null;
                        return this.matchJSX("=") && (this.expectJSX("="),
                        i = this.parseJSXAttributeValue()),
                        this.finalize(e, new n.JSXAttribute(t,i))
                    }
                    ,
                    t.prototype.parseJSXSpreadAttribute = function() {
                        var e = this.createJSXNode();
                        this.expectJSX("{"),
                        this.expectJSX("..."),
                        this.finishJSX();
                        var t = this.parseAssignmentExpression();
                        return this.reenterJSX(),
                        this.finalize(e, new n.JSXSpreadAttribute(t))
                    }
                    ,
                    t.prototype.parseJSXAttributes = function() {
                        for (var e = []; !this.matchJSX("/") && !this.matchJSX(">"); ) {
                            var t = this.matchJSX("{") ? this.parseJSXSpreadAttribute() : this.parseJSXNameValueAttribute();
                            e.push(t)
                        }
                        return e
                    }
                    ,
                    t.prototype.parseJSXOpeningElement = function() {
                        var e = this.createJSXNode();
                        this.expectJSX("<");
                        var t = this.parseJSXElementName()
                          , i = this.parseJSXAttributes()
                          , s = this.matchJSX("/");
                        return s && this.expectJSX("/"),
                        this.expectJSX(">"),
                        this.finalize(e, new n.JSXOpeningElement(t,s,i))
                    }
                    ,
                    t.prototype.parseJSXBoundaryElement = function() {
                        var e = this.createJSXNode();
                        if (this.expectJSX("<"),
                        this.matchJSX("/")) {
                            this.expectJSX("/");
                            var t = this.parseJSXElementName();
                            return this.expectJSX(">"),
                            this.finalize(e, new n.JSXClosingElement(t))
                        }
                        var i = this.parseJSXElementName()
                          , s = this.parseJSXAttributes()
                          , r = this.matchJSX("/");
                        return r && this.expectJSX("/"),
                        this.expectJSX(">"),
                        this.finalize(e, new n.JSXOpeningElement(i,r,s))
                    }
                    ,
                    t.prototype.parseJSXEmptyExpression = function() {
                        var e = this.createJSXChildNode();
                        return this.collectComments(),
                        this.lastMarker.index = this.scanner.index,
                        this.lastMarker.line = this.scanner.lineNumber,
                        this.lastMarker.column = this.scanner.index - this.scanner.lineStart,
                        this.finalize(e, new n.JSXEmptyExpression)
                    }
                    ,
                    t.prototype.parseJSXExpressionContainer = function() {
                        var e, t = this.createJSXNode();
                        return this.expectJSX("{"),
                        this.matchJSX("}") ? (e = this.parseJSXEmptyExpression(),
                        this.expectJSX("}")) : (this.finishJSX(),
                        e = this.parseAssignmentExpression(),
                        this.reenterJSX()),
                        this.finalize(t, new n.JSXExpressionContainer(e))
                    }
                    ,
                    t.prototype.parseJSXChildren = function() {
                        for (var e = []; !this.scanner.eof(); ) {
                            var t = this.createJSXChildNode()
                              , i = this.nextJSXText();
                            if (i.start < i.end) {
                                var s = this.getTokenRaw(i)
                                  , r = this.finalize(t, new n.JSXText(i.value,s));
                                e.push(r)
                            }
                            if ("{" !== this.scanner.source[this.scanner.index])
                                break;
                            var a = this.parseJSXExpressionContainer();
                            e.push(a)
                        }
                        return e
                    }
                    ,
                    t.prototype.parseComplexJSXElement = function(e) {
                        for (var t = []; !this.scanner.eof(); ) {
                            e.children = e.children.concat(this.parseJSXChildren());
                            var i = this.createJSXChildNode()
                              , s = this.parseJSXBoundaryElement();
                            if (s.type === a.JSXSyntax.JSXOpeningElement) {
                                var r = s;
                                if (r.selfClosing) {
                                    var o = this.finalize(i, new n.JSXElement(r,[],null));
                                    e.children.push(o)
                                } else
                                    t.push(e),
                                    e = {
                                        node: i,
                                        opening: r,
                                        closing: null,
                                        children: []
                                    }
                            }
                            if (s.type === a.JSXSyntax.JSXClosingElement) {
                                e.closing = s;
                                var u = l(e.opening.name);
                                if (u !== l(e.closing.name) && this.tolerateError("Expected corresponding JSX closing tag for %0", u),
                                !(t.length > 0))
                                    break;
                                o = this.finalize(e.node, new n.JSXElement(e.opening,e.children,e.closing)),
                                (e = t[t.length - 1]).children.push(o),
                                t.pop()
                            }
                        }
                        return e
                    }
                    ,
                    t.prototype.parseJSXElement = function() {
                        var e = this.createJSXNode()
                          , t = this.parseJSXOpeningElement()
                          , i = []
                          , s = null;
                        if (!t.selfClosing) {
                            var r = this.parseComplexJSXElement({
                                node: e,
                                opening: t,
                                closing: s,
                                children: i
                            });
                            i = r.children,
                            s = r.closing
                        }
                        return this.finalize(e, new n.JSXElement(t,i,s))
                    }
                    ,
                    t.prototype.parseJSXRoot = function() {
                        this.config.tokens && this.tokens.pop(),
                        this.startJSX();
                        var e = this.parseJSXElement();
                        return this.finishJSX(),
                        e
                    }
                    ,
                    t.prototype.isStartOfExpression = function() {
                        return e.prototype.isStartOfExpression.call(this) || this.match("<")
                    }
                    ,
                    t
                }(u.Parser);
                t.JSXParser = p
            }
            , function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var i = {
                    NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
                    NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
                };
                t.Character = {
                    fromCodePoint: function(e) {
                        return e < 65536 ? String.fromCharCode(e) : String.fromCharCode(55296 + (e - 65536 >> 10)) + String.fromCharCode(56320 + (e - 65536 & 1023))
                    },
                    isWhiteSpace: function(e) {
                        return 32 === e || 9 === e || 11 === e || 12 === e || 160 === e || e >= 5760 && [5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279].indexOf(e) >= 0
                    },
                    isLineTerminator: function(e) {
                        return 10 === e || 13 === e || 8232 === e || 8233 === e
                    },
                    isIdentifierStart: function(e) {
                        return 36 === e || 95 === e || e >= 65 && e <= 90 || e >= 97 && e <= 122 || 92 === e || e >= 128 && i.NonAsciiIdentifierStart.test(t.Character.fromCodePoint(e))
                    },
                    isIdentifierPart: function(e) {
                        return 36 === e || 95 === e || e >= 65 && e <= 90 || e >= 97 && e <= 122 || e >= 48 && e <= 57 || 92 === e || e >= 128 && i.NonAsciiIdentifierPart.test(t.Character.fromCodePoint(e))
                    },
                    isDecimalDigit: function(e) {
                        return e >= 48 && e <= 57
                    },
                    isHexDigit: function(e) {
                        return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102
                    },
                    isOctalDigit: function(e) {
                        return e >= 48 && e <= 55
                    }
                }
            }
            , function(e, t, i) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var s = i(6)
                  , r = function(e) {
                    this.type = s.JSXSyntax.JSXClosingElement,
                    this.name = e
                };
                t.JSXClosingElement = r;
                var n = function(e, t, i) {
                    this.type = s.JSXSyntax.JSXElement,
                    this.openingElement = e,
                    this.children = t,
                    this.closingElement = i
                };
                t.JSXElement = n;
                var a = function() {
                    this.type = s.JSXSyntax.JSXEmptyExpression
                };
                t.JSXEmptyExpression = a;
                var o = function(e) {
                    this.type = s.JSXSyntax.JSXExpressionContainer,
                    this.expression = e
                };
                t.JSXExpressionContainer = o;
                var u = function(e) {
                    this.type = s.JSXSyntax.JSXIdentifier,
                    this.name = e
                };
                t.JSXIdentifier = u;
                var h = function(e, t) {
                    this.type = s.JSXSyntax.JSXMemberExpression,
                    this.object = e,
                    this.property = t
                };
                t.JSXMemberExpression = h;
                var c = function(e, t) {
                    this.type = s.JSXSyntax.JSXAttribute,
                    this.name = e,
                    this.value = t
                };
                t.JSXAttribute = c;
                var l = function(e, t) {
                    this.type = s.JSXSyntax.JSXNamespacedName,
                    this.namespace = e,
                    this.name = t
                };
                t.JSXNamespacedName = l;
                var p = function(e, t, i) {
                    this.type = s.JSXSyntax.JSXOpeningElement,
                    this.name = e,
                    this.selfClosing = t,
                    this.attributes = i
                };
                t.JSXOpeningElement = p;
                var d = function(e) {
                    this.type = s.JSXSyntax.JSXSpreadAttribute,
                    this.argument = e
                };
                t.JSXSpreadAttribute = d;
                var m = function(e, t) {
                    this.type = s.JSXSyntax.JSXText,
                    this.value = e,
                    this.raw = t
                };
                t.JSXText = m
            }
            , function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.JSXSyntax = {
                    JSXAttribute: "JSXAttribute",
                    JSXClosingElement: "JSXClosingElement",
                    JSXElement: "JSXElement",
                    JSXEmptyExpression: "JSXEmptyExpression",
                    JSXExpressionContainer: "JSXExpressionContainer",
                    JSXIdentifier: "JSXIdentifier",
                    JSXMemberExpression: "JSXMemberExpression",
                    JSXNamespacedName: "JSXNamespacedName",
                    JSXOpeningElement: "JSXOpeningElement",
                    JSXSpreadAttribute: "JSXSpreadAttribute",
                    JSXText: "JSXText"
                }
            }
            , function(e, t, i) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var s = i(2)
                  , r = function(e) {
                    this.type = s.Syntax.ArrayExpression,
                    this.elements = e
                };
                t.ArrayExpression = r;
                var n = function(e) {
                    this.type = s.Syntax.ArrayPattern,
                    this.elements = e
                };
                t.ArrayPattern = n;
                var a = function(e, t, i) {
                    this.type = s.Syntax.ArrowFunctionExpression,
                    this.id = null,
                    this.params = e,
                    this.body = t,
                    this.generator = !1,
                    this.expression = i,
                    this.async = !1
                };
                t.ArrowFunctionExpression = a;
                var o = function(e, t, i) {
                    this.type = s.Syntax.AssignmentExpression,
                    this.operator = e,
                    this.left = t,
                    this.right = i
                };
                t.AssignmentExpression = o;
                var u = function(e, t) {
                    this.type = s.Syntax.AssignmentPattern,
                    this.left = e,
                    this.right = t
                };
                t.AssignmentPattern = u;
                var h = function(e, t, i) {
                    this.type = s.Syntax.ArrowFunctionExpression,
                    this.id = null,
                    this.params = e,
                    this.body = t,
                    this.generator = !1,
                    this.expression = i,
                    this.async = !0
                };
                t.AsyncArrowFunctionExpression = h;
                var c = function(e, t, i) {
                    this.type = s.Syntax.FunctionDeclaration,
                    this.id = e,
                    this.params = t,
                    this.body = i,
                    this.generator = !1,
                    this.expression = !1,
                    this.async = !0
                };
                t.AsyncFunctionDeclaration = c;
                var l = function(e, t, i) {
                    this.type = s.Syntax.FunctionExpression,
                    this.id = e,
                    this.params = t,
                    this.body = i,
                    this.generator = !1,
                    this.expression = !1,
                    this.async = !0
                };
                t.AsyncFunctionExpression = l;
                var p = function(e) {
                    this.type = s.Syntax.AwaitExpression,
                    this.argument = e
                };
                t.AwaitExpression = p;
                var d = function(e, t, i) {
                    var r = "||" === e || "&&" === e;
                    this.type = r ? s.Syntax.LogicalExpression : s.Syntax.BinaryExpression,
                    this.operator = e,
                    this.left = t,
                    this.right = i
                };
                t.BinaryExpression = d;
                var m = function(e) {
                    this.type = s.Syntax.BlockStatement,
                    this.body = e
                };
                t.BlockStatement = m;
                var x = function(e) {
                    this.type = s.Syntax.BreakStatement,
                    this.label = e
                };
                t.BreakStatement = x;
                var D = function(e, t) {
                    this.type = s.Syntax.CallExpression,
                    this.callee = e,
                    this.arguments = t
                };
                t.CallExpression = D;
                var f = function(e, t) {
                    this.type = s.Syntax.CatchClause,
                    this.param = e,
                    this.body = t
                };
                t.CatchClause = f;
                var E = function(e) {
                    this.type = s.Syntax.ClassBody,
                    this.body = e
                };
                t.ClassBody = E;
                var y = function(e, t, i) {
                    this.type = s.Syntax.ClassDeclaration,
                    this.id = e,
                    this.superClass = t,
                    this.body = i
                };
                t.ClassDeclaration = y;
                var C = function(e, t, i) {
                    this.type = s.Syntax.ClassExpression,
                    this.id = e,
                    this.superClass = t,
                    this.body = i
                };
                t.ClassExpression = C;
                var A = function(e, t) {
                    this.type = s.Syntax.MemberExpression,
                    this.computed = !0,
                    this.object = e,
                    this.property = t
                };
                t.ComputedMemberExpression = A;
                var v = function(e, t, i) {
                    this.type = s.Syntax.ConditionalExpression,
                    this.test = e,
                    this.consequent = t,
                    this.alternate = i
                };
                t.ConditionalExpression = v;
                var S = function(e) {
                    this.type = s.Syntax.ContinueStatement,
                    this.label = e
                };
                t.ContinueStatement = S;
                var F = function() {
                    this.type = s.Syntax.DebuggerStatement
                };
                t.DebuggerStatement = F;
                var g = function(e, t) {
                    this.type = s.Syntax.ExpressionStatement,
                    this.expression = e,
                    this.directive = t
                };
                t.Directive = g;
                var k = function(e, t) {
                    this.type = s.Syntax.DoWhileStatement,
                    this.body = e,
                    this.test = t
                };
                t.DoWhileStatement = k;
                var w = function() {
                    this.type = s.Syntax.EmptyStatement
                };
                t.EmptyStatement = w;
                var B = function(e) {
                    this.type = s.Syntax.ExportAllDeclaration,
                    this.source = e
                };
                t.ExportAllDeclaration = B;
                var b = function(e) {
                    this.type = s.Syntax.ExportDefaultDeclaration,
                    this.declaration = e
                };
                t.ExportDefaultDeclaration = b;
                var T = function(e, t, i) {
                    this.type = s.Syntax.ExportNamedDeclaration,
                    this.declaration = e,
                    this.specifiers = t,
                    this.source = i
                };
                t.ExportNamedDeclaration = T;
                var N = function(e, t) {
                    this.type = s.Syntax.ExportSpecifier,
                    this.exported = t,
                    this.local = e
                };
                t.ExportSpecifier = N;
                var I = function(e) {
                    this.type = s.Syntax.ExpressionStatement,
                    this.expression = e
                };
                t.ExpressionStatement = I;
                var M = function(e, t, i) {
                    this.type = s.Syntax.ForInStatement,
                    this.left = e,
                    this.right = t,
                    this.body = i,
                    this.each = !1
                };
                t.ForInStatement = M;
                var P = function(e, t, i) {
                    this.type = s.Syntax.ForOfStatement,
                    this.left = e,
                    this.right = t,
                    this.body = i
                };
                t.ForOfStatement = P;
                var X = function(e, t, i, r) {
                    this.type = s.Syntax.ForStatement,
                    this.init = e,
                    this.test = t,
                    this.update = i,
                    this.body = r
                };
                t.ForStatement = X;
                var J = function(e, t, i, r) {
                    this.type = s.Syntax.FunctionDeclaration,
                    this.id = e,
                    this.params = t,
                    this.body = i,
                    this.generator = r,
                    this.expression = !1,
                    this.async = !1
                };
                t.FunctionDeclaration = J;
                var U = function(e, t, i, r) {
                    this.type = s.Syntax.FunctionExpression,
                    this.id = e,
                    this.params = t,
                    this.body = i,
                    this.generator = r,
                    this.expression = !1,
                    this.async = !1
                };
                t.FunctionExpression = U;
                var L = function(e) {
                    this.type = s.Syntax.Identifier,
                    this.name = e
                };
                t.Identifier = L;
                var z = function(e, t, i) {
                    this.type = s.Syntax.IfStatement,
                    this.test = e,
                    this.consequent = t,
                    this.alternate = i
                };
                t.IfStatement = z;
                var O = function(e, t) {
                    this.type = s.Syntax.ImportDeclaration,
                    this.specifiers = e,
                    this.source = t
                };
                t.ImportDeclaration = O;
                var R = function(e) {
                    this.type = s.Syntax.ImportDefaultSpecifier,
                    this.local = e
                };
                t.ImportDefaultSpecifier = R;
                var K = function(e) {
                    this.type = s.Syntax.ImportNamespaceSpecifier,
                    this.local = e
                };
                t.ImportNamespaceSpecifier = K;
                var H = function(e, t) {
                    this.type = s.Syntax.ImportSpecifier,
                    this.local = e,
                    this.imported = t
                };
                t.ImportSpecifier = H;
                var j = function(e, t) {
                    this.type = s.Syntax.LabeledStatement,
                    this.label = e,
                    this.body = t
                };
                t.LabeledStatement = j;
                var W = function(e, t) {
                    this.type = s.Syntax.Literal,
                    this.value = e,
                    this.raw = t
                };
                t.Literal = W;
                var G = function(e, t) {
                    this.type = s.Syntax.MetaProperty,
                    this.meta = e,
                    this.property = t
                };
                t.MetaProperty = G;
                var _ = function(e, t, i, r, n) {
                    this.type = s.Syntax.MethodDefinition,
                    this.key = e,
                    this.computed = t,
                    this.value = i,
                    this.kind = r,
                    this.static = n
                };
                t.MethodDefinition = _;
                var Y = function(e) {
                    this.type = s.Syntax.Program,
                    this.body = e,
                    this.sourceType = "module"
                };
                t.Module = Y;
                var V = function(e, t) {
                    this.type = s.Syntax.NewExpression,
                    this.callee = e,
                    this.arguments = t
                };
                t.NewExpression = V;
                var q = function(e) {
                    this.type = s.Syntax.ObjectExpression,
                    this.properties = e
                };
                t.ObjectExpression = q;
                var $ = function(e) {
                    this.type = s.Syntax.ObjectPattern,
                    this.properties = e
                };
                t.ObjectPattern = $;
                var Z = function(e, t, i, r, n, a) {
                    this.type = s.Syntax.Property,
                    this.key = t,
                    this.computed = i,
                    this.value = r,
                    this.kind = e,
                    this.method = n,
                    this.shorthand = a
                };
                t.Property = Z;
                var Q = function(e, t, i, r) {
                    this.type = s.Syntax.Literal,
                    this.value = e,
                    this.raw = t,
                    this.regex = {
                        pattern: i,
                        flags: r
                    }
                };
                t.RegexLiteral = Q;
                var ee = function(e) {
                    this.type = s.Syntax.RestElement,
                    this.argument = e
                };
                t.RestElement = ee;
                var te = function(e) {
                    this.type = s.Syntax.ReturnStatement,
                    this.argument = e
                };
                t.ReturnStatement = te;
                var ie = function(e) {
                    this.type = s.Syntax.Program,
                    this.body = e,
                    this.sourceType = "script"
                };
                t.Script = ie;
                var se = function(e) {
                    this.type = s.Syntax.SequenceExpression,
                    this.expressions = e
                };
                t.SequenceExpression = se;
                var re = function(e) {
                    this.type = s.Syntax.SpreadElement,
                    this.argument = e
                };
                t.SpreadElement = re;
                var ne = function(e, t) {
                    this.type = s.Syntax.MemberExpression,
                    this.computed = !1,
                    this.object = e,
                    this.property = t
                };
                t.StaticMemberExpression = ne;
                var ae = function() {
                    this.type = s.Syntax.Super
                };
                t.Super = ae;
                var oe = function(e, t) {
                    this.type = s.Syntax.SwitchCase,
                    this.test = e,
                    this.consequent = t
                };
                t.SwitchCase = oe;
                var ue = function(e, t) {
                    this.type = s.Syntax.SwitchStatement,
                    this.discriminant = e,
                    this.cases = t
                };
                t.SwitchStatement = ue;
                var he = function(e, t) {
                    this.type = s.Syntax.TaggedTemplateExpression,
                    this.tag = e,
                    this.quasi = t
                };
                t.TaggedTemplateExpression = he;
                var ce = function(e, t) {
                    this.type = s.Syntax.TemplateElement,
                    this.value = e,
                    this.tail = t
                };
                t.TemplateElement = ce;
                var le = function(e, t) {
                    this.type = s.Syntax.TemplateLiteral,
                    this.quasis = e,
                    this.expressions = t
                };
                t.TemplateLiteral = le;
                var pe = function() {
                    this.type = s.Syntax.ThisExpression
                };
                t.ThisExpression = pe;
                var de = function(e) {
                    this.type = s.Syntax.ThrowStatement,
                    this.argument = e
                };
                t.ThrowStatement = de;
                var me = function(e, t, i) {
                    this.type = s.Syntax.TryStatement,
                    this.block = e,
                    this.handler = t,
                    this.finalizer = i
                };
                t.TryStatement = me;
                var xe = function(e, t) {
                    this.type = s.Syntax.UnaryExpression,
                    this.operator = e,
                    this.argument = t,
                    this.prefix = !0
                };
                t.UnaryExpression = xe;
                var De = function(e, t, i) {
                    this.type = s.Syntax.UpdateExpression,
                    this.operator = e,
                    this.argument = t,
                    this.prefix = i
                };
                t.UpdateExpression = De;
                var fe = function(e, t) {
                    this.type = s.Syntax.VariableDeclaration,
                    this.declarations = e,
                    this.kind = t
                };
                t.VariableDeclaration = fe;
                var Ee = function(e, t) {
                    this.type = s.Syntax.VariableDeclarator,
                    this.id = e,
                    this.init = t
                };
                t.VariableDeclarator = Ee;
                var ye = function(e, t) {
                    this.type = s.Syntax.WhileStatement,
                    this.test = e,
                    this.body = t
                };
                t.WhileStatement = ye;
                var Ce = function(e, t) {
                    this.type = s.Syntax.WithStatement,
                    this.object = e,
                    this.body = t
                };
                t.WithStatement = Ce;
                var Ae = function(e, t) {
                    this.type = s.Syntax.YieldExpression,
                    this.argument = e,
                    this.delegate = t
                };
                t.YieldExpression = Ae
            }
            , function(e, t, i) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var s = i(9)
                  , r = i(10)
                  , n = i(11)
                  , a = i(7)
                  , o = i(12)
                  , u = i(2)
                  , h = i(13)
                  , c = function() {
                    function e(e, t, i) {
                        void 0 === t && (t = {}),
                        this.config = {
                            range: "boolean" === typeof t.range && t.range,
                            loc: "boolean" === typeof t.loc && t.loc,
                            source: null,
                            tokens: "boolean" === typeof t.tokens && t.tokens,
                            comment: "boolean" === typeof t.comment && t.comment,
                            tolerant: "boolean" === typeof t.tolerant && t.tolerant
                        },
                        this.config.loc && t.source && null !== t.source && (this.config.source = String(t.source)),
                        this.delegate = i,
                        this.errorHandler = new r.ErrorHandler,
                        this.errorHandler.tolerant = this.config.tolerant,
                        this.scanner = new o.Scanner(e,this.errorHandler),
                        this.scanner.trackComment = this.config.comment,
                        this.operatorPrecedence = {
                            ")": 0,
                            ";": 0,
                            ",": 0,
                            "=": 0,
                            "]": 0,
                            "||": 1,
                            "&&": 2,
                            "|": 3,
                            "^": 4,
                            "&": 5,
                            "==": 6,
                            "!=": 6,
                            "===": 6,
                            "!==": 6,
                            "<": 7,
                            ">": 7,
                            "<=": 7,
                            ">=": 7,
                            "<<": 8,
                            ">>": 8,
                            ">>>": 8,
                            "+": 9,
                            "-": 9,
                            "*": 11,
                            "/": 11,
                            "%": 11
                        },
                        this.lookahead = {
                            type: 2,
                            value: "",
                            lineNumber: this.scanner.lineNumber,
                            lineStart: 0,
                            start: 0,
                            end: 0
                        },
                        this.hasLineTerminator = !1,
                        this.context = {
                            isModule: !1,
                            await: !1,
                            allowIn: !0,
                            allowStrictDirective: !0,
                            allowYield: !0,
                            firstCoverInitializedNameError: null,
                            isAssignmentTarget: !1,
                            isBindingElement: !1,
                            inFunctionBody: !1,
                            inIteration: !1,
                            inSwitch: !1,
                            labelSet: {},
                            strict: !1
                        },
                        this.tokens = [],
                        this.startMarker = {
                            index: 0,
                            line: this.scanner.lineNumber,
                            column: 0
                        },
                        this.lastMarker = {
                            index: 0,
                            line: this.scanner.lineNumber,
                            column: 0
                        },
                        this.nextToken(),
                        this.lastMarker = {
                            index: this.scanner.index,
                            line: this.scanner.lineNumber,
                            column: this.scanner.index - this.scanner.lineStart
                        }
                    }
                    return e.prototype.throwError = function(e) {
                        for (var t = [], i = 1; i < arguments.length; i++)
                            t[i - 1] = arguments[i];
                        var r = Array.prototype.slice.call(arguments, 1)
                          , n = e.replace(/%(\d)/g, (function(e, t) {
                            return s.assert(t < r.length, "Message reference must be in range"),
                            r[t]
                        }
                        ))
                          , a = this.lastMarker.index
                          , o = this.lastMarker.line
                          , u = this.lastMarker.column + 1;
                        throw this.errorHandler.createError(a, o, u, n)
                    }
                    ,
                    e.prototype.tolerateError = function(e) {
                        for (var t = [], i = 1; i < arguments.length; i++)
                            t[i - 1] = arguments[i];
                        var r = Array.prototype.slice.call(arguments, 1)
                          , n = e.replace(/%(\d)/g, (function(e, t) {
                            return s.assert(t < r.length, "Message reference must be in range"),
                            r[t]
                        }
                        ))
                          , a = this.lastMarker.index
                          , o = this.scanner.lineNumber
                          , u = this.lastMarker.column + 1;
                        this.errorHandler.tolerateError(a, o, u, n)
                    }
                    ,
                    e.prototype.unexpectedTokenError = function(e, t) {
                        var i, s = t || n.Messages.UnexpectedToken;
                        if (e ? (t || (s = 2 === e.type ? n.Messages.UnexpectedEOS : 3 === e.type ? n.Messages.UnexpectedIdentifier : 6 === e.type ? n.Messages.UnexpectedNumber : 8 === e.type ? n.Messages.UnexpectedString : 10 === e.type ? n.Messages.UnexpectedTemplate : n.Messages.UnexpectedToken,
                        4 === e.type && (this.scanner.isFutureReservedWord(e.value) ? s = n.Messages.UnexpectedReserved : this.context.strict && this.scanner.isStrictModeReservedWord(e.value) && (s = n.Messages.StrictReservedWord))),
                        i = e.value) : i = "ILLEGAL",
                        s = s.replace("%0", i),
                        e && "number" === typeof e.lineNumber) {
                            var r = e.start
                              , a = e.lineNumber
                              , o = this.lastMarker.index - this.lastMarker.column
                              , u = e.start - o + 1;
                            return this.errorHandler.createError(r, a, u, s)
                        }
                        return r = this.lastMarker.index,
                        a = this.lastMarker.line,
                        u = this.lastMarker.column + 1,
                        this.errorHandler.createError(r, a, u, s)
                    }
                    ,
                    e.prototype.throwUnexpectedToken = function(e, t) {
                        throw this.unexpectedTokenError(e, t)
                    }
                    ,
                    e.prototype.tolerateUnexpectedToken = function(e, t) {
                        this.errorHandler.tolerate(this.unexpectedTokenError(e, t))
                    }
                    ,
                    e.prototype.collectComments = function() {
                        if (this.config.comment) {
                            var e = this.scanner.scanComments();
                            if (e.length > 0 && this.delegate)
                                for (var t = 0; t < e.length; ++t) {
                                    var i = e[t]
                                      , s = void 0;
                                    s = {
                                        type: i.multiLine ? "BlockComment" : "LineComment",
                                        value: this.scanner.source.slice(i.slice[0], i.slice[1])
                                    },
                                    this.config.range && (s.range = i.range),
                                    this.config.loc && (s.loc = i.loc);
                                    var r = {
                                        start: {
                                            line: i.loc.start.line,
                                            column: i.loc.start.column,
                                            offset: i.range[0]
                                        },
                                        end: {
                                            line: i.loc.end.line,
                                            column: i.loc.end.column,
                                            offset: i.range[1]
                                        }
                                    };
                                    this.delegate(s, r)
                                }
                        } else
                            this.scanner.scanComments()
                    }
                    ,
                    e.prototype.getTokenRaw = function(e) {
                        return this.scanner.source.slice(e.start, e.end)
                    }
                    ,
                    e.prototype.convertToken = function(e) {
                        var t = {
                            type: h.TokenName[e.type],
                            value: this.getTokenRaw(e)
                        };
                        if (this.config.range && (t.range = [e.start, e.end]),
                        this.config.loc && (t.loc = {
                            start: {
                                line: this.startMarker.line,
                                column: this.startMarker.column
                            },
                            end: {
                                line: this.scanner.lineNumber,
                                column: this.scanner.index - this.scanner.lineStart
                            }
                        }),
                        9 === e.type) {
                            var i = e.pattern
                              , s = e.flags;
                            t.regex = {
                                pattern: i,
                                flags: s
                            }
                        }
                        return t
                    }
                    ,
                    e.prototype.nextToken = function() {
                        var e = this.lookahead;
                        this.lastMarker.index = this.scanner.index,
                        this.lastMarker.line = this.scanner.lineNumber,
                        this.lastMarker.column = this.scanner.index - this.scanner.lineStart,
                        this.collectComments(),
                        this.scanner.index !== this.startMarker.index && (this.startMarker.index = this.scanner.index,
                        this.startMarker.line = this.scanner.lineNumber,
                        this.startMarker.column = this.scanner.index - this.scanner.lineStart);
                        var t = this.scanner.lex();
                        return this.hasLineTerminator = e.lineNumber !== t.lineNumber,
                        t && this.context.strict && 3 === t.type && this.scanner.isStrictModeReservedWord(t.value) && (t.type = 4),
                        this.lookahead = t,
                        this.config.tokens && 2 !== t.type && this.tokens.push(this.convertToken(t)),
                        e
                    }
                    ,
                    e.prototype.nextRegexToken = function() {
                        this.collectComments();
                        var e = this.scanner.scanRegExp();
                        return this.config.tokens && (this.tokens.pop(),
                        this.tokens.push(this.convertToken(e))),
                        this.lookahead = e,
                        this.nextToken(),
                        e
                    }
                    ,
                    e.prototype.createNode = function() {
                        return {
                            index: this.startMarker.index,
                            line: this.startMarker.line,
                            column: this.startMarker.column
                        }
                    }
                    ,
                    e.prototype.startNode = function(e, t) {
                        void 0 === t && (t = 0);
                        var i = e.start - e.lineStart
                          , s = e.lineNumber;
                        return i < 0 && (i += t,
                        s--),
                        {
                            index: e.start,
                            line: s,
                            column: i
                        }
                    }
                    ,
                    e.prototype.finalize = function(e, t) {
                        if (this.config.range && (t.range = [e.index, this.lastMarker.index]),
                        this.config.loc && (t.loc = {
                            start: {
                                line: e.line,
                                column: e.column
                            },
                            end: {
                                line: this.lastMarker.line,
                                column: this.lastMarker.column
                            }
                        },
                        this.config.source && (t.loc.source = this.config.source)),
                        this.delegate) {
                            var i = {
                                start: {
                                    line: e.line,
                                    column: e.column,
                                    offset: e.index
                                },
                                end: {
                                    line: this.lastMarker.line,
                                    column: this.lastMarker.column,
                                    offset: this.lastMarker.index
                                }
                            };
                            this.delegate(t, i)
                        }
                        return t
                    }
                    ,
                    e.prototype.expect = function(e) {
                        var t = this.nextToken();
                        7 === t.type && t.value === e || this.throwUnexpectedToken(t)
                    }
                    ,
                    e.prototype.expectCommaSeparator = function() {
                        if (this.config.tolerant) {
                            var e = this.lookahead;
                            7 === e.type && "," === e.value ? this.nextToken() : 7 === e.type && ";" === e.value ? (this.nextToken(),
                            this.tolerateUnexpectedToken(e)) : this.tolerateUnexpectedToken(e, n.Messages.UnexpectedToken)
                        } else
                            this.expect(",")
                    }
                    ,
                    e.prototype.expectKeyword = function(e) {
                        var t = this.nextToken();
                        4 === t.type && t.value === e || this.throwUnexpectedToken(t)
                    }
                    ,
                    e.prototype.match = function(e) {
                        return 7 === this.lookahead.type && this.lookahead.value === e
                    }
                    ,
                    e.prototype.matchKeyword = function(e) {
                        return 4 === this.lookahead.type && this.lookahead.value === e
                    }
                    ,
                    e.prototype.matchContextualKeyword = function(e) {
                        return 3 === this.lookahead.type && this.lookahead.value === e
                    }
                    ,
                    e.prototype.matchAssign = function() {
                        if (7 !== this.lookahead.type)
                            return !1;
                        var e = this.lookahead.value;
                        return "=" === e || "*=" === e || "**=" === e || "/=" === e || "%=" === e || "+=" === e || "-=" === e || "<<=" === e || ">>=" === e || ">>>=" === e || "&=" === e || "^=" === e || "|=" === e
                    }
                    ,
                    e.prototype.isolateCoverGrammar = function(e) {
                        var t = this.context.isBindingElement
                          , i = this.context.isAssignmentTarget
                          , s = this.context.firstCoverInitializedNameError;
                        this.context.isBindingElement = !0,
                        this.context.isAssignmentTarget = !0,
                        this.context.firstCoverInitializedNameError = null;
                        var r = e.call(this);
                        return null !== this.context.firstCoverInitializedNameError && this.throwUnexpectedToken(this.context.firstCoverInitializedNameError),
                        this.context.isBindingElement = t,
                        this.context.isAssignmentTarget = i,
                        this.context.firstCoverInitializedNameError = s,
                        r
                    }
                    ,
                    e.prototype.inheritCoverGrammar = function(e) {
                        var t = this.context.isBindingElement
                          , i = this.context.isAssignmentTarget
                          , s = this.context.firstCoverInitializedNameError;
                        this.context.isBindingElement = !0,
                        this.context.isAssignmentTarget = !0,
                        this.context.firstCoverInitializedNameError = null;
                        var r = e.call(this);
                        return this.context.isBindingElement = this.context.isBindingElement && t,
                        this.context.isAssignmentTarget = this.context.isAssignmentTarget && i,
                        this.context.firstCoverInitializedNameError = s || this.context.firstCoverInitializedNameError,
                        r
                    }
                    ,
                    e.prototype.consumeSemicolon = function() {
                        this.match(";") ? this.nextToken() : this.hasLineTerminator || (2 === this.lookahead.type || this.match("}") || this.throwUnexpectedToken(this.lookahead),
                        this.lastMarker.index = this.startMarker.index,
                        this.lastMarker.line = this.startMarker.line,
                        this.lastMarker.column = this.startMarker.column)
                    }
                    ,
                    e.prototype.parsePrimaryExpression = function() {
                        var e, t, i, s = this.createNode();
                        switch (this.lookahead.type) {
                        case 3:
                            (this.context.isModule || this.context.await) && "await" === this.lookahead.value && this.tolerateUnexpectedToken(this.lookahead),
                            e = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(s, new a.Identifier(this.nextToken().value));
                            break;
                        case 6:
                        case 8:
                            this.context.strict && this.lookahead.octal && this.tolerateUnexpectedToken(this.lookahead, n.Messages.StrictOctalLiteral),
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1,
                            t = this.nextToken(),
                            i = this.getTokenRaw(t),
                            e = this.finalize(s, new a.Literal(t.value,i));
                            break;
                        case 1:
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1,
                            t = this.nextToken(),
                            i = this.getTokenRaw(t),
                            e = this.finalize(s, new a.Literal("true" === t.value,i));
                            break;
                        case 5:
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1,
                            t = this.nextToken(),
                            i = this.getTokenRaw(t),
                            e = this.finalize(s, new a.Literal(null,i));
                            break;
                        case 10:
                            e = this.parseTemplateLiteral();
                            break;
                        case 7:
                            switch (this.lookahead.value) {
                            case "(":
                                this.context.isBindingElement = !1,
                                e = this.inheritCoverGrammar(this.parseGroupExpression);
                                break;
                            case "[":
                                e = this.inheritCoverGrammar(this.parseArrayInitializer);
                                break;
                            case "{":
                                e = this.inheritCoverGrammar(this.parseObjectInitializer);
                                break;
                            case "/":
                            case "/=":
                                this.context.isAssignmentTarget = !1,
                                this.context.isBindingElement = !1,
                                this.scanner.index = this.startMarker.index,
                                t = this.nextRegexToken(),
                                i = this.getTokenRaw(t),
                                e = this.finalize(s, new a.RegexLiteral(t.regex,i,t.pattern,t.flags));
                                break;
                            default:
                                e = this.throwUnexpectedToken(this.nextToken())
                            }
                            break;
                        case 4:
                            !this.context.strict && this.context.allowYield && this.matchKeyword("yield") ? e = this.parseIdentifierName() : !this.context.strict && this.matchKeyword("let") ? e = this.finalize(s, new a.Identifier(this.nextToken().value)) : (this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1,
                            this.matchKeyword("function") ? e = this.parseFunctionExpression() : this.matchKeyword("this") ? (this.nextToken(),
                            e = this.finalize(s, new a.ThisExpression)) : e = this.matchKeyword("class") ? this.parseClassExpression() : this.throwUnexpectedToken(this.nextToken()));
                            break;
                        default:
                            e = this.throwUnexpectedToken(this.nextToken())
                        }
                        return e
                    }
                    ,
                    e.prototype.parseSpreadElement = function() {
                        var e = this.createNode();
                        this.expect("...");
                        var t = this.inheritCoverGrammar(this.parseAssignmentExpression);
                        return this.finalize(e, new a.SpreadElement(t))
                    }
                    ,
                    e.prototype.parseArrayInitializer = function() {
                        var e = this.createNode()
                          , t = [];
                        for (this.expect("["); !this.match("]"); )
                            if (this.match(","))
                                this.nextToken(),
                                t.push(null);
                            else if (this.match("...")) {
                                var i = this.parseSpreadElement();
                                this.match("]") || (this.context.isAssignmentTarget = !1,
                                this.context.isBindingElement = !1,
                                this.expect(",")),
                                t.push(i)
                            } else
                                t.push(this.inheritCoverGrammar(this.parseAssignmentExpression)),
                                this.match("]") || this.expect(",");
                        return this.expect("]"),
                        this.finalize(e, new a.ArrayExpression(t))
                    }
                    ,
                    e.prototype.parsePropertyMethod = function(e) {
                        this.context.isAssignmentTarget = !1,
                        this.context.isBindingElement = !1;
                        var t = this.context.strict
                          , i = this.context.allowStrictDirective;
                        this.context.allowStrictDirective = e.simple;
                        var s = this.isolateCoverGrammar(this.parseFunctionSourceElements);
                        return this.context.strict && e.firstRestricted && this.tolerateUnexpectedToken(e.firstRestricted, e.message),
                        this.context.strict && e.stricted && this.tolerateUnexpectedToken(e.stricted, e.message),
                        this.context.strict = t,
                        this.context.allowStrictDirective = i,
                        s
                    }
                    ,
                    e.prototype.parsePropertyMethodFunction = function() {
                        var e = this.createNode()
                          , t = this.context.allowYield;
                        this.context.allowYield = !0;
                        var i = this.parseFormalParameters()
                          , s = this.parsePropertyMethod(i);
                        return this.context.allowYield = t,
                        this.finalize(e, new a.FunctionExpression(null,i.params,s,!1))
                    }
                    ,
                    e.prototype.parsePropertyMethodAsyncFunction = function() {
                        var e = this.createNode()
                          , t = this.context.allowYield
                          , i = this.context.await;
                        this.context.allowYield = !1,
                        this.context.await = !0;
                        var s = this.parseFormalParameters()
                          , r = this.parsePropertyMethod(s);
                        return this.context.allowYield = t,
                        this.context.await = i,
                        this.finalize(e, new a.AsyncFunctionExpression(null,s.params,r))
                    }
                    ,
                    e.prototype.parseObjectPropertyKey = function() {
                        var e, t = this.createNode(), i = this.nextToken();
                        switch (i.type) {
                        case 8:
                        case 6:
                            this.context.strict && i.octal && this.tolerateUnexpectedToken(i, n.Messages.StrictOctalLiteral);
                            var s = this.getTokenRaw(i);
                            e = this.finalize(t, new a.Literal(i.value,s));
                            break;
                        case 3:
                        case 1:
                        case 5:
                        case 4:
                            e = this.finalize(t, new a.Identifier(i.value));
                            break;
                        case 7:
                            "[" === i.value ? (e = this.isolateCoverGrammar(this.parseAssignmentExpression),
                            this.expect("]")) : e = this.throwUnexpectedToken(i);
                            break;
                        default:
                            e = this.throwUnexpectedToken(i)
                        }
                        return e
                    }
                    ,
                    e.prototype.isPropertyKey = function(e, t) {
                        return e.type === u.Syntax.Identifier && e.name === t || e.type === u.Syntax.Literal && e.value === t
                    }
                    ,
                    e.prototype.parseObjectProperty = function(e) {
                        var t, i = this.createNode(), s = this.lookahead, r = null, o = null, u = !1, h = !1, c = !1, l = !1;
                        if (3 === s.type) {
                            var p = s.value;
                            this.nextToken(),
                            u = this.match("["),
                            r = (l = !this.hasLineTerminator && "async" === p && !this.match(":") && !this.match("(") && !this.match("*") && !this.match(",")) ? this.parseObjectPropertyKey() : this.finalize(i, new a.Identifier(p))
                        } else
                            this.match("*") ? this.nextToken() : (u = this.match("["),
                            r = this.parseObjectPropertyKey());
                        var d = this.qualifiedPropertyName(this.lookahead);
                        if (3 === s.type && !l && "get" === s.value && d)
                            t = "get",
                            u = this.match("["),
                            r = this.parseObjectPropertyKey(),
                            this.context.allowYield = !1,
                            o = this.parseGetterMethod();
                        else if (3 === s.type && !l && "set" === s.value && d)
                            t = "set",
                            u = this.match("["),
                            r = this.parseObjectPropertyKey(),
                            o = this.parseSetterMethod();
                        else if (7 === s.type && "*" === s.value && d)
                            t = "init",
                            u = this.match("["),
                            r = this.parseObjectPropertyKey(),
                            o = this.parseGeneratorMethod(),
                            h = !0;
                        else if (r || this.throwUnexpectedToken(this.lookahead),
                        t = "init",
                        this.match(":") && !l)
                            !u && this.isPropertyKey(r, "__proto__") && (e.value && this.tolerateError(n.Messages.DuplicateProtoProperty),
                            e.value = !0),
                            this.nextToken(),
                            o = this.inheritCoverGrammar(this.parseAssignmentExpression);
                        else if (this.match("("))
                            o = l ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction(),
                            h = !0;
                        else if (3 === s.type)
                            if (p = this.finalize(i, new a.Identifier(s.value)),
                            this.match("=")) {
                                this.context.firstCoverInitializedNameError = this.lookahead,
                                this.nextToken(),
                                c = !0;
                                var m = this.isolateCoverGrammar(this.parseAssignmentExpression);
                                o = this.finalize(i, new a.AssignmentPattern(p,m))
                            } else
                                c = !0,
                                o = p;
                        else
                            this.throwUnexpectedToken(this.nextToken());
                        return this.finalize(i, new a.Property(t,r,u,o,h,c))
                    }
                    ,
                    e.prototype.parseObjectInitializer = function() {
                        var e = this.createNode();
                        this.expect("{");
                        for (var t = [], i = {
                            value: !1
                        }; !this.match("}"); )
                            t.push(this.parseObjectProperty(i)),
                            this.match("}") || this.expectCommaSeparator();
                        return this.expect("}"),
                        this.finalize(e, new a.ObjectExpression(t))
                    }
                    ,
                    e.prototype.parseTemplateHead = function() {
                        s.assert(this.lookahead.head, "Template literal must start with a template head");
                        var e = this.createNode()
                          , t = this.nextToken()
                          , i = t.value
                          , r = t.cooked;
                        return this.finalize(e, new a.TemplateElement({
                            raw: i,
                            cooked: r
                        },t.tail))
                    }
                    ,
                    e.prototype.parseTemplateElement = function() {
                        10 !== this.lookahead.type && this.throwUnexpectedToken();
                        var e = this.createNode()
                          , t = this.nextToken()
                          , i = t.value
                          , s = t.cooked;
                        return this.finalize(e, new a.TemplateElement({
                            raw: i,
                            cooked: s
                        },t.tail))
                    }
                    ,
                    e.prototype.parseTemplateLiteral = function() {
                        var e = this.createNode()
                          , t = []
                          , i = []
                          , s = this.parseTemplateHead();
                        for (i.push(s); !s.tail; )
                            t.push(this.parseExpression()),
                            s = this.parseTemplateElement(),
                            i.push(s);
                        return this.finalize(e, new a.TemplateLiteral(i,t))
                    }
                    ,
                    e.prototype.reinterpretExpressionAsPattern = function(e) {
                        switch (e.type) {
                        case u.Syntax.Identifier:
                        case u.Syntax.MemberExpression:
                        case u.Syntax.RestElement:
                        case u.Syntax.AssignmentPattern:
                            break;
                        case u.Syntax.SpreadElement:
                            e.type = u.Syntax.RestElement,
                            this.reinterpretExpressionAsPattern(e.argument);
                            break;
                        case u.Syntax.ArrayExpression:
                            e.type = u.Syntax.ArrayPattern;
                            for (var t = 0; t < e.elements.length; t++)
                                null !== e.elements[t] && this.reinterpretExpressionAsPattern(e.elements[t]);
                            break;
                        case u.Syntax.ObjectExpression:
                            for (e.type = u.Syntax.ObjectPattern,
                            t = 0; t < e.properties.length; t++)
                                this.reinterpretExpressionAsPattern(e.properties[t].value);
                            break;
                        case u.Syntax.AssignmentExpression:
                            e.type = u.Syntax.AssignmentPattern,
                            delete e.operator,
                            this.reinterpretExpressionAsPattern(e.left)
                        }
                    }
                    ,
                    e.prototype.parseGroupExpression = function() {
                        var e;
                        if (this.expect("("),
                        this.match(")"))
                            this.nextToken(),
                            this.match("=>") || this.expect("=>"),
                            e = {
                                type: "ArrowParameterPlaceHolder",
                                params: [],
                                async: !1
                            };
                        else {
                            var t = this.lookahead
                              , i = [];
                            if (this.match("..."))
                                e = this.parseRestElement(i),
                                this.expect(")"),
                                this.match("=>") || this.expect("=>"),
                                e = {
                                    type: "ArrowParameterPlaceHolder",
                                    params: [e],
                                    async: !1
                                };
                            else {
                                var s = !1;
                                if (this.context.isBindingElement = !0,
                                e = this.inheritCoverGrammar(this.parseAssignmentExpression),
                                this.match(",")) {
                                    var r = [];
                                    for (this.context.isAssignmentTarget = !1,
                                    r.push(e); 2 !== this.lookahead.type && this.match(","); ) {
                                        if (this.nextToken(),
                                        this.match(")")) {
                                            this.nextToken();
                                            for (var n = 0; n < r.length; n++)
                                                this.reinterpretExpressionAsPattern(r[n]);
                                            s = !0,
                                            e = {
                                                type: "ArrowParameterPlaceHolder",
                                                params: r,
                                                async: !1
                                            }
                                        } else if (this.match("...")) {
                                            for (this.context.isBindingElement || this.throwUnexpectedToken(this.lookahead),
                                            r.push(this.parseRestElement(i)),
                                            this.expect(")"),
                                            this.match("=>") || this.expect("=>"),
                                            this.context.isBindingElement = !1,
                                            n = 0; n < r.length; n++)
                                                this.reinterpretExpressionAsPattern(r[n]);
                                            s = !0,
                                            e = {
                                                type: "ArrowParameterPlaceHolder",
                                                params: r,
                                                async: !1
                                            }
                                        } else
                                            r.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
                                        if (s)
                                            break
                                    }
                                    s || (e = this.finalize(this.startNode(t), new a.SequenceExpression(r)))
                                }
                                if (!s) {
                                    if (this.expect(")"),
                                    this.match("=>") && (e.type === u.Syntax.Identifier && "yield" === e.name && (s = !0,
                                    e = {
                                        type: "ArrowParameterPlaceHolder",
                                        params: [e],
                                        async: !1
                                    }),
                                    !s)) {
                                        if (this.context.isBindingElement || this.throwUnexpectedToken(this.lookahead),
                                        e.type === u.Syntax.SequenceExpression)
                                            for (n = 0; n < e.expressions.length; n++)
                                                this.reinterpretExpressionAsPattern(e.expressions[n]);
                                        else
                                            this.reinterpretExpressionAsPattern(e);
                                        e = {
                                            type: "ArrowParameterPlaceHolder",
                                            params: e.type === u.Syntax.SequenceExpression ? e.expressions : [e],
                                            async: !1
                                        }
                                    }
                                    this.context.isBindingElement = !1
                                }
                            }
                        }
                        return e
                    }
                    ,
                    e.prototype.parseArguments = function() {
                        this.expect("(");
                        var e = [];
                        if (!this.match(")"))
                            for (; ; ) {
                                var t = this.match("...") ? this.parseSpreadElement() : this.isolateCoverGrammar(this.parseAssignmentExpression);
                                if (e.push(t),
                                this.match(")"))
                                    break;
                                if (this.expectCommaSeparator(),
                                this.match(")"))
                                    break
                            }
                        return this.expect(")"),
                        e
                    }
                    ,
                    e.prototype.isIdentifierName = function(e) {
                        return 3 === e.type || 4 === e.type || 1 === e.type || 5 === e.type
                    }
                    ,
                    e.prototype.parseIdentifierName = function() {
                        var e = this.createNode()
                          , t = this.nextToken();
                        return this.isIdentifierName(t) || this.throwUnexpectedToken(t),
                        this.finalize(e, new a.Identifier(t.value))
                    }
                    ,
                    e.prototype.parseNewExpression = function() {
                        var e, t = this.createNode(), i = this.parseIdentifierName();
                        if (s.assert("new" === i.name, "New expression must start with `new`"),
                        this.match("."))
                            if (this.nextToken(),
                            3 === this.lookahead.type && this.context.inFunctionBody && "target" === this.lookahead.value) {
                                var r = this.parseIdentifierName();
                                e = new a.MetaProperty(i,r)
                            } else
                                this.throwUnexpectedToken(this.lookahead);
                        else {
                            var n = this.isolateCoverGrammar(this.parseLeftHandSideExpression)
                              , o = this.match("(") ? this.parseArguments() : [];
                            e = new a.NewExpression(n,o),
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1
                        }
                        return this.finalize(t, e)
                    }
                    ,
                    e.prototype.parseAsyncArgument = function() {
                        var e = this.parseAssignmentExpression();
                        return this.context.firstCoverInitializedNameError = null,
                        e
                    }
                    ,
                    e.prototype.parseAsyncArguments = function() {
                        this.expect("(");
                        var e = [];
                        if (!this.match(")"))
                            for (; ; ) {
                                var t = this.match("...") ? this.parseSpreadElement() : this.isolateCoverGrammar(this.parseAsyncArgument);
                                if (e.push(t),
                                this.match(")"))
                                    break;
                                if (this.expectCommaSeparator(),
                                this.match(")"))
                                    break
                            }
                        return this.expect(")"),
                        e
                    }
                    ,
                    e.prototype.parseLeftHandSideExpressionAllowCall = function() {
                        var e, t = this.lookahead, i = this.matchContextualKeyword("async"), s = this.context.allowIn;
                        for (this.context.allowIn = !0,
                        this.matchKeyword("super") && this.context.inFunctionBody ? (e = this.createNode(),
                        this.nextToken(),
                        e = this.finalize(e, new a.Super),
                        this.match("(") || this.match(".") || this.match("[") || this.throwUnexpectedToken(this.lookahead)) : e = this.inheritCoverGrammar(this.matchKeyword("new") ? this.parseNewExpression : this.parsePrimaryExpression); ; )
                            if (this.match(".")) {
                                this.context.isBindingElement = !1,
                                this.context.isAssignmentTarget = !0,
                                this.expect(".");
                                var r = this.parseIdentifierName();
                                e = this.finalize(this.startNode(t), new a.StaticMemberExpression(e,r))
                            } else if (this.match("(")) {
                                var n = i && t.lineNumber === this.lookahead.lineNumber;
                                this.context.isBindingElement = !1,
                                this.context.isAssignmentTarget = !1;
                                var o = n ? this.parseAsyncArguments() : this.parseArguments();
                                if (e = this.finalize(this.startNode(t), new a.CallExpression(e,o)),
                                n && this.match("=>")) {
                                    for (var u = 0; u < o.length; ++u)
                                        this.reinterpretExpressionAsPattern(o[u]);
                                    e = {
                                        type: "ArrowParameterPlaceHolder",
                                        params: o,
                                        async: !0
                                    }
                                }
                            } else if (this.match("["))
                                this.context.isBindingElement = !1,
                                this.context.isAssignmentTarget = !0,
                                this.expect("["),
                                r = this.isolateCoverGrammar(this.parseExpression),
                                this.expect("]"),
                                e = this.finalize(this.startNode(t), new a.ComputedMemberExpression(e,r));
                            else {
                                if (10 !== this.lookahead.type || !this.lookahead.head)
                                    break;
                                var h = this.parseTemplateLiteral();
                                e = this.finalize(this.startNode(t), new a.TaggedTemplateExpression(e,h))
                            }
                        return this.context.allowIn = s,
                        e
                    }
                    ,
                    e.prototype.parseSuper = function() {
                        var e = this.createNode();
                        return this.expectKeyword("super"),
                        this.match("[") || this.match(".") || this.throwUnexpectedToken(this.lookahead),
                        this.finalize(e, new a.Super)
                    }
                    ,
                    e.prototype.parseLeftHandSideExpression = function() {
                        s.assert(this.context.allowIn, "callee of new expression always allow in keyword.");
                        for (var e = this.startNode(this.lookahead), t = this.matchKeyword("super") && this.context.inFunctionBody ? this.parseSuper() : this.inheritCoverGrammar(this.matchKeyword("new") ? this.parseNewExpression : this.parsePrimaryExpression); ; )
                            if (this.match("[")) {
                                this.context.isBindingElement = !1,
                                this.context.isAssignmentTarget = !0,
                                this.expect("[");
                                var i = this.isolateCoverGrammar(this.parseExpression);
                                this.expect("]"),
                                t = this.finalize(e, new a.ComputedMemberExpression(t,i))
                            } else if (this.match("."))
                                this.context.isBindingElement = !1,
                                this.context.isAssignmentTarget = !0,
                                this.expect("."),
                                i = this.parseIdentifierName(),
                                t = this.finalize(e, new a.StaticMemberExpression(t,i));
                            else {
                                if (10 !== this.lookahead.type || !this.lookahead.head)
                                    break;
                                var r = this.parseTemplateLiteral();
                                t = this.finalize(e, new a.TaggedTemplateExpression(t,r))
                            }
                        return t
                    }
                    ,
                    e.prototype.parseUpdateExpression = function() {
                        var e, t = this.lookahead;
                        if (this.match("++") || this.match("--")) {
                            var i = this.startNode(t)
                              , s = this.nextToken();
                            e = this.inheritCoverGrammar(this.parseUnaryExpression),
                            this.context.strict && e.type === u.Syntax.Identifier && this.scanner.isRestrictedWord(e.name) && this.tolerateError(n.Messages.StrictLHSPrefix),
                            this.context.isAssignmentTarget || this.tolerateError(n.Messages.InvalidLHSInAssignment);
                            var r = !0;
                            e = this.finalize(i, new a.UpdateExpression(s.value,e,r)),
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1
                        } else if (e = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall),
                        !this.hasLineTerminator && 7 === this.lookahead.type && (this.match("++") || this.match("--"))) {
                            this.context.strict && e.type === u.Syntax.Identifier && this.scanner.isRestrictedWord(e.name) && this.tolerateError(n.Messages.StrictLHSPostfix),
                            this.context.isAssignmentTarget || this.tolerateError(n.Messages.InvalidLHSInAssignment),
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1;
                            var o = this.nextToken().value;
                            r = !1,
                            e = this.finalize(this.startNode(t), new a.UpdateExpression(o,e,r))
                        }
                        return e
                    }
                    ,
                    e.prototype.parseAwaitExpression = function() {
                        var e = this.createNode();
                        this.nextToken();
                        var t = this.parseUnaryExpression();
                        return this.finalize(e, new a.AwaitExpression(t))
                    }
                    ,
                    e.prototype.parseUnaryExpression = function() {
                        var e;
                        if (this.match("+") || this.match("-") || this.match("~") || this.match("!") || this.matchKeyword("delete") || this.matchKeyword("void") || this.matchKeyword("typeof")) {
                            var t = this.startNode(this.lookahead)
                              , i = this.nextToken();
                            e = this.inheritCoverGrammar(this.parseUnaryExpression),
                            e = this.finalize(t, new a.UnaryExpression(i.value,e)),
                            this.context.strict && "delete" === e.operator && e.argument.type === u.Syntax.Identifier && this.tolerateError(n.Messages.StrictDelete),
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1
                        } else
                            e = this.context.await && this.matchContextualKeyword("await") ? this.parseAwaitExpression() : this.parseUpdateExpression();
                        return e
                    }
                    ,
                    e.prototype.parseExponentiationExpression = function() {
                        var e = this.lookahead
                          , t = this.inheritCoverGrammar(this.parseUnaryExpression);
                        if (t.type !== u.Syntax.UnaryExpression && this.match("**")) {
                            this.nextToken(),
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1;
                            var i = t
                              , s = this.isolateCoverGrammar(this.parseExponentiationExpression);
                            t = this.finalize(this.startNode(e), new a.BinaryExpression("**",i,s))
                        }
                        return t
                    }
                    ,
                    e.prototype.binaryPrecedence = function(e) {
                        var t = e.value;
                        return 7 === e.type ? this.operatorPrecedence[t] || 0 : 4 === e.type && ("instanceof" === t || this.context.allowIn && "in" === t) ? 7 : 0
                    }
                    ,
                    e.prototype.parseBinaryExpression = function() {
                        var e = this.lookahead
                          , t = this.inheritCoverGrammar(this.parseExponentiationExpression)
                          , i = this.lookahead
                          , s = this.binaryPrecedence(i);
                        if (s > 0) {
                            this.nextToken(),
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1;
                            for (var r = [e, this.lookahead], n = t, o = this.isolateCoverGrammar(this.parseExponentiationExpression), u = [n, i.value, o], h = [s]; !((s = this.binaryPrecedence(this.lookahead)) <= 0); ) {
                                for (; u.length > 2 && s <= h[h.length - 1]; ) {
                                    o = u.pop();
                                    var c = u.pop();
                                    h.pop(),
                                    n = u.pop(),
                                    r.pop();
                                    var l = this.startNode(r[r.length - 1]);
                                    u.push(this.finalize(l, new a.BinaryExpression(c,n,o)))
                                }
                                u.push(this.nextToken().value),
                                h.push(s),
                                r.push(this.lookahead),
                                u.push(this.isolateCoverGrammar(this.parseExponentiationExpression))
                            }
                            var p = u.length - 1;
                            t = u[p];
                            for (var d = r.pop(); p > 1; ) {
                                var m = r.pop()
                                  , x = d && d.lineStart;
                                l = this.startNode(m, x),
                                c = u[p - 1],
                                t = this.finalize(l, new a.BinaryExpression(c,u[p - 2],t)),
                                p -= 2,
                                d = m
                            }
                        }
                        return t
                    }
                    ,
                    e.prototype.parseConditionalExpression = function() {
                        var e = this.lookahead
                          , t = this.inheritCoverGrammar(this.parseBinaryExpression);
                        if (this.match("?")) {
                            this.nextToken();
                            var i = this.context.allowIn;
                            this.context.allowIn = !0;
                            var s = this.isolateCoverGrammar(this.parseAssignmentExpression);
                            this.context.allowIn = i,
                            this.expect(":");
                            var r = this.isolateCoverGrammar(this.parseAssignmentExpression);
                            t = this.finalize(this.startNode(e), new a.ConditionalExpression(t,s,r)),
                            this.context.isAssignmentTarget = !1,
                            this.context.isBindingElement = !1
                        }
                        return t
                    }
                    ,
                    e.prototype.checkPatternParam = function(e, t) {
                        switch (t.type) {
                        case u.Syntax.Identifier:
                            this.validateParam(e, t, t.name);
                            break;
                        case u.Syntax.RestElement:
                            this.checkPatternParam(e, t.argument);
                            break;
                        case u.Syntax.AssignmentPattern:
                            this.checkPatternParam(e, t.left);
                            break;
                        case u.Syntax.ArrayPattern:
                            for (var i = 0; i < t.elements.length; i++)
                                null !== t.elements[i] && this.checkPatternParam(e, t.elements[i]);
                            break;
                        case u.Syntax.ObjectPattern:
                            for (i = 0; i < t.properties.length; i++)
                                this.checkPatternParam(e, t.properties[i].value)
                        }
                        e.simple = e.simple && t instanceof a.Identifier
                    }
                    ,
                    e.prototype.reinterpretAsCoverFormalsList = function(e) {
                        var t, i = [e], s = !1;
                        switch (e.type) {
                        case u.Syntax.Identifier:
                            break;
                        case "ArrowParameterPlaceHolder":
                            i = e.params,
                            s = e.async;
                            break;
                        default:
                            return null
                        }
                        t = {
                            simple: !0,
                            paramSet: {}
                        };
                        for (var r = 0; r < i.length; ++r)
                            (a = i[r]).type === u.Syntax.AssignmentPattern ? a.right.type === u.Syntax.YieldExpression && (a.right.argument && this.throwUnexpectedToken(this.lookahead),
                            a.right.type = u.Syntax.Identifier,
                            a.right.name = "yield",
                            delete a.right.argument,
                            delete a.right.delegate) : s && a.type === u.Syntax.Identifier && "await" === a.name && this.throwUnexpectedToken(this.lookahead),
                            this.checkPatternParam(t, a),
                            i[r] = a;
                        if (this.context.strict || !this.context.allowYield)
                            for (r = 0; r < i.length; ++r) {
                                var a;
                                (a = i[r]).type === u.Syntax.YieldExpression && this.throwUnexpectedToken(this.lookahead)
                            }
                        if (t.message === n.Messages.StrictParamDupe) {
                            var o = this.context.strict ? t.stricted : t.firstRestricted;
                            this.throwUnexpectedToken(o, t.message)
                        }
                        return {
                            simple: t.simple,
                            params: i,
                            stricted: t.stricted,
                            firstRestricted: t.firstRestricted,
                            message: t.message
                        }
                    }
                    ,
                    e.prototype.parseAssignmentExpression = function() {
                        var e;
                        if (!this.context.allowYield && this.matchKeyword("yield"))
                            e = this.parseYieldExpression();
                        else {
                            var t = this.lookahead
                              , i = t;
                            if (e = this.parseConditionalExpression(),
                            3 === i.type && i.lineNumber === this.lookahead.lineNumber && "async" === i.value && (3 === this.lookahead.type || this.matchKeyword("yield"))) {
                                var s = this.parsePrimaryExpression();
                                this.reinterpretExpressionAsPattern(s),
                                e = {
                                    type: "ArrowParameterPlaceHolder",
                                    params: [s],
                                    async: !0
                                }
                            }
                            if ("ArrowParameterPlaceHolder" === e.type || this.match("=>")) {
                                this.context.isAssignmentTarget = !1,
                                this.context.isBindingElement = !1;
                                var r = e.async
                                  , o = this.reinterpretAsCoverFormalsList(e);
                                if (o) {
                                    this.hasLineTerminator && this.tolerateUnexpectedToken(this.lookahead),
                                    this.context.firstCoverInitializedNameError = null;
                                    var h = this.context.strict
                                      , c = this.context.allowStrictDirective;
                                    this.context.allowStrictDirective = o.simple;
                                    var l = this.context.allowYield
                                      , p = this.context.await;
                                    this.context.allowYield = !0,
                                    this.context.await = r;
                                    var d = this.startNode(t);
                                    this.expect("=>");
                                    var m = void 0;
                                    if (this.match("{")) {
                                        var x = this.context.allowIn;
                                        this.context.allowIn = !0,
                                        m = this.parseFunctionSourceElements(),
                                        this.context.allowIn = x
                                    } else
                                        m = this.isolateCoverGrammar(this.parseAssignmentExpression);
                                    var D = m.type !== u.Syntax.BlockStatement;
                                    this.context.strict && o.firstRestricted && this.throwUnexpectedToken(o.firstRestricted, o.message),
                                    this.context.strict && o.stricted && this.tolerateUnexpectedToken(o.stricted, o.message),
                                    e = r ? this.finalize(d, new a.AsyncArrowFunctionExpression(o.params,m,D)) : this.finalize(d, new a.ArrowFunctionExpression(o.params,m,D)),
                                    this.context.strict = h,
                                    this.context.allowStrictDirective = c,
                                    this.context.allowYield = l,
                                    this.context.await = p
                                }
                            } else if (this.matchAssign()) {
                                if (this.context.isAssignmentTarget || this.tolerateError(n.Messages.InvalidLHSInAssignment),
                                this.context.strict && e.type === u.Syntax.Identifier) {
                                    var f = e;
                                    this.scanner.isRestrictedWord(f.name) && this.tolerateUnexpectedToken(i, n.Messages.StrictLHSAssignment),
                                    this.scanner.isStrictModeReservedWord(f.name) && this.tolerateUnexpectedToken(i, n.Messages.StrictReservedWord)
                                }
                                this.match("=") ? this.reinterpretExpressionAsPattern(e) : (this.context.isAssignmentTarget = !1,
                                this.context.isBindingElement = !1);
                                var E = (i = this.nextToken()).value
                                  , y = this.isolateCoverGrammar(this.parseAssignmentExpression);
                                e = this.finalize(this.startNode(t), new a.AssignmentExpression(E,e,y)),
                                this.context.firstCoverInitializedNameError = null
                            }
                        }
                        return e
                    }
                    ,
                    e.prototype.parseExpression = function() {
                        var e = this.lookahead
                          , t = this.isolateCoverGrammar(this.parseAssignmentExpression);
                        if (this.match(",")) {
                            var i = [];
                            for (i.push(t); 2 !== this.lookahead.type && this.match(","); )
                                this.nextToken(),
                                i.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
                            t = this.finalize(this.startNode(e), new a.SequenceExpression(i))
                        }
                        return t
                    }
                    ,
                    e.prototype.parseStatementListItem = function() {
                        var e;
                        if (this.context.isAssignmentTarget = !0,
                        this.context.isBindingElement = !0,
                        4 === this.lookahead.type)
                            switch (this.lookahead.value) {
                            case "export":
                                this.context.isModule || this.tolerateUnexpectedToken(this.lookahead, n.Messages.IllegalExportDeclaration),
                                e = this.parseExportDeclaration();
                                break;
                            case "import":
                                this.context.isModule || this.tolerateUnexpectedToken(this.lookahead, n.Messages.IllegalImportDeclaration),
                                e = this.parseImportDeclaration();
                                break;
                            case "const":
                                e = this.parseLexicalDeclaration({
                                    inFor: !1
                                });
                                break;
                            case "function":
                                e = this.parseFunctionDeclaration();
                                break;
                            case "class":
                                e = this.parseClassDeclaration();
                                break;
                            case "let":
                                e = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({
                                    inFor: !1
                                }) : this.parseStatement();
                                break;
                            default:
                                e = this.parseStatement()
                            }
                        else
                            e = this.parseStatement();
                        return e
                    }
                    ,
                    e.prototype.parseBlock = function() {
                        var e = this.createNode();
                        this.expect("{");
                        for (var t = []; !this.match("}"); )
                            t.push(this.parseStatementListItem());
                        return this.expect("}"),
                        this.finalize(e, new a.BlockStatement(t))
                    }
                    ,
                    e.prototype.parseLexicalBinding = function(e, t) {
                        var i = this.createNode()
                          , s = this.parsePattern([], e);
                        this.context.strict && s.type === u.Syntax.Identifier && this.scanner.isRestrictedWord(s.name) && this.tolerateError(n.Messages.StrictVarName);
                        var r = null;
                        return "const" === e ? this.matchKeyword("in") || this.matchContextualKeyword("of") || (this.match("=") ? (this.nextToken(),
                        r = this.isolateCoverGrammar(this.parseAssignmentExpression)) : this.throwError(n.Messages.DeclarationMissingInitializer, "const")) : (!t.inFor && s.type !== u.Syntax.Identifier || this.match("=")) && (this.expect("="),
                        r = this.isolateCoverGrammar(this.parseAssignmentExpression)),
                        this.finalize(i, new a.VariableDeclarator(s,r))
                    }
                    ,
                    e.prototype.parseBindingList = function(e, t) {
                        for (var i = [this.parseLexicalBinding(e, t)]; this.match(","); )
                            this.nextToken(),
                            i.push(this.parseLexicalBinding(e, t));
                        return i
                    }
                    ,
                    e.prototype.isLexicalDeclaration = function() {
                        var e = this.scanner.saveState();
                        this.scanner.scanComments();
                        var t = this.scanner.lex();
                        return this.scanner.restoreState(e),
                        3 === t.type || 7 === t.type && "[" === t.value || 7 === t.type && "{" === t.value || 4 === t.type && "let" === t.value || 4 === t.type && "yield" === t.value
                    }
                    ,
                    e.prototype.parseLexicalDeclaration = function(e) {
                        var t = this.createNode()
                          , i = this.nextToken().value;
                        s.assert("let" === i || "const" === i, "Lexical declaration must be either let or const");
                        var r = this.parseBindingList(i, e);
                        return this.consumeSemicolon(),
                        this.finalize(t, new a.VariableDeclaration(r,i))
                    }
                    ,
                    e.prototype.parseBindingRestElement = function(e, t) {
                        var i = this.createNode();
                        this.expect("...");
                        var s = this.parsePattern(e, t);
                        return this.finalize(i, new a.RestElement(s))
                    }
                    ,
                    e.prototype.parseArrayPattern = function(e, t) {
                        var i = this.createNode();
                        this.expect("[");
                        for (var s = []; !this.match("]"); )
                            if (this.match(","))
                                this.nextToken(),
                                s.push(null);
                            else {
                                if (this.match("...")) {
                                    s.push(this.parseBindingRestElement(e, t));
                                    break
                                }
                                s.push(this.parsePatternWithDefault(e, t)),
                                this.match("]") || this.expect(",")
                            }
                        return this.expect("]"),
                        this.finalize(i, new a.ArrayPattern(s))
                    }
                    ,
                    e.prototype.parsePropertyPattern = function(e, t) {
                        var i, s, r = this.createNode(), n = !1, o = !1;
                        if (3 === this.lookahead.type) {
                            var u = this.lookahead;
                            i = this.parseVariableIdentifier();
                            var h = this.finalize(r, new a.Identifier(u.value));
                            if (this.match("=")) {
                                e.push(u),
                                o = !0,
                                this.nextToken();
                                var c = this.parseAssignmentExpression();
                                s = this.finalize(this.startNode(u), new a.AssignmentPattern(h,c))
                            } else
                                this.match(":") ? (this.expect(":"),
                                s = this.parsePatternWithDefault(e, t)) : (e.push(u),
                                o = !0,
                                s = h)
                        } else
                            n = this.match("["),
                            i = this.parseObjectPropertyKey(),
                            this.expect(":"),
                            s = this.parsePatternWithDefault(e, t);
                        return this.finalize(r, new a.Property("init",i,n,s,!1,o))
                    }
                    ,
                    e.prototype.parseObjectPattern = function(e, t) {
                        var i = this.createNode()
                          , s = [];
                        for (this.expect("{"); !this.match("}"); )
                            s.push(this.parsePropertyPattern(e, t)),
                            this.match("}") || this.expect(",");
                        return this.expect("}"),
                        this.finalize(i, new a.ObjectPattern(s))
                    }
                    ,
                    e.prototype.parsePattern = function(e, t) {
                        var i;
                        return this.match("[") ? i = this.parseArrayPattern(e, t) : this.match("{") ? i = this.parseObjectPattern(e, t) : (!this.matchKeyword("let") || "const" !== t && "let" !== t || this.tolerateUnexpectedToken(this.lookahead, n.Messages.LetInLexicalBinding),
                        e.push(this.lookahead),
                        i = this.parseVariableIdentifier(t)),
                        i
                    }
                    ,
                    e.prototype.parsePatternWithDefault = function(e, t) {
                        var i = this.lookahead
                          , s = this.parsePattern(e, t);
                        if (this.match("=")) {
                            this.nextToken();
                            var r = this.context.allowYield;
                            this.context.allowYield = !0;
                            var n = this.isolateCoverGrammar(this.parseAssignmentExpression);
                            this.context.allowYield = r,
                            s = this.finalize(this.startNode(i), new a.AssignmentPattern(s,n))
                        }
                        return s
                    }
                    ,
                    e.prototype.parseVariableIdentifier = function(e) {
                        var t = this.createNode()
                          , i = this.nextToken();
                        return 4 === i.type && "yield" === i.value ? this.context.strict ? this.tolerateUnexpectedToken(i, n.Messages.StrictReservedWord) : this.context.allowYield || this.throwUnexpectedToken(i) : 3 !== i.type ? this.context.strict && 4 === i.type && this.scanner.isStrictModeReservedWord(i.value) ? this.tolerateUnexpectedToken(i, n.Messages.StrictReservedWord) : (this.context.strict || "let" !== i.value || "var" !== e) && this.throwUnexpectedToken(i) : (this.context.isModule || this.context.await) && 3 === i.type && "await" === i.value && this.tolerateUnexpectedToken(i),
                        this.finalize(t, new a.Identifier(i.value))
                    }
                    ,
                    e.prototype.parseVariableDeclaration = function(e) {
                        var t = this.createNode()
                          , i = this.parsePattern([], "var");
                        this.context.strict && i.type === u.Syntax.Identifier && this.scanner.isRestrictedWord(i.name) && this.tolerateError(n.Messages.StrictVarName);
                        var s = null;
                        return this.match("=") ? (this.nextToken(),
                        s = this.isolateCoverGrammar(this.parseAssignmentExpression)) : i.type === u.Syntax.Identifier || e.inFor || this.expect("="),
                        this.finalize(t, new a.VariableDeclarator(i,s))
                    }
                    ,
                    e.prototype.parseVariableDeclarationList = function(e) {
                        var t = {
                            inFor: e.inFor
                        }
                          , i = [];
                        for (i.push(this.parseVariableDeclaration(t)); this.match(","); )
                            this.nextToken(),
                            i.push(this.parseVariableDeclaration(t));
                        return i
                    }
                    ,
                    e.prototype.parseVariableStatement = function() {
                        var e = this.createNode();
                        this.expectKeyword("var");
                        var t = this.parseVariableDeclarationList({
                            inFor: !1
                        });
                        return this.consumeSemicolon(),
                        this.finalize(e, new a.VariableDeclaration(t,"var"))
                    }
                    ,
                    e.prototype.parseEmptyStatement = function() {
                        var e = this.createNode();
                        return this.expect(";"),
                        this.finalize(e, new a.EmptyStatement)
                    }
                    ,
                    e.prototype.parseExpressionStatement = function() {
                        var e = this.createNode()
                          , t = this.parseExpression();
                        return this.consumeSemicolon(),
                        this.finalize(e, new a.ExpressionStatement(t))
                    }
                    ,
                    e.prototype.parseIfClause = function() {
                        return this.context.strict && this.matchKeyword("function") && this.tolerateError(n.Messages.StrictFunction),
                        this.parseStatement()
                    }
                    ,
                    e.prototype.parseIfStatement = function() {
                        var e, t = this.createNode(), i = null;
                        this.expectKeyword("if"),
                        this.expect("(");
                        var s = this.parseExpression();
                        return !this.match(")") && this.config.tolerant ? (this.tolerateUnexpectedToken(this.nextToken()),
                        e = this.finalize(this.createNode(), new a.EmptyStatement)) : (this.expect(")"),
                        e = this.parseIfClause(),
                        this.matchKeyword("else") && (this.nextToken(),
                        i = this.parseIfClause())),
                        this.finalize(t, new a.IfStatement(s,e,i))
                    }
                    ,
                    e.prototype.parseDoWhileStatement = function() {
                        var e = this.createNode();
                        this.expectKeyword("do");
                        var t = this.context.inIteration;
                        this.context.inIteration = !0;
                        var i = this.parseStatement();
                        this.context.inIteration = t,
                        this.expectKeyword("while"),
                        this.expect("(");
                        var s = this.parseExpression();
                        return !this.match(")") && this.config.tolerant ? this.tolerateUnexpectedToken(this.nextToken()) : (this.expect(")"),
                        this.match(";") && this.nextToken()),
                        this.finalize(e, new a.DoWhileStatement(i,s))
                    }
                    ,
                    e.prototype.parseWhileStatement = function() {
                        var e, t = this.createNode();
                        this.expectKeyword("while"),
                        this.expect("(");
                        var i = this.parseExpression();
                        if (!this.match(")") && this.config.tolerant)
                            this.tolerateUnexpectedToken(this.nextToken()),
                            e = this.finalize(this.createNode(), new a.EmptyStatement);
                        else {
                            this.expect(")");
                            var s = this.context.inIteration;
                            this.context.inIteration = !0,
                            e = this.parseStatement(),
                            this.context.inIteration = s
                        }
                        return this.finalize(t, new a.WhileStatement(i,e))
                    }
                    ,
                    e.prototype.parseForStatement = function() {
                        var e, t, i, s = null, r = null, o = null, h = !0, c = this.createNode();
                        if (this.expectKeyword("for"),
                        this.expect("("),
                        this.match(";"))
                            this.nextToken();
                        else if (this.matchKeyword("var")) {
                            s = this.createNode(),
                            this.nextToken();
                            var l = this.context.allowIn;
                            this.context.allowIn = !1;
                            var p = this.parseVariableDeclarationList({
                                inFor: !0
                            });
                            if (this.context.allowIn = l,
                            1 === p.length && this.matchKeyword("in")) {
                                var d = p[0];
                                d.init && (d.id.type === u.Syntax.ArrayPattern || d.id.type === u.Syntax.ObjectPattern || this.context.strict) && this.tolerateError(n.Messages.ForInOfLoopInitializer, "for-in"),
                                s = this.finalize(s, new a.VariableDeclaration(p,"var")),
                                this.nextToken(),
                                e = s,
                                t = this.parseExpression(),
                                s = null
                            } else
                                1 === p.length && null === p[0].init && this.matchContextualKeyword("of") ? (s = this.finalize(s, new a.VariableDeclaration(p,"var")),
                                this.nextToken(),
                                e = s,
                                t = this.parseAssignmentExpression(),
                                s = null,
                                h = !1) : (s = this.finalize(s, new a.VariableDeclaration(p,"var")),
                                this.expect(";"))
                        } else if (this.matchKeyword("const") || this.matchKeyword("let")) {
                            s = this.createNode();
                            var m = this.nextToken().value;
                            this.context.strict || "in" !== this.lookahead.value ? (l = this.context.allowIn,
                            this.context.allowIn = !1,
                            p = this.parseBindingList(m, {
                                inFor: !0
                            }),
                            this.context.allowIn = l,
                            1 === p.length && null === p[0].init && this.matchKeyword("in") ? (s = this.finalize(s, new a.VariableDeclaration(p,m)),
                            this.nextToken(),
                            e = s,
                            t = this.parseExpression(),
                            s = null) : 1 === p.length && null === p[0].init && this.matchContextualKeyword("of") ? (s = this.finalize(s, new a.VariableDeclaration(p,m)),
                            this.nextToken(),
                            e = s,
                            t = this.parseAssignmentExpression(),
                            s = null,
                            h = !1) : (this.consumeSemicolon(),
                            s = this.finalize(s, new a.VariableDeclaration(p,m)))) : (s = this.finalize(s, new a.Identifier(m)),
                            this.nextToken(),
                            e = s,
                            t = this.parseExpression(),
                            s = null)
                        } else {
                            var x = this.lookahead;
                            if (l = this.context.allowIn,
                            this.context.allowIn = !1,
                            s = this.inheritCoverGrammar(this.parseAssignmentExpression),
                            this.context.allowIn = l,
                            this.matchKeyword("in"))
                                this.context.isAssignmentTarget && s.type !== u.Syntax.AssignmentExpression || this.tolerateError(n.Messages.InvalidLHSInForIn),
                                this.nextToken(),
                                this.reinterpretExpressionAsPattern(s),
                                e = s,
                                t = this.parseExpression(),
                                s = null;
                            else if (this.matchContextualKeyword("of"))
                                this.context.isAssignmentTarget && s.type !== u.Syntax.AssignmentExpression || this.tolerateError(n.Messages.InvalidLHSInForLoop),
                                this.nextToken(),
                                this.reinterpretExpressionAsPattern(s),
                                e = s,
                                t = this.parseAssignmentExpression(),
                                s = null,
                                h = !1;
                            else {
                                if (this.match(",")) {
                                    for (var D = [s]; this.match(","); )
                                        this.nextToken(),
                                        D.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
                                    s = this.finalize(this.startNode(x), new a.SequenceExpression(D))
                                }
                                this.expect(";")
                            }
                        }
                        if ("undefined" === typeof e && (this.match(";") || (r = this.parseExpression()),
                        this.expect(";"),
                        this.match(")") || (o = this.parseExpression())),
                        !this.match(")") && this.config.tolerant)
                            this.tolerateUnexpectedToken(this.nextToken()),
                            i = this.finalize(this.createNode(), new a.EmptyStatement);
                        else {
                            this.expect(")");
                            var f = this.context.inIteration;
                            this.context.inIteration = !0,
                            i = this.isolateCoverGrammar(this.parseStatement),
                            this.context.inIteration = f
                        }
                        return "undefined" === typeof e ? this.finalize(c, new a.ForStatement(s,r,o,i)) : h ? this.finalize(c, new a.ForInStatement(e,t,i)) : this.finalize(c, new a.ForOfStatement(e,t,i))
                    }
                    ,
                    e.prototype.parseContinueStatement = function() {
                        var e = this.createNode();
                        this.expectKeyword("continue");
                        var t = null;
                        if (3 === this.lookahead.type && !this.hasLineTerminator) {
                            var i = this.parseVariableIdentifier();
                            t = i;
                            var s = "$" + i.name;
                            Object.prototype.hasOwnProperty.call(this.context.labelSet, s) || this.throwError(n.Messages.UnknownLabel, i.name)
                        }
                        return this.consumeSemicolon(),
                        null !== t || this.context.inIteration || this.throwError(n.Messages.IllegalContinue),
                        this.finalize(e, new a.ContinueStatement(t))
                    }
                    ,
                    e.prototype.parseBreakStatement = function() {
                        var e = this.createNode();
                        this.expectKeyword("break");
                        var t = null;
                        if (3 === this.lookahead.type && !this.hasLineTerminator) {
                            var i = this.parseVariableIdentifier()
                              , s = "$" + i.name;
                            Object.prototype.hasOwnProperty.call(this.context.labelSet, s) || this.throwError(n.Messages.UnknownLabel, i.name),
                            t = i
                        }
                        return this.consumeSemicolon(),
                        null !== t || this.context.inIteration || this.context.inSwitch || this.throwError(n.Messages.IllegalBreak),
                        this.finalize(e, new a.BreakStatement(t))
                    }
                    ,
                    e.prototype.parseReturnStatement = function() {
                        this.context.inFunctionBody || this.tolerateError(n.Messages.IllegalReturn);
                        var e = this.createNode();
                        this.expectKeyword("return");
                        var t = (this.match(";") || this.match("}") || this.hasLineTerminator || 2 === this.lookahead.type) && 8 !== this.lookahead.type && 10 !== this.lookahead.type ? null : this.parseExpression();
                        return this.consumeSemicolon(),
                        this.finalize(e, new a.ReturnStatement(t))
                    }
                    ,
                    e.prototype.parseWithStatement = function() {
                        this.context.strict && this.tolerateError(n.Messages.StrictModeWith);
                        var e, t = this.createNode();
                        this.expectKeyword("with"),
                        this.expect("(");
                        var i = this.parseExpression();
                        return !this.match(")") && this.config.tolerant ? (this.tolerateUnexpectedToken(this.nextToken()),
                        e = this.finalize(this.createNode(), new a.EmptyStatement)) : (this.expect(")"),
                        e = this.parseStatement()),
                        this.finalize(t, new a.WithStatement(i,e))
                    }
                    ,
                    e.prototype.parseSwitchCase = function() {
                        var e, t = this.createNode();
                        this.matchKeyword("default") ? (this.nextToken(),
                        e = null) : (this.expectKeyword("case"),
                        e = this.parseExpression()),
                        this.expect(":");
                        for (var i = []; !(this.match("}") || this.matchKeyword("default") || this.matchKeyword("case")); )
                            i.push(this.parseStatementListItem());
                        return this.finalize(t, new a.SwitchCase(e,i))
                    }
                    ,
                    e.prototype.parseSwitchStatement = function() {
                        var e = this.createNode();
                        this.expectKeyword("switch"),
                        this.expect("(");
                        var t = this.parseExpression();
                        this.expect(")");
                        var i = this.context.inSwitch;
                        this.context.inSwitch = !0;
                        var s = []
                          , r = !1;
                        for (this.expect("{"); !this.match("}"); ) {
                            var o = this.parseSwitchCase();
                            null === o.test && (r && this.throwError(n.Messages.MultipleDefaultsInSwitch),
                            r = !0),
                            s.push(o)
                        }
                        return this.expect("}"),
                        this.context.inSwitch = i,
                        this.finalize(e, new a.SwitchStatement(t,s))
                    }
                    ,
                    e.prototype.parseLabelledStatement = function() {
                        var e, t = this.createNode(), i = this.parseExpression();
                        if (i.type === u.Syntax.Identifier && this.match(":")) {
                            this.nextToken();
                            var s = i
                              , r = "$" + s.name;
                            Object.prototype.hasOwnProperty.call(this.context.labelSet, r) && this.throwError(n.Messages.Redeclaration, "Label", s.name),
                            this.context.labelSet[r] = !0;
                            var o = void 0;
                            if (this.matchKeyword("class"))
                                this.tolerateUnexpectedToken(this.lookahead),
                                o = this.parseClassDeclaration();
                            else if (this.matchKeyword("function")) {
                                var h = this.lookahead
                                  , c = this.parseFunctionDeclaration();
                                this.context.strict ? this.tolerateUnexpectedToken(h, n.Messages.StrictFunction) : c.generator && this.tolerateUnexpectedToken(h, n.Messages.GeneratorInLegacyContext),
                                o = c
                            } else
                                o = this.parseStatement();
                            delete this.context.labelSet[r],
                            e = new a.LabeledStatement(s,o)
                        } else
                            this.consumeSemicolon(),
                            e = new a.ExpressionStatement(i);
                        return this.finalize(t, e)
                    }
                    ,
                    e.prototype.parseThrowStatement = function() {
                        var e = this.createNode();
                        this.expectKeyword("throw"),
                        this.hasLineTerminator && this.throwError(n.Messages.NewlineAfterThrow);
                        var t = this.parseExpression();
                        return this.consumeSemicolon(),
                        this.finalize(e, new a.ThrowStatement(t))
                    }
                    ,
                    e.prototype.parseCatchClause = function() {
                        var e = this.createNode();
                        this.expectKeyword("catch"),
                        this.expect("("),
                        this.match(")") && this.throwUnexpectedToken(this.lookahead);
                        for (var t = [], i = this.parsePattern(t), s = {}, r = 0; r < t.length; r++) {
                            var o = "$" + t[r].value;
                            Object.prototype.hasOwnProperty.call(s, o) && this.tolerateError(n.Messages.DuplicateBinding, t[r].value),
                            s[o] = !0
                        }
                        this.context.strict && i.type === u.Syntax.Identifier && this.scanner.isRestrictedWord(i.name) && this.tolerateError(n.Messages.StrictCatchVariable),
                        this.expect(")");
                        var h = this.parseBlock();
                        return this.finalize(e, new a.CatchClause(i,h))
                    }
                    ,
                    e.prototype.parseFinallyClause = function() {
                        return this.expectKeyword("finally"),
                        this.parseBlock()
                    }
                    ,
                    e.prototype.parseTryStatement = function() {
                        var e = this.createNode();
                        this.expectKeyword("try");
                        var t = this.parseBlock()
                          , i = this.matchKeyword("catch") ? this.parseCatchClause() : null
                          , s = this.matchKeyword("finally") ? this.parseFinallyClause() : null;
                        return i || s || this.throwError(n.Messages.NoCatchOrFinally),
                        this.finalize(e, new a.TryStatement(t,i,s))
                    }
                    ,
                    e.prototype.parseDebuggerStatement = function() {
                        var e = this.createNode();
                        return this.expectKeyword("debugger"),
                        this.consumeSemicolon(),
                        this.finalize(e, new a.DebuggerStatement)
                    }
                    ,
                    e.prototype.parseStatement = function() {
                        var e;
                        switch (this.lookahead.type) {
                        case 1:
                        case 5:
                        case 6:
                        case 8:
                        case 10:
                        case 9:
                            e = this.parseExpressionStatement();
                            break;
                        case 7:
                            var t = this.lookahead.value;
                            e = "{" === t ? this.parseBlock() : "(" === t ? this.parseExpressionStatement() : ";" === t ? this.parseEmptyStatement() : this.parseExpressionStatement();
                            break;
                        case 3:
                            e = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
                            break;
                        case 4:
                            switch (this.lookahead.value) {
                            case "break":
                                e = this.parseBreakStatement();
                                break;
                            case "continue":
                                e = this.parseContinueStatement();
                                break;
                            case "debugger":
                                e = this.parseDebuggerStatement();
                                break;
                            case "do":
                                e = this.parseDoWhileStatement();
                                break;
                            case "for":
                                e = this.parseForStatement();
                                break;
                            case "function":
                                e = this.parseFunctionDeclaration();
                                break;
                            case "if":
                                e = this.parseIfStatement();
                                break;
                            case "return":
                                e = this.parseReturnStatement();
                                break;
                            case "switch":
                                e = this.parseSwitchStatement();
                                break;
                            case "throw":
                                e = this.parseThrowStatement();
                                break;
                            case "try":
                                e = this.parseTryStatement();
                                break;
                            case "var":
                                e = this.parseVariableStatement();
                                break;
                            case "while":
                                e = this.parseWhileStatement();
                                break;
                            case "with":
                                e = this.parseWithStatement();
                                break;
                            default:
                                e = this.parseExpressionStatement()
                            }
                            break;
                        default:
                            e = this.throwUnexpectedToken(this.lookahead)
                        }
                        return e
                    }
                    ,
                    e.prototype.parseFunctionSourceElements = function() {
                        var e = this.createNode();
                        this.expect("{");
                        var t = this.parseDirectivePrologues()
                          , i = this.context.labelSet
                          , s = this.context.inIteration
                          , r = this.context.inSwitch
                          , n = this.context.inFunctionBody;
                        for (this.context.labelSet = {},
                        this.context.inIteration = !1,
                        this.context.inSwitch = !1,
                        this.context.inFunctionBody = !0; 2 !== this.lookahead.type && !this.match("}"); )
                            t.push(this.parseStatementListItem());
                        return this.expect("}"),
                        this.context.labelSet = i,
                        this.context.inIteration = s,
                        this.context.inSwitch = r,
                        this.context.inFunctionBody = n,
                        this.finalize(e, new a.BlockStatement(t))
                    }
                    ,
                    e.prototype.validateParam = function(e, t, i) {
                        var s = "$" + i;
                        this.context.strict ? (this.scanner.isRestrictedWord(i) && (e.stricted = t,
                        e.message = n.Messages.StrictParamName),
                        Object.prototype.hasOwnProperty.call(e.paramSet, s) && (e.stricted = t,
                        e.message = n.Messages.StrictParamDupe)) : e.firstRestricted || (this.scanner.isRestrictedWord(i) ? (e.firstRestricted = t,
                        e.message = n.Messages.StrictParamName) : this.scanner.isStrictModeReservedWord(i) ? (e.firstRestricted = t,
                        e.message = n.Messages.StrictReservedWord) : Object.prototype.hasOwnProperty.call(e.paramSet, s) && (e.stricted = t,
                        e.message = n.Messages.StrictParamDupe)),
                        "function" === typeof Object.defineProperty ? Object.defineProperty(e.paramSet, s, {
                            value: !0,
                            enumerable: !0,
                            writable: !0,
                            configurable: !0
                        }) : e.paramSet[s] = !0
                    }
                    ,
                    e.prototype.parseRestElement = function(e) {
                        var t = this.createNode();
                        this.expect("...");
                        var i = this.parsePattern(e);
                        return this.match("=") && this.throwError(n.Messages.DefaultRestParameter),
                        this.match(")") || this.throwError(n.Messages.ParameterAfterRestParameter),
                        this.finalize(t, new a.RestElement(i))
                    }
                    ,
                    e.prototype.parseFormalParameter = function(e) {
                        for (var t = [], i = this.match("...") ? this.parseRestElement(t) : this.parsePatternWithDefault(t), s = 0; s < t.length; s++)
                            this.validateParam(e, t[s], t[s].value);
                        e.simple = e.simple && i instanceof a.Identifier,
                        e.params.push(i)
                    }
                    ,
                    e.prototype.parseFormalParameters = function(e) {
                        var t;
                        if (t = {
                            simple: !0,
                            params: [],
                            firstRestricted: e
                        },
                        this.expect("("),
                        !this.match(")"))
                            for (t.paramSet = {}; 2 !== this.lookahead.type && (this.parseFormalParameter(t),
                            !this.match(")")) && (this.expect(","),
                            !this.match(")")); )
                                ;
                        return this.expect(")"),
                        {
                            simple: t.simple,
                            params: t.params,
                            stricted: t.stricted,
                            firstRestricted: t.firstRestricted,
                            message: t.message
                        }
                    }
                    ,
                    e.prototype.matchAsyncFunction = function() {
                        var e = this.matchContextualKeyword("async");
                        if (e) {
                            var t = this.scanner.saveState();
                            this.scanner.scanComments();
                            var i = this.scanner.lex();
                            this.scanner.restoreState(t),
                            e = t.lineNumber === i.lineNumber && 4 === i.type && "function" === i.value
                        }
                        return e
                    }
                    ,
                    e.prototype.parseFunctionDeclaration = function(e) {
                        var t = this.createNode()
                          , i = this.matchContextualKeyword("async");
                        i && this.nextToken(),
                        this.expectKeyword("function");
                        var s, r = !i && this.match("*");
                        r && this.nextToken();
                        var o = null
                          , u = null;
                        if (!e || !this.match("(")) {
                            var h = this.lookahead;
                            o = this.parseVariableIdentifier(),
                            this.context.strict ? this.scanner.isRestrictedWord(h.value) && this.tolerateUnexpectedToken(h, n.Messages.StrictFunctionName) : this.scanner.isRestrictedWord(h.value) ? (u = h,
                            s = n.Messages.StrictFunctionName) : this.scanner.isStrictModeReservedWord(h.value) && (u = h,
                            s = n.Messages.StrictReservedWord)
                        }
                        var c = this.context.await
                          , l = this.context.allowYield;
                        this.context.await = i,
                        this.context.allowYield = !r;
                        var p = this.parseFormalParameters(u)
                          , d = p.params
                          , m = p.stricted;
                        u = p.firstRestricted,
                        p.message && (s = p.message);
                        var x = this.context.strict
                          , D = this.context.allowStrictDirective;
                        this.context.allowStrictDirective = p.simple;
                        var f = this.parseFunctionSourceElements();
                        return this.context.strict && u && this.throwUnexpectedToken(u, s),
                        this.context.strict && m && this.tolerateUnexpectedToken(m, s),
                        this.context.strict = x,
                        this.context.allowStrictDirective = D,
                        this.context.await = c,
                        this.context.allowYield = l,
                        i ? this.finalize(t, new a.AsyncFunctionDeclaration(o,d,f)) : this.finalize(t, new a.FunctionDeclaration(o,d,f,r))
                    }
                    ,
                    e.prototype.parseFunctionExpression = function() {
                        var e = this.createNode()
                          , t = this.matchContextualKeyword("async");
                        t && this.nextToken(),
                        this.expectKeyword("function");
                        var i, s = !t && this.match("*");
                        s && this.nextToken();
                        var r, o = null, u = this.context.await, h = this.context.allowYield;
                        if (this.context.await = t,
                        this.context.allowYield = !s,
                        !this.match("(")) {
                            var c = this.lookahead;
                            o = this.context.strict || s || !this.matchKeyword("yield") ? this.parseVariableIdentifier() : this.parseIdentifierName(),
                            this.context.strict ? this.scanner.isRestrictedWord(c.value) && this.tolerateUnexpectedToken(c, n.Messages.StrictFunctionName) : this.scanner.isRestrictedWord(c.value) ? (r = c,
                            i = n.Messages.StrictFunctionName) : this.scanner.isStrictModeReservedWord(c.value) && (r = c,
                            i = n.Messages.StrictReservedWord)
                        }
                        var l = this.parseFormalParameters(r)
                          , p = l.params
                          , d = l.stricted;
                        r = l.firstRestricted,
                        l.message && (i = l.message);
                        var m = this.context.strict
                          , x = this.context.allowStrictDirective;
                        this.context.allowStrictDirective = l.simple;
                        var D = this.parseFunctionSourceElements();
                        return this.context.strict && r && this.throwUnexpectedToken(r, i),
                        this.context.strict && d && this.tolerateUnexpectedToken(d, i),
                        this.context.strict = m,
                        this.context.allowStrictDirective = x,
                        this.context.await = u,
                        this.context.allowYield = h,
                        t ? this.finalize(e, new a.AsyncFunctionExpression(o,p,D)) : this.finalize(e, new a.FunctionExpression(o,p,D,s))
                    }
                    ,
                    e.prototype.parseDirective = function() {
                        var e = this.lookahead
                          , t = this.createNode()
                          , i = this.parseExpression()
                          , s = i.type === u.Syntax.Literal ? this.getTokenRaw(e).slice(1, -1) : null;
                        return this.consumeSemicolon(),
                        this.finalize(t, s ? new a.Directive(i,s) : new a.ExpressionStatement(i))
                    }
                    ,
                    e.prototype.parseDirectivePrologues = function() {
                        for (var e = null, t = []; ; ) {
                            var i = this.lookahead;
                            if (8 !== i.type)
                                break;
                            var s = this.parseDirective();
                            t.push(s);
                            var r = s.directive;
                            if ("string" !== typeof r)
                                break;
                            "use strict" === r ? (this.context.strict = !0,
                            e && this.tolerateUnexpectedToken(e, n.Messages.StrictOctalLiteral),
                            this.context.allowStrictDirective || this.tolerateUnexpectedToken(i, n.Messages.IllegalLanguageModeDirective)) : !e && i.octal && (e = i)
                        }
                        return t
                    }
                    ,
                    e.prototype.qualifiedPropertyName = function(e) {
                        switch (e.type) {
                        case 3:
                        case 8:
                        case 1:
                        case 5:
                        case 6:
                        case 4:
                            return !0;
                        case 7:
                            return "[" === e.value
                        }
                        return !1
                    }
                    ,
                    e.prototype.parseGetterMethod = function() {
                        var e = this.createNode()
                          , t = this.context.allowYield;
                        this.context.allowYield = !0;
                        var i = this.parseFormalParameters();
                        i.params.length > 0 && this.tolerateError(n.Messages.BadGetterArity);
                        var s = this.parsePropertyMethod(i);
                        return this.context.allowYield = t,
                        this.finalize(e, new a.FunctionExpression(null,i.params,s,!1))
                    }
                    ,
                    e.prototype.parseSetterMethod = function() {
                        var e = this.createNode()
                          , t = this.context.allowYield;
                        this.context.allowYield = !0;
                        var i = this.parseFormalParameters();
                        1 !== i.params.length ? this.tolerateError(n.Messages.BadSetterArity) : i.params[0]instanceof a.RestElement && this.tolerateError(n.Messages.BadSetterRestParameter);
                        var s = this.parsePropertyMethod(i);
                        return this.context.allowYield = t,
                        this.finalize(e, new a.FunctionExpression(null,i.params,s,!1))
                    }
                    ,
                    e.prototype.parseGeneratorMethod = function() {
                        var e = this.createNode()
                          , t = this.context.allowYield;
                        this.context.allowYield = !0;
                        var i = this.parseFormalParameters();
                        this.context.allowYield = !1;
                        var s = this.parsePropertyMethod(i);
                        return this.context.allowYield = t,
                        this.finalize(e, new a.FunctionExpression(null,i.params,s,!0))
                    }
                    ,
                    e.prototype.isStartOfExpression = function() {
                        var e = !0
                          , t = this.lookahead.value;
                        switch (this.lookahead.type) {
                        case 7:
                            e = "[" === t || "(" === t || "{" === t || "+" === t || "-" === t || "!" === t || "~" === t || "++" === t || "--" === t || "/" === t || "/=" === t;
                            break;
                        case 4:
                            e = "class" === t || "delete" === t || "function" === t || "let" === t || "new" === t || "super" === t || "this" === t || "typeof" === t || "void" === t || "yield" === t
                        }
                        return e
                    }
                    ,
                    e.prototype.parseYieldExpression = function() {
                        var e = this.createNode();
                        this.expectKeyword("yield");
                        var t = null
                          , i = !1;
                        if (!this.hasLineTerminator) {
                            var s = this.context.allowYield;
                            this.context.allowYield = !1,
                            (i = this.match("*")) ? (this.nextToken(),
                            t = this.parseAssignmentExpression()) : this.isStartOfExpression() && (t = this.parseAssignmentExpression()),
                            this.context.allowYield = s
                        }
                        return this.finalize(e, new a.YieldExpression(t,i))
                    }
                    ,
                    e.prototype.parseClassElement = function(e) {
                        var t = this.lookahead
                          , i = this.createNode()
                          , s = ""
                          , r = null
                          , o = null
                          , u = !1
                          , h = !1
                          , c = !1
                          , l = !1;
                        if (this.match("*"))
                            this.nextToken();
                        else if (u = this.match("["),
                        "static" === (r = this.parseObjectPropertyKey()).name && (this.qualifiedPropertyName(this.lookahead) || this.match("*")) && (t = this.lookahead,
                        c = !0,
                        u = this.match("["),
                        this.match("*") ? this.nextToken() : r = this.parseObjectPropertyKey()),
                        3 === t.type && !this.hasLineTerminator && "async" === t.value) {
                            var p = this.lookahead.value;
                            ":" !== p && "(" !== p && "*" !== p && (l = !0,
                            t = this.lookahead,
                            r = this.parseObjectPropertyKey(),
                            3 === t.type && "constructor" === t.value && this.tolerateUnexpectedToken(t, n.Messages.ConstructorIsAsync))
                        }
                        var d = this.qualifiedPropertyName(this.lookahead);
                        return 3 === t.type ? "get" === t.value && d ? (s = "get",
                        u = this.match("["),
                        r = this.parseObjectPropertyKey(),
                        this.context.allowYield = !1,
                        o = this.parseGetterMethod()) : "set" === t.value && d && (s = "set",
                        u = this.match("["),
                        r = this.parseObjectPropertyKey(),
                        o = this.parseSetterMethod()) : 7 === t.type && "*" === t.value && d && (s = "init",
                        u = this.match("["),
                        r = this.parseObjectPropertyKey(),
                        o = this.parseGeneratorMethod(),
                        h = !0),
                        !s && r && this.match("(") && (s = "init",
                        o = l ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction(),
                        h = !0),
                        s || this.throwUnexpectedToken(this.lookahead),
                        "init" === s && (s = "method"),
                        u || (c && this.isPropertyKey(r, "prototype") && this.throwUnexpectedToken(t, n.Messages.StaticPrototype),
                        !c && this.isPropertyKey(r, "constructor") && (("method" !== s || !h || o && o.generator) && this.throwUnexpectedToken(t, n.Messages.ConstructorSpecialMethod),
                        e.value ? this.throwUnexpectedToken(t, n.Messages.DuplicateConstructor) : e.value = !0,
                        s = "constructor")),
                        this.finalize(i, new a.MethodDefinition(r,u,o,s,c))
                    }
                    ,
                    e.prototype.parseClassElementList = function() {
                        var e = []
                          , t = {
                            value: !1
                        };
                        for (this.expect("{"); !this.match("}"); )
                            this.match(";") ? this.nextToken() : e.push(this.parseClassElement(t));
                        return this.expect("}"),
                        e
                    }
                    ,
                    e.prototype.parseClassBody = function() {
                        var e = this.createNode()
                          , t = this.parseClassElementList();
                        return this.finalize(e, new a.ClassBody(t))
                    }
                    ,
                    e.prototype.parseClassDeclaration = function(e) {
                        var t = this.createNode()
                          , i = this.context.strict;
                        this.context.strict = !0,
                        this.expectKeyword("class");
                        var s = e && 3 !== this.lookahead.type ? null : this.parseVariableIdentifier()
                          , r = null;
                        this.matchKeyword("extends") && (this.nextToken(),
                        r = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall));
                        var n = this.parseClassBody();
                        return this.context.strict = i,
                        this.finalize(t, new a.ClassDeclaration(s,r,n))
                    }
                    ,
                    e.prototype.parseClassExpression = function() {
                        var e = this.createNode()
                          , t = this.context.strict;
                        this.context.strict = !0,
                        this.expectKeyword("class");
                        var i = 3 === this.lookahead.type ? this.parseVariableIdentifier() : null
                          , s = null;
                        this.matchKeyword("extends") && (this.nextToken(),
                        s = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall));
                        var r = this.parseClassBody();
                        return this.context.strict = t,
                        this.finalize(e, new a.ClassExpression(i,s,r))
                    }
                    ,
                    e.prototype.parseModule = function() {
                        this.context.strict = !0,
                        this.context.isModule = !0,
                        this.scanner.isModule = !0;
                        for (var e = this.createNode(), t = this.parseDirectivePrologues(); 2 !== this.lookahead.type; )
                            t.push(this.parseStatementListItem());
                        return this.finalize(e, new a.Module(t))
                    }
                    ,
                    e.prototype.parseScript = function() {
                        for (var e = this.createNode(), t = this.parseDirectivePrologues(); 2 !== this.lookahead.type; )
                            t.push(this.parseStatementListItem());
                        return this.finalize(e, new a.Script(t))
                    }
                    ,
                    e.prototype.parseModuleSpecifier = function() {
                        var e = this.createNode();
                        8 !== this.lookahead.type && this.throwError(n.Messages.InvalidModuleSpecifier);
                        var t = this.nextToken()
                          , i = this.getTokenRaw(t);
                        return this.finalize(e, new a.Literal(t.value,i))
                    }
                    ,
                    e.prototype.parseImportSpecifier = function() {
                        var e, t, i = this.createNode();
                        return 3 === this.lookahead.type ? (t = e = this.parseVariableIdentifier(),
                        this.matchContextualKeyword("as") && (this.nextToken(),
                        t = this.parseVariableIdentifier())) : (t = e = this.parseIdentifierName(),
                        this.matchContextualKeyword("as") ? (this.nextToken(),
                        t = this.parseVariableIdentifier()) : this.throwUnexpectedToken(this.nextToken())),
                        this.finalize(i, new a.ImportSpecifier(t,e))
                    }
                    ,
                    e.prototype.parseNamedImports = function() {
                        this.expect("{");
                        for (var e = []; !this.match("}"); )
                            e.push(this.parseImportSpecifier()),
                            this.match("}") || this.expect(",");
                        return this.expect("}"),
                        e
                    }
                    ,
                    e.prototype.parseImportDefaultSpecifier = function() {
                        var e = this.createNode()
                          , t = this.parseIdentifierName();
                        return this.finalize(e, new a.ImportDefaultSpecifier(t))
                    }
                    ,
                    e.prototype.parseImportNamespaceSpecifier = function() {
                        var e = this.createNode();
                        this.expect("*"),
                        this.matchContextualKeyword("as") || this.throwError(n.Messages.NoAsAfterImportNamespace),
                        this.nextToken();
                        var t = this.parseIdentifierName();
                        return this.finalize(e, new a.ImportNamespaceSpecifier(t))
                    }
                    ,
                    e.prototype.parseImportDeclaration = function() {
                        this.context.inFunctionBody && this.throwError(n.Messages.IllegalImportDeclaration);
                        var e, t = this.createNode();
                        this.expectKeyword("import");
                        var i = [];
                        if (8 === this.lookahead.type)
                            e = this.parseModuleSpecifier();
                        else {
                            if (this.match("{") ? i = i.concat(this.parseNamedImports()) : this.match("*") ? i.push(this.parseImportNamespaceSpecifier()) : this.isIdentifierName(this.lookahead) && !this.matchKeyword("default") ? (i.push(this.parseImportDefaultSpecifier()),
                            this.match(",") && (this.nextToken(),
                            this.match("*") ? i.push(this.parseImportNamespaceSpecifier()) : this.match("{") ? i = i.concat(this.parseNamedImports()) : this.throwUnexpectedToken(this.lookahead))) : this.throwUnexpectedToken(this.nextToken()),
                            !this.matchContextualKeyword("from")) {
                                var s = this.lookahead.value ? n.Messages.UnexpectedToken : n.Messages.MissingFromClause;
                                this.throwError(s, this.lookahead.value)
                            }
                            this.nextToken(),
                            e = this.parseModuleSpecifier()
                        }
                        return this.consumeSemicolon(),
                        this.finalize(t, new a.ImportDeclaration(i,e))
                    }
                    ,
                    e.prototype.parseExportSpecifier = function() {
                        var e = this.createNode()
                          , t = this.parseIdentifierName()
                          , i = t;
                        return this.matchContextualKeyword("as") && (this.nextToken(),
                        i = this.parseIdentifierName()),
                        this.finalize(e, new a.ExportSpecifier(t,i))
                    }
                    ,
                    e.prototype.parseExportDeclaration = function() {
                        this.context.inFunctionBody && this.throwError(n.Messages.IllegalExportDeclaration);
                        var e, t = this.createNode();
                        if (this.expectKeyword("export"),
                        this.matchKeyword("default"))
                            if (this.nextToken(),
                            this.matchKeyword("function")) {
                                var i = this.parseFunctionDeclaration(!0);
                                e = this.finalize(t, new a.ExportDefaultDeclaration(i))
                            } else
                                this.matchKeyword("class") ? (i = this.parseClassDeclaration(!0),
                                e = this.finalize(t, new a.ExportDefaultDeclaration(i))) : this.matchContextualKeyword("async") ? (i = this.matchAsyncFunction() ? this.parseFunctionDeclaration(!0) : this.parseAssignmentExpression(),
                                e = this.finalize(t, new a.ExportDefaultDeclaration(i))) : (this.matchContextualKeyword("from") && this.throwError(n.Messages.UnexpectedToken, this.lookahead.value),
                                i = this.match("{") ? this.parseObjectInitializer() : this.match("[") ? this.parseArrayInitializer() : this.parseAssignmentExpression(),
                                this.consumeSemicolon(),
                                e = this.finalize(t, new a.ExportDefaultDeclaration(i)));
                        else if (this.match("*")) {
                            if (this.nextToken(),
                            !this.matchContextualKeyword("from")) {
                                var s = this.lookahead.value ? n.Messages.UnexpectedToken : n.Messages.MissingFromClause;
                                this.throwError(s, this.lookahead.value)
                            }
                            this.nextToken();
                            var r = this.parseModuleSpecifier();
                            this.consumeSemicolon(),
                            e = this.finalize(t, new a.ExportAllDeclaration(r))
                        } else if (4 === this.lookahead.type) {
                            switch (i = void 0,
                            this.lookahead.value) {
                            case "let":
                            case "const":
                                i = this.parseLexicalDeclaration({
                                    inFor: !1
                                });
                                break;
                            case "var":
                            case "class":
                            case "function":
                                i = this.parseStatementListItem();
                                break;
                            default:
                                this.throwUnexpectedToken(this.lookahead)
                            }
                            e = this.finalize(t, new a.ExportNamedDeclaration(i,[],null))
                        } else if (this.matchAsyncFunction())
                            i = this.parseFunctionDeclaration(),
                            e = this.finalize(t, new a.ExportNamedDeclaration(i,[],null));
                        else {
                            var o = []
                              , u = null
                              , h = !1;
                            for (this.expect("{"); !this.match("}"); )
                                h = h || this.matchKeyword("default"),
                                o.push(this.parseExportSpecifier()),
                                this.match("}") || this.expect(",");
                            this.expect("}"),
                            this.matchContextualKeyword("from") ? (this.nextToken(),
                            u = this.parseModuleSpecifier(),
                            this.consumeSemicolon()) : h ? (s = this.lookahead.value ? n.Messages.UnexpectedToken : n.Messages.MissingFromClause,
                            this.throwError(s, this.lookahead.value)) : this.consumeSemicolon(),
                            e = this.finalize(t, new a.ExportNamedDeclaration(null,o,u))
                        }
                        return e
                    }
                    ,
                    e
                }();
                t.Parser = c
            }
            , function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.assert = function(e, t) {
                    if (!e)
                        throw new Error("ASSERT: " + t)
                }
            }
            , function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var i = function() {
                    function e() {
                        this.errors = [],
                        this.tolerant = !1
                    }
                    return e.prototype.recordError = function(e) {
                        this.errors.push(e)
                    }
                    ,
                    e.prototype.tolerate = function(e) {
                        if (!this.tolerant)
                            throw e;
                        this.recordError(e)
                    }
                    ,
                    e.prototype.constructError = function(e, t) {
                        var i = new Error(e);
                        try {
                            throw i
                        } catch (s) {
                            Object.create && Object.defineProperty && (i = Object.create(s),
                            Object.defineProperty(i, "column", {
                                value: t
                            }))
                        }
                        return i
                    }
                    ,
                    e.prototype.createError = function(e, t, i, s) {
                        var r = "Line " + t + ": " + s
                          , n = this.constructError(r, i);
                        return n.index = e,
                        n.lineNumber = t,
                        n.description = s,
                        n
                    }
                    ,
                    e.prototype.throwError = function(e, t, i, s) {
                        throw this.createError(e, t, i, s)
                    }
                    ,
                    e.prototype.tolerateError = function(e, t, i, s) {
                        var r = this.createError(e, t, i, s);
                        if (!this.tolerant)
                            throw r;
                        this.recordError(r)
                    }
                    ,
                    e
                }();
                t.ErrorHandler = i
            }
            , function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.Messages = {
                    BadGetterArity: "Getter must not have any formal parameters",
                    BadSetterArity: "Setter must have exactly one formal parameter",
                    BadSetterRestParameter: "Setter function argument must not be a rest parameter",
                    ConstructorIsAsync: "Class constructor may not be an async method",
                    ConstructorSpecialMethod: "Class constructor may not be an accessor",
                    DeclarationMissingInitializer: "Missing initializer in %0 declaration",
                    DefaultRestParameter: "Unexpected token =",
                    DuplicateBinding: "Duplicate binding %0",
                    DuplicateConstructor: "A class may only have one constructor",
                    DuplicateProtoProperty: "Duplicate __proto__ fields are not allowed in object literals",
                    ForInOfLoopInitializer: "%0 loop variable declaration may not have an initializer",
                    GeneratorInLegacyContext: "Generator declarations are not allowed in legacy contexts",
                    IllegalBreak: "Illegal break statement",
                    IllegalContinue: "Illegal continue statement",
                    IllegalExportDeclaration: "Unexpected token",
                    IllegalImportDeclaration: "Unexpected token",
                    IllegalLanguageModeDirective: "Illegal 'use strict' directive in function with non-simple parameter list",
                    IllegalReturn: "Illegal return statement",
                    InvalidEscapedReservedWord: "Keyword must not contain escaped characters",
                    InvalidHexEscapeSequence: "Invalid hexadecimal escape sequence",
                    InvalidLHSInAssignment: "Invalid left-hand side in assignment",
                    InvalidLHSInForIn: "Invalid left-hand side in for-in",
                    InvalidLHSInForLoop: "Invalid left-hand side in for-loop",
                    InvalidModuleSpecifier: "Unexpected token",
                    InvalidRegExp: "Invalid regular expression",
                    LetInLexicalBinding: "let is disallowed as a lexically bound name",
                    MissingFromClause: "Unexpected token",
                    MultipleDefaultsInSwitch: "More than one default clause in switch statement",
                    NewlineAfterThrow: "Illegal newline after throw",
                    NoAsAfterImportNamespace: "Unexpected token",
                    NoCatchOrFinally: "Missing catch or finally after try",
                    ParameterAfterRestParameter: "Rest parameter must be last formal parameter",
                    Redeclaration: "%0 '%1' has already been declared",
                    StaticPrototype: "Classes may not have static property named prototype",
                    StrictCatchVariable: "Catch variable may not be eval or arguments in strict mode",
                    StrictDelete: "Delete of an unqualified identifier in strict mode.",
                    StrictFunction: "In strict mode code, functions can only be declared at top level or inside a block",
                    StrictFunctionName: "Function name may not be eval or arguments in strict mode",
                    StrictLHSAssignment: "Assignment to eval or arguments is not allowed in strict mode",
                    StrictLHSPostfix: "Postfix increment/decrement may not have eval or arguments operand in strict mode",
                    StrictLHSPrefix: "Prefix increment/decrement may not have eval or arguments operand in strict mode",
                    StrictModeWith: "Strict mode code may not include a with statement",
                    StrictOctalLiteral: "Octal literals are not allowed in strict mode.",
                    StrictParamDupe: "Strict mode function may not have duplicate parameter names",
                    StrictParamName: "Parameter name eval or arguments is not allowed in strict mode",
                    StrictReservedWord: "Use of future reserved word in strict mode",
                    StrictVarName: "Variable name may not be eval or arguments in strict mode",
                    TemplateOctalLiteral: "Octal literals are not allowed in template strings.",
                    UnexpectedEOS: "Unexpected end of input",
                    UnexpectedIdentifier: "Unexpected identifier",
                    UnexpectedNumber: "Unexpected number",
                    UnexpectedReserved: "Unexpected reserved word",
                    UnexpectedString: "Unexpected string",
                    UnexpectedTemplate: "Unexpected quasi %0",
                    UnexpectedToken: "Unexpected token %0",
                    UnexpectedTokenIllegal: "Unexpected token ILLEGAL",
                    UnknownLabel: "Undefined label '%0'",
                    UnterminatedRegExp: "Invalid regular expression: missing /"
                }
            }
            , function(e, t, i) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var s = i(9)
                  , r = i(4)
                  , n = i(11);
                function a(e) {
                    return "0123456789abcdef".indexOf(e.toLowerCase())
                }
                function o(e) {
                    return "01234567".indexOf(e)
                }
                var u = function() {
                    function e(e, t) {
                        this.source = e,
                        this.errorHandler = t,
                        this.trackComment = !1,
                        this.isModule = !1,
                        this.length = e.length,
                        this.index = 0,
                        this.lineNumber = e.length > 0 ? 1 : 0,
                        this.lineStart = 0,
                        this.curlyStack = []
                    }
                    return e.prototype.saveState = function() {
                        return {
                            index: this.index,
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart
                        }
                    }
                    ,
                    e.prototype.restoreState = function(e) {
                        this.index = e.index,
                        this.lineNumber = e.lineNumber,
                        this.lineStart = e.lineStart
                    }
                    ,
                    e.prototype.eof = function() {
                        return this.index >= this.length
                    }
                    ,
                    e.prototype.throwUnexpectedToken = function(e) {
                        return void 0 === e && (e = n.Messages.UnexpectedTokenIllegal),
                        this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, e)
                    }
                    ,
                    e.prototype.tolerateUnexpectedToken = function(e) {
                        void 0 === e && (e = n.Messages.UnexpectedTokenIllegal),
                        this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, e)
                    }
                    ,
                    e.prototype.skipSingleLineComment = function(e) {
                        var t, i, s = [];
                        for (this.trackComment && (s = [],
                        t = this.index - e,
                        i = {
                            start: {
                                line: this.lineNumber,
                                column: this.index - this.lineStart - e
                            },
                            end: {}
                        }); !this.eof(); ) {
                            var n = this.source.charCodeAt(this.index);
                            if (++this.index,
                            r.Character.isLineTerminator(n)) {
                                if (this.trackComment) {
                                    i.end = {
                                        line: this.lineNumber,
                                        column: this.index - this.lineStart - 1
                                    };
                                    var a = {
                                        multiLine: !1,
                                        slice: [t + e, this.index - 1],
                                        range: [t, this.index - 1],
                                        loc: i
                                    };
                                    s.push(a)
                                }
                                return 13 === n && 10 === this.source.charCodeAt(this.index) && ++this.index,
                                ++this.lineNumber,
                                this.lineStart = this.index,
                                s
                            }
                        }
                        return this.trackComment && (i.end = {
                            line: this.lineNumber,
                            column: this.index - this.lineStart
                        },
                        a = {
                            multiLine: !1,
                            slice: [t + e, this.index],
                            range: [t, this.index],
                            loc: i
                        },
                        s.push(a)),
                        s
                    }
                    ,
                    e.prototype.skipMultiLineComment = function() {
                        var e, t, i = [];
                        for (this.trackComment && (i = [],
                        e = this.index - 2,
                        t = {
                            start: {
                                line: this.lineNumber,
                                column: this.index - this.lineStart - 2
                            },
                            end: {}
                        }); !this.eof(); ) {
                            var s = this.source.charCodeAt(this.index);
                            if (r.Character.isLineTerminator(s))
                                13 === s && 10 === this.source.charCodeAt(this.index + 1) && ++this.index,
                                ++this.lineNumber,
                                ++this.index,
                                this.lineStart = this.index;
                            else if (42 === s) {
                                if (47 === this.source.charCodeAt(this.index + 1)) {
                                    if (this.index += 2,
                                    this.trackComment) {
                                        t.end = {
                                            line: this.lineNumber,
                                            column: this.index - this.lineStart
                                        };
                                        var n = {
                                            multiLine: !0,
                                            slice: [e + 2, this.index - 2],
                                            range: [e, this.index],
                                            loc: t
                                        };
                                        i.push(n)
                                    }
                                    return i
                                }
                                ++this.index
                            } else
                                ++this.index
                        }
                        return this.trackComment && (t.end = {
                            line: this.lineNumber,
                            column: this.index - this.lineStart
                        },
                        n = {
                            multiLine: !0,
                            slice: [e + 2, this.index],
                            range: [e, this.index],
                            loc: t
                        },
                        i.push(n)),
                        this.tolerateUnexpectedToken(),
                        i
                    }
                    ,
                    e.prototype.scanComments = function() {
                        var e;
                        this.trackComment && (e = []);
                        for (var t = 0 === this.index; !this.eof(); ) {
                            var i = this.source.charCodeAt(this.index);
                            if (r.Character.isWhiteSpace(i))
                                ++this.index;
                            else if (r.Character.isLineTerminator(i))
                                ++this.index,
                                13 === i && 10 === this.source.charCodeAt(this.index) && ++this.index,
                                ++this.lineNumber,
                                this.lineStart = this.index,
                                t = !0;
                            else if (47 === i)
                                if (47 === (i = this.source.charCodeAt(this.index + 1))) {
                                    this.index += 2;
                                    var s = this.skipSingleLineComment(2);
                                    this.trackComment && (e = e.concat(s)),
                                    t = !0
                                } else {
                                    if (42 !== i)
                                        break;
                                    this.index += 2,
                                    s = this.skipMultiLineComment(),
                                    this.trackComment && (e = e.concat(s))
                                }
                            else if (t && 45 === i) {
                                if (45 !== this.source.charCodeAt(this.index + 1) || 62 !== this.source.charCodeAt(this.index + 2))
                                    break;
                                this.index += 3,
                                s = this.skipSingleLineComment(3),
                                this.trackComment && (e = e.concat(s))
                            } else {
                                if (60 !== i || this.isModule)
                                    break;
                                if ("!--" !== this.source.slice(this.index + 1, this.index + 4))
                                    break;
                                this.index += 4,
                                s = this.skipSingleLineComment(4),
                                this.trackComment && (e = e.concat(s))
                            }
                        }
                        return e
                    }
                    ,
                    e.prototype.isFutureReservedWord = function(e) {
                        switch (e) {
                        case "enum":
                        case "export":
                        case "import":
                        case "super":
                            return !0;
                        default:
                            return !1
                        }
                    }
                    ,
                    e.prototype.isStrictModeReservedWord = function(e) {
                        switch (e) {
                        case "implements":
                        case "interface":
                        case "package":
                        case "private":
                        case "protected":
                        case "public":
                        case "static":
                        case "yield":
                        case "let":
                            return !0;
                        default:
                            return !1
                        }
                    }
                    ,
                    e.prototype.isRestrictedWord = function(e) {
                        return "eval" === e || "arguments" === e
                    }
                    ,
                    e.prototype.isKeyword = function(e) {
                        switch (e.length) {
                        case 2:
                            return "if" === e || "in" === e || "do" === e;
                        case 3:
                            return "var" === e || "for" === e || "new" === e || "try" === e || "let" === e;
                        case 4:
                            return "this" === e || "else" === e || "case" === e || "void" === e || "with" === e || "enum" === e;
                        case 5:
                            return "while" === e || "break" === e || "catch" === e || "throw" === e || "const" === e || "yield" === e || "class" === e || "super" === e;
                        case 6:
                            return "return" === e || "typeof" === e || "delete" === e || "switch" === e || "export" === e || "import" === e;
                        case 7:
                            return "default" === e || "finally" === e || "extends" === e;
                        case 8:
                            return "function" === e || "continue" === e || "debugger" === e;
                        case 10:
                            return "instanceof" === e;
                        default:
                            return !1
                        }
                    }
                    ,
                    e.prototype.codePointAt = function(e) {
                        var t = this.source.charCodeAt(e);
                        if (t >= 55296 && t <= 56319) {
                            var i = this.source.charCodeAt(e + 1);
                            i >= 56320 && i <= 57343 && (t = 1024 * (t - 55296) + i - 56320 + 65536)
                        }
                        return t
                    }
                    ,
                    e.prototype.scanHexEscape = function(e) {
                        for (var t = "u" === e ? 4 : 2, i = 0, s = 0; s < t; ++s) {
                            if (this.eof() || !r.Character.isHexDigit(this.source.charCodeAt(this.index)))
                                return null;
                            i = 16 * i + a(this.source[this.index++])
                        }
                        return String.fromCharCode(i)
                    }
                    ,
                    e.prototype.scanUnicodeCodePointEscape = function() {
                        var e = this.source[this.index]
                          , t = 0;
                        for ("}" === e && this.throwUnexpectedToken(); !this.eof() && (e = this.source[this.index++],
                        r.Character.isHexDigit(e.charCodeAt(0))); )
                            t = 16 * t + a(e);
                        return (t > 1114111 || "}" !== e) && this.throwUnexpectedToken(),
                        r.Character.fromCodePoint(t)
                    }
                    ,
                    e.prototype.getIdentifier = function() {
                        for (var e = this.index++; !this.eof(); ) {
                            var t = this.source.charCodeAt(this.index);
                            if (92 === t)
                                return this.index = e,
                                this.getComplexIdentifier();
                            if (t >= 55296 && t < 57343)
                                return this.index = e,
                                this.getComplexIdentifier();
                            if (!r.Character.isIdentifierPart(t))
                                break;
                            ++this.index
                        }
                        return this.source.slice(e, this.index)
                    }
                    ,
                    e.prototype.getComplexIdentifier = function() {
                        var e, t = this.codePointAt(this.index), i = r.Character.fromCodePoint(t);
                        for (this.index += i.length,
                        92 === t && (117 !== this.source.charCodeAt(this.index) && this.throwUnexpectedToken(),
                        ++this.index,
                        "{" === this.source[this.index] ? (++this.index,
                        e = this.scanUnicodeCodePointEscape()) : null !== (e = this.scanHexEscape("u")) && "\\" !== e && r.Character.isIdentifierStart(e.charCodeAt(0)) || this.throwUnexpectedToken(),
                        i = e); !this.eof() && (t = this.codePointAt(this.index),
                        r.Character.isIdentifierPart(t)); )
                            i += e = r.Character.fromCodePoint(t),
                            this.index += e.length,
                            92 === t && (i = i.substr(0, i.length - 1),
                            117 !== this.source.charCodeAt(this.index) && this.throwUnexpectedToken(),
                            ++this.index,
                            "{" === this.source[this.index] ? (++this.index,
                            e = this.scanUnicodeCodePointEscape()) : null !== (e = this.scanHexEscape("u")) && "\\" !== e && r.Character.isIdentifierPart(e.charCodeAt(0)) || this.throwUnexpectedToken(),
                            i += e);
                        return i
                    }
                    ,
                    e.prototype.octalToDecimal = function(e) {
                        var t = "0" !== e
                          , i = o(e);
                        return !this.eof() && r.Character.isOctalDigit(this.source.charCodeAt(this.index)) && (t = !0,
                        i = 8 * i + o(this.source[this.index++]),
                        "0123".indexOf(e) >= 0 && !this.eof() && r.Character.isOctalDigit(this.source.charCodeAt(this.index)) && (i = 8 * i + o(this.source[this.index++]))),
                        {
                            code: i,
                            octal: t
                        }
                    }
                    ,
                    e.prototype.scanIdentifier = function() {
                        var e, t = this.index, i = 92 === this.source.charCodeAt(t) ? this.getComplexIdentifier() : this.getIdentifier();
                        if (3 !== (e = 1 === i.length ? 3 : this.isKeyword(i) ? 4 : "null" === i ? 5 : "true" === i || "false" === i ? 1 : 3) && t + i.length !== this.index) {
                            var s = this.index;
                            this.index = t,
                            this.tolerateUnexpectedToken(n.Messages.InvalidEscapedReservedWord),
                            this.index = s
                        }
                        return {
                            type: e,
                            value: i,
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: t,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.scanPunctuator = function() {
                        var e = this.index
                          , t = this.source[this.index];
                        switch (t) {
                        case "(":
                        case "{":
                            "{" === t && this.curlyStack.push("{"),
                            ++this.index;
                            break;
                        case ".":
                            ++this.index,
                            "." === this.source[this.index] && "." === this.source[this.index + 1] && (this.index += 2,
                            t = "...");
                            break;
                        case "}":
                            ++this.index,
                            this.curlyStack.pop();
                            break;
                        case ")":
                        case ";":
                        case ",":
                        case "[":
                        case "]":
                        case ":":
                        case "?":
                        case "~":
                            ++this.index;
                            break;
                        default:
                            ">>>=" === (t = this.source.substr(this.index, 4)) ? this.index += 4 : "===" === (t = t.substr(0, 3)) || "!==" === t || ">>>" === t || "<<=" === t || ">>=" === t || "**=" === t ? this.index += 3 : "&&" === (t = t.substr(0, 2)) || "||" === t || "==" === t || "!=" === t || "+=" === t || "-=" === t || "*=" === t || "/=" === t || "++" === t || "--" === t || "<<" === t || ">>" === t || "&=" === t || "|=" === t || "^=" === t || "%=" === t || "<=" === t || ">=" === t || "=>" === t || "**" === t ? this.index += 2 : (t = this.source[this.index],
                            "<>=!+-*%&|^/".indexOf(t) >= 0 && ++this.index)
                        }
                        return this.index === e && this.throwUnexpectedToken(),
                        {
                            type: 7,
                            value: t,
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: e,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.scanHexLiteral = function(e) {
                        for (var t = ""; !this.eof() && r.Character.isHexDigit(this.source.charCodeAt(this.index)); )
                            t += this.source[this.index++];
                        return 0 === t.length && this.throwUnexpectedToken(),
                        r.Character.isIdentifierStart(this.source.charCodeAt(this.index)) && this.throwUnexpectedToken(),
                        {
                            type: 6,
                            value: parseInt("0x" + t, 16),
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: e,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.scanBinaryLiteral = function(e) {
                        for (var t, i = ""; !this.eof() && ("0" === (t = this.source[this.index]) || "1" === t); )
                            i += this.source[this.index++];
                        return 0 === i.length && this.throwUnexpectedToken(),
                        this.eof() || (t = this.source.charCodeAt(this.index),
                        (r.Character.isIdentifierStart(t) || r.Character.isDecimalDigit(t)) && this.throwUnexpectedToken()),
                        {
                            type: 6,
                            value: parseInt(i, 2),
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: e,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.scanOctalLiteral = function(e, t) {
                        var i = ""
                          , s = !1;
                        for (r.Character.isOctalDigit(e.charCodeAt(0)) ? (s = !0,
                        i = "0" + this.source[this.index++]) : ++this.index; !this.eof() && r.Character.isOctalDigit(this.source.charCodeAt(this.index)); )
                            i += this.source[this.index++];
                        return s || 0 !== i.length || this.throwUnexpectedToken(),
                        (r.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || r.Character.isDecimalDigit(this.source.charCodeAt(this.index))) && this.throwUnexpectedToken(),
                        {
                            type: 6,
                            value: parseInt(i, 8),
                            octal: s,
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: t,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.isImplicitOctalLiteral = function() {
                        for (var e = this.index + 1; e < this.length; ++e) {
                            var t = this.source[e];
                            if ("8" === t || "9" === t)
                                return !1;
                            if (!r.Character.isOctalDigit(t.charCodeAt(0)))
                                return !0
                        }
                        return !0
                    }
                    ,
                    e.prototype.scanNumericLiteral = function() {
                        var e = this.index
                          , t = this.source[e];
                        s.assert(r.Character.isDecimalDigit(t.charCodeAt(0)) || "." === t, "Numeric literal must start with a decimal digit or a decimal point");
                        var i = "";
                        if ("." !== t) {
                            if (i = this.source[this.index++],
                            t = this.source[this.index],
                            "0" === i) {
                                if ("x" === t || "X" === t)
                                    return ++this.index,
                                    this.scanHexLiteral(e);
                                if ("b" === t || "B" === t)
                                    return ++this.index,
                                    this.scanBinaryLiteral(e);
                                if ("o" === t || "O" === t)
                                    return this.scanOctalLiteral(t, e);
                                if (t && r.Character.isOctalDigit(t.charCodeAt(0)) && this.isImplicitOctalLiteral())
                                    return this.scanOctalLiteral(t, e)
                            }
                            for (; r.Character.isDecimalDigit(this.source.charCodeAt(this.index)); )
                                i += this.source[this.index++];
                            t = this.source[this.index]
                        }
                        if ("." === t) {
                            for (i += this.source[this.index++]; r.Character.isDecimalDigit(this.source.charCodeAt(this.index)); )
                                i += this.source[this.index++];
                            t = this.source[this.index]
                        }
                        if ("e" === t || "E" === t)
                            if (i += this.source[this.index++],
                            "+" !== (t = this.source[this.index]) && "-" !== t || (i += this.source[this.index++]),
                            r.Character.isDecimalDigit(this.source.charCodeAt(this.index)))
                                for (; r.Character.isDecimalDigit(this.source.charCodeAt(this.index)); )
                                    i += this.source[this.index++];
                            else
                                this.throwUnexpectedToken();
                        return r.Character.isIdentifierStart(this.source.charCodeAt(this.index)) && this.throwUnexpectedToken(),
                        {
                            type: 6,
                            value: parseFloat(i),
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: e,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.scanStringLiteral = function() {
                        var e = this.index
                          , t = this.source[e];
                        s.assert("'" === t || '"' === t, "String literal must starts with a quote"),
                        ++this.index;
                        for (var i = !1, a = ""; !this.eof(); ) {
                            var o = this.source[this.index++];
                            if (o === t) {
                                t = "";
                                break
                            }
                            if ("\\" === o)
                                if ((o = this.source[this.index++]) && r.Character.isLineTerminator(o.charCodeAt(0)))
                                    ++this.lineNumber,
                                    "\r" === o && "\n" === this.source[this.index] && ++this.index,
                                    this.lineStart = this.index;
                                else
                                    switch (o) {
                                    case "u":
                                        if ("{" === this.source[this.index])
                                            ++this.index,
                                            a += this.scanUnicodeCodePointEscape();
                                        else {
                                            var u = this.scanHexEscape(o);
                                            null === u && this.throwUnexpectedToken(),
                                            a += u
                                        }
                                        break;
                                    case "x":
                                        var h = this.scanHexEscape(o);
                                        null === h && this.throwUnexpectedToken(n.Messages.InvalidHexEscapeSequence),
                                        a += h;
                                        break;
                                    case "n":
                                        a += "\n";
                                        break;
                                    case "r":
                                        a += "\r";
                                        break;
                                    case "t":
                                        a += "\t";
                                        break;
                                    case "b":
                                        a += "\b";
                                        break;
                                    case "f":
                                        a += "\f";
                                        break;
                                    case "v":
                                        a += "\v";
                                        break;
                                    case "8":
                                    case "9":
                                        a += o,
                                        this.tolerateUnexpectedToken();
                                        break;
                                    default:
                                        if (o && r.Character.isOctalDigit(o.charCodeAt(0))) {
                                            var c = this.octalToDecimal(o);
                                            i = c.octal || i,
                                            a += String.fromCharCode(c.code)
                                        } else
                                            a += o
                                    }
                            else {
                                if (r.Character.isLineTerminator(o.charCodeAt(0)))
                                    break;
                                a += o
                            }
                        }
                        return "" !== t && (this.index = e,
                        this.throwUnexpectedToken()),
                        {
                            type: 8,
                            value: a,
                            octal: i,
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: e,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.scanTemplate = function() {
                        var e = ""
                          , t = !1
                          , i = this.index
                          , s = "`" === this.source[i]
                          , a = !1
                          , o = 2;
                        for (++this.index; !this.eof(); ) {
                            var u = this.source[this.index++];
                            if ("`" === u) {
                                o = 1,
                                a = !0,
                                t = !0;
                                break
                            }
                            if ("$" === u) {
                                if ("{" === this.source[this.index]) {
                                    this.curlyStack.push("${"),
                                    ++this.index,
                                    t = !0;
                                    break
                                }
                                e += u
                            } else if ("\\" === u)
                                if (u = this.source[this.index++],
                                r.Character.isLineTerminator(u.charCodeAt(0)))
                                    ++this.lineNumber,
                                    "\r" === u && "\n" === this.source[this.index] && ++this.index,
                                    this.lineStart = this.index;
                                else
                                    switch (u) {
                                    case "n":
                                        e += "\n";
                                        break;
                                    case "r":
                                        e += "\r";
                                        break;
                                    case "t":
                                        e += "\t";
                                        break;
                                    case "u":
                                        if ("{" === this.source[this.index])
                                            ++this.index,
                                            e += this.scanUnicodeCodePointEscape();
                                        else {
                                            var h = this.index
                                              , c = this.scanHexEscape(u);
                                            null !== c ? e += c : (this.index = h,
                                            e += u)
                                        }
                                        break;
                                    case "x":
                                        var l = this.scanHexEscape(u);
                                        null === l && this.throwUnexpectedToken(n.Messages.InvalidHexEscapeSequence),
                                        e += l;
                                        break;
                                    case "b":
                                        e += "\b";
                                        break;
                                    case "f":
                                        e += "\f";
                                        break;
                                    case "v":
                                        e += "\v";
                                        break;
                                    default:
                                        "0" === u ? (r.Character.isDecimalDigit(this.source.charCodeAt(this.index)) && this.throwUnexpectedToken(n.Messages.TemplateOctalLiteral),
                                        e += "\0") : r.Character.isOctalDigit(u.charCodeAt(0)) ? this.throwUnexpectedToken(n.Messages.TemplateOctalLiteral) : e += u
                                    }
                            else
                                r.Character.isLineTerminator(u.charCodeAt(0)) ? (++this.lineNumber,
                                "\r" === u && "\n" === this.source[this.index] && ++this.index,
                                this.lineStart = this.index,
                                e += "\n") : e += u
                        }
                        return t || this.throwUnexpectedToken(),
                        s || this.curlyStack.pop(),
                        {
                            type: 10,
                            value: this.source.slice(i + 1, this.index - o),
                            cooked: e,
                            head: s,
                            tail: a,
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: i,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.testRegExp = function(e, t) {
                        var i = e
                          , s = this;
                        t.indexOf("u") >= 0 && (i = i.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, (function(e, t, i) {
                            var r = parseInt(t || i, 16);
                            return r > 1114111 && s.throwUnexpectedToken(n.Messages.InvalidRegExp),
                            r <= 65535 ? String.fromCharCode(r) : "\uffff"
                        }
                        )).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "\uffff"));
                        try {
                            RegExp(i)
                        } catch (r) {
                            this.throwUnexpectedToken(n.Messages.InvalidRegExp)
                        }
                        try {
                            return new RegExp(e,t)
                        } catch (a) {
                            return null
                        }
                    }
                    ,
                    e.prototype.scanRegExpBody = function() {
                        var e = this.source[this.index];
                        s.assert("/" === e, "Regular expression literal must start with a slash");
                        for (var t = this.source[this.index++], i = !1, a = !1; !this.eof(); )
                            if (t += e = this.source[this.index++],
                            "\\" === e)
                                e = this.source[this.index++],
                                r.Character.isLineTerminator(e.charCodeAt(0)) && this.throwUnexpectedToken(n.Messages.UnterminatedRegExp),
                                t += e;
                            else if (r.Character.isLineTerminator(e.charCodeAt(0)))
                                this.throwUnexpectedToken(n.Messages.UnterminatedRegExp);
                            else if (i)
                                "]" === e && (i = !1);
                            else {
                                if ("/" === e) {
                                    a = !0;
                                    break
                                }
                                "[" === e && (i = !0)
                            }
                        return a || this.throwUnexpectedToken(n.Messages.UnterminatedRegExp),
                        t.substr(1, t.length - 2)
                    }
                    ,
                    e.prototype.scanRegExpFlags = function() {
                        for (var e = ""; !this.eof(); ) {
                            var t = this.source[this.index];
                            if (!r.Character.isIdentifierPart(t.charCodeAt(0)))
                                break;
                            if (++this.index,
                            "\\" !== t || this.eof())
                                e += t;
                            else if ("u" === (t = this.source[this.index])) {
                                ++this.index;
                                var i = this.index
                                  , s = this.scanHexEscape("u");
                                if (null !== s)
                                    for (e += s; i < this.index; ++i)
                                        this.source[i];
                                else
                                    this.index = i,
                                    e += "u";
                                this.tolerateUnexpectedToken()
                            } else
                                this.tolerateUnexpectedToken()
                        }
                        return e
                    }
                    ,
                    e.prototype.scanRegExp = function() {
                        var e = this.index
                          , t = this.scanRegExpBody()
                          , i = this.scanRegExpFlags();
                        return {
                            type: 9,
                            value: "",
                            pattern: t,
                            flags: i,
                            regex: this.testRegExp(t, i),
                            lineNumber: this.lineNumber,
                            lineStart: this.lineStart,
                            start: e,
                            end: this.index
                        }
                    }
                    ,
                    e.prototype.lex = function() {
                        if (this.eof())
                            return {
                                type: 2,
                                value: "",
                                lineNumber: this.lineNumber,
                                lineStart: this.lineStart,
                                start: this.index,
                                end: this.index
                            };
                        var e = this.source.charCodeAt(this.index);
                        return r.Character.isIdentifierStart(e) ? this.scanIdentifier() : 40 === e || 41 === e || 59 === e ? this.scanPunctuator() : 39 === e || 34 === e ? this.scanStringLiteral() : 46 === e ? r.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1)) ? this.scanNumericLiteral() : this.scanPunctuator() : r.Character.isDecimalDigit(e) ? this.scanNumericLiteral() : 96 === e || 125 === e && "${" === this.curlyStack[this.curlyStack.length - 1] ? this.scanTemplate() : e >= 55296 && e < 57343 && r.Character.isIdentifierStart(this.codePointAt(this.index)) ? this.scanIdentifier() : this.scanPunctuator()
                    }
                    ,
                    e
                }();
                t.Scanner = u
            }
            , function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.TokenName = {},
                t.TokenName[1] = "Boolean",
                t.TokenName[2] = "<end>",
                t.TokenName[3] = "Identifier",
                t.TokenName[4] = "Keyword",
                t.TokenName[5] = "Null",
                t.TokenName[6] = "Numeric",
                t.TokenName[7] = "Punctuator",
                t.TokenName[8] = "String",
                t.TokenName[9] = "RegularExpression",
                t.TokenName[10] = "Template"
            }
            , function(e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.XHTMLEntities = {
                    quot: '"',
                    amp: "&",
                    apos: "'",
                    gt: ">",
                    nbsp: "\xa0",
                    iexcl: "\xa1",
                    cent: "\xa2",
                    pound: "\xa3",
                    curren: "\xa4",
                    yen: "\xa5",
                    brvbar: "\xa6",
                    sect: "\xa7",
                    uml: "\xa8",
                    copy: "\xa9",
                    ordf: "\xaa",
                    laquo: "\xab",
                    not: "\xac",
                    shy: "\xad",
                    reg: "\xae",
                    macr: "\xaf",
                    deg: "\xb0",
                    plusmn: "\xb1",
                    sup2: "\xb2",
                    sup3: "\xb3",
                    acute: "\xb4",
                    micro: "\xb5",
                    para: "\xb6",
                    middot: "\xb7",
                    cedil: "\xb8",
                    sup1: "\xb9",
                    ordm: "\xba",
                    raquo: "\xbb",
                    frac14: "\xbc",
                    frac12: "\xbd",
                    frac34: "\xbe",
                    iquest: "\xbf",
                    Agrave: "\xc0",
                    Aacute: "\xc1",
                    Acirc: "\xc2",
                    Atilde: "\xc3",
                    Auml: "\xc4",
                    Aring: "\xc5",
                    AElig: "\xc6",
                    Ccedil: "\xc7",
                    Egrave: "\xc8",
                    Eacute: "\xc9",
                    Ecirc: "\xca",
                    Euml: "\xcb",
                    Igrave: "\xcc",
                    Iacute: "\xcd",
                    Icirc: "\xce",
                    Iuml: "\xcf",
                    ETH: "\xd0",
                    Ntilde: "\xd1",
                    Ograve: "\xd2",
                    Oacute: "\xd3",
                    Ocirc: "\xd4",
                    Otilde: "\xd5",
                    Ouml: "\xd6",
                    times: "\xd7",
                    Oslash: "\xd8",
                    Ugrave: "\xd9",
                    Uacute: "\xda",
                    Ucirc: "\xdb",
                    Uuml: "\xdc",
                    Yacute: "\xdd",
                    THORN: "\xde",
                    szlig: "\xdf",
                    agrave: "\xe0",
                    aacute: "\xe1",
                    acirc: "\xe2",
                    atilde: "\xe3",
                    auml: "\xe4",
                    aring: "\xe5",
                    aelig: "\xe6",
                    ccedil: "\xe7",
                    egrave: "\xe8",
                    eacute: "\xe9",
                    ecirc: "\xea",
                    euml: "\xeb",
                    igrave: "\xec",
                    iacute: "\xed",
                    icirc: "\xee",
                    iuml: "\xef",
                    eth: "\xf0",
                    ntilde: "\xf1",
                    ograve: "\xf2",
                    oacute: "\xf3",
                    ocirc: "\xf4",
                    otilde: "\xf5",
                    ouml: "\xf6",
                    divide: "\xf7",
                    oslash: "\xf8",
                    ugrave: "\xf9",
                    uacute: "\xfa",
                    ucirc: "\xfb",
                    uuml: "\xfc",
                    yacute: "\xfd",
                    thorn: "\xfe",
                    yuml: "\xff",
                    OElig: "\u0152",
                    oelig: "\u0153",
                    Scaron: "\u0160",
                    scaron: "\u0161",
                    Yuml: "\u0178",
                    fnof: "\u0192",
                    circ: "\u02c6",
                    tilde: "\u02dc",
                    Alpha: "\u0391",
                    Beta: "\u0392",
                    Gamma: "\u0393",
                    Delta: "\u0394",
                    Epsilon: "\u0395",
                    Zeta: "\u0396",
                    Eta: "\u0397",
                    Theta: "\u0398",
                    Iota: "\u0399",
                    Kappa: "\u039a",
                    Lambda: "\u039b",
                    Mu: "\u039c",
                    Nu: "\u039d",
                    Xi: "\u039e",
                    Omicron: "\u039f",
                    Pi: "\u03a0",
                    Rho: "\u03a1",
                    Sigma: "\u03a3",
                    Tau: "\u03a4",
                    Upsilon: "\u03a5",
                    Phi: "\u03a6",
                    Chi: "\u03a7",
                    Psi: "\u03a8",
                    Omega: "\u03a9",
                    alpha: "\u03b1",
                    beta: "\u03b2",
                    gamma: "\u03b3",
                    delta: "\u03b4",
                    epsilon: "\u03b5",
                    zeta: "\u03b6",
                    eta: "\u03b7",
                    theta: "\u03b8",
                    iota: "\u03b9",
                    kappa: "\u03ba",
                    lambda: "\u03bb",
                    mu: "\u03bc",
                    nu: "\u03bd",
                    xi: "\u03be",
                    omicron: "\u03bf",
                    pi: "\u03c0",
                    rho: "\u03c1",
                    sigmaf: "\u03c2",
                    sigma: "\u03c3",
                    tau: "\u03c4",
                    upsilon: "\u03c5",
                    phi: "\u03c6",
                    chi: "\u03c7",
                    psi: "\u03c8",
                    omega: "\u03c9",
                    thetasym: "\u03d1",
                    upsih: "\u03d2",
                    piv: "\u03d6",
                    ensp: "\u2002",
                    emsp: "\u2003",
                    thinsp: "\u2009",
                    zwnj: "\u200c",
                    zwj: "\u200d",
                    lrm: "\u200e",
                    rlm: "\u200f",
                    ndash: "\u2013",
                    mdash: "\u2014",
                    lsquo: "\u2018",
                    rsquo: "\u2019",
                    sbquo: "\u201a",
                    ldquo: "\u201c",
                    rdquo: "\u201d",
                    bdquo: "\u201e",
                    dagger: "\u2020",
                    Dagger: "\u2021",
                    bull: "\u2022",
                    hellip: "\u2026",
                    permil: "\u2030",
                    prime: "\u2032",
                    Prime: "\u2033",
                    lsaquo: "\u2039",
                    rsaquo: "\u203a",
                    oline: "\u203e",
                    frasl: "\u2044",
                    euro: "\u20ac",
                    image: "\u2111",
                    weierp: "\u2118",
                    real: "\u211c",
                    trade: "\u2122",
                    alefsym: "\u2135",
                    larr: "\u2190",
                    uarr: "\u2191",
                    rarr: "\u2192",
                    darr: "\u2193",
                    harr: "\u2194",
                    crarr: "\u21b5",
                    lArr: "\u21d0",
                    uArr: "\u21d1",
                    rArr: "\u21d2",
                    dArr: "\u21d3",
                    hArr: "\u21d4",
                    forall: "\u2200",
                    part: "\u2202",
                    exist: "\u2203",
                    empty: "\u2205",
                    nabla: "\u2207",
                    isin: "\u2208",
                    notin: "\u2209",
                    ni: "\u220b",
                    prod: "\u220f",
                    sum: "\u2211",
                    minus: "\u2212",
                    lowast: "\u2217",
                    radic: "\u221a",
                    prop: "\u221d",
                    infin: "\u221e",
                    ang: "\u2220",
                    and: "\u2227",
                    or: "\u2228",
                    cap: "\u2229",
                    cup: "\u222a",
                    int: "\u222b",
                    there4: "\u2234",
                    sim: "\u223c",
                    cong: "\u2245",
                    asymp: "\u2248",
                    ne: "\u2260",
                    equiv: "\u2261",
                    le: "\u2264",
                    ge: "\u2265",
                    sub: "\u2282",
                    sup: "\u2283",
                    nsub: "\u2284",
                    sube: "\u2286",
                    supe: "\u2287",
                    oplus: "\u2295",
                    otimes: "\u2297",
                    perp: "\u22a5",
                    sdot: "\u22c5",
                    lceil: "\u2308",
                    rceil: "\u2309",
                    lfloor: "\u230a",
                    rfloor: "\u230b",
                    loz: "\u25ca",
                    spades: "\u2660",
                    clubs: "\u2663",
                    hearts: "\u2665",
                    diams: "\u2666",
                    lang: "\u27e8",
                    rang: "\u27e9"
                }
            }
            , function(e, t, i) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var s = i(10)
                  , r = i(12)
                  , n = i(13)
                  , a = function() {
                    function e() {
                        this.values = [],
                        this.curly = this.paren = -1
                    }
                    return e.prototype.beforeFunctionExpression = function(e) {
                        return ["(", "{", "[", "in", "typeof", "instanceof", "new", "return", "case", "delete", "throw", "void", "=", "+=", "-=", "*=", "**=", "/=", "%=", "<<=", ">>=", ">>>=", "&=", "|=", "^=", ",", "+", "-", "*", "**", "/", "%", "++", "--", "<<", ">>", ">>>", "&", "|", "^", "!", "~", "&&", "||", "?", ":", "===", "==", ">=", "<=", "<", ">", "!=", "!=="].indexOf(e) >= 0
                    }
                    ,
                    e.prototype.isRegexStart = function() {
                        var e = this.values[this.values.length - 1]
                          , t = null !== e;
                        switch (e) {
                        case "this":
                        case "]":
                            t = !1;
                            break;
                        case ")":
                            var i = this.values[this.paren - 1];
                            t = "if" === i || "while" === i || "for" === i || "with" === i;
                            break;
                        case "}":
                            if (t = !1,
                            "function" === this.values[this.curly - 3])
                                t = !!(s = this.values[this.curly - 4]) && !this.beforeFunctionExpression(s);
                            else if ("function" === this.values[this.curly - 4]) {
                                var s;
                                t = !(s = this.values[this.curly - 5]) || !this.beforeFunctionExpression(s)
                            }
                        }
                        return t
                    }
                    ,
                    e.prototype.push = function(e) {
                        7 === e.type || 4 === e.type ? ("{" === e.value ? this.curly = this.values.length : "(" === e.value && (this.paren = this.values.length),
                        this.values.push(e.value)) : this.values.push(null)
                    }
                    ,
                    e
                }()
                  , o = function() {
                    function e(e, t) {
                        this.errorHandler = new s.ErrorHandler,
                        this.errorHandler.tolerant = !!t && "boolean" === typeof t.tolerant && t.tolerant,
                        this.scanner = new r.Scanner(e,this.errorHandler),
                        this.scanner.trackComment = !!t && "boolean" === typeof t.comment && t.comment,
                        this.trackRange = !!t && "boolean" === typeof t.range && t.range,
                        this.trackLoc = !!t && "boolean" === typeof t.loc && t.loc,
                        this.buffer = [],
                        this.reader = new a
                    }
                    return e.prototype.errors = function() {
                        return this.errorHandler.errors
                    }
                    ,
                    e.prototype.getNextToken = function() {
                        if (0 === this.buffer.length) {
                            var e = this.scanner.scanComments();
                            if (this.scanner.trackComment)
                                for (var t = 0; t < e.length; ++t) {
                                    var i = e[t]
                                      , s = this.scanner.source.slice(i.slice[0], i.slice[1])
                                      , r = {
                                        type: i.multiLine ? "BlockComment" : "LineComment",
                                        value: s
                                    };
                                    this.trackRange && (r.range = i.range),
                                    this.trackLoc && (r.loc = i.loc),
                                    this.buffer.push(r)
                                }
                            if (!this.scanner.eof()) {
                                var a = void 0;
                                this.trackLoc && (a = {
                                    start: {
                                        line: this.scanner.lineNumber,
                                        column: this.scanner.index - this.scanner.lineStart
                                    },
                                    end: {}
                                });
                                var o = "/" === this.scanner.source[this.scanner.index] && this.reader.isRegexStart() ? this.scanner.scanRegExp() : this.scanner.lex();
                                this.reader.push(o);
                                var u = {
                                    type: n.TokenName[o.type],
                                    value: this.scanner.source.slice(o.start, o.end)
                                };
                                if (this.trackRange && (u.range = [o.start, o.end]),
                                this.trackLoc && (a.end = {
                                    line: this.scanner.lineNumber,
                                    column: this.scanner.index - this.scanner.lineStart
                                },
                                u.loc = a),
                                9 === o.type) {
                                    var h = o.pattern
                                      , c = o.flags;
                                    u.regex = {
                                        pattern: h,
                                        flags: c
                                    }
                                }
                                this.buffer.push(u)
                            }
                        }
                        return this.buffer.shift()
                    }
                    ,
                    e
                }();
                t.Tokenizer = o
            }
            ])
        }
        ,
        e.exports = s()
    }
}]);
