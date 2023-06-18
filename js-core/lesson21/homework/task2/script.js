$(document).ready(function () {
    alert($('#s1').text())
    alert($('.s2').text())
    alert($('#second i').text())
    alert($('q[title]').text())
    alert($('a[target="_blank"]').text())
    alert($('span.extra').eq(1).text())
})