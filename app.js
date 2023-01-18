const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', event => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        setRandomColours()
    }
})

document.addEventListener('click', event => {
        if (event.target.dataset.type === 'lock') {
            event.target.classList.toggle('fa-lock-open')
            event.target.classList.toggle('fa-lock')
        }
})

document.addEventListener('click', async event => {
    const popup = document.querySelector('.modal')
    if (event.target.dataset.type === 'copy') {
        popup.style.display = 'block' 
        await setTimeout(() => {
            popup.style.display = 'none' 
        }, 3000)
        return copyToClipboard(event.target.outerText)
    }
})


function setRandomColours() {
    cols.forEach(col => {
        let randomColor = getRandomColor()
        let luminance = chroma(randomColor).luminance()

        if (col.children[1].firstElementChild.classList.contains('fa-lock')) {
            return
        } else {
            col.querySelector('h2').textContent = randomColor
            col.style.background = randomColor
            col.querySelector('h2').style.color = luminance > 0.5 ? 'black' : 'white'
            col.querySelector('button').style.color = luminance > 0.5 ? 'black' : 'white'
        }
    })
}

function getRandomColor() {
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color = color + hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }

    return `#${color}`
}

function copyToClipboard(text) {
    return navigator.clipboard.writeText(text)
}

setRandomColours()