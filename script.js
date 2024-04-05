'use strict';

// ვირჩევთ ელემენტებს
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // აქ . და # აღარ გვჭირდება ისედაც წვდება id -ს
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//ეს ფუნქცია იმისთვის შემქმენით რომ უმრავლესობა  ცვლადები გავაერთიანოთ და მხოლოდ ფუნქციის ცვლადი ვწეროთ
const initialization = function () {
  scores = [0, 0]; // აქ შევქმენით მასივი ორივე მოთამაშის ანგარიშის შესანახად
  currentScore = 0; // ეს ცვლადი შევქმენით ანგარიშის ჩასაწერად
  activePlayer = 0; // ეს ცვლადი გვჭირდება რომ კოდმა წაიკითხოს აქტიური მოტამაშე და გადართვა შეძლოს
  playing = true; // ეს ცვლადი შემოვიტანეთ იმისთვის რომ განვსაზღვროთ ვტამაშობთ თუ არა და თამაში დავასრულოთ, გამარჯვებულის გამოვლენის შემდეგ

  // ზემოთ ცვლადების სახელით მივანიჭეთ მნიშვნელობა, მნიშვნელობებით შემდგომ გამოვიყენებთ
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden'); // აქ კამამათელი დავმალეთ display:none აქვს css ში ისედაც
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
initialization();

// ვქმნით მოთამაშის გადაცვლის ფუნქციას
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // ტენარი ოპერატორით
  currentScore = 0; // ანგარიში უბრუნდება 0 -ს
  // ბექგრაუნდის შესაცვლელად დავაკავშირეთ კლასთან toggle მეთოდით.
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  // აქ ორივე მოთამაშის სექციას  toggle-ით უკავშირებს კლასს თუ არ გააჩნია, ხოლო თუგააჩნია მოაშორებს.
};

// კამათლის გაგორების ფუნქცია
btnRoll.addEventListener('click', function () {
  if (playing) {
    //ვაგენერირებთ რენდომ რიცხვს
    const dice = Math.trunc(Math.random() * 6) + 1;
    // გამოვიტანთ კამათელს, სურათის შემოატნის პრინციპით
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // მივწვდით კლასით და ფაილებში კონკრეტული სურათის ნომრით

    // if ით შევამოწმებთ true თუ fallS ია
    if (dice !== 1) {
      // კამათლის რიცხვი შეგვაქვს score ში
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // გადავრთეთ სხვა მოთამაშეზე,ზემოტ აწყობილი ფუნქციით
      switchPlayer();
    }
  }
});

// აქ ვიწყებთ ანგარიშის შენარჩუნების  hold button-ზე დაჭერის აწყობას
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1 ნაბიჯი : დაუმატე ანგარიში მოქმედ მოთამაშეს.
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore; ეს კოდი იგივეა
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2 ნაბიჯი: თუ მოთამაშის ანგარიში >= 100 . დაამტავრე თამაში
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden'); // ისევ აქრობს კამათელს
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // სხვა მოტამაშეზე გადართე,ზემოტ აწყობილი ფუნქციით
      switchPlayer();
    }
  }
});

//ხელახლად დაწყებას ვაშენებთ ნიუ გეიმ ღილაკში,
btnNew.addEventListener('click', initialization);
// initialization ფუნქცია გამოვიძახეთ ამ ივენთში ახალი ფუნქციის მაგივრად
