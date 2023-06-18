$(function () {
    $('.elem').click(function () {
        let height = Math.random() * 256 + 16
        let width = Math.random() * 256 + 16

        $(this).animate({
            backgroundColor: `rgb(${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)})`,
            top: (Math.random() * ($(window).height() - height)) + 'px',
            left: (Math.random() * ($(window).height() - width)) + 'px',
            width,
            height
        }, 2000, 'easeInOutElastic')
    })
})