import renderFinalScreen from './final-screen.js'

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
    badScript: [
      'По вам скучает очень близкий человек, которого больше нет в мире живых.',
      'По вам скучает очень близкий человек, которого больше нет в мире живых. Возможно это дедушка или бабушка.',
      'По вам скучает очень близкий человек, которого больше нет в мире живых. Возможно это кто-то из Ваших родителей.',
    ],
    answers: ['Да', 'Затрудняюсь ответить'],
  },
]

let dateOfBirth = null
let currentIndex = -1 // Отсчет в макете ведется с первого вопроса в лендинге, затем квиз со второго
const quizWrapper = document.querySelector('.quiz__wrapper')

const updateCurrentIndex = () => {
  currentIndex = currentIndex + 1
}

const renderQuestion = () => {
  return `<p class="quiz-question">${DATA[currentIndex].question}</p>`
}

const renderBadScript = () => {
  return `<p class="quiz__top-bad-script">${DATA[currentIndex].badScript}</p>`
}

const renderDateOfBirthForm = () => {
  return `
    <form id="dateOfBirthForm">
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
          <button class="button button--akcent" data-action="next">Далее</button>
        </li>
      </ul>
    </form>
    `
}

const renderAnswers = () => {
  return `
  <ul class="quiz-answers__list list">
    ${DATA[currentIndex].answers
      .map((answer) => {
        return `<li class="quiz-answers__item">
      <button class="button button--akcent" data-action="next">${answer}</button>
    </li>`
      })
      .join('')}
  </ul>`
}

const renderIndicator = () => {
  return `<p class="quiz-indicator">Вопрос ${currentIndex + 2}-${
    DATA.length + 1
  }</p>`
}

const renderFinalBadScript = () => {
  let ageUser = +Math.round(
    (Date.now() - +dateOfBirth) / (1000 * 60 * 60 * 24 * 31 * 12)
  )

  let badScriptIndex = null

  if (ageUser >= 46) {
    badScriptIndex = 2
  } else if (ageUser >= 36) {
    badScriptIndex = 1
  } else {
    badScriptIndex = 0
  }

  return `<p class="quiz__top-bad-script quiz__top-bad-script--final">${DATA[currentIndex].badScript[badScriptIndex]}</p>`
}

const renderQuiz = () => {
  let widthBody = document.body.getBoundingClientRect().width
  document.body.style.width = widthBody
  document.body.style.overflow = 'hidden'
  quizWrapper.style.display = 'flex'

  const isLastQuestion = DATA.length - 1 === currentIndex // последний вопрос?

  quizWrapper.innerHTML = `
  <div class="quiz__top">
    ${isLastQuestion ? renderFinalBadScript() : renderBadScript()}
  </div>
  <div class="quiz content">
    ${renderQuestion()}
    ${
      DATA[currentIndex].isLoadingDateOfBirth
        ? renderDateOfBirthForm()
        : renderAnswers()
    }
    ${renderIndicator()}
  </div>
  `
}

const renderLoadingScreenAndSaveDateOfBirth = (evt) => {
  let form = document.getElementById('dateOfBirthForm')

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

    quizWrapper.innerHTML = `
      <div class="quiz__loading">
        <svg width="73" height="73" class="quiz__svg">
        <use href="#loading" />
        </svg>
        <p class="quiz__loading-text">Loading</p>
      </div>
      `

    setTimeout(() => {
      updateCurrentIndex()
      renderQuiz()
    }, 2000)
  }
}

const renderRecordingMessageAndFinalScreen = () => {
  quizWrapper.innerHTML = `
    <div class="quiz__final-screen">
      <svg widht="147" height="69" class="quiz__record-svg">
        <use href="#record" />
      </svg>
      <div class="quiz__bar">
        <div class="quiz__progress" id="quiz-progress"></div>
      </div>
      <p class="quiz__bar-text-wrapper">
        <span class="quiz__bar-text">10%20%30%40%50%60%70%80%90%99%</span>
      </p>
      <p class="quiz__message">
        Запись сообщения
      </p>
    </div>
  `
  setTimeout(() => {
    renderFinalScreen(quizWrapper)
  }, 3000)
}

document.addEventListener('click', (evt) => {
  let target = evt.target
  let targetAction = target.dataset.action
  if (!targetAction) return

  if (DATA[currentIndex]?.isLoadingDateOfBirth) {
    renderLoadingScreenAndSaveDateOfBirth(evt)
  } else if (currentIndex === DATA.length - 1) {
    renderRecordingMessageAndFinalScreen()
  } else if (targetAction === 'next') {
    updateCurrentIndex()
    renderQuiz()
    console.log('standart', currentIndex)
  }
})
