import React from "react";

export default function OutputArea({ toRender }) {
  return (
    <div>
      <ul>
        {toRender.map((each) => {
          <li>{each.toString()}</li>;
        })}
      </ul>
    </div>
  );
}
``;
