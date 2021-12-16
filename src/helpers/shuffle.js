const shuffle = (arr) => {
  return arr.sort(() => (Math.random() < 0.5 ? 1 : -1));
};

export default shuffle;
