import { Editor } from "primereact/editor";
import React, { useEffect, useState } from "react";

function DesctiptionBase({label, value, onChange}) {
  const [text, setText] = useState(value);

  const changeDescription = (e)=>{
    setText(e.htmlValue)
    onChange?.(e.htmlValue)
  }

  useEffect(()=>{
    if(value) setText(value)
  },[value])
  return (
    <div>
      <div className="pl-5 mt-8 mb-2 font-semibold">{label}</div>
      <Editor
        value={text}
        onTextChange={(e) => changeDescription(e)}
        style={{ height: "220px" }}
      />
    </div>
  );
}

export default DesctiptionBase;
