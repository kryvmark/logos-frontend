const date = document.getElementById('date')

const hh = document.getElementById('HH')
const mm = document.getElementById('MM')
const ss = document.getElementById('SS')

const stopwatchH = document.getElementById('stopwatchH')
const stopwatchM = document.getElementById('stopwatchM')
const stopwatchS = document.getElementById('stopwatchS')
const stopwatchMS = document.getElementById('stopwatchMS')

const swStart = document.getElementById('swStart')
const swLoop = document.getElementById('swLoop')
const swStop = document.getElementById('swStop')
const swReset = document.getElementById('swReset')

const stopwatchLoops = document.getElementById('stopwatchLoops')

const tMinutes = document.getElementById('tMinutes')
const tPlus = document.getElementById('tPlus')
const tMinus = document.getElementById('tMinus')

const timer = document.getElementById('timer')

const tStart = document.getElementById('tStart')
const tStop = document.getElementById('tStop')
const tReset = document.getElementById('tReset')

setInterval(() => {
    let time = new Date()

    let day = time.getDate().toString().padStart(2, '0')
    let month = (time.getMonth() + 1).toString().padStart(2, '0')
    let year = time.getFullYear()

    let hour = time.getHours().toString().padStart(2, '0')
    let minute = time.getMinutes().toString().padStart(2, '0')
    let second = time.getSeconds().toString().padStart(2, '0')

    date.innerHTML = `${day}.${month}.${year}`

    hh.innerHTML = hour
    mm.innerHTML = minute
    ss.innerHTML = second
})

let swTimeStart, swTimeNow, swInstance

swStart.addEventListener('click', () => {
    swTimeStart = new Date().getTime()

    swInstance = setInterval(() => {
        swTimeNow = new Date().getTime()

        let timeDelta = swTimeNow - swTimeStart

        let timeMS = (timeDelta % 1000).toString().padStart(3, '0')
        let timeS = ((timeDelta % (1000 * 60) - timeDelta % 1000) / 1000).toString().padStart(2, '0')
        let timeM = ((timeDelta % (1000 * 60 * 60) - timeDelta % (1000 * 60)) / (1000 * 60)).toString().padStart(2, '0')
        let timeH = ((timeDelta % (1000 * 60 * 60 * 60) - timeDelta % (1000 * 60 * 60)) / (1000 * 60 * 60)).toString().padStart(2, '0')

        stopwatchH.innerText = timeH
        stopwatchM.innerText = timeM
        stopwatchS.innerText = timeS
        stopwatchMS.innerText = timeMS
    }, 1)

    swStart.setAttribute('disabled', '')
    swLoop.removeAttribute('disabled')
    swStop.removeAttribute('disabled')
    swReset.setAttribute('disabled', '')
})

swLoop.addEventListener('click', () => {
    let li = document.createElement('li')

    li.innerText = `${stopwatchH.innerText}:${stopwatchM.innerText}:${stopwatchS.innerText}.${stopwatchMS.innerText}`

    stopwatchLoops.appendChild(li)
})

swStop.addEventListener('click', () => {
    clearInterval(swInstance)

    swStart.removeAttribute('disabled')
    swStop.setAttribute('disabled', '')
    swLoop.setAttribute('disabled', '')
    swReset.removeAttribute('disabled')
})

swReset.addEventListener('click', () => {
    stopwatchH.innerText = '00'
    stopwatchM.innerText = '00'
    stopwatchS.innerText = '00'
    stopwatchMS.innerText = '000'

    while (stopwatchLoops.lastChild) stopwatchLoops.lastChild.remove()
})

tPlus.addEventListener('click', () => {
    if (parseInt(tMinutes.innerText) == 1) tMinus.removeAttribute('disabled')

    if (parseInt(tMinutes.innerText) <= 59) tMinutes.innerText = (parseInt(tMinutes.innerText) + 1).toString().padStart(2, '0')
    
    if (parseInt(tMinutes.innerText) == 60) tPlus.setAttribute('disabled', '')
})

tMinus.addEventListener('click', () => {
    if (parseInt(tMinutes.innerText) == 60) tPlus.removeAttribute('disabled')

    if (parseInt(tMinutes.innerText) >= 2) tMinutes.innerText = (parseInt(tMinutes.innerText) - 1).toString().padStart(2, '0')

    if (parseInt(tMinutes.innerText) == 1) tMinus.setAttribute('disabled', '')
})

let tTimeStart, tTimeNow, tInstance

tStart.addEventListener('click', () => {
    if (!tTimeStart) tTimeStart = new Date().getTime() + parseInt(tMinutes.innerText) * 1000 * 60
    else tTimeStart = new Date().getTime() + tTimeStart - tTimeNow

    tInstance = setInterval(() => {
        tTimeNow = new Date().getTime()

        let timeDelta = tTimeStart - tTimeNow

        if (timeDelta <= 0) {
            timerStop()
            timerReset()
        }

        let timeS = ((timeDelta % (1000 * 60) - timeDelta % 1000) / 1000).toString().padStart(2, '0')
        let timeM = ((timeDelta % (1000 * 60 * 60) - timeDelta % (1000 * 60)) / (1000 * 60)).toString().padStart(2, '0')

        timer.innerText = `${timeM}:${timeS}`
    })

    tStart.setAttribute('disabled', '')
    tStop.removeAttribute('disabled')
    tReset.setAttribute('disabled', '')
})

tStop.addEventListener('click', timerStop)

tReset.addEventListener('click', timerReset)

function timerStop() {
    clearInterval(tInstance)

    tStart.removeAttribute('disabled')
    tStop.setAttribute('disabled', '')
    tReset.removeAttribute('disabled')
}

function timerReset() {
    timer.innerHTML = '00:00'

    tTimeStart = null
    tTimeNow = null
}