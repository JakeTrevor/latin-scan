import React, { useEffect, useRef } from "react";
import { find, getLetter } from "../SCAN/utils";

const FORCED_SPONDEE_REGEX = /_[aeiouy]/g;
const FORCED_DACTYL_REGEX = /@[aeiouy]/g;

function catchForcedDactyls(text) {
  if (FORCED_DACTYL_REGEX.test(text.toLocaleLowerCase())) {
    let forcedDactyls = find(text.toLocaleLowerCase(), FORCED_DACTYL_REGEX);
    for (let each of forcedDactyls) {
      let letter = text.charAt(each + 1);
      let replacement = getLetter("short", letter);
      text = replaceLetter(text, each, replacement);
    }
  }
  return text;
}

function catchForcedSpondees(text) {
  if (FORCED_SPONDEE_REGEX.test(text.toLowerCase())) {
    let forcedSpondees = find(text.toLocaleLowerCase(), FORCED_SPONDEE_REGEX);
    for (let each of forcedSpondees) {
      let letter = text.charAt(each + 1);
      let replacement = getLetter("long", letter);
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

//A textArea component that grows and shrinks with the size of the input.
//AND includes functionality to insert forced spondees and dactyls
export default function AutoHeightTextarea({ value, setValue, placeholder }) {
  const textareaRef = useRef(null);

  //when the component is re-rendered with a new value, recalculate and update the height
  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [value]);

  return (
    <textarea
      autoFocus
      ref={textareaRef}
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        let text = e.target.value;
        text = catchForcedSpondees(text);
        text = catchForcedDactyls(text);
        setValue(text);
      }}
    />
  );
}
