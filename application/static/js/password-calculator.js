/**
 * Author: Oyamo Brian
 * LICENCE: You are free to use this code
 * Email: oyamo.xyz@gmail.com
 * linkedin: oyamoh-brian
 * Phone: 0793875319
 * looking for a job: yes Android or Python
 * 
 *
 * 
 *
 */
//CONSTANTS
const POOR = "young-passion-gradient";
const MEDUIM = "sunny-morning-gradient";
const EXCELENT = "aqua-gradient";
// INPUT FIELD

let pswd_input = document.querySelector("input");
let pswd_label = document.querySelector("label");
// INDICATORS
let progress_bar = document.querySelector(".progress-bar");
let span_length = document.querySelector("#_len");
let span_symbols = document.querySelector("#_symbols");
let span_caps = document.querySelector("#_caps");
let span_sm = document.querySelector("#_sm_letter");
let span_digits = document.querySelector("#_digit");
let clear_btn = document.querySelector("#clear");
let auto_btn = document.querySelector("#autogen");
let copy_btn = document.querySelector("#copy");
let nav_bar = document.querySelector('.navbar');

// This function changes the text of the label
let strength_obj = {
  len: 0,
  symbols: 0,
  caps: 0,
  sm_letter: 0,
  digits: 0,
};

let progress = 0;

const change_label = (text) => {
  pswd_label.innerHTML = text;
};

const add_class = (element, el_class) => element.classList.add(el_class);

const remove_class = (element, el_class) => element.classList.remove(el_class);
const mainProgressHandler = (pct) => {
  /**
   * Changes percentage text
   * changes progress width
   */
  progress_bar.style.width = `${pct}%`;
  progress_bar.innerHTML = `${pct}%`;
};
const duration_formatter = (seconds) => {
  const update_duration = (txt) => {
    document.querySelector('.duration').innerHTML = txt;
  }

  if (seconds < 60) update_duration(`${seconds} sec`);
  if (seconds >= 60 && seconds < 3600) {
    const mins = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    let str = `${mins} min`
    if (sec) str += ` ${sec} s`
    update_duration(str);;
  }

  else if (seconds >= 3600 && seconds <= 86400) {
    const hrs = Math.floor(seconds % (3600 * 24) / 3600);
    const min = Math.floor(seconds % (3600 / 60))
    let str = `${hrs} hrs`
    if (min) str += ` ${min} min`
    update_duration(str);;

  }
  else if (seconds >= 86400 && seconds < 31579200) {
    const days = Math.floor(seconds / 86400);
    const hrs = Math.floor(seconds % (3600 * 24) / 3600)
    let str = `${days} day(s)`
    if (hrs) str += ` ${hrs} hrs`
    update_duration(str);;

  }

  else if (seconds >= 31579200) {
    const yrs = Math.floor(seconds / 31579200);
    const days = Math.floor(seconds % (3600 * 24) / 365)
    let str = `${yrs} yr(s)`
    if (days) str += ` ${days} day(s)`
    update_duration(str);;

  }
}
const hack_Duration = (payload_len) => {
  const SYM = 34;
  const UPR = 26;
  const LWR = 26;
  const DIG = 9;
  const { total_len, symbols, caps, sm_letter, digits } = payload_len;
  let Combinations = 0;
  if (symbols) Combinations += SYM;
  if (caps) Combinations += UPR;
  if (sm_letter) Combinations += LWR;
  if (digits) Combinations += DIG;
  const HASH_DURATION = 1.7 * Math.pow(10, -6);
  let TotalSecs = 0;
  if (total_len) {
    TotalSecs = (HASH_DURATION * Math.pow(Combinations, total_len)) / 2;
  }
  duration_formatter(TotalSecs)

}
const ui_updateHandler = (EL, CLASS) => {
  const Classes = EL.classList;
  const currentState = () => {
    if (Classes.contains(POOR)) return POOR;
    if (Classes.contains(MEDUIM)) return MEDUIM;
    if (Classes.contains(EXCELENT)) return EXCELENT;
  };
  remove_class(EL, currentState());
  add_class(EL, CLASS);
};
const update_UI = (s) => {
  /// SMART
  const ELS = [span_length, span_symbols, span_caps, span_sm, span_digits];
  const { len, symbols, caps, sm_letter, digits } = s;
  const VALS = [len, symbols, caps, sm_letter, digits];
  const SUM = len + symbols + caps + sm_letter + digits;
  for (let i = 0; i < VALS.length; i++) {
    // UPDATE COLOR
    if (VALS[i] < 8) {
      ui_updateHandler(ELS[i], POOR);
    } else if (VALS[i] >= 8 && VALS[i] <= 14) {
      ui_updateHandler(ELS[i], MEDUIM);
    } else {
      ui_updateHandler(ELS[i], EXCELENT);
    }
  }

  if (SUM < 30) {
    ui_updateHandler(progress_bar, POOR);
  } else if (SUM >= 30 && SUM < 70) {
    ui_updateHandler(progress_bar, MEDUIM);
  } else {
    ui_updateHandler(progress_bar, EXCELENT);
  }
  mainProgressHandler(SUM);
};
const toggle_nav = (remove_nav) => {
  if (remove_nav) {
    nav_bar.classList.remove('sticky-top');
  }
  else {
    nav_bar.classList.add('sticky-top');
  }
}
const on_input_blur = () => {
  toggle_nav(0)
  const pass_len = pswd_input.value;
  if (pass_len == 0) {
    change_label("Start typing..");
  } else if (pass_len > 0) {
    change_label("Waiting..");
  }
};

const on_input_focus = () => {
  toggle_nav(1);
  if (pswd_input.value.length) {
    change_label("Continue..");
  } else {
    change_label("Start typing");
  }
};

const check_strength = () => {
  const val = pswd_input.value;
  const isUpper = (char) => /[A-Z]/.test(char);
  const isLower = (char) => /[a-z]/.test(char);
  const isSymbol = (char) => /[^a-zA-Z\d]/.test(char);
  const isNum = (char) => /[0-9]/.test(char);
  /**
   *
   */
  let payload_len = {
    total_len: val.length,
    symbols: 0,
    caps: 0,
    sm_letter: 0,
    digits: 0,
  };

  for (let i = 0; i < val.length; i++) {
    const currChar = val.charAt(i);
    if (isUpper(currChar)) payload_len.caps++;
    if (isSymbol(currChar)) payload_len.symbols++;
    if (isNum(currChar)) payload_len.digits++;
    if (isLower(currChar)) payload_len.sm_letter++;
  }
  // RATE LENGTH
  const permutation = (n) => {
    if (!n) return n;
    let perm = 1;
    for (let i = n; i > 0; i--) { }
  };
  const len_calc = () => {
    if (payload_len.total_len > 8) return 20;
    return Math.floor((payload_len.total_len / 8) * 20);
  };
  //Rate NOn Word Chars
  const symbol_calc = () => {
    if (payload_len.symbols > 2) return 20;
    return Math.floor((payload_len.symbols / 2) * 20);
  };
  // Rate Capital Letters
  const caps_calc = () => {
    if (payload_len.caps > 3) return 20;
    return Math.floor((payload_len.caps / 3) * 20);
  };
  // Rate Small Letters
  const sm_calc = () => {
    if (payload_len.sm_letter > 3) return 20;
    return Math.floor((payload_len.sm_letter / 3) * 20);
  };
  // Rate digits
  const dig_calc = () => {
    if (payload_len.digits > 2) return 20;
    return Math.floor((payload_len.digits / 2) * 20);
  };
  strength_obj.sm_letter = sm_calc();
  strength_obj.symbols = symbol_calc();
  strength_obj.len = len_calc();
  strength_obj.caps = caps_calc();
  strength_obj.digits = dig_calc();
  hack_Duration(payload_len);
  update_UI(strength_obj);
};
const on_key_up = () => {
  check_strength();
};
const clear_input = () => {
  //Clear field
  pswd_input.value = "";
  //Reset ProgressBar
  mainProgressHandler(0);
  // Toggle classes

  // ui_updateHandler(span_caps, POOR);
  // ui_updateHandler(span_digits, POOR);
  // ui_updateHandler(span_length, POOR);
  // ui_updateHandler(span_symbols, POOR);
  // ui_updateHandler(span_sm, POOR);
  // ui_updateHandler(progress_bar, POOR);
  on_key_up()
};
const auto_gen = () => {
  const MAX_CHARS = 15;
  const digits = "01234567890";
  const lower = "qwertyuiopasdfghjklzxcvbnm";
  const upper = lower.toUpperCase();
  const symbols = "!@#$%^&*()_-+={[}]|/,.|";
  const randomChars = (payload, n) => {
    let rand = "";
    for (let i = 0; i < n; i++) {
      rand += payload.charAt(Math.floor(Math.random() * payload.length));
    }
    return rand;
  };
  const randno = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  let randDigits = randomChars(digits, randno(2, 4));
  let randLower = randomChars(lower, randno(2, 4));
  let randUpper = randomChars(upper, randno(2, 4));
  let randSymbols = randomChars(symbols, randno(2, 4));
  let randPswd = randDigits + randLower + randUpper + randSymbols;
  randPswd = randPswd.split("");
  let total_len = randPswd.length;
  const swapRandomPositions = () => [
    randno(0, total_len - 1),
    randno(0, total_len - 1),
  ];
  for (let i = 0; i < total_len; i++) {
    let k = swapRandomPositions();
    let temp = randPswd[k[0]];
    randPswd[k[0]] = randPswd[k[1]];
    randPswd[k[1]] = temp;

  }

  let finalRandom = randPswd.join("");
  pswd_input.focus = 1
  pswd_input.value = finalRandom;
  on_key_up();
};
const copy = () => {

  /* Select the text field */
  pswd_input.select();
  pswd_input.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
}

const main = () => {
  //Just Listen for In onFocus and Blur
  pswd_input.addEventListener("blur", on_input_blur);
  pswd_input.addEventListener("focus", on_input_focus);
  pswd_input.addEventListener("keyup", on_key_up);
  clear_btn.addEventListener("click", clear_input);
  auto_btn.addEventListener("click", auto_gen);
  copy_btn.addEventListener('click', copy);
};

main();
