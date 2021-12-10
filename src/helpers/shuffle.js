const shuffle= (arr) => {
  return arr.sort(() => Math.random() < .5 ? 1 : -1);
};

export default shuffle;
