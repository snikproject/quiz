const queryParams = new URLSearchParams(window.location.search);
console.log(queryParams.get('count'));
const config =
{
    MAX_QUESTION_COUNT : queryParams.get('count')??10,
    // 0 is unlimited
    QUESTION_SECONDS : queryParams.get('time')??60,
    DETERMINISTIC : queryParams.has('deterministic')
}
export default config;