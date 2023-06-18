$(function () {
    function Puzzles() {
        let _over = false
        let _started = false
        let _active = false
        let _won = false
        let _time = 60

        const _sorted = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']

        let _initial = [..._sorted]
        let _pieces = []

        const shuffle = () => {
            let i = _initial.length, j

            while (i != 0) {
                j = Math.floor(Math.random() * _initial.length)
                i--

                [_initial[i], _initial[j]] = [_initial[j], _initial[i]]
            }
        }

        const checkWon = () => {
            if (_pieces.length < _sorted.length) return _won = false

            for (let i = 0; i < _sorted.length; i++) {
                if (_pieces[i] != _sorted[i]) return _won = false
            }

            return _won = true
        }

        shuffle()

        let _process = null

        this.started = () => _started
        this.active = () => _active
        this.won = () => _won
        this.time = () => _time
        this.initial = () => _initial
        this.pieces = (setPieces) => setPieces && _active ? _pieces = setPieces : _pieces

        this.pause = () => {
            if (_started && !_over) _active = false
        }

        this.resume = () => {
            if (_started && !_over) _active = true
        }

        this.start = () => {
            if (_started) return

            _started = true
            _active = true

            _process = setInterval(() => {
                if (!_active) return
                else _time--

                if (_time == 0) this.over(true)
            }, 1000)
        }

        this.over = (setOver) => {
            if (setOver) {
                _over = true
                _active = false

                checkWon()
                clearInterval(_process)
            }

            return _over
        }
    }

    let game = new Puzzles()

    let gameUI = null

    const startGame = () => {
        game.start()

        $('#controlStart').prop('disabled', true)
        $('#controlCheck').prop('disabled', false)

        $('#timer').addClass('timer-running')

        gameUI = setInterval(() => {
            if (game.over()) clearInterval(gameUI) || checkGame()
            else if (!game.active()) return
            
            let time = game.time().toString().padStart(2, '0'); time == 60 && (time = '59')

            $('#timer').text('00:' + time)
        }, 1000)
    }

    const openModal = () => {
        if (game.over()) checkGame()
        else if (game.time() >= 0 && game.active()) {
            game.pause()

            $('#modalCheck').show()

            $('#modalMessage').text(`You still have time (${$('#timer').text()}). Are you sure?`)
        }

        $('#shadow').fadeIn(200)
        $('.modal').animate({ top: '7.5vmin' }, 200)
    }

    const closeModal = () => {
        $('.modal').animate({ top: '0vmin' }, 200)
        $('#shadow').fadeOut(200)

        if (game.started() && !game.active()) game.resume()

        if (game.over()) $('#controlCheck').prop('disabled', true)
    }

    const checkGame = () => {
        game.over(true)

        $('#timer').removeClass('timer-running')

        $('.puzzle-cell').sortable('disable')

        $('#modalCheck').hide()

        if (game.won()) {
            $('#modalMessage').text('Woohoo, well done, you did it!')

            $('#timer').addClass('timer-won')
        }
        else {
            $('#modalMessage').text('It\'s a pity but you lost :(')

            $('#timer').addClass('timer-lose')
        }
    }

    const newGame = () => {
        game = new Puzzles()

        $('.puzzle-cell').empty()
        $('.puzzle-cell').sortable('enable')

        $('#controlStart').prop('disabled', false)
        $('#controlCheck').prop('disabled', true)

        $('#timer').removeClass('timer-running timer-won timer-lose')
        $('#timer').text('01:00')

        const initial = game.initial()

        for (let i = 0; i < initial.length; i++) {
            let piece = $('<div></div')

            piece.addClass('puzzle-piece')
            piece.attr('data-piece', initial[i])

            $('#puzzleBefore .puzzle-cell').eq(i).append(piece)
        }
    }

    $('.puzzle-cell').sortable({
        connectWith: '#puzzleBefore .puzzle-cell, #puzzleAfter .puzzle-cell',
        containment: '.puzzle',
        scroll: false,
        cursor: 'move',

        start() {
            if (!game.started()) startGame()
        },

        over(e, ui) {
            $(ui.item).css('border', '2px solid #000')

            $(ui.placeholder).css('visibility', 'visible')
            $(ui.placeholder).css('border', '2px solid #000')
        },

        update(e, ui) {
            if ($((ui.item).parent())[0].children.length > 1) {
                $((ui.item).parent()[0].children[0]).appendTo(e.target)
            }
        },

        beforeStop(e, ui) {
            $(ui.item).css('border', '')

            $(ui.placeholder).css('visibility', 'hidden')
            $(ui.placeholder).css('border', '')
        },

        receive() {
            let elements = $('#puzzleAfter .puzzle-piece[data-piece]')
            let pieces = []

            for (let i = 0; i < elements.length; i++) {
                let data = elements.eq(i).attr('data-piece'); data && pieces.push(data)
            }

            game.pieces(pieces)
        }
    })

    newGame()

    $('#controlStart').click(() => startGame())
    $('#controlCheck').click(() => openModal())
    $('#controlNew').click(() => newGame())

    $('#modalClose').click(() => closeModal())
    $('#modalCheck').click(() => checkGame())
})