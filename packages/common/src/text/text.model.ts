import {$ArrayData, $Char, $CommonType, ArrayData, Boolean2, Char, Integer, Nothing, Number2} from '#common';

export interface Text extends ArrayData<Char> {
  lineText(line: Integer): Text;
  split(separator: Text): ArrayData<Text>;
  setPadding(padding: Integer): Text;
  // todo add trim* parameter
  trim(): Text;
  trimStart(): Text;
  trimEnd(): Text;
  startsWith(searchText: Text, startIndex?: Number2 | Nothing): Boolean2;
  endsWith(searchText: Text, startIndex?: Number2 | Nothing): Boolean2;
  repeat(count: Integer): Text;
  equals(other: Char): Boolean2;
  equals(other: ArrayData<Char>): Boolean2;
  equals(other: string): Boolean2;
  toString(): string;
  toNativeString(): string;
}

export const $Text = () => $CommonType<Text>('Text', $ArrayData($Char()));
