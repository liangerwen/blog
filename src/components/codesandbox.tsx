import React from "react";

const CodeSandbox = ({ id }: { id: string }) => (
  <div className="w-full h-[31.25rem]">
    <iframe
      title="CodeSandbox"
      width="100%"
      height="100%"
      src={`https://codesandbox.io/embed/${id}`}
    />
  </div>
);

export default CodeSandbox;
