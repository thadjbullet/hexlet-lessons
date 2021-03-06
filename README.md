# Реализуйте логику работы часов из теории

Интерфейсными методами часов являются:

clickMode() - нажатие на кнопку Mode
longClickMode() - долгое нажатие на кнопку Mode
clickH() - нажатие на кнопку H
clickM() - нажатие на кнопку M
tick() - при вызове увеличивает время на одну минуту и, если нужно, активирует звонок будильника
isAlarmOn() - показывает включен ли режим будильника
isAlarmTime() - возвращает true, если время на часах совпадает со временем на будильнике
minutes() - возвращает минуты, установленные на часах
hours() - возвращает часы, установленные на часах
alarmMinutes() - возвращает минуты, установленные на будильнике
alarmHours() - возвращает часы, установленные на будильнике
currentMode() - возвращает текущий режим (alarm | clock | bell)
Основной спецификацией к данной задачe нужно считать тесты.

AlarmClock.js
Реализуйте интерфейсные методы и логику работы часов.

State.js/AlarmState.js/BellState.js/ClockState.js
Реализуйте иерархию состояний, в корне которой находится State.



В соответствии с классификацией, введенной Д. Харелом, любую программную систему можно отнести к одному из следующих классов.

Трансформирующие системы осуществляют некоторое преобразование входных данных и после этого завершают свою работу. В таких системах, как правило, входные данные полностью известны и доступны на момент запуска системы, а выходные – только после завершения ее работы. К трансформирующим системам относятся, например, архиваторы и компиляторы.
Интерактивные системы взаимодействуют с окружающей средой в режиме диалога (например, текстовый редактор). Характерной особенностью таких систем является то, что они могут контролировать скорость взаимодействия с окружающей средой – заставлять среду «ждать».
Реактивные системы взаимодействуют с окружающей средой путем обмена сообщениями в темпе, задаваемом средой. К этому классу можно отнести большинство телекоммуникационных систем, а также системы контроля и управления физическими устройствами.
Известно, что конечные автоматы в программировании традиционно применяются при создании компиляторов, которые относятся к классу трансформирующих систем. Автомат здесь понимается как некое вычислительное устройство, имеющее входную и выходную ленты. Перед началом работы на входной ленте записана строка, которую автомат далее посимвольно считывает и обрабатывает. В результате обработки автомат последовательно записывает некоторые символы на выходную ленту.

Другая традиционная область использования автоматов – задачи логического управления – является подклассом реактивных систем. Здесь автомат – это, на первый взгляд, совсем другое устройство. У него несколько параллельных входов (чаще всего двоичных), на которые в режиме реального времени поступают сигналы от окружающей среды. Обрабатывая эти сигналы, автомат формирует значения нескольких параллельных выходов.

Таким образом, даже традиционные области применения конечных автоматов охватывают принципиально различные классы программных систем.

В качестве примера реактивной системы, рассмотрим электронные часы с будильником.

alarm clock

Пусть у них имеются три кнопки. H - кнопка для увеличения часа на единицу,M - для увеличение минуты на единицу и кнопка Mode, которая переключает часы в режим настройки будильника. В этом режиме на экране отображается время срабатывания будильника, а кнопки H и M устанавливают не текущее время, а время срабатывания будильника. Повторное нажатие кнопки Modeвозвращает часы в обычный режим. Кроме того, затяжное нажатие на кнопкуMode приводит к тому, что будильник активируется. Такое же нажатие еще раз отключает будильник.

После этого, если текущее время совпадает со временем будильника, включается звонок, который отключается либо нажатием кнопки Mode, либо самопроизвольно через минуту. Кнопки H и M в режиме звонка (когда сработал будильник) не активны.

Поведение часов с будильником уже является сложным, поскольку одни и те же входные воздействия (нажатие одних и тех же кнопок) в зависимости от режима инициируют различные действия.

В программных и программно-аппаратных вычислительных системах сущности со сложным поведением встречаются очень часто. Таким свойством обладают устройства управления, сетевые протоколы, диалоговые окна, персонажи компьютерных игр и многие другие объекты и системы.

Подведем итог. У нас есть следующие действия:

Установка времени
Установка времени срабатывания будильника
Включение/Выключение будильника
Отключение звонка будильника
Флаго-ориентированное программирование
class AlarmClock {
  clickH() {
    if (!this.onBell) {
      if (this.mode === 'alarm') {
        this.alarmHours += 1;
      } else {
        this.hours += 1;
      }
    }
  }
}

const clock = new AlarmClock();
clock.clickH();
Выше типичный пример флаго-ориентированного программирования. Примерно так выглядит код большинства программ.

Давайте немного вспомним курс "Программирование, управляемое данными". В рамках этого курса мы делали диспетчеризацию по интересующему нас параметру (типу), что приводило к устранению условных конструкций и давало возможность расширять поведение программы без ее постоянного переписывания. Здесь наблюдается точно такая же ситуация, в которую так и просится полиморфизм включения. Достаточно очевидно, что диспетчеризация нам нужна по состоянию, другими словами, должен выполняться разный код в зависимости от того, в каком состоянии находится наш объект. Из этого предположения может следовать только одно. Нужно каждое состояние превратить в тип данных. Так появляется на свет паттерн State.

Выделим три управляющих состояния для наших часов:

ClockState
AlarmState
BellState
Обратите внимание, что состояние "включен будильник" сюда не входит. Оно не является управляющим. Этот параметр влияет только на то, что произойдет переход в BellState в тот момент, когда время на часах и время на будильнике будет одинаковым.

Теперь давайте посмотрим на реализацию с использованием динамической диспетчеризации:

class AlarmClock {
  constructor() {
    this.hours = 12;
    this.alarmHours = 6;
    this.setState(ClockState);
  }

  setState(Klass) {
    this.state = new Klass(this);
  }

  clickH() {
    // Делегирование
    this.state.clickH();
  }
}
Код, который здесь написан, это всего лишь один из вариантов реализации паттерна State. Не принимайте как догму все, что вы читаете в книгах "10 лучших паттернов". Главное, это концептуальная идея и решаемая задача, остальное очень сильно варьируется от большого числа параметров. В основном в книгах все примеры даны для статических языков, и эти реализации очень громоздки для такого языка как javascript.

От чего точно не уйти, так это от того, что в начале наши часы инициализируются неким начальным состоянием. В нашем случае оно statefull (мы передаем туда текущий объект), но так же оно могло бы быть и stateless. А дальше все интерфейсные методы часов, поведение которых зависит от состояния, делегерируют все вызовы внутрь объекта состояния. Внутри, без условных конструкций, находится код, который выполняет только то, что нужно делать в текущем состоянии. При необходимости этот код меняет сам объект часов. Это возможно благодаря тому, что мы передали внутрь состояния this.

Если какое-то событие приводит к изменению состояния, то само состояние (в паттерне State) отвечает за то, чтобы поменять себя на другое состояние. Например, при очередном тике часов, если настало время работы будильника, то мы подставляем вместо себя состояние BellState.

export default class ClockState {
  tick() {
    if (this.clock.isAlarmTime()) {
      this.clock.setState(BellState);
    }
  }
}
Общая схема работы паттерна State.
state

Пример из жизни
vending state

Дополнение
Материал этого урока, во многом, основан и использует материал из книги: "Автоматное программирование" (Надежда Поликарпова, Анатолий Шалыто)