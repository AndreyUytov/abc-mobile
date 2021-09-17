const $copyright = document.querySelector('.copyright')

const toggleCopyright = (evt) => {
  evt.target.classList.toggle('copyright--show')
  evt.target.scrollIntoView()
}

$copyright.addEventListener('click', toggleCopyright)

export { toggleCopyright }
