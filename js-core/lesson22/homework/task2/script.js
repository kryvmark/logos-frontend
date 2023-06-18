$(function () {
    setInterval(() => {
        let color1 = `rgb(${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)})`
        let color2 = `rgb(${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)})`

        $('.ball').css('background-color', color1)
        $('.ball').css('border-color', color2)
        $('.ball').css('box-shadow', `0.125vw 0.125vw 2vw 0.5vw ${color1}`)

        $('.ball').animate({
            top: (Math.random() * ($(window).height() - $(window).width() * 0.05)) + 'px',
            left: (Math.random() * ($(window).width() - $(window).width() * 0.05)) + 'px'
        }, 750, 'easeOutExpo')
    }, 500)
})