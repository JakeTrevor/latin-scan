import React, { FC, useEffect, useRef, useState } from "react";
import { findAllMatches, getLetterWithMarking } from "../SCAN/utils";
import type { stringSetter, vowel } from "../projectTypes";

const FORCED_SPONDEE_REGEX = /_[aeiouy]/g;
const FORCED_DACTYL_REGEX = /@[aeiouy]/g;
const FOUND_FORCED_VOWEL = /[@_][aeiouy]/;

function catchForcedDactyls(text: string) {
  if (FORCED_DACTYL_REGEX.test(text.toLocaleLowerCase())) {
    let forcedDactyls = findAllMatches(
      text.toLocaleLowerCase(),
      FORCED_DACTYL_REGEX
    );
    for (let each of forcedDactyls) {
      let letter = text.charAt(each + 1) as vowel;
      let replacement = getLetterWithMarking("short", letter);
      text = replaceLetter(text, each, replacement);
    }
  }
  return text;
}

function catchForcedSpondees(text: string) {
  if (FORCED_SPONDEE_REGEX.test(text.toLowerCase())) {
    let forcedSpondees = findAllMatches(
      text.toLocaleLowerCase(),
      FORCED_SPONDEE_REGEX
    );
    for (let each of forcedSpondees) {
      let letter = text.charAt(each + 1) as vowel;
      let replacement = getLetterWithMarking("long", letter);
      text = replaceLetter(text, each, replacement);
    }
  }
  return text;
}

function replaceLetter(text: string, position: number, replacement: string) {
  return (
    text.substring(0, position) + replacement + text.substring(position + 2)
  );
}

function setCaretPos(elRef: HTMLTextAreaElement, pos: number) {
  if (elRef.setSelectionRange) {
    elRef.focus();
    elRef.setSelectionRange(pos, pos);
  }
}

interface inputAreaProps {
  value: string;
  setValue: stringSetter;
  placeholder: string;
}

let InputArea: FC<inputAreaProps> = ({ value, setValue, placeholder }) => {
  let [caretPos, storeCaretPos] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    let text = e.target.value;
    if (FOUND_FORCED_VOWEL.test(text.toLocaleLowerCase())) {
      let caretPosition = e.target.selectionStart - 1;
      storeCaretPos(caretPosition);
      text = catchForcedSpondees(text);
      text = catchForcedDactyls(text);
    }
    setValue(text);
  }

  //when the component is re-rendered with a new value, recalculate and update the height
  useEffect(() => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [value]);

  //when a user forces a vowel quantity, ensure that the caret/cursor does not move to the end.
  useEffect(() => {
    if (textareaRef.current !== null) {
      setCaretPos(textareaRef.current, caretPos);
    }
  }, [caretPos]);

  return (
    <textarea
      autoFocus
      ref={textareaRef}
      value={value}
      placeholder={placeholder}
      onChange={handleTextChange}
      className="inputArea"
    />
  );
};
export default InputArea;
