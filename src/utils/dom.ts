export const getRootPageTop = (dom: HTMLElement) => {
  let top = 0;
  while (dom) {
    top += dom.offsetTop;
    // @ts-ignore
    dom = dom.offsetParent;
  }
  return top;
};
