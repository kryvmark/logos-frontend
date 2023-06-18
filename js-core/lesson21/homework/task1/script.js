$(document).ready(function () {
    $('.big').text('2')

    $('.progress').animate({
        top: '540px',
        height: '0px'
    }, 60000, () => {
        $('.big').text('1')
        $('.progress').animate({
            top: '15px',
            height: '525px'
        }, 60000, () => $('.big').text('0'))
    })
})