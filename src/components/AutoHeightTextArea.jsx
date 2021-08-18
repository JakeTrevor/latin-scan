import React, { useEffect, useRef, useState } from "react";
import { findAllMatches, getLetterWithMarking } from "../SCAN/utils";

const FORCED_SPONDEE_REGEX = /_[aeiouy]/g;
const FORCED_DACTYL_REGEX = /@[aeiouy]/g;
const FOUND_FORCED_VOWEL = /[@_][aeiouy]/;

function catchForcedDactyls(text) {
  if (FORCED_DACTYL_REGEX.test(text.toLocaleLowerCase())) {
    let forcedDactyls = findAllMatches(
      text.toLocaleLowerCase(),
      FORCED_DACTYL_REGEX
    );
    for (let each of forcedDactyls) {
      let letter = text.charAt(each + 1);
      let replacement = getLetterWithMarking("short", letter);
      text = replaceLetter(text, each, replacement);
    }
  }
  return text;
}

function catchForcedSpondees(text) {
  if (FORCED_SPONDEE_REGEX.test(text.toLowerCase())) {
    let forcedSpondees = findAllMatches(
      text.toLocaleLowerCase(),
      FORCED_SPONDEE_REGEX
    );
    for (let each of forcedSpondees) {
      let letter = text.charAt(each + 1);
      let replacement = getLetterWithMarking("long", letter);
      text = replaceLetter(text, each, replacement);
    }
  }
  return text;
}

function replaceLetter(text, position, replacement) {
  return (
    text.substring(0, position) + replacement + text.substring(position + 2)
  );
}

function setCaretPos(elRef, pos) {
  if (elRef.setSelectionRange) {
    elRef.focus();
    elRef.setSelectionRange(pos, pos);
  } else if (elRef.createTextRange) {
    var range = elRef.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
}

//A textArea component that grows and shrinks with the size of the input.
//AND includes functionality to insert forced spondees and dactyls
export default function AutoHeightTextarea({ value, setValue, placeholder }) {
  let [caretPos, storeCaretPos] = useState(0);
  const textareaRef = useRef(null);

  function handleTextChange(e) {
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
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [value]);

  //when a user forces a vowel quantity, ensure that the caret/cursor does not move to the end.
  useEffect(() => {
    setCaretPos(textareaRef.current, caretPos);
  }, [caretPos]);

  return (
    <textarea
      autoFocus
      ref={textareaRef}
      value={value}
      placeholder={placeholder}
      onChange={handleTextChange}
    />
  );
}
