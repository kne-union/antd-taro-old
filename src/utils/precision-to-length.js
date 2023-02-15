const precisionToLength = (precision) => {
  return ({'year': 1, 'month': 2, 'day': 3, 'hour': 4, 'minute': 5})[precision] || 3;
};

export default precisionToLength;
