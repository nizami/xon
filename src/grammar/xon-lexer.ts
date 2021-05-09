// Generated from XonLexer.g4 by ANTLR 4.9.0-SNAPSHOT

 
    import { XonLexerBase } from "./xon-lexer-base";


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class XonLexer extends XonLexerBase {
	public static readonly INDENT = 1;
	public static readonly DEDENT = 2;
	public static readonly IS = 3;
	public static readonly AS = 4;
	public static readonly IF = 5;
	public static readonly IN = 6;
	public static readonly OR = 7;
	public static readonly FOR = 8;
	public static readonly NOT = 9;
	public static readonly AND = 10;
	public static readonly ELSE = 11;
	public static readonly INIT = 12;
	public static readonly LOOP = 13;
	public static readonly THIS = 14;
	public static readonly BREAK = 15;
	public static readonly WHILE = 16;
	public static readonly RETURN = 17;
	public static readonly OPEN_BRACKET = 18;
	public static readonly CLOSE_BRACKET = 19;
	public static readonly OPEN_PAREN = 20;
	public static readonly CLOSE_PAREN = 21;
	public static readonly OPEN_BRACE = 22;
	public static readonly CLOSE_BRACE = 23;
	public static readonly AD = 24;
	public static readonly PLUS = 25;
	public static readonly HASH = 26;
	public static readonly PIPE = 27;
	public static readonly COMMA = 28;
	public static readonly COLON = 29;
	public static readonly MINUS = 30;
	public static readonly SLASH = 31;
	public static readonly CARET = 32;
	public static readonly TILDE = 33;
	public static readonly SPREAD = 34;
	public static readonly RANGE = 35;
	public static readonly DOT = 36;
	public static readonly LESS_THAN_EQUAL = 37;
	public static readonly MORE_THAN_EQUAL = 38;
	public static readonly LESS_THAN = 39;
	public static readonly MORE_THAN = 40;
	public static readonly ASSIGN = 41;
	public static readonly EQUAL = 42;
	public static readonly NOT_EQUAL = 43;
	public static readonly BIT_AND = 44;
	public static readonly BIT_OR = 45;
	public static readonly BIT_XOR = 46;
	public static readonly LAMBDA = 47;
	public static readonly MODULO = 48;
	public static readonly QUESTION = 49;
	public static readonly ASTERISK = 50;
	public static readonly UNDERSCORE = 51;
	public static readonly EXCLAMATION = 52;
	public static readonly NULL_LITERAL = 53;
	public static readonly FLOAT_LITERAL = 54;
	public static readonly INTEGER_LITERAL = 55;
	public static readonly BOOLEAN_LITERAL = 56;
	public static readonly CHAR_LITERAL = 57;
	public static readonly STRING_LITERAL = 58;
	public static readonly PREPROCESSOR = 59;
	public static readonly ID = 60;
	public static readonly DEFINITION_ID = 61;
	public static readonly NL = 62;
	public static readonly WS = 63;
	public static readonly COMMENT = 64;
	public static readonly ERROR = 2;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN", "ERROR",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"IS", "AS", "IF", "IN", "OR", "FOR", "NOT", "AND", "ELSE", "INIT", "LOOP", 
		"THIS", "BREAK", "WHILE", "RETURN", "OPEN_BRACKET", "CLOSE_BRACKET", "OPEN_PAREN", 
		"CLOSE_PAREN", "OPEN_BRACE", "CLOSE_BRACE", "AD", "PLUS", "HASH", "PIPE", 
		"COMMA", "COLON", "MINUS", "SLASH", "CARET", "TILDE", "SPREAD", "RANGE", 
		"DOT", "LESS_THAN_EQUAL", "MORE_THAN_EQUAL", "LESS_THAN", "MORE_THAN", 
		"ASSIGN", "EQUAL", "NOT_EQUAL", "BIT_AND", "BIT_OR", "BIT_XOR", "LAMBDA", 
		"MODULO", "QUESTION", "ASTERISK", "UNDERSCORE", "EXCLAMATION", "NULL_LITERAL", 
		"FLOAT_LITERAL", "INTEGER_LITERAL", "BOOLEAN_LITERAL", "CHAR_LITERAL", 
		"STRING_LITERAL", "PREPROCESSOR", "ID", "DEFINITION_ID", "NL", "WS", "COMMENT", 
		"DigitNumber", "AlphabetNumber",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, "'is'", "'as'", "'if'", "'in'", "'or'", 
		"'for'", "'not'", "'and'", "'else'", "'init'", "'loop'", "'this'", "'break'", 
		"'while'", "'return'", "'['", "']'", "'('", "')'", "'{'", "'}'", "'@'", 
		"'+'", "'#'", "'|'", "','", "':'", "'-'", "'/'", "'^'", "'~'", "'...'", 
		"'..'", "'.'", "'<='", "'>='", "'<'", "'>'", "'='", "'=='", "'!='", "'&&'", 
		"'||'", "'^^'", "'\\'", "'%'", "'?'", "'*'", "'_'", "'!'", "'null'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "INDENT", "DEDENT", "IS", "AS", "IF", "IN", "OR", "FOR", "NOT", 
		"AND", "ELSE", "INIT", "LOOP", "THIS", "BREAK", "WHILE", "RETURN", "OPEN_BRACKET", 
		"CLOSE_BRACKET", "OPEN_PAREN", "CLOSE_PAREN", "OPEN_BRACE", "CLOSE_BRACE", 
		"AD", "PLUS", "HASH", "PIPE", "COMMA", "COLON", "MINUS", "SLASH", "CARET", 
		"TILDE", "SPREAD", "RANGE", "DOT", "LESS_THAN_EQUAL", "MORE_THAN_EQUAL", 
		"LESS_THAN", "MORE_THAN", "ASSIGN", "EQUAL", "NOT_EQUAL", "BIT_AND", "BIT_OR", 
		"BIT_XOR", "LAMBDA", "MODULO", "QUESTION", "ASTERISK", "UNDERSCORE", "EXCLAMATION", 
		"NULL_LITERAL", "FLOAT_LITERAL", "INTEGER_LITERAL", "BOOLEAN_LITERAL", 
		"CHAR_LITERAL", "STRING_LITERAL", "PREPROCESSOR", "ID", "DEFINITION_ID", 
		"NL", "WS", "COMMENT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(XonLexer._LITERAL_NAMES, XonLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return XonLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(XonLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "XonLexer.g4"; }

	// @Override
	public get ruleNames(): string[] { return XonLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return XonLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return XonLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return XonLexer.modeNames; }

	// @Override
	public action(_localctx: RuleContext, ruleIndex: number, actionIndex: number): void {
		switch (ruleIndex) {
		case 15:
			this.OPEN_BRACKET_action(_localctx, actionIndex);
			break;

		case 16:
			this.CLOSE_BRACKET_action(_localctx, actionIndex);
			break;

		case 17:
			this.OPEN_PAREN_action(_localctx, actionIndex);
			break;

		case 18:
			this.CLOSE_PAREN_action(_localctx, actionIndex);
			break;

		case 19:
			this.OPEN_BRACE_action(_localctx, actionIndex);
			break;

		case 20:
			this.CLOSE_BRACE_action(_localctx, actionIndex);
			break;

		case 59:
			this.NL_action(_localctx, actionIndex);
			break;
		}
	}
	private OPEN_BRACKET_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 0:
			this.opened++;
			break;
		}
	}
	private CLOSE_BRACKET_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 1:
			this.opened--;
			break;
		}
	}
	private OPEN_PAREN_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 2:
			this.opened++;
			break;
		}
	}
	private CLOSE_PAREN_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 3:
			this.opened--;
			break;
		}
	}
	private OPEN_BRACE_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 4:
			this.opened++;
			break;
		}
	}
	private CLOSE_BRACE_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 5:
			this.opened--;
			break;
		}
	}
	private NL_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 6:
			this.handleLineBreak()
			break;
		}
	}
	// @Override
	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 59:
			return this.NL_sempred(_localctx, predIndex);
		}
		return true;
	}
	private NL_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.atStartOfInput();
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02B\u01AD\b\x01" +
		"\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06" +
		"\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r" +
		"\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t" +
		"\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t" +
		"\x17\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t" +
		"\x1C\x04\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t" +
		"\"\x04#\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04" +
		"+\t+\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x04" +
		"4\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x03\x02\x03\x02\x03\x02\x03\x03\x03" +
		"\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x06\x03" +
		"\x06\x03\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\b\x03" +
		"\t\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03" +
		"\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03" +
		"\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03" +
		"\x10\x03\x11\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12\x03\x13\x03\x13\x03" +
		"\x13\x03\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03" +
		"\x16\x03\x17\x03\x17\x03\x18\x03\x18\x03\x19\x03\x19\x03\x1A\x03\x1A\x03" +
		"\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1E\x03\x1E\x03\x1F\x03" +
		"\x1F\x03 \x03 \x03!\x03!\x03!\x03!\x03\"\x03\"\x03\"\x03#\x03#\x03$\x03" +
		"$\x03$\x03%\x03%\x03%\x03&\x03&\x03\'\x03\'\x03(\x03(\x03)\x03)\x03)\x03" +
		"*\x03*\x03*\x03+\x03+\x03+\x03,\x03,\x03,\x03-\x03-\x03-\x03.\x03.\x03" +
		"/\x03/\x030\x030\x031\x031\x032\x032\x033\x033\x034\x034\x034\x034\x03" +
		"4\x035\x035\x055\u0123\n5\x035\x035\x035\x035\x035\x035\x035\x035\x03" +
		"5\x055\u012E\n5\x036\x036\x056\u0132\n6\x036\x036\x036\x056\u0137\n6\x03" +
		"7\x037\x037\x037\x037\x037\x037\x037\x037\x057\u0142\n7\x038\x038\x03" +
		"8\x038\x039\x039\x039\x039\x079\u014C\n9\f9\x0E9\u014F\v9\x039\x039\x03" +
		":\x03:\x03:\x03:\x07:\u0157\n:\f:\x0E:\u015A\v:\x03:\x03:\x03;\x03;\x07" +
		";\u0160\n;\f;\x0E;\u0163\v;\x03<\x03<\x07<\u0167\n<\f<\x0E<\u016A\v<\x03" +
		"=\x03=\x03=\x05=\u016F\n=\x03=\x03=\x05=\u0173\n=\x03=\x05=\u0176\n=\x05" +
		"=\u0178\n=\x03=\x03=\x03>\x06>\u017D\n>\r>\x0E>\u017E\x03>\x03>\x03?\x03" +
		"?\x03?\x03?\x07?\u0187\n?\f?\x0E?\u018A\v?\x03?\x03?\x03@\x06@\u018F\n" +
		"@\r@\x0E@\u0190\x03@\x03@\x06@\u0195\n@\r@\x0E@\u0196\x07@\u0199\n@\f" +
		"@\x0E@\u019C\v@\x03A\x06A\u019F\nA\rA\x0EA\u01A0\x03A\x03A\x06A\u01A5" +
		"\nA\rA\x0EA\u01A6\x07A\u01A9\nA\fA\x0EA\u01AC\vA\x03\u0158\x02\x02B\x03" +
		"\x02\x05\x05\x02\x06\x07\x02\x07\t\x02\b\v\x02\t\r\x02\n\x0F\x02\v\x11" +
		"\x02\f\x13\x02\r\x15\x02\x0E\x17\x02\x0F\x19\x02\x10\x1B\x02\x11\x1D\x02" +
		"\x12\x1F\x02\x13!\x02\x14#\x02\x15%\x02\x16\'\x02\x17)\x02\x18+\x02\x19" +
		"-\x02\x1A/\x02\x1B1\x02\x1C3\x02\x1D5\x02\x1E7\x02\x1F9\x02 ;\x02!=\x02" +
		"\"?\x02#A\x02$C\x02%E\x02&G\x02\'I\x02(K\x02)M\x02*O\x02+Q\x02,S\x02-" +
		"U\x02.W\x02/Y\x020[\x021]\x022_\x023a\x024c\x025e\x026g\x027i\x028k\x02" +
		"9m\x02:o\x02;q\x02<s\x02=u\x02>w\x02?y\x02@{\x02A}\x02B\x7F\x02\x02\x81" +
		"\x02\x02\x03\x02\r\x03\x022;\x04\x02ZZzz\x03\x02))\x03\x02$$\n\x02$$^" +
		"^ddhhppttvvxx\x04\x02aac|\x05\x02C\\aac|\x03\x02C\\\x04\x02\v\v\"\"\x04" +
		"\x02\f\f\x0F\x0F\x05\x022;C\\c|\x02\u01C0\x02\x03\x03\x02\x02\x02\x02" +
		"\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02" +
		"\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11" +
		"\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17" +
		"\x03\x02\x02\x02\x02\x19\x03\x02\x02\x02\x02\x1B\x03\x02\x02\x02\x02\x1D" +
		"\x03\x02\x02\x02\x02\x1F\x03\x02\x02\x02\x02!\x03\x02\x02\x02\x02#\x03" +
		"\x02\x02\x02\x02%\x03\x02\x02\x02\x02\'\x03\x02\x02\x02\x02)\x03\x02\x02" +
		"\x02\x02+\x03\x02\x02\x02\x02-\x03\x02\x02\x02\x02/\x03\x02\x02\x02\x02" +
		"1\x03\x02\x02\x02\x023\x03\x02\x02\x02\x025\x03\x02\x02\x02\x027\x03\x02" +
		"\x02\x02\x029\x03\x02\x02\x02\x02;\x03\x02\x02\x02\x02=\x03\x02\x02\x02" +
		"\x02?\x03\x02\x02\x02\x02A\x03\x02\x02\x02\x02C\x03\x02\x02\x02\x02E\x03" +
		"\x02\x02\x02\x02G\x03\x02\x02\x02\x02I\x03\x02\x02\x02\x02K\x03\x02\x02" +
		"\x02\x02M\x03\x02\x02\x02\x02O\x03\x02\x02\x02\x02Q\x03\x02\x02\x02\x02" +
		"S\x03\x02\x02\x02\x02U\x03\x02\x02\x02\x02W\x03\x02\x02\x02\x02Y\x03\x02" +
		"\x02\x02\x02[\x03\x02\x02\x02\x02]\x03\x02\x02\x02\x02_\x03\x02\x02\x02" +
		"\x02a\x03\x02\x02\x02\x02c\x03\x02\x02\x02\x02e\x03\x02\x02\x02\x02g\x03" +
		"\x02\x02\x02\x02i\x03\x02\x02\x02\x02k\x03\x02\x02\x02\x02m\x03\x02\x02" +
		"\x02\x02o\x03\x02\x02\x02\x02q\x03\x02\x02\x02\x02s\x03\x02\x02\x02\x02" +
		"u\x03\x02\x02\x02\x02w\x03\x02\x02\x02\x02y\x03\x02\x02\x02\x02{\x03\x02" +
		"\x02\x02\x02}\x03\x02\x02\x02\x03\x83\x03\x02\x02\x02\x05\x86\x03\x02" +
		"\x02\x02\x07\x89\x03\x02\x02\x02\t\x8C\x03\x02\x02\x02\v\x8F\x03\x02\x02" +
		"\x02\r\x92\x03\x02\x02\x02\x0F\x96\x03\x02\x02\x02\x11\x9A\x03\x02\x02" +
		"\x02\x13\x9E\x03\x02\x02\x02\x15\xA3\x03\x02\x02\x02\x17\xA8\x03\x02\x02" +
		"\x02\x19\xAD\x03\x02\x02\x02\x1B\xB2\x03\x02\x02\x02\x1D\xB8\x03\x02\x02" +
		"\x02\x1F\xBE\x03\x02\x02\x02!\xC5\x03\x02\x02\x02#\xC8\x03\x02\x02\x02" +
		"%\xCB\x03\x02\x02\x02\'\xCE\x03\x02\x02\x02)\xD1\x03\x02\x02\x02+\xD4" +
		"\x03\x02\x02\x02-\xD7\x03\x02\x02\x02/\xD9\x03\x02\x02\x021\xDB\x03\x02" +
		"\x02\x023\xDD\x03\x02\x02\x025\xDF\x03\x02\x02\x027\xE1\x03\x02\x02\x02" +
		"9\xE3\x03\x02\x02\x02;\xE5\x03\x02\x02\x02=\xE7\x03\x02\x02\x02?\xE9\x03" +
		"\x02\x02\x02A\xEB\x03\x02\x02\x02C\xEF\x03\x02\x02\x02E\xF2\x03\x02\x02" +
		"\x02G\xF4\x03\x02\x02\x02I\xF7\x03\x02\x02\x02K\xFA\x03\x02\x02\x02M\xFC" +
		"\x03\x02\x02\x02O\xFE\x03\x02\x02\x02Q\u0100\x03\x02\x02\x02S\u0103\x03" +
		"\x02\x02\x02U\u0106\x03\x02\x02\x02W\u0109\x03\x02\x02\x02Y\u010C\x03" +
		"\x02\x02\x02[\u010F\x03\x02\x02\x02]\u0111\x03\x02\x02\x02_\u0113\x03" +
		"\x02\x02\x02a\u0115\x03\x02\x02\x02c\u0117\x03\x02\x02\x02e\u0119\x03" +
		"\x02\x02\x02g\u011B\x03\x02\x02\x02i\u012D\x03\x02\x02\x02k\u0136\x03" +
		"\x02\x02\x02m\u0141\x03\x02\x02\x02o\u0143\x03\x02\x02\x02q\u0147\x03" +
		"\x02\x02\x02s\u0152\x03\x02\x02\x02u\u015D\x03\x02\x02\x02w\u0164\x03" +
		"\x02\x02\x02y\u0177\x03\x02\x02\x02{\u017C\x03\x02\x02\x02}\u0182\x03" +
		"\x02\x02\x02\x7F\u018E\x03\x02\x02\x02\x81\u019E\x03\x02\x02\x02\x83\x84" +
		"\x07k\x02\x02\x84\x85\x07u\x02\x02\x85\x04\x03\x02\x02\x02\x86\x87\x07" +
		"c\x02\x02\x87\x88\x07u\x02\x02\x88\x06\x03\x02\x02\x02\x89\x8A\x07k\x02" +
		"\x02\x8A\x8B\x07h\x02\x02\x8B\b\x03\x02\x02\x02\x8C\x8D\x07k\x02\x02\x8D" +
		"\x8E\x07p\x02\x02\x8E\n\x03\x02\x02\x02\x8F\x90\x07q\x02\x02\x90\x91\x07" +
		"t\x02\x02\x91\f\x03\x02\x02\x02\x92\x93\x07h\x02\x02\x93\x94\x07q\x02" +
		"\x02\x94\x95\x07t\x02\x02\x95\x0E\x03\x02\x02\x02\x96\x97\x07p\x02\x02" +
		"\x97\x98\x07q\x02\x02\x98\x99\x07v\x02\x02\x99\x10\x03\x02\x02\x02\x9A" +
		"\x9B\x07c\x02\x02\x9B\x9C\x07p\x02\x02\x9C\x9D\x07f\x02\x02\x9D\x12\x03" +
		"\x02\x02\x02\x9E\x9F\x07g\x02\x02\x9F\xA0\x07n\x02\x02\xA0\xA1\x07u\x02" +
		"\x02\xA1\xA2\x07g\x02\x02\xA2\x14\x03\x02\x02\x02\xA3\xA4\x07k\x02\x02" +
		"\xA4\xA5\x07p\x02\x02\xA5\xA6\x07k\x02\x02\xA6\xA7\x07v\x02\x02\xA7\x16" +
		"\x03\x02\x02\x02\xA8\xA9\x07n\x02\x02\xA9\xAA\x07q\x02\x02\xAA\xAB\x07" +
		"q\x02\x02\xAB\xAC\x07r\x02\x02\xAC\x18\x03\x02\x02\x02\xAD\xAE\x07v\x02" +
		"\x02\xAE\xAF\x07j\x02\x02\xAF\xB0\x07k\x02\x02\xB0\xB1\x07u\x02\x02\xB1" +
		"\x1A\x03\x02\x02\x02\xB2\xB3\x07d\x02\x02\xB3\xB4\x07t\x02\x02\xB4\xB5" +
		"\x07g\x02\x02\xB5\xB6\x07c\x02\x02\xB6\xB7\x07m\x02\x02\xB7\x1C\x03\x02" +
		"\x02\x02\xB8\xB9\x07y\x02\x02\xB9\xBA\x07j\x02\x02\xBA\xBB\x07k\x02\x02" +
		"\xBB\xBC\x07n\x02\x02\xBC\xBD\x07g\x02\x02\xBD\x1E\x03\x02\x02\x02\xBE" +
		"\xBF\x07t\x02\x02\xBF\xC0\x07g\x02\x02\xC0\xC1\x07v\x02\x02\xC1\xC2\x07" +
		"w\x02\x02\xC2\xC3\x07t\x02\x02\xC3\xC4\x07p\x02\x02\xC4 \x03\x02\x02\x02" +
		"\xC5\xC6\x07]\x02\x02\xC6\xC7\b\x11\x02\x02\xC7\"\x03\x02\x02\x02\xC8" +
		"\xC9\x07_\x02\x02\xC9\xCA\b\x12\x03\x02\xCA$\x03\x02\x02\x02\xCB\xCC\x07" +
		"*\x02\x02\xCC\xCD\b\x13\x04\x02\xCD&\x03\x02\x02\x02\xCE\xCF\x07+\x02" +
		"\x02\xCF\xD0\b\x14\x05\x02\xD0(\x03\x02\x02\x02\xD1\xD2\x07}\x02\x02\xD2" +
		"\xD3\b\x15\x06\x02\xD3*\x03\x02\x02\x02\xD4\xD5\x07\x7F\x02\x02\xD5\xD6" +
		"\b\x16\x07\x02\xD6,\x03\x02\x02\x02\xD7\xD8\x07B\x02\x02\xD8.\x03\x02" +
		"\x02\x02\xD9\xDA\x07-\x02\x02\xDA0\x03\x02\x02\x02\xDB\xDC\x07%\x02\x02" +
		"\xDC2\x03\x02\x02\x02\xDD\xDE\x07~\x02\x02\xDE4\x03\x02\x02\x02\xDF\xE0" +
		"\x07.\x02\x02\xE06\x03\x02\x02\x02\xE1\xE2\x07<\x02\x02\xE28\x03\x02\x02" +
		"\x02\xE3\xE4\x07/\x02\x02\xE4:\x03\x02\x02\x02\xE5\xE6\x071\x02\x02\xE6" +
		"<\x03\x02\x02\x02\xE7\xE8\x07`\x02\x02\xE8>\x03\x02\x02\x02\xE9\xEA\x07" +
		"\x80\x02\x02\xEA@\x03\x02\x02\x02\xEB\xEC\x070\x02\x02\xEC\xED\x070\x02" +
		"\x02\xED\xEE\x070\x02\x02\xEEB\x03\x02\x02\x02\xEF\xF0\x070\x02\x02\xF0" +
		"\xF1\x070\x02\x02\xF1D\x03\x02\x02\x02\xF2\xF3\x070\x02\x02\xF3F\x03\x02" +
		"\x02\x02\xF4\xF5\x07>\x02\x02\xF5\xF6\x07?\x02\x02\xF6H\x03\x02\x02\x02" +
		"\xF7\xF8\x07@\x02\x02\xF8\xF9\x07?\x02\x02\xF9J\x03\x02\x02\x02\xFA\xFB" +
		"\x07>\x02\x02\xFBL\x03\x02\x02\x02\xFC\xFD\x07@\x02\x02\xFDN\x03\x02\x02" +
		"\x02\xFE\xFF\x07?\x02\x02\xFFP\x03\x02\x02\x02\u0100\u0101\x07?\x02\x02" +
		"\u0101\u0102\x07?\x02\x02\u0102R\x03\x02\x02\x02\u0103\u0104\x07#\x02" +
		"\x02\u0104\u0105\x07?\x02\x02\u0105T\x03\x02\x02\x02\u0106\u0107\x07(" +
		"\x02\x02\u0107\u0108\x07(\x02\x02\u0108V\x03\x02\x02\x02\u0109\u010A\x07" +
		"~\x02\x02\u010A\u010B\x07~\x02\x02\u010BX\x03\x02\x02\x02\u010C\u010D" +
		"\x07`\x02\x02\u010D\u010E\x07`\x02\x02\u010EZ\x03\x02\x02\x02\u010F\u0110" +
		"\x07^\x02\x02\u0110\\\x03\x02\x02\x02\u0111\u0112\x07\'\x02\x02\u0112" +
		"^\x03\x02\x02\x02\u0113\u0114\x07A\x02\x02\u0114`\x03\x02\x02\x02\u0115" +
		"\u0116\x07,\x02\x02\u0116b\x03\x02\x02\x02\u0117\u0118\x07a\x02\x02\u0118" +
		"d\x03\x02\x02\x02\u0119\u011A\x07#\x02\x02\u011Af\x03\x02\x02\x02\u011B" +
		"\u011C\x07p\x02\x02\u011C\u011D\x07w\x02\x02\u011D\u011E\x07n\x02\x02" +
		"\u011E\u011F\x07n\x02\x02\u011Fh\x03\x02\x02\x02\u0120\u0122\t\x02\x02" +
		"\x02\u0121\u0123\t\x02\x02\x02\u0122\u0121\x03\x02\x02\x02\u0122\u0123" +
		"\x03\x02\x02\x02\u0123\u0124\x03\x02\x02\x02\u0124\u0125\t\x03\x02\x02" +
		"\u0125\u0126\x05\x81A\x02\u0126\u0127\x070\x02\x02\u0127\u0128\x05\x81" +
		"A\x02\u0128\u012E\x03\x02\x02\x02\u0129\u012A\x05\x7F@\x02\u012A\u012B" +
		"\x070\x02\x02\u012B\u012C\x05\x7F@\x02\u012C\u012E\x03\x02\x02\x02\u012D" +
		"\u0120\x03\x02\x02\x02\u012D\u0129\x03\x02\x02\x02\u012Ej\x03\x02\x02" +
		"\x02\u012F\u0131\t\x02\x02\x02\u0130\u0132\t\x02\x02\x02\u0131\u0130\x03" +
		"\x02\x02\x02\u0131\u0132\x03\x02\x02\x02\u0132\u0133\x03\x02\x02\x02\u0133" +
		"\u0134\t\x03\x02\x02\u0134\u0137\x05\x81A\x02\u0135\u0137\x05\x7F@\x02" +
		"\u0136\u012F\x03\x02\x02\x02\u0136\u0135\x03\x02\x02\x02\u0137l\x03\x02" +
		"\x02\x02\u0138\u0139\x07v\x02\x02\u0139\u013A\x07t\x02\x02\u013A\u013B" +
		"\x07w\x02\x02\u013B\u0142\x07g\x02\x02\u013C\u013D\x07h\x02\x02\u013D" +
		"\u013E\x07c\x02\x02\u013E\u013F\x07n\x02\x02\u013F\u0140\x07u\x02\x02" +
		"\u0140\u0142\x07g\x02\x02\u0141\u0138\x03\x02\x02\x02\u0141\u013C\x03" +
		"\x02\x02\x02\u0142n\x03\x02\x02\x02\u0143\u0144\x07)\x02\x02\u0144\u0145" +
		"\n\x04\x02\x02\u0145\u0146\x07)\x02\x02\u0146p\x03\x02\x02\x02\u0147\u014D" +
		"\x07$\x02\x02\u0148\u014C\n\x05\x02\x02\u0149\u014A\x07^\x02\x02\u014A" +
		"\u014C\t\x06\x02\x02\u014B\u0148\x03\x02\x02\x02\u014B\u0149\x03\x02\x02" +
		"\x02\u014C\u014F\x03\x02\x02\x02\u014D\u014B\x03\x02\x02\x02\u014D\u014E" +
		"\x03\x02\x02\x02\u014E\u0150\x03\x02\x02\x02\u014F\u014D\x03\x02\x02\x02" +
		"\u0150\u0151\x07$\x02\x02\u0151r\x03\x02\x02\x02\u0152\u0153\x07%\x02" +
		"\x02\u0153\u0154\x07}\x02\x02\u0154\u0158\x03\x02\x02\x02\u0155\u0157" +
		"\v\x02\x02\x02\u0156\u0155\x03\x02\x02\x02\u0157\u015A\x03\x02\x02\x02" +
		"\u0158\u0159\x03\x02\x02\x02\u0158\u0156\x03\x02\x02\x02\u0159\u015B\x03" +
		"\x02\x02\x02\u015A\u0158\x03\x02\x02\x02\u015B\u015C\x07\x7F\x02\x02\u015C" +
		"t\x03\x02\x02\x02\u015D\u0161\t\x07\x02\x02\u015E\u0160\t\b\x02\x02\u015F" +
		"\u015E\x03\x02\x02\x02\u0160\u0163\x03\x02\x02\x02\u0161\u015F\x03\x02" +
		"\x02\x02\u0161\u0162\x03\x02\x02\x02\u0162v\x03\x02\x02\x02\u0163\u0161" +
		"\x03\x02\x02\x02\u0164\u0168\t\t\x02\x02\u0165\u0167\t\b\x02\x02\u0166" +
		"\u0165\x03\x02\x02\x02\u0167\u016A\x03\x02\x02\x02\u0168\u0166\x03\x02" +
		"\x02\x02\u0168\u0169\x03\x02\x02\x02\u0169x\x03\x02\x02\x02\u016A\u0168" +
		"\x03\x02\x02\x02\u016B\u016C\x06=\x02\x02\u016C\u0178\x05{>\x02\u016D" +
		"\u016F\x07\x0F\x02\x02\u016E\u016D\x03\x02\x02\x02\u016E\u016F\x03\x02" +
		"\x02\x02\u016F\u0170\x03\x02\x02\x02\u0170\u0173\x07\f\x02\x02\u0171\u0173" +
		"\x07\x0F\x02\x02\u0172\u016E\x03\x02\x02\x02\u0172\u0171\x03\x02\x02\x02" +
		"\u0173\u0175\x03\x02\x02\x02\u0174\u0176\x05{>\x02\u0175\u0174\x03\x02" +
		"\x02\x02\u0175\u0176\x03\x02\x02\x02\u0176\u0178\x03\x02\x02\x02\u0177" +
		"\u016B\x03\x02\x02\x02\u0177\u0172\x03\x02\x02\x02\u0178\u0179\x03\x02" +
		"\x02\x02\u0179\u017A\b=\b\x02\u017Az\x03\x02\x02\x02\u017B\u017D\t\n\x02" +
		"\x02\u017C\u017B\x03\x02\x02\x02\u017D\u017E\x03\x02\x02\x02\u017E\u017C" +
		"\x03\x02\x02\x02\u017E\u017F\x03\x02\x02\x02\u017F\u0180\x03\x02\x02\x02" +
		"\u0180\u0181\b>\t\x02\u0181|\x03\x02\x02\x02\u0182\u0183\x07/\x02\x02" +
		"\u0183\u0184\x07/\x02\x02\u0184\u0188\x03\x02\x02\x02\u0185\u0187\n\v" +
		"\x02\x02\u0186\u0185\x03\x02\x02\x02\u0187\u018A\x03\x02\x02\x02\u0188" +
		"\u0186\x03\x02\x02\x02\u0188\u0189\x03\x02\x02\x02\u0189\u018B\x03\x02" +
		"\x02\x02\u018A\u0188\x03\x02\x02\x02\u018B\u018C\b?\t\x02\u018C~\x03\x02" +
		"\x02\x02\u018D\u018F\t\x02\x02\x02\u018E\u018D\x03\x02\x02\x02\u018F\u0190" +
		"\x03\x02\x02\x02\u0190\u018E\x03\x02\x02\x02\u0190\u0191\x03\x02\x02\x02" +
		"\u0191\u019A\x03\x02\x02\x02\u0192\u0194\x07a\x02\x02\u0193\u0195\t\x02" +
		"\x02\x02\u0194\u0193\x03\x02\x02\x02\u0195\u0196\x03\x02\x02\x02\u0196" +
		"\u0194\x03\x02\x02\x02\u0196\u0197\x03\x02\x02\x02\u0197\u0199\x03\x02" +
		"\x02\x02\u0198\u0192\x03\x02\x02\x02\u0199\u019C\x03\x02\x02\x02\u019A" +
		"\u0198\x03\x02\x02\x02\u019A\u019B\x03\x02\x02\x02\u019B\x80\x03\x02\x02" +
		"\x02\u019C\u019A\x03\x02\x02\x02\u019D\u019F\t\f\x02\x02\u019E\u019D\x03" +
		"\x02\x02\x02\u019F\u01A0\x03\x02\x02\x02\u01A0\u019E\x03\x02\x02\x02\u01A0" +
		"\u01A1\x03\x02\x02\x02\u01A1\u01AA\x03\x02\x02\x02\u01A2\u01A4\x07a\x02" +
		"\x02\u01A3\u01A5\t\f\x02\x02\u01A4\u01A3\x03\x02\x02\x02\u01A5\u01A6\x03" +
		"\x02\x02\x02\u01A6\u01A4\x03\x02\x02\x02\u01A6\u01A7\x03\x02\x02\x02\u01A7" +
		"\u01A9\x03\x02\x02\x02\u01A8\u01A2\x03\x02\x02\x02\u01A9\u01AC\x03\x02" +
		"\x02\x02\u01AA\u01A8\x03\x02\x02\x02\u01AA\u01AB\x03\x02\x02\x02\u01AB" +
		"\x82\x03\x02\x02\x02\u01AC\u01AA\x03\x02\x02\x02\x19\x02\u0122\u012D\u0131" +
		"\u0136\u0141\u014B\u014D\u0158\u0161\u0168\u016E\u0172\u0175\u0177\u017E" +
		"\u0188\u0190\u0196\u019A\u01A0\u01A6\u01AA\n\x03\x11\x02\x03\x12\x03\x03" +
		"\x13\x04\x03\x14\x05\x03\x15\x06\x03\x16\x07\x03=\b\b\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!XonLexer.__ATN) {
			XonLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(XonLexer._serializedATN));
		}

		return XonLexer.__ATN;
	}

}

