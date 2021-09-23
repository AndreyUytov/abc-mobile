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
        <select name="day" class="select" required>
        <option value="" disabled selected hidden>День</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
      </select>
        </li>
        <li class="quiz-answers__item">
          <select name="month" class="select" required>
            <option value="" disabled selected hidden>Месяц</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </li>
        <li class="quiz-answers__item">
        <select name="year" class="select" required>
        <option value="" disabled selected hidden>Месяц</option>
        <option value="1985">1985</option>
        <option value="1986">1986</option>
        <option value="1987">1987</option>
        <option value="1988">1988</option>
        <option value="1989">1989</option>
        <option value="1990">1990</option>
        <option value="1991">1991</option>
        <option value="1992">1992</option>
        <option value="1993">1993</option>
        <option value="1994">1994</option>
        <option value="1995">1995</option>
        <option value="1996">1996</option>
        <option value="1997">1997</option>
        <option value="1998">1998</option>
        <option value="1999">1999</option>
        <option value="2000">2000</option>
        <option value="2001">2001</option>
        <option value="2002">2002</option>
        <option value="2003">2003</option>
      </select>
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
    el.validity.valid
      ? el.classList.remove('select--invalid')
      : el.classList.add('select--invalid')
  })

  if (elements.every((el) => el.validity.valid)) {
    evt.preventDefault()
    let date = {}
    elements.forEach((select) => {
      let selectName = select.name
      if (selectName) {
        date[selectName] = +select.value
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
  }
})
