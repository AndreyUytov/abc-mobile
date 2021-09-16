const DATA = [
  {
    question: 'Когда Вы чувствуете себя наиболее комфортно?',
    badScript:
      'Мы расскажем Вам не только подробности вашей смерти, но также поможем Вам избежать этой ужасной даты и продлить вашу жизнь на многие годы.',
    answers: ['Утро', 'День', 'Вечер', 'Ночь'],
  },
  {
    question: 'Укажите свою дату рождения:',
    badScript: 'Уже совсем скоро Вы узнаете много интересного о своем будущем!',
    isLoadingDateOfBirth: true,
  },
  {
    question: 'Снятся ли Вам умершие люди?',
    badScript:
      'Смерть родного человека – одно из тяжелейших испытаний в жизни каждого из нас!',
    answers: ['Да', 'Нет', 'Иногда'],
  },
  {
    question:
      'Запись, которую Вы услышите, может шокировать людей с неокрепшей психикой. Вы готовы узнать, что ждет именно Вас?',
    badScript:
      'По вам скучает очень близкий человек, которого больше нет в мире живых.',
    answers: ['Да', 'Затрудняюсь ответить'],
  },
]

let dateOfBirth = null

const quizWrapper = document.querySelector('.quiz__wrapper')
let currentIndex = 0

const renderQuestion = () => {
  return `<p class="quiz-question">${DATA[currentIndex].question}</p>`
}

const renderBadScript = () => {
  return `<p class="quiz__top-bad-script">${DATA[currentIndex].badScript}</p>`
}

const renderAnswers = () => {
  if (DATA[currentIndex].isLoadingDateOfBirth) {
    return `
    <form>
      <ul class="quiz-answers__list list">
        <li class="quiz-answers__item">
          <label class="quiz__label">
            <input type="number" min="1" name="day" max="31" placeholder="День" required />
          </label>
        </li>
        <li class="quiz-answers__item">
          <label class="quiz__label">
            <input type="number" min="1" name="month" max="12" placeholder="Месяц" required />
          </label>
        </li>
        <li class="quiz-answers__item">
          <label class="quiz__label">
            <input type="number" min="1900" name="year" max="2021" placeholder="Год" required />
          </label>
        </li>
        <li class="quiz-answers__item">
          <button class="button button--akcent" data-action="isLoadingDateOfBirth">Далее</button>
        </li>
      </ul>
    </form>
    `
  } else {
    return `<ul class="quiz-answers__list list">
    ${DATA[currentIndex].answers
      .map((answer) => {
        return `<li class="quiz-answers__item">
      <button class="button button--akcent" data-action="next">${answer}</button>
    </li>`
      })
      .join('')}
  </ul>`
  }
}

const renderIndicator = () => {
  return `<p class="quiz-indicator">Вопрос ${currentIndex + 2}-${
    DATA.length + 1
  }</p>`
}

const renderQuiz = () => {
  let widthBody = document.body.getBoundingClientRect().width
  document.body.style.width = widthBody
  document.body.style.overflow = 'hidden'
  quizWrapper.style.display = 'flex'

  if (DATA.length - 1 === currentIndex) {
    console.log('last')
  } else {
    quizWrapper.innerHTML = `
    <div class="quiz__top">
      ${renderBadScript()}
    </div>
    <div class="quiz content">
      ${renderQuestion()}
      ${renderAnswers()}
      ${renderIndicator()}
    </div>
    `
  }
}

document.addEventListener('click', (evt) => {
  let target = evt.target
  let targetAction = target.dataset.action
  if (!targetAction) return
  if (targetAction === 'next') {
    renderQuiz()
    currentIndex = currentIndex + 1
  }

  if (targetAction === 'isLoadingDateOfBirth') {
    let form = target.closest('form')

    let elements = Array.from(form.elements)

    elements.forEach((el) => {
      let label = el.parentElement
      el.validity.valid
        ? label.classList.remove('quiz__label--invalid')
        : label.classList.add('quiz__label--invalid')
    })
    if (elements.every((el) => el.validity.valid)) {
      evt.preventDefault()
      let date = {}
      elements.forEach((input) => {
        let inputName = input.name
        if (inputName) {
          date[inputName] = +input.value
        }
      })

      dateOfBirth = new Date(date.year, date.month - 1, date.day)

      console.log(dateOfBirth)
      renderLoadingScreen()

      setTimeout(() => {
        renderQuiz()
        currentIndex = currentIndex + 1
      }, 2000)
    }
  }
})

function renderLoadingScreen() {
  quizWrapper.innerHTML = `
  <div class="quiz__loading">
    <svg width="73" height="73" class="quiz__svg">
     <use href="#loading" />
    </svg>
    <p class="quiz__loading-text">Loading</p>
  </div>
  `
}
