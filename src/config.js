const queryParams = new URLSearchParams(window.location.search);
console.log(queryParams.get('count'));
const config =
{
    // 0 is unlimited
    MAX_QUESTION_COUNT : parseInt(queryParams.get('count')??"10",10),
    // 0 is unlimited
    QUESTION_SECONDS : parseInt(queryParams.get('time')??"60",10),
    DETERMINISTIC : queryParams.has('deterministic')
}
export default config;