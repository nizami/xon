import { ModuleContext } from '../../grammar/generated/AsmParser';
import { ClassTree } from './class-tree';
import { ImportTree } from './import-tree';
import { getFilenameWithoutExtension } from '../../util';
import { FunctionTree } from './function-tree';
import { StatementTree } from './statement-tree';
import { ExpressionTree } from './expression-tree';

export class ModuleTree {
    name: string;
    fullName: string;
    imports: ImportTree[] = [];
    classes: ClassTree[] = [];
    functions: FunctionTree[] = [];
    statements: StatementTree[] = [];

    constructor(public ctx: ModuleContext, public absolutePath: string) {
        this.name = getFilenameWithoutExtension(absolutePath).replace(/[^0-9a-z-A-Z]/g, '_');
        this.fullName = absolutePath
            .replace(this.commonPath(absolutePath, __dirname), '')
            .replace(/[^0-9a-z-A-Z]/g, '_');

        this.imports = ctx.importDeclaration().map(x => new ImportTree(x, this));
        this.statements = ctx.statement().map(x => new StatementTree(x));
        // this.classes = ctx.classDeclaration().map(x => new ClassTree(x));
        // this.functions = ctx.functionDeclaration().map(x => new FunctionTree(x));
    }

    commonPath(...paths: string[]) {
        const delimiter = paths[0].includes('/') ? '/' : '\\';
        for (let i = 0; i < paths[0].length; i++) {
            if (paths.some(x => x[i] != paths[0][i])) return paths[0].slice(0, paths[0].lastIndexOf(delimiter, i));
        }
        return paths[0];
    }

    getMembers() {
        const members: { name: string; tree: ExpressionTree }[] = [];
        this.statements
            .filter(x => x.varDeclarationStatementTree)
            .forEach(x =>
                members.push({ name: x.varDeclarationStatementTree.name, tree: x.varDeclarationStatementTree.value })
            );

        return members;
    }

    toPlane() {
        return {
            name: this.name,
            imports: this.imports.map(x => x.toPlane()),
            classes: this.classes.map(x => x.toPlane()),
            functions: this.functions.map(x => x.toPlane()),
        };
    }
}
