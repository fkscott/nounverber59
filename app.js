const VOWELS = ["a", "e", "i", "o", "u", "y"];

//TODO: add the y to ie rule

const has_one_syllable = (word) => {
  let syllable_count = pronouncing.syllableCount(
    pronouncing.phonesForWord(word)[0]
  );

  if (syllable_count === 1) {
    return true;
  }

  return false;
};

const ends_cons_vowel_cons = (word) => {
  const last_letter = word[word.length - 1];
  const second_to_last_letter = word[word.length - 2];
  const third_to_last_letter = word[word.length - 3];

  if (
    !VOWELS.includes(third_to_last_letter) &&
    VOWELS.includes(second_to_last_letter) &&
    !VOWELS.includes(last_letter)
  ) {
    return true;
  }

  return false;
};
//count the number of syllables in a word

const fix_verb = (verb) => {
  //add er to the end of a verb
  //if the last letter of the verb is "e" just add "r", otherwise add "er"
  let last_letter = verb[verb.length - 1];

  if (verb[verb.length - 1] === "e") {
    return `${verb}r`;
  } else if (verb.length === 3 && last_letter != "y") {
    return `${verb}${last_letter}er`;
  } else if (needs_double_consonant(verb)) {
    return `${verb}${last_letter}er`;
  }

  return `${verb}er`;
};

const needs_double_consonant = (word) => {
  if (has_one_syllable(word) && ends_cons_vowel_cons(word)) {
    return true;
  }

  return false;
};

const build_word = () => {
  //build a word from a noun and a verb
  //if the verb ends in "e" just add "r", otherwise add "er"
  //select a random noun and verb
  let noun = nouns[Math.floor(Math.random() * nouns.length)];
  let verb = verbs[Math.floor(Math.random() * verbs.length)];
  //first letter of the noun should be capitalized
  noun = noun[0].toUpperCase() + noun.slice(1);
  verb = fix_verb(verb);

  return `${noun}${verb} 59`;
};

const new_word = () => {
  const word_container = document.getElementById("word");
  word_container.innerHTML = build_word();
};

new_word();
