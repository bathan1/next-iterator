import path from "node:path";
import { CallExpression, Node, Project } from "ts-morph";

const moduleFilePath = process.argv[2];
if (!moduleFilePath) {
  throw new Error("Usage: tsx bin/print-it.ts <module-path> [test-file-path]");
}

const moduleExt = path.extname(moduleFilePath);
const testExt = moduleExt === ".tsx" ? ".test.tsx" : ".test.ts";

const testFilePath =
  process.argv[3] ??
  path.join(path.dirname(moduleFilePath), `${path.basename(moduleFilePath, moduleExt)}${testExt}`);

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

const testFile = project.addSourceFileAtPath(testFilePath);
const moduleFile = project.addSourceFileAtPath(moduleFilePath);

const examplesByFunctionRef = collectExamplesByFunctionRef();

for (const [functionRef, examples] of examplesByFunctionRef) {
  const target = getTargetForFunctionRef(functionRef);
  if (!target) continue;

  addExamplesToTarget(target, examples);
}

moduleFile.saveSync();

function collectExamplesByFunctionRef() {
  const examplesByFunctionRef = new Map<string, string[]>();

  for (const statement of testFile.getStatements()) {
    if (!isDescribeCall(statement)) continue;

    const suiteName = getStringArg(statement, 0);
    if (!suiteName) continue;

    const functionRef = getFunctionRefFromSuiteName(suiteName);
    const describeCallback = getCallbackArg(statement, 1);
    if (!describeCallback) continue;

    const describeBody = describeCallback.getBody();
    if (!Node.isBlock(describeBody)) continue;

    const examples: string[] = [];

    for (const statement of describeBody.getStatements()) {
      if (!isTestCall(statement)) continue;

      const testName = getStringArg(statement, 0);
      if (!testName) continue;

      const testCallback = getCallbackArg(statement, 1);
      if (!testCallback) continue;

      const testBody = testCallback.getBody();
      if (!Node.isBlock(testBody)) continue;

      const code = dedent(
        testBody
          .getStatements()
          .map((stmt) => stmt.getFullText())
          .join("")
      );

      examples.push(makeExampleBody(testName, code));
    }

    if (examples.length > 0) {
      examplesByFunctionRef.set(functionRef, examples);
    }
  }

  return examplesByFunctionRef;
}

function addExamplesToTarget(target: Node, examples: string[]) {
  const jsDocs = getJsDocs(target);
  const jsDoc = jsDocs.at(-1);

  if (jsDoc) {
    const merged = mergeExamplesIntoJsDoc(jsDoc.getText(), examples);
    moduleFile.replaceText([jsDoc.getStart(), jsDoc.getEnd()], merged);
    return;
  }

  moduleFile.insertText(target.getStart(), `${makeJsDocFromBody(makeExamplesBody(examples))}\n`);
}

function getJsDocs(target: Node) {
  if (Node.isFunctionDeclaration(target)) return target.getJsDocs();
  if (Node.isVariableStatement(target)) return target.getJsDocs();

  // For `C.equal = equal`, the JSDoc usually sits directly above the expression statement.
  if (Node.isExpressionStatement(target)) {
    return target.getJsDocs();
  }

  return [];
}

function mergeExamplesIntoJsDoc(jsDocText: string, examples: string[]) {
  const brief = getBriefFromJsDoc(jsDocText);
  const examplesBody = makeExamplesBody(examples);

  return makeJsDocFromBody(brief ? `${brief}\n\n${examplesBody}` : examplesBody);
}

function getBriefFromJsDoc(jsDocText: string) {
  const body = readJsDocBody(jsDocText);
  const exampleIndex = body.search(/^@example\b/m);

  return (exampleIndex === -1 ? body : body.slice(0, exampleIndex))
    .replace(/\n*## Examples\s*$/i, "")
    .trimEnd();
}

function readJsDocBody(jsDocText: string) {
  return jsDocText
    .replace(/^\/\*\*\s*\n?/, "")
    .replace(/\n?\s*\*\/$/, "")
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*\*\s?/, ""))
    .join("\n")
    .trimEnd();
}

function makeJsDocFromBody(body: string) {
  const lines = body.trimEnd().split("\n");

  return ["/**", ...lines.map((line) => (line ? ` * ${line}` : " *")), " */"].join("\n");
}

function makeExamplesBody(examples: string[]) {
  return examples.map((example) => `@example\n${example}`).join("\n\n");
}

function makeExampleBody(title: string, code: string) {
  const codeBlockBegin = testExt.endsWith("tsx") ? "```tsx" : "```ts";
  return [`It ${title.trim()}`, codeBlockBegin, code, "```"].join("\n");
}

function getTargetForFunctionRef(functionRef: string) {
  const attachedTarget = getAttachedFunctionStatement(functionRef);
  if (attachedTarget) return attachedTarget;

  const functionName = getFunctionNameFromRef(functionRef);

  return getFirstFunctionStatement(functionName) ?? getExportedVariableStatement(functionName);
}

function getAttachedFunctionStatement(functionRef: string) {
  const [exportedObjectName, attachedName] = functionRef.split(".");
  if (!exportedObjectName || !attachedName) return undefined;

  const internalObjectName = getExportInternalName(exportedObjectName);

  return moduleFile.getStatements().find((stmt) => {
    if (!Node.isExpressionStatement(stmt)) return false;

    const expr = stmt.getExpression();
    if (!Node.isBinaryExpression(expr)) return false;

    const left = expr.getLeft();
    if (!Node.isPropertyAccessExpression(left)) return false;

    return left.getExpression().getText() === internalObjectName && left.getName() === attachedName;
  });
}

function getExportInternalName(exportedName: string) {
  for (const stmt of moduleFile.getVariableStatements()) {
    for (const decl of stmt.getDeclarations()) {
      if (decl.getName() !== exportedName) continue;

      const init = decl.getInitializer();
      return init?.getText() ?? exportedName;
    }
  }

  return exportedName;
}

function getFirstFunctionStatement(functionName: string) {
  return moduleFile.getStatements().find((stmt) => {
    return Node.isFunctionDeclaration(stmt) && stmt.getName() === functionName;
  });
}

function getExportedVariableStatement(functionName: string) {
  return moduleFile.getVariableStatements().find((stmt) => {
    return stmt.getDeclarations().some((decl) => decl.getName() === functionName);
  });
}

function getFunctionRefFromSuiteName(suiteName: string) {
  return suiteName.replace(/\s*\(.*\)\s*$/, "");
}

function getFunctionNameFromRef(functionRef: string) {
  return functionRef.split(".").at(-1)!;
}

function asCallExpression(node: Node): CallExpression | undefined {
  if (Node.isCallExpression(node)) return node;

  if (Node.isExpressionStatement(node)) {
    const expr = node.getExpression();
    if (Node.isCallExpression(expr)) return expr;
  }

  return undefined;
}

function isDescribeCall(node: Node) {
  return asCallExpression(node)?.getExpression().getText() === "describe";
}

function isTestCall(node: Node) {
  const name = asCallExpression(node)?.getExpression().getText();

  return (
    name === "it" ||
    name === "test" ||
    name === "it.only" ||
    name === "test.only" ||
    name === "it.skip" ||
    name === "test.skip"
  );
}

function getStringArg(node: Node, index: number) {
  const arg = asCallExpression(node)?.getArguments()[index];

  if (!arg) return undefined;
  if (!Node.isStringLiteral(arg)) return undefined;

  return arg.getLiteralText();
}

function getCallbackArg(node: Node, index: number) {
  const arg = asCallExpression(node)?.getArguments()[index];

  if (!arg) return undefined;

  if (Node.isArrowFunction(arg) || Node.isFunctionExpression(arg)) {
    return arg;
  }

  return undefined;
}

function dedent(code: string) {
  const lines = code
    .replace(/^\r?\n/, "")
    .replace(/\s+$/, "")
    .split(/\r?\n/);

  const nonEmptyLines = lines.filter((line) => line.trim().length > 0);
  if (nonEmptyLines.length === 0) return "";

  const minIndent = Math.min(...nonEmptyLines.map((line) => line.match(/^\s*/)?.[0].length ?? 0));

  return lines.map((line) => line.slice(minIndent)).join("\n");
}
