import colorArray from "../layout/colors";

const getColor = () => {
  const MIN = 0;
  const MAX = colorArray.length;

  const colorNumber = Math.floor(Math.random() * (MAX - MIN));
  const color = colorArray[colorNumber];
  return color;
};

export default getColor;
