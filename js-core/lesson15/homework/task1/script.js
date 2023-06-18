const $ = q => document.querySelector(q)

const range = (e, min = Number.MIN_VALUE, max = Number.MAX_VALUE) => e >= min && e < max
const scrollVh = () => window.scrollY / window.innerHeight * 100
const scrollPx = (vh = 100) => window.scrollY - window.innerHeight * vh / 100
const scrollVhPx = (vh = 100) => window.innerHeight * vh / 100

let windowScroll = () => {
    let params = {
        scrollDownSize: 36,

        slideLeft: 0,
        slideWidth: 220,
        imageRight: 0,

        scrollUpSize: 56
    }

    if (range(scrollVh(), 0, 60)) {
        params.scrollDownSize = 36 + scrollVh() / 100 * 40
    }
    else if (range(scrollVh(), 60, 100)) {
        params.scrollDownSize = 60

        params.slideLeft = scrollPx(60) / 4
        params.slideWidth = 220 + scrollPx(60) / 2
    }
    else if (range(scrollVh(), 100, 125)) {
        params.scrollDownSize = 60

        params.slideLeft = scrollVhPx(40) / 4
        params.slideWidth = 220 + scrollVhPx(40) / 2
        params.imageRight = scrollPx() / 2
    }
    else if (range(scrollVh(), 125, 175)) {
        params.scrollDownSize = 60

        params.slideLeft = scrollVhPx(40) / 4
        params.slideWidth = 220 + scrollVhPx(40) / 2
        params.imageRight = scrollVhPx(25) / 2

        params.scrollUpSize = 56 + (scrollVh() - 125) / 100 * 15
    }
    else if (range(scrollVh(), 175)) {
        params.scrollDownSize = 60

        params.slideLeft = scrollVhPx(40) / 4
        params.slideWidth = 220 + scrollVhPx(40) / 2
        params.imageRight = scrollVhPx(25) / 2

        params.scrollUpSize = 64
    }

    $('a[href="#main"]').style.fontSize = `${params.scrollDownSize}px`

    $('.slide').style.left = `${params.slideLeft}px`
    $('.slide span').style.width = `${params.slideWidth}px`
    $('img').style.right = `${params.imageRight}px`
    
    $('a[href="#"').style.fontSize = `${params.scrollUpSize}px`
}

windowScroll()

window.addEventListener('scroll', windowScroll)

$('a[href="#main"').addEventListener('click', e => {
    e.preventDefault()
    $('#main').scrollIntoView({
        behavior: 'smooth'
    })
})

$('a[href="#"').addEventListener('click', e => {
    e.preventDefault()
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})