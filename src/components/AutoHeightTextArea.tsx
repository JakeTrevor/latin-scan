import React, { useEffect, useRef } from "react";
import type { vowel } from "../scanTypes";
import { find, getLetter } from "../utils";

interface textareaProps {
  className: string;
  value: string;
  setValue: Function;
  placeholder: string;
}

//A textArea component that grows and shrinks with the size of the input.
export function AutoHeightTextarea({
  className,
  value,
  setValue,
  placeholder,
}: textareaProps) {
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
      className={className}
      ref={textareaRef}
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        let text = e.target.value;
        if (/_[aeiouy]/.test(text.toLowerCase())) {
          //test for _ followed by vowel in the text; this should be converted to a forced spondee
          let forcedSpondees = find(text.toLocaleLowerCase(), /_[aeiouy]/g);
          for (let each of forcedSpondees) {
            let replacement = getLetter("long", text.charAt(each + 1) as vowel);
            text =
              text.substring(0, each) + replacement + text.substring(each + 2);
          }
        }
        if (/@[aeiouy]/.test(text.toLocaleLowerCase())) {
          //test for @ followed by vowel; should be converted to forced dactyl.
          let forcedDactyls = find(text.toLocaleLowerCase(), /@[aeiouy]/g);
          for (let each of forcedDactyls) {
            let replacement = getLetter(
              "short",
              text.charAt(each + 1) as vowel
            );
            text =
              text.substring(0, each) + replacement + text.substring(each + 2);
          }
        }
        setValue(text);
      }}
    />
  );
}
