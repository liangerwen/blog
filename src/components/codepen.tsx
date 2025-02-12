import React from "react";

const CodePen = ({ id }: { id: string }) => (
  <div className="w-full h-[31.25rem]">
    <iframe
      title="CodePen"
      width="100%"
      height="100%"
      src={`https://codepen.io/gambhirsharma/fullembedgrid/${id}?animations=run&type=embed`}
    />
  </div>
);

export default CodePen;
