import React from "react";

const YouTube = ({ id }: { id: string }) => (
  <div className="w-full aspect-video">
    <iframe
      title="YouTube"
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${id}?controls=1`}
    />
  </div>
);

export default YouTube;
