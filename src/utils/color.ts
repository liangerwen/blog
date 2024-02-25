export const rgb = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return "(" + r + "," + g + "," + b + ")";
};

export const color16 = () => {
  return `#${Math.random().toString(16).substr(-6)}`;
};

export const rgba = (a: number) => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

// export const randomImg = () => {
//   const type = Cookies.get(THEME_KEY) === ThemeType.DARK ? "night" : "day";
//   const direction = isMobile() ? "vertical" : "";
//   const url = `https://v1.yurikoto.com/wallpaper?type=${type}&orientation=${direction}`;
//   return url;
// };

export const gradientColor = () => {
  //渐变方向
  const directionArr = [
    "linear-gradient(to right top",
    "linear-gradient(to right",
    "linear-gradient(to right bottom",
    "linear-gradient(to bottom",
    "linear-gradient(to left bottom",
    "linear-gradient(to left",
    "linear-gradient(to left top",
    "linear-gradient(to top",
    "radial-gradient(circle",
  ];
  const minCororCount = 2,
    maxCororCount = 5;
  const minDirectionIndex = 0,
    maxDirectionIndex = directionArr.length - 1;
  //渐变颜色数量
  const colorCount = Math.floor(
    Math.random() * (maxCororCount - minCororCount + 1) + minCororCount
  );
  //随机渐变方向
  const gradientDirection = Math.floor(
    Math.random() * (maxDirectionIndex - minDirectionIndex + 1) +
      minDirectionIndex
  );
  let gradientColor = "";
  const gradientArr = [];
  gradientArr.push(directionArr[gradientDirection]);
  for (let i = 0; i < colorCount; i++) {
    gradientArr.push(`${rgba(0.5)} ${(i / colorCount) * 100}%`);
  }
  //生成渐变色
  gradientColor += gradientArr.join(", ") + ")";
  return gradientColor;
};
