import { IssueLevel } from '../issue/issue-level';
import { String2 } from '../lib/core';
import { Node } from '../parser/node/node';
import { ParserContext } from '../parser/parser-context';
import { getNodeText } from '../source/source';
import { IssueMessage } from './issue-message';

// export class Issue {
//   // public actual: String2
//   // public expect: String2
//   constructor(public node: Node, public level: IssueLevel, public message: String2) {}
//   // static errorFromSourceSpan(sourceSpan: SourceSpan, message: String2): Never {
//   //   const issue = new Issue(sourceSpan, IssueLevel.error, message);
//   //   const formatter = new IssueFormatter(issue);
//   //   throw new Error(formatter.toString());
//   // }
//   // static errorFromContext(ctx: ParserRuleContext, message: String2): Never {
//   //   Issue.errorFromSourceSpan(SourceSpan.fromContext(ctx), message);
//   // }
//   // static errorFromTree(node: Node, message: String2): Never {
//   //   Issue.errorFromSourceSpan(node.sourceSpan, message);
//   // }
// }

export function formatIssue(context: ParserContext, { node, message }: Issue): String2 {
  const msg = redBright(message.actual);
  const lineText = context.source.text.split('\n')[node.range.start.line];
  const nodeText = getNodeText(context, node);
  const location = cyan(context.source.location ?? '<code>');
  const line = cyan(`:${node.range.start.line + 1}`);
  const column = cyan(`:${node.range.start.column + 1}`);
  const lineNumberBeforeGrayed = `${node.range.start.line + 1} | `;
  const lineNumber = gray(lineNumberBeforeGrayed);
  const caret = ' '.repeat(node.range.start.column + lineNumberBeforeGrayed.length) + red('~'.repeat(nodeText.length));

  return `${msg}\n${location}${line}${column}\n${lineNumber}${lineText}\n${caret}`;
}

export interface Issue {
  node: Node;
  level: IssueLevel;
  message: IssueMessage;
}

export function createErrorIssue(node: Node, message: IssueMessage): Issue {
  return {
    node,
    level: IssueLevel.error,
    message,
  };
}

const redBright = (x: String2): String2 => coloredText(x, COLOR.FG_RED);
const cyan = (x: String2): String2 => coloredText(x, COLOR.FG_CYAN);
const gray = (x: String2): String2 => coloredText(x, COLOR.FG_GRAY);
const red = (x: String2): String2 => coloredText(x, COLOR.FG_RED);

const coloredText = (text: String2, color: COLOR): String2 => `${color}${text}${COLOR.RESET}`;

enum COLOR {
  RESET = '\x1b[0m',
  BRIGHT = '\x1b[1m',
  DIM = '\x1b[2m',
  UNDERSCORE = '\x1b[4m',
  BLINK = '\x1b[5m',
  REVERSE = '\x1b[7m',
  HIDDEN = '\x1b[8m',

  FG_BLACK = '\x1b[30m',
  FG_RED = '\x1b[31m',
  FG_GREEN = '\x1b[32m',
  FG_YELLOW = '\x1b[33m',
  FG_BLUE = '\x1b[34m',
  FG_MAGENTA = '\x1b[35m',
  FG_CYAN = '\x1b[36m',
  FG_WHITE = '\x1b[37m',
  FG_GRAY = '\x1b[90m',

  BG_BLACK = '\x1b[40m',
  BG_RED = '\x1b[41m',
  BG_GREEN = '\x1b[42m',
  BG_YELLOW = '\x1b[43m',
  BG_BLUE = '\x1b[44m',
  BG_MAGENTA = '\x1b[45m',
  BG_CYAN = '\x1b[46m',
  BG_WHITE = '\x1b[47m',
  BG_GRAY = '\x1b[100m',
}
