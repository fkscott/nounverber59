const VOWELS = ["a", "e", "i", "o", "u", "y"];
const wordContainer = document.getElementById("word");
const clipboardToast = document.getElementById("clipboard-toast");

//TODO: add the y to ie rule

/**
 * copies text from the word container to the clipboard
 * @returns {void}
 */
const copyToClipboard = () => {
  const word = wordContainer.innerHTML;
  navigator.clipboard.writeText(word);

  clipboardToast.style.opacity = 1;
  setTimeout(function () {
    clipboardToast.style.opacity = 0;
  }, 3000);
};

/**
 * uses the pronouncing library to check if a word has one syllable. returns true if it does, false if it doesn't
 * @param {string} word
 * @returns {boolean}
 */
const hasOneSyllable = (word) => {
  let syllableCount = pronouncing.syllableCount(
    pronouncing.phonesForWord(word)[0]
  );

  if (syllableCount === 1) {
    return true;
  }

  return false;
};

/**
 * checks if a word ends in a consonant, vowel, consonant pattern. returns true if it does, false if it doesn't
 * This will help us determine whether to add a double constonant to the end of a verb
 * @param {string} word
 * @returns {boolean}
 * @see transformVerb
 */
const endConsVowelCons = (word) => {
  // i love verbose variable names. sue me.
  const lastLetter = word[word.length - 1];
  const secondToLastLetter = word[word.length - 2];
  const thirdToLastLetter = word[word.length - 3];

  if (
    !VOWELS.includes(thirdToLastLetter) &&
    VOWELS.includes(secondToLastLetter) &&
    !VOWELS.includes(lastLetter)
  ) {
    return true;
  }

  return false;
};

/**
 * Does the following transformations to a verb to get into our desired format:
 * 1. If the verb ends in "e", just add "r"
 * 2. If the verb ends in a consonant, vowel, consonant pattern, add the last letter and "er"
 * 3. If the verb ends in a consonant, add the last letter and "er" (except for when the verb ends in "y")
 * @param {string} verb
 * @returns {string}
 */
const transformVerb = (verb) => {
  //add er to the end of a verb
  //if the last letter of the verb is "e" just add "r", otherwise add "er"
  let lastLetter = verb[verb.length - 1];

  if (verb[verb.length - 1] === "e") {
    return `${verb}r`;
  } else if (verb.length === 3 && last_letter != "y") {
    return `${verb}${last_letter}er`;
  } else if (needsDoubleConsonant(verb)) {
    return `${verb}${last_letter}er`;
  }

  return `${verb}er`;
};

/**
 * checks if a verb needs a double consonant. helper function for transformVerb. returns true if it does, false if it doesn't
 * @param {string} word
 * @returns {boolean}
 */
const needsDoubleConsonant = (word) => {
  if (hasOneSyllable(word) && endConsVowelCons(word)) {
    return true;
  }

  return false;
};

/**
 * builds a word to show on our page from a randomly selected noun and verb
 * @returns {string}
 */
const buildWord = () => {
  //build a word from a noun and a verb
  //if the verb ends in "e" just add "r", otherwise add "er"
  //select a random noun and verb
  let noun = randomNoun();
  let verb = randomVerb();
  //first letter of the noun should be capitalized
  noun = noun[0].toUpperCase() + noun.slice(1);
  verb = transformVerb(verb);

  return `${noun}${verb} 59`;
};

/**
 * returns a random noun from our nouns array
 * @returns {string}
 */
const randomNoun = () => {
  return nouns[Math.floor(Math.random() * nouns.length)];
};

/**
 * returns a random verb from our verbs array
 * @returns {string}
 */
const randomVerb = () => {
  return verbs[Math.floor(Math.random() * verbs.length)];
};

/**
 * generates a new word and displays it on the page
 * @returns {void}
 */
const newWord = () => {
  const wordContainer = document.getElementById("word");
  wordContainer.innerHTML = buildWord();
};

/**
 * adds a click event listener to the clipboard button
 * @returns {void}
 */

const listen = () => {
  wordContainer.addEventListener("click", copyToClipboard);
};

/**
 * initializes our page with the event listener and a new word to live in the word container
 * @returns {void}
 */
const init = () => {
  listen();
  newWord();
};

init();
