const queryParams = new URLSearchParams(window.location.search);
const config = {
  // 0 is unlimited
  MAX_QUESTION_COUNT: parseInt(queryParams.get('count') ?? '10', 10),
  // 0 is unlimited
  QUESTION_SECONDS: parseInt(queryParams.get('time') ?? '60', 10),
  DELAY_MS: parseInt(queryParams.get('delay') ?? '1200', 10),
  DETERMINISTIC: queryParams.has('deterministic')
};
export default config;
