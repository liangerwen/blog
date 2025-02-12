import React from "react";

const StackBlitz = ({ id }: { id: string }) => (
  <div className="w-full h-[31.25rem]">
    <iframe
      title="StackBlitz"
      width="100%"
      height="100%"
      src={`https://stackblitz.com/edit/${id}?embed=1`}
    />
  </div>
);

export default StackBlitz;
