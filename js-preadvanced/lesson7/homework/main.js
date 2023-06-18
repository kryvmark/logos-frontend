// Definitions
const API_KEY = '707a663c'

const search = document.forms.search

// App body
search.addEventListener('submit', e => {
    e.preventDefault()

    container.innerHTML = '<h2 class="container-msg">Loading...</h2>'

    fetch(`https://www.omdbapi.com/?s=${keyphrase.value}&apikey=${API_KEY}`)
        .then(res => res.json())
        .then(json => {
            container.innerHTML = ''

            if (json.Response == 'True') {
                for (let i = 0; i < json.Search.length; i++) {
                    let movie = document.createElement('div')
                    movie.classList.add('movie')
                    movie.dataset.id = json.Search[i].imdbID

                    let movie_img = document.createElement('img')
                    movie_img.src = json.Search[i].Poster
                    movie_img.alt = json.Search[i].Title
                    let movie_name = document.createElement('h3')
                    movie_name.innerText = json.Search[i].Title
                    let movie_type = document.createElement('p')
                    movie_type.classList.add('movie-type')
                    movie_type.innerText = json.Search[i].Type
                    let movie_year = document.createElement('p')
                    movie_year.innerText = json.Search[i].Year
                    movie.appendChild(movie_img)
                    movie.appendChild(movie_name)
                    movie.appendChild(movie_type)
                    movie.appendChild(movie_year)

                    let movie_button = document.createElement('button')
                    movie_button.classList.add('button', 'button-g')
                    movie_button.type = 'button'
                    movie_button.innerText = 'More details'

                    movie.addEventListener('click', () => {
                        shadow.style.top = window.scrollY + 'px'
                        document.body.style.overflowY = 'hidden'
                        shadow.dataset.fade = 'in'

                        moviePoster.src = movie_img.src
                        movieName.innerText = movie_name.innerText

                        movieParams.innerText = 'Loading...'
                        movieDescription.innerText = 'Loading...'
                        movieWrittenBy.innerText = 'Loading...'
                        movieDirectedBy.innerText = 'Loading...'
                        movieStarring.innerText = 'Loading...'
                        movieBoxOffice.innerText = 'Loading...'
                        movieAwards.innerText = 'Loading...'
                        movieRatings.innerText = 'Loading...'

                        fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=${API_KEY}`)
                            .then(res => res.json())
                            .then(json => {
                                movieParams.innerText = json.Rated + ' ' + json.Year + ' ' + json.Genre
                                movieDescription.innerText = json.Plot
                                movieWrittenBy.innerText = json.Writer
                                movieDirectedBy.innerText = json.Director
                                movieStarring.innerText = json.Actors
                                movieBoxOffice.innerText = json.BoxOffice
                                movieAwards.innerText = json.Awards

                                let ratings = ''
                                for (let r of json.Ratings) {
                                    ratings += r.Source + ': ' + r.Value + '\n'
                                }
                                movieRatings.innerText = '\n' + ratings
                            })
                    })

                    movie.appendChild(movie_button)

                    container.appendChild(movie)
                }
            }
            else {
                container.innerHTML = '<h2 class="container-msg">No results found.</h2>'
            }
        })
})

// UI control
keyphraseClear.addEventListener('click', () => (keyphrase.value = '') || keyphrase.dispatchEvent(new KeyboardEvent('input')))
keyphrase.addEventListener('input', () => keyphrase.value == '' ? search.submit.setAttribute('disabled', '') : search.submit.removeAttribute('disabled'))
shadow.addEventListener('click', e => e.target.classList.contains('shadow') && ((shadow.dataset.fade = 'out') != (document.body.style.overflowY = '')) && undefined)