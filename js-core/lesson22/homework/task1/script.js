$(function () {
    $('.container .color').click(function () {
        $('.shadow .color').css('left', $(this).offset().left)
        $('.shadow .color').css('background-color', $(this).css('background-color'))
        $(this).css('visibility', 'hidden')
        $('.shadow').addClass('active')

        $('.shadow .color').animate({
            top: ($(window).height() * 0.5 - ($(window).width() * 0.125)) + 'px',
            left: ($(window).width() * 0.5 - ($(window).width() * 0.125)) + 'px',
            width: '25vw',
            height: '25vw'
        })
    })

    $('.shadow .color').click(function () {
        let elem

        $('.container .color').each((i, e) => {
            if ($(e).css('visibility') == 'hidden') elem = e
        })

        $(this).animate({
            top: $(elem).offset().top,
            left: $(elem).offset().left,
            width: '15vw',
            height: '15vw'
        }, 400, () => {
            $('.shadow .color').css('background-color', '#fff')
            $(elem).css('visibility', 'visible')
            $('.shadow').removeClass('active')
        })
    })

    $(window).resize(function () {
        if ($('.shadow').hasClass('active')) $('.shadow .color').css({
            top: ($(window).height() * 0.5 - ($(window).width() * 0.125)) + 'px',
            left: ($(window).width() * 0.5 - ($(window).width() * 0.125)) + 'px'
        })
    })
})