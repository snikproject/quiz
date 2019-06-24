export default function(arr)
{
  return  arr
  .map(item => item.tries)
  .reduce((acc, item) =>
  {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}
