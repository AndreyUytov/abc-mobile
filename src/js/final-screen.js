export default function renderFinalScreen(quizWrapper) {
  let date = new Date()
  date.setDate(date.getDate() + 1)
  let mounth = date.getMonth() + 1
  let dateFormatToString = `${date.getDate()}.${
    mounth < 10 ? `0${mounth}` : mounth
  }.${date.getFullYear()}`
  quizWrapper.innerHTML = `
    <div class="quiz__result">
      <p class="result__message">
        Спасибо за Ваши ответы!
        <b>Мы подготовили для Вас персональную аудио запись с Вашим прогнозом.</b>        
      </p>
      <p class="result__description">
        Вы можете узнать, как повлиять на события, которые ожидают вас в ближайшем будущем. 
      </p>
      <p class="result__event">
        <strong>
        Первое значимое событие может произойти уже ${dateFormatToString},
        </strong>
        вам надо быть готовым, чтобы последствия не оказались необратимыми.
      </p>
      <p class="result__description">
      Нажмите на кнопку ниже прямо сейчас и наберите наш номер телефона. Прослушайте важную информацию!
      </p>
      <button class="button button--akcent button--fetch" id="fetch-button">
        Позвонить и прослушать
      </button>
      <div id="data"></div>
      <div class="copyright" id="copyright">
        TERMENI SI CONDITII: ACESTA ESTE UN SERVICIU DE DIVERTISMENT. PRIN FOLOSIREA
        LUI DECLARATI CA AVETI 18 ANI IMPLINITI,
      </div>
  </div>
  `

  const dataContainer = document.getElementById('data')

  const btnFetch = document.getElementById('fetch-button')
  btnFetch.addEventListener('click', async () => {
    let response = await fetch('https://swapi.dev/api/people/1/')

    if (response.ok) {
      let json = await response.json()
      dataContainer.innerHTML = `
        Имя: ${json.name}, рост: ${json.height}, вес: ${json.mass} и так далее ...
      `
    } else {
      alert('Ошибка HTTP: ' + response.status)
    }
  })
}
