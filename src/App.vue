<template>
   <div class="wrapper">
    
		<AppHeader></AppHeader>

      <main class="main-content">
        <div class="main-content__card container">
          <div class="card">
            <div class="card__front">
              <div class="card__content">
                <div class="card__counter text_xs">1 / 3</div>
                <div class="card__word text_l">Кошка</div>
                <div class="card__example text_m">Кошка сидит на полу</div>
              </div>
              <form action="#" class="card__form" name="wordForm">
                <input
                  autocomplete="off"
                  placeholder="Введите слово"
                  type="text"
                  name="wordInput"
                  class="card__input"
                />
                <button
                  type="submit"
                  class="card__check-btn button button--card text-bold_medium"
                >
                  Проверить
                </button>
              </form>
            </div>
            <div class="card__back">
              <div class="card__content">
                <div class="card__counter text_xs">1 / 3</div>
                <div class="card__word text_l">Cat</div>
                <div class="card__example text_m">Cat is sitting on the floor</div>
              </div>
              <div class="card__check correct-answer text-bold_bold text_m">Правильно</div>
              <div class="card__check incorrect-answer text-bold_bold text_m">Неправильно</div>
              <button type="button" class="card__next button button--card text-bold_medium">
                Следующий
              </button>
            </div>
          </div>
        </div>

        <div class="main-content__card container">
          <div class="card">
            <div class="card__front">
              <div class="card__counter text_xs">1 / 3</div>
              <form
                action="#"
                class="card__form-quiz form-quiz"
                name="wordFormQuiz"
              >
                <div class="form-quiz__word text_xs">
                  Подберите синонимы к слову beautiful
                </div>
                <div class="form-quiz__answers">
                  <label class="form-quiz__answer clickable" for="answer-1">
                    <input
                      type="checkbox"
                      class="form-quiz__checkbox"
                      id="answer-1"
                    />
                    <span class="form-quiz__text">Handsome</span>
                  </label>
                  <label class="form-quiz__answer clickable" for="answer-2">
                    <input
                      type="checkbox"
                      class="form-quiz__checkbox"
                      id="answer-2"
                    />
                    <span class="form-quiz__text">Ugly</span>
                  </label>
                  <label class="form-quiz__answer clickable" for="answer-3">
                    <input
                      type="checkbox"
                      class="form-quiz__checkbox"
                      id="answer-3"
                    />
                    <span class="form-quiz__text">Pretty</span>
                  </label>
                  <label class="form-quiz__answer clickable" for="answer-4">
                    <input
                      type="checkbox"
                      class="form-quiz__checkbox"
                      id="answer-4"
                    />
                    <span class="form-quiz__text">Dreadful</span>
                  </label>
                </div>
                <button
                  type="submit"
                  class="card__check-btn button button--card text-bold_medium"
                >
                  Проверить
                </button>
              </form>
            </div>
            <div class="card__back">
              <div class="card__content">
                <div class="card__counter text_xs">1 / 3</div>
                <div class="card__word text_l">
                  Подберите синонимы к слову beautiful
                </div>
                <div class="card__correct-answers">
                  <div class="card__correct-answer text_xs">Handsome</div>
                  <div class="card__correct-answer text_xs">Pretty</div>
                </div>
              </div>
              <div class="card__check correct-answer text-bold_bold text_m">Правильно</div>
              <div class="card__check incorrect-answer text-bold_bold text_m">Неправильно</div>
              <button type="button" class="card__next button button--card text-bold_medium">
                Следующий
              </button>
            </div>
          </div>
        </div>

        <div class="main-content__result container">
          <div class="result">
            <h2 class="result__title title--h2 text_m">Результаты</h2>
            <div class="result__check correct-answer text-bold_medium text_xs">
              Правильно
              <span class="result__count">2</span>
            </div>
            <div class="result__check incorrect-answer text-bold_medium text_xs">
              Неправильно
              <span class="result__count">1</span>
            </div>
            <button type="button" class="result__repeat button button--card text-bold_medium">
              Повторить неправильные
            </button>
            <button type="button" class="result__finish button button--card text-bold_medium">
              Завершить
            </button>
          </div>
        </div>

        <div class="main-content__crossword container">
          <div class="crossword">
            <h2 class="crossword__title title--h2 text_m">Кроссворд</h2>
            <div class="crossword__main">
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil letter-correct">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="K"
                />
                <span class="crossword__number">1</span>
              </div>
              <div class="crossword__ceil letter-correct">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="N"
                />
                <span class="crossword__number">2</span>
              </div>
              <div class="crossword__ceil letter-correct">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="I"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil letter-correct letter-incorrect">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="F"
                />
                <span class="crossword__number">3</span>
              </div>
              <div class="crossword__ceil letter-correct">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="E"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="A"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil letter-incorrect">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="O"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="P"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil letter-incorrect">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="R"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="K"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil letter-incorrect">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="K"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="B"
                />
                <span class="crossword__number">4</span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="I"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="S"
                />
                <span class="crossword__number">5</span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="P"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="O"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="O"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="N"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="W"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="P"
                />
                <span class="crossword__number">6</span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="L"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="A"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="T"
                />
                <span class="crossword__number">7</span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="E"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="E"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium show-square"
                  placeholder="A"
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
              <div class="crossword__ceil">
                <input
                  autocomplete="off"
                  type="text"
                  maxlength="1"
                  class="crossword__input text-bold_medium"
                  disabled
                />
                <span class="crossword__number"></span>
              </div>
            </div>
            <div class="crossword__definitions">
              <div class="crossword__definition definition-done">1. Нож</div>
              <div class="crossword__definition">2. Салфетка</div>
              <div class="crossword__definition">3. Вилка</div>
              <div class="crossword__definition">4. Миска</div>
              <div class="crossword__definition">5. Ложка</div>
              <div class="crossword__definition">6. Тарелка</div>
              <div class="crossword__definition">7. Чай</div>
            </div>
          </div>
        </div>
      </main>

		<AppFooter> </AppFooter>
   </div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
	components: {
		AppHeader, AppFooter
	}
}
</script>

<style lang="scss">
	@import "@/assets/scss/style.scss";
</style>
