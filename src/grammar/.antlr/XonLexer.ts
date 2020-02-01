// Generated from XonLexer.g4 by ANTLR 4.7.3-SNAPSHOT


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


export class XonLexer extends Lexer {
	public static readonly MultiLineComment = 1;
	public static readonly SingleLineComment = 2;
	public static readonly If = 3;
	public static readonly Loop = 4;
	public static readonly In = 5;
	public static readonly BitAnd = 6;
	public static readonly BitOr = 7;
	public static readonly BitXor = 8;
	public static readonly RightShiftArithmetic = 9;
	public static readonly LeftShiftArithmetic = 10;
	public static readonly RightShiftLogical = 11;
	public static readonly OpenBracket = 12;
	public static readonly CloseBracket = 13;
	public static readonly OpenParen = 14;
	public static readonly CloseParen = 15;
	public static readonly OpenBrace = 16;
	public static readonly CloseBrace = 17;
	public static readonly SemiColon = 18;
	public static readonly Comma = 19;
	public static readonly Assign = 20;
	public static readonly QuestionMark = 21;
	public static readonly Colon = 22;
	public static readonly Ellipsis = 23;
	public static readonly Dot = 24;
	public static readonly Plus = 25;
	public static readonly Minus = 26;
	public static readonly BitNot = 27;
	public static readonly Not = 28;
	public static readonly Multiply = 29;
	public static readonly Divide = 30;
	public static readonly Modulus = 31;
	public static readonly Pow = 32;
	public static readonly Sharp = 33;
	public static readonly LessThan = 34;
	public static readonly MoreThan = 35;
	public static readonly LessThanEquals = 36;
	public static readonly MoreThanEquals = 37;
	public static readonly Equals = 38;
	public static readonly NotEquals = 39;
	public static readonly And = 40;
	public static readonly Or = 41;
	public static readonly MultiplyAssign = 42;
	public static readonly DivideAssign = 43;
	public static readonly ModulusAssign = 44;
	public static readonly PlusAssign = 45;
	public static readonly MinusAssign = 46;
	public static readonly LeftShiftArithmeticAssign = 47;
	public static readonly RightShiftArithmeticAssign = 48;
	public static readonly RightShiftLogicalAssign = 49;
	public static readonly BitAndAssign = 50;
	public static readonly BitXorAssign = 51;
	public static readonly BitOrAssign = 52;
	public static readonly LambdaStart = 53;
	public static readonly Pipe = 54;
	public static readonly BooleanLiteral = 55;
	public static readonly DecimalLiteral = 56;
	public static readonly FloatLiteral = 57;
	public static readonly StringLiteral = 58;
	public static readonly CharacterLiteral = 59;
	public static readonly Preprocessor = 60;
	public static readonly LambdaParam = 61;
	public static readonly ID = 62;
	public static readonly WhiteSpaces = 63;
	public static readonly UnexpectedCharacter = 64;
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
		"MultiLineComment", "SingleLineComment", "If", "Loop", "In", "BitAnd", 
		"BitOr", "BitXor", "RightShiftArithmetic", "LeftShiftArithmetic", "RightShiftLogical", 
		"OpenBracket", "CloseBracket", "OpenParen", "CloseParen", "OpenBrace", 
		"CloseBrace", "SemiColon", "Comma", "Assign", "QuestionMark", "Colon", 
		"Ellipsis", "Dot", "Plus", "Minus", "BitNot", "Not", "Multiply", "Divide", 
		"Modulus", "Pow", "Sharp", "LessThan", "MoreThan", "LessThanEquals", "MoreThanEquals", 
		"Equals", "NotEquals", "And", "Or", "MultiplyAssign", "DivideAssign", 
		"ModulusAssign", "PlusAssign", "MinusAssign", "LeftShiftArithmeticAssign", 
		"RightShiftArithmeticAssign", "RightShiftLogicalAssign", "BitAndAssign", 
		"BitXorAssign", "BitOrAssign", "LambdaStart", "Pipe", "BooleanLiteral", 
		"DecimalLiteral", "FloatLiteral", "StringLiteral", "CharacterLiteral", 
		"Preprocessor", "LambdaParam", "ID", "WhiteSpaces", "UnexpectedCharacter", 
		"DECIMAL_NUMBER", "DECIMAL_DIGIT",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, "'if'", "'loop'", "'in'", "'and'", "'or'", 
		"'xor'", "'>>'", "'<<'", "'>>>'", "'['", "']'", "'('", "')'", "'{'", "'}'", 
		"';'", "','", "'='", "'?'", "':'", "'...'", "'.'", "'+'", "'-'", "'~'", 
		"'!'", "'*'", "'/'", "'%'", "'^'", "'#'", "'<'", "'>'", "'<='", "'>='", 
		"'=='", "'!='", "'&&'", "'||'", "'*='", "'/='", "'%='", "'+='", "'-='", 
		"'<<='", "'>>='", "'>>>='", "'&='", "'^='", "'|='", "'\\'", "'|'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "MultiLineComment", "SingleLineComment", "If", "Loop", "In", 
		"BitAnd", "BitOr", "BitXor", "RightShiftArithmetic", "LeftShiftArithmetic", 
		"RightShiftLogical", "OpenBracket", "CloseBracket", "OpenParen", "CloseParen", 
		"OpenBrace", "CloseBrace", "SemiColon", "Comma", "Assign", "QuestionMark", 
		"Colon", "Ellipsis", "Dot", "Plus", "Minus", "BitNot", "Not", "Multiply", 
		"Divide", "Modulus", "Pow", "Sharp", "LessThan", "MoreThan", "LessThanEquals", 
		"MoreThanEquals", "Equals", "NotEquals", "And", "Or", "MultiplyAssign", 
		"DivideAssign", "ModulusAssign", "PlusAssign", "MinusAssign", "LeftShiftArithmeticAssign", 
		"RightShiftArithmeticAssign", "RightShiftLogicalAssign", "BitAndAssign", 
		"BitXorAssign", "BitOrAssign", "LambdaStart", "Pipe", "BooleanLiteral", 
		"DecimalLiteral", "FloatLiteral", "StringLiteral", "CharacterLiteral", 
		"Preprocessor", "LambdaParam", "ID", "WhiteSpaces", "UnexpectedCharacter",
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

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02B\u017D\b\x01" +
		"\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06" +
		"\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r" +
		"\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t" +
		"\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t" +
		"\x17\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t" +
		"\x1C\x04\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t" +
		"\"\x04#\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04" +
		"+\t+\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x04" +
		"4\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x07\x02\x8C\n\x02\f\x02\x0E\x02\x8F\v\x02\x03\x02\x03\x02" +
		"\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03\x9A\n" +
		"\x03\f\x03\x0E\x03\x9D\v\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03" +
		"\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x07\x03" +
		"\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\n\x03" +
		"\n\x03\n\x03\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03\r\x03\r\x03\x0E" +
		"\x03\x0E\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x11\x03\x11\x03\x12\x03\x12" +
		"\x03\x13\x03\x13\x03\x14\x03\x14\x03\x15\x03\x15\x03\x16\x03\x16\x03\x17" +
		"\x03\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03\x19\x03\x19\x03\x1A\x03\x1A" +
		"\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1E\x03\x1E\x03\x1F" +
		"\x03\x1F\x03 \x03 \x03!\x03!\x03\"\x03\"\x03#\x03#\x03$\x03$\x03%\x03" +
		"%\x03%\x03&\x03&\x03&\x03\'\x03\'\x03\'\x03(\x03(\x03(\x03)\x03)\x03)" +
		"\x03*\x03*\x03*\x03+\x03+\x03+\x03,\x03,\x03,\x03-\x03-\x03-\x03.\x03" +
		".\x03.\x03/\x03/\x03/\x030\x030\x030\x030\x031\x031\x031\x031\x032\x03" +
		"2\x032\x032\x032\x033\x033\x033\x034\x034\x034\x035\x035\x035\x036\x03" +
		"6\x037\x037\x038\x038\x038\x038\x038\x038\x038\x038\x038\x058\u0137\n" +
		"8\x039\x039\x03:\x03:\x03:\x03:\x03;\x03;\x07;\u0141\n;\f;\x0E;\u0144" +
		"\v;\x03;\x03;\x03<\x03<\x03<\x03<\x03=\x03=\x03=\x03=\x07=\u0150\n=\f" +
		"=\x0E=\u0153\v=\x03=\x03=\x03>\x03>\x03>\x03?\x03?\x07?\u015C\n?\f?\x0E" +
		"?\u015F\v?\x03@\x06@\u0162\n@\r@\x0E@\u0163\x03@\x03@\x03A\x03A\x03A\x03" +
		"A\x03B\x06B\u016D\nB\rB\x0EB\u016E\x03B\x03B\x06B\u0173\nB\rB\x0EB\u0174" +
		"\x07B\u0177\nB\fB\x0EB\u017A\vB\x03C\x03C\x04\x8D\u0151\x02\x02D\x03\x02" +
		"\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11" +
		"\x02\n\x13\x02\v\x15\x02\f\x17\x02\r\x19\x02\x0E\x1B\x02\x0F\x1D\x02\x10" +
		"\x1F\x02\x11!\x02\x12#\x02\x13%\x02\x14\'\x02\x15)\x02\x16+\x02\x17-\x02" +
		"\x18/\x02\x191\x02\x1A3\x02\x1B5\x02\x1C7\x02\x1D9\x02\x1E;\x02\x1F=\x02" +
		" ?\x02!A\x02\"C\x02#E\x02$G\x02%I\x02&K\x02\'M\x02(O\x02)Q\x02*S\x02+" +
		"U\x02,W\x02-Y\x02.[\x02/]\x020_\x021a\x022c\x023e\x024g\x025i\x026k\x02" +
		"7m\x028o\x029q\x02:s\x02;u\x02<w\x02=y\x02>{\x02?}\x02@\x7F\x02A\x81\x02" +
		"B\x83\x02\x02\x85\x02\x02\x03\x02\t\x05\x02\f\f\x0F\x0F\u202A\u202B\x05" +
		"\x02\f\f\x0F\x0F$$\x05\x02\f\f\x0F\x0F))\x05\x02C\\aac|\x06\x022;C\\a" +
		"ac|\x05\x02\v\f\x0F\x0F\"\"\x03\x022;\x02\u0184\x02\x03\x03\x02\x02\x02" +
		"\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02" +
		"\x02\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02" +
		"\x11\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02" +
		"\x17\x03\x02\x02\x02\x02\x19\x03\x02\x02\x02\x02\x1B\x03\x02\x02\x02\x02" +
		"\x1D\x03\x02\x02\x02\x02\x1F\x03\x02\x02\x02\x02!\x03\x02\x02\x02\x02" +
		"#\x03\x02\x02\x02\x02%\x03\x02\x02\x02\x02\'\x03\x02\x02\x02\x02)\x03" +
		"\x02\x02\x02\x02+\x03\x02\x02\x02\x02-\x03\x02\x02\x02\x02/\x03\x02\x02" +
		"\x02\x021\x03\x02\x02\x02\x023\x03\x02\x02\x02\x025\x03\x02\x02\x02\x02" +
		"7\x03\x02\x02\x02\x029\x03\x02\x02\x02\x02;\x03\x02\x02\x02\x02=\x03\x02" +
		"\x02\x02\x02?\x03\x02\x02\x02\x02A\x03\x02\x02\x02\x02C\x03\x02\x02\x02" +
		"\x02E\x03\x02\x02\x02\x02G\x03\x02\x02\x02\x02I\x03\x02\x02\x02\x02K\x03" +
		"\x02\x02\x02\x02M\x03\x02\x02\x02\x02O\x03\x02\x02\x02\x02Q\x03\x02\x02" +
		"\x02\x02S\x03\x02\x02\x02\x02U\x03\x02\x02\x02\x02W\x03\x02\x02\x02\x02" +
		"Y\x03\x02\x02\x02\x02[\x03\x02\x02\x02\x02]\x03\x02\x02\x02\x02_\x03\x02" +
		"\x02\x02\x02a\x03\x02\x02\x02\x02c\x03\x02\x02\x02\x02e\x03\x02\x02\x02" +
		"\x02g\x03\x02\x02\x02\x02i\x03\x02\x02\x02\x02k\x03\x02\x02\x02\x02m\x03" +
		"\x02\x02\x02\x02o\x03\x02\x02\x02\x02q\x03\x02\x02\x02\x02s\x03\x02\x02" +
		"\x02\x02u\x03\x02\x02\x02\x02w\x03\x02\x02\x02\x02y\x03\x02\x02\x02\x02" +
		"{\x03\x02\x02\x02\x02}\x03\x02\x02\x02\x02\x7F\x03\x02\x02\x02\x02\x81" +
		"\x03\x02\x02\x02\x03\x87\x03\x02\x02\x02\x05\x95\x03\x02\x02\x02\x07\xA0" +
		"\x03\x02\x02\x02\t\xA3\x03\x02\x02\x02\v\xA8\x03\x02\x02\x02\r\xAB\x03" +
		"\x02\x02\x02\x0F\xAF\x03\x02\x02\x02\x11\xB2\x03\x02\x02\x02\x13\xB6\x03" +
		"\x02\x02\x02\x15\xB9\x03\x02\x02\x02\x17\xBC\x03\x02\x02\x02\x19\xC0\x03" +
		"\x02\x02\x02\x1B\xC2\x03\x02\x02\x02\x1D\xC4\x03\x02\x02\x02\x1F\xC6\x03" +
		"\x02\x02\x02!\xC8\x03\x02\x02\x02#\xCA\x03\x02\x02\x02%\xCC\x03\x02\x02" +
		"\x02\'\xCE\x03\x02\x02\x02)\xD0\x03\x02\x02\x02+\xD2\x03\x02\x02\x02-" +
		"\xD4\x03\x02\x02\x02/\xD6\x03\x02\x02\x021\xDA\x03\x02\x02\x023\xDC\x03" +
		"\x02\x02\x025\xDE\x03\x02\x02\x027\xE0\x03\x02\x02\x029\xE2\x03\x02\x02" +
		"\x02;\xE4\x03\x02\x02\x02=\xE6\x03\x02\x02\x02?\xE8\x03\x02\x02\x02A\xEA" +
		"\x03\x02\x02\x02C\xEC\x03\x02\x02\x02E\xEE\x03\x02\x02\x02G\xF0\x03\x02" +
		"\x02\x02I\xF2\x03\x02\x02\x02K\xF5\x03\x02\x02\x02M\xF8\x03\x02\x02\x02" +
		"O\xFB\x03\x02\x02\x02Q\xFE\x03\x02\x02\x02S\u0101\x03\x02\x02\x02U\u0104" +
		"\x03\x02\x02\x02W\u0107\x03\x02\x02\x02Y\u010A\x03\x02\x02\x02[\u010D" +
		"\x03\x02\x02\x02]\u0110\x03\x02\x02\x02_\u0113\x03\x02\x02\x02a\u0117" +
		"\x03\x02\x02\x02c\u011B\x03\x02\x02\x02e\u0120\x03\x02\x02\x02g\u0123" +
		"\x03\x02\x02\x02i\u0126\x03\x02\x02\x02k\u0129\x03\x02\x02\x02m\u012B" +
		"\x03\x02\x02\x02o\u0136\x03\x02\x02\x02q\u0138\x03\x02\x02\x02s\u013A" +
		"\x03\x02\x02\x02u\u013E\x03\x02\x02\x02w\u0147\x03\x02\x02\x02y\u014B" +
		"\x03\x02\x02\x02{\u0156\x03\x02\x02\x02}\u0159\x03\x02\x02\x02\x7F\u0161" +
		"\x03\x02\x02\x02\x81\u0167\x03\x02\x02\x02\x83\u016C\x03\x02\x02\x02\x85" +
		"\u017B\x03\x02\x02\x02\x87\x88\x071\x02\x02\x88\x89\x07,\x02\x02\x89\x8D" +
		"\x03\x02\x02\x02\x8A\x8C\v\x02\x02\x02\x8B\x8A\x03\x02\x02\x02\x8C\x8F" +
		"\x03\x02\x02\x02\x8D\x8E\x03\x02\x02\x02\x8D\x8B\x03\x02\x02\x02\x8E\x90" +
		"\x03\x02\x02\x02\x8F\x8D\x03\x02\x02\x02\x90\x91\x07,\x02\x02\x91\x92" +
		"\x071\x02\x02\x92\x93\x03\x02\x02\x02\x93\x94\b\x02\x02\x02\x94\x04\x03" +
		"\x02\x02\x02\x95\x96\x071\x02\x02\x96\x97\x071\x02\x02\x97\x9B\x03\x02" +
		"\x02\x02\x98\x9A\n\x02\x02\x02\x99\x98\x03\x02\x02\x02\x9A\x9D\x03\x02" +
		"\x02\x02\x9B\x99\x03\x02\x02\x02\x9B\x9C\x03\x02\x02\x02\x9C\x9E\x03\x02" +
		"\x02\x02\x9D\x9B\x03\x02\x02\x02\x9E\x9F\b\x03\x02\x02\x9F\x06\x03\x02" +
		"\x02\x02\xA0\xA1\x07k\x02\x02\xA1\xA2\x07h\x02\x02\xA2\b\x03\x02\x02\x02" +
		"\xA3\xA4\x07n\x02\x02\xA4\xA5\x07q\x02\x02\xA5\xA6\x07q\x02\x02\xA6\xA7" +
		"\x07r\x02\x02\xA7\n\x03\x02\x02\x02\xA8\xA9\x07k\x02\x02\xA9\xAA\x07p" +
		"\x02\x02\xAA\f\x03\x02\x02\x02\xAB\xAC\x07c\x02\x02\xAC\xAD\x07p\x02\x02" +
		"\xAD\xAE\x07f\x02\x02\xAE\x0E\x03\x02\x02\x02\xAF\xB0\x07q\x02\x02\xB0" +
		"\xB1\x07t\x02\x02\xB1\x10\x03\x02\x02\x02\xB2\xB3\x07z\x02\x02\xB3\xB4" +
		"\x07q\x02\x02\xB4\xB5\x07t\x02\x02\xB5\x12\x03\x02\x02\x02\xB6\xB7\x07" +
		"@\x02\x02\xB7\xB8\x07@\x02\x02\xB8\x14\x03\x02\x02\x02\xB9\xBA\x07>\x02" +
		"\x02\xBA\xBB\x07>\x02\x02\xBB\x16\x03\x02\x02\x02\xBC\xBD\x07@\x02\x02" +
		"\xBD\xBE\x07@\x02\x02\xBE\xBF\x07@\x02\x02\xBF\x18\x03\x02\x02\x02\xC0" +
		"\xC1\x07]\x02\x02\xC1\x1A\x03\x02\x02\x02\xC2\xC3\x07_\x02\x02\xC3\x1C" +
		"\x03\x02\x02\x02\xC4\xC5\x07*\x02\x02\xC5\x1E\x03\x02\x02\x02\xC6\xC7" +
		"\x07+\x02\x02\xC7 \x03\x02\x02\x02\xC8\xC9\x07}\x02\x02\xC9\"\x03\x02" +
		"\x02\x02\xCA\xCB\x07\x7F\x02\x02\xCB$\x03\x02\x02\x02\xCC\xCD\x07=\x02" +
		"\x02\xCD&\x03\x02\x02\x02\xCE\xCF\x07.\x02\x02\xCF(\x03\x02\x02\x02\xD0" +
		"\xD1\x07?\x02\x02\xD1*\x03\x02\x02\x02\xD2\xD3\x07A\x02\x02\xD3,\x03\x02" +
		"\x02\x02\xD4\xD5\x07<\x02\x02\xD5.\x03\x02\x02\x02\xD6\xD7\x070\x02\x02" +
		"\xD7\xD8\x070\x02\x02\xD8\xD9\x070\x02\x02\xD90\x03\x02\x02\x02\xDA\xDB" +
		"\x070\x02\x02\xDB2\x03\x02\x02\x02\xDC\xDD\x07-\x02\x02\xDD4\x03\x02\x02" +
		"\x02\xDE\xDF\x07/\x02\x02\xDF6\x03\x02\x02\x02\xE0\xE1\x07\x80\x02\x02" +
		"\xE18\x03\x02\x02\x02\xE2\xE3\x07#\x02\x02\xE3:\x03\x02\x02\x02\xE4\xE5" +
		"\x07,\x02\x02\xE5<\x03\x02\x02\x02\xE6\xE7\x071\x02\x02\xE7>\x03\x02\x02" +
		"\x02\xE8\xE9\x07\'\x02\x02\xE9@\x03\x02\x02\x02\xEA\xEB\x07`\x02\x02\xEB" +
		"B\x03\x02\x02\x02\xEC\xED\x07%\x02\x02\xEDD\x03\x02\x02\x02\xEE\xEF\x07" +
		">\x02\x02\xEFF\x03\x02\x02\x02\xF0\xF1\x07@\x02\x02\xF1H\x03\x02\x02\x02" +
		"\xF2\xF3\x07>\x02\x02\xF3\xF4\x07?\x02\x02\xF4J\x03\x02\x02\x02\xF5\xF6" +
		"\x07@\x02\x02\xF6\xF7\x07?\x02\x02\xF7L\x03\x02\x02\x02\xF8\xF9\x07?\x02" +
		"\x02\xF9\xFA\x07?\x02\x02\xFAN\x03\x02\x02\x02\xFB\xFC\x07#\x02\x02\xFC" +
		"\xFD\x07?\x02\x02\xFDP\x03\x02\x02\x02\xFE\xFF\x07(\x02\x02\xFF\u0100" +
		"\x07(\x02\x02\u0100R\x03\x02\x02\x02\u0101\u0102\x07~\x02\x02\u0102\u0103" +
		"\x07~\x02\x02\u0103T\x03\x02\x02\x02\u0104\u0105\x07,\x02\x02\u0105\u0106" +
		"\x07?\x02\x02\u0106V\x03\x02\x02\x02\u0107\u0108\x071\x02\x02\u0108\u0109" +
		"\x07?\x02\x02\u0109X\x03\x02\x02\x02\u010A\u010B\x07\'\x02\x02\u010B\u010C" +
		"\x07?\x02\x02\u010CZ\x03\x02\x02\x02\u010D\u010E\x07-\x02\x02\u010E\u010F" +
		"\x07?\x02\x02\u010F\\\x03\x02\x02\x02\u0110\u0111\x07/\x02\x02\u0111\u0112" +
		"\x07?\x02\x02\u0112^\x03\x02\x02\x02\u0113\u0114\x07>\x02\x02\u0114\u0115" +
		"\x07>\x02\x02\u0115\u0116\x07?\x02\x02\u0116`\x03\x02\x02\x02\u0117\u0118" +
		"\x07@\x02\x02\u0118\u0119\x07@\x02\x02\u0119\u011A\x07?\x02\x02\u011A" +
		"b\x03\x02\x02\x02\u011B\u011C\x07@\x02\x02\u011C\u011D\x07@\x02\x02\u011D" +
		"\u011E\x07@\x02\x02\u011E\u011F\x07?\x02\x02\u011Fd\x03\x02\x02\x02\u0120" +
		"\u0121\x07(\x02\x02\u0121\u0122\x07?\x02\x02\u0122f\x03\x02\x02\x02\u0123" +
		"\u0124\x07`\x02\x02\u0124\u0125\x07?\x02\x02\u0125h\x03\x02\x02\x02\u0126" +
		"\u0127\x07~\x02\x02\u0127\u0128\x07?\x02\x02\u0128j\x03\x02\x02\x02\u0129" +
		"\u012A\x07^\x02\x02\u012Al\x03\x02\x02\x02\u012B\u012C\x07~\x02\x02\u012C" +
		"n\x03\x02\x02\x02\u012D\u012E\x07v\x02\x02\u012E\u012F\x07t\x02\x02\u012F" +
		"\u0130\x07w\x02\x02\u0130\u0137\x07g\x02\x02\u0131\u0132\x07h\x02\x02" +
		"\u0132\u0133\x07c\x02\x02\u0133\u0134\x07n\x02\x02\u0134\u0135\x07u\x02" +
		"\x02\u0135\u0137\x07g\x02\x02\u0136\u012D\x03\x02\x02\x02\u0136\u0131" +
		"\x03\x02\x02\x02\u0137p\x03\x02\x02\x02\u0138\u0139\x05\x83B\x02\u0139" +
		"r\x03\x02\x02\x02\u013A\u013B\x05\x83B\x02\u013B\u013C\x070\x02\x02\u013C" +
		"\u013D\x05\x83B\x02\u013Dt\x03\x02\x02\x02\u013E\u0142\x07$\x02\x02\u013F" +
		"\u0141\n\x03\x02\x02\u0140\u013F\x03\x02\x02\x02\u0141\u0144\x03\x02\x02" +
		"\x02\u0142\u0140\x03\x02\x02\x02\u0142\u0143\x03\x02\x02\x02\u0143\u0145" +
		"\x03\x02\x02\x02\u0144\u0142\x03\x02\x02\x02\u0145\u0146\x07$\x02\x02" +
		"\u0146v\x03\x02\x02\x02\u0147\u0148\x07)\x02\x02\u0148\u0149\n\x04\x02" +
		"\x02\u0149\u014A\x07)\x02\x02\u014Ax\x03\x02\x02\x02\u014B\u014C\x07%" +
		"\x02\x02\u014C\u014D\x07}\x02\x02\u014D\u0151\x03\x02\x02\x02\u014E\u0150" +
		"\v\x02\x02\x02\u014F\u014E\x03\x02\x02\x02\u0150\u0153\x03\x02\x02\x02" +
		"\u0151\u0152\x03\x02\x02\x02\u0151\u014F\x03\x02\x02\x02\u0152\u0154\x03" +
		"\x02\x02\x02\u0153\u0151\x03\x02\x02\x02\u0154\u0155\x07\x7F\x02\x02\u0155" +
		"z\x03\x02\x02\x02\u0156\u0157\x07&\x02\x02\u0157\u0158\x05\x85C\x02\u0158" +
		"|\x03\x02\x02\x02\u0159\u015D\t\x05\x02\x02\u015A\u015C\t\x06\x02\x02" +
		"\u015B\u015A\x03\x02\x02\x02\u015C\u015F\x03\x02\x02\x02\u015D\u015B\x03" +
		"\x02\x02\x02\u015D\u015E\x03\x02\x02\x02\u015E~\x03\x02\x02\x02\u015F" +
		"\u015D\x03\x02\x02\x02\u0160\u0162\t\x07\x02\x02\u0161\u0160\x03\x02\x02" +
		"\x02\u0162\u0163\x03\x02\x02\x02\u0163\u0161\x03\x02\x02\x02\u0163\u0164" +
		"\x03\x02\x02\x02\u0164\u0165\x03\x02\x02\x02\u0165\u0166\b@\x02\x02\u0166" +
		"\x80\x03\x02\x02\x02\u0167\u0168\v\x02\x02\x02\u0168\u0169\x03\x02\x02" +
		"\x02\u0169\u016A\bA\x03\x02\u016A\x82\x03\x02\x02\x02\u016B\u016D\x05" +
		"\x85C\x02\u016C\u016B\x03\x02\x02\x02\u016D\u016E\x03\x02\x02\x02\u016E" +
		"\u016C\x03\x02\x02\x02\u016E\u016F\x03\x02\x02\x02\u016F\u0178\x03\x02" +
		"\x02\x02\u0170\u0172\x07a\x02\x02\u0171\u0173\x05\x85C\x02\u0172\u0171" +
		"\x03\x02\x02\x02\u0173\u0174\x03\x02\x02\x02\u0174\u0172\x03\x02\x02\x02" +
		"\u0174\u0175\x03\x02\x02\x02\u0175\u0177\x03\x02\x02\x02\u0176\u0170\x03" +
		"\x02\x02\x02\u0177\u017A\x03\x02\x02\x02\u0178\u0176\x03\x02\x02\x02\u0178" +
		"\u0179\x03\x02\x02\x02\u0179\x84\x03\x02\x02\x02\u017A\u0178\x03\x02\x02" +
		"\x02\u017B\u017C\t\b\x02\x02\u017C\x86\x03\x02\x02\x02\r\x02\x8D\x9B\u0136" +
		"\u0142\u0151\u015D\u0163\u016E\u0174\u0178\x04\x02\x03\x02\x02\x04\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!XonLexer.__ATN) {
			XonLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(XonLexer._serializedATN));
		}

		return XonLexer.__ATN;
	}

}

