$(document).ready(function () {
    /* 初始时从  LocalStorage 中读取对应的 searchResult  */
    const searchResult = localStorage.getItem('searchResult') || 'null';
    // console.log(searchResult);
    // 将读取的字符串 变为 对象
    const queryString = JSON.parse(searchResult);
    console.dir(queryString);
    var url = $.url();
    console.log(url);

    // var query = url.param("q");
    // console.log(query);

    if (typeof queryString !== 'undefined') {
        $("#left").attr("src", "https://www.bing.com/search?q=" + encodeURIComponent(queryString));
        $("#right").attr("src", "https://www.google.com/search?q=" + encodeURIComponent(queryString));
        document.title = queryString.replace(/</g, "&lt;").replace(/>/g, "&gt;") + " - Bing_☆_Go";
    }
});