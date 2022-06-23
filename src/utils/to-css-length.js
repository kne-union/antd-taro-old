const toCSSLength = (val) => {
  return typeof val === 'number' ? `${val}px` : val
};

export default toCSSLength;
