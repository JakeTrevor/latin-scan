import React from "react";

export default function OutputArea({ toRender }) {
  return (
    <div>
      <ul>
        {toRender.map((each) => {
          return <li>{each.output[0].raw}</li>;
        })}
      </ul>
    </div>
  );
}
