import getName from 'namey-mcnameface';
import words from './Words.json'

function rand(min, max) {
	return min + ~~(Math.random() * (max - min));
}

function fill(len, fn) {
	return Array(len).fill().map((_, i) => fn(i));
}

/* function createRandomGarbage() {
	const numWords = rand(4, 50);
	return fill(numWords, () => {
		const numLetters = rand(3, 12);
		return fill(numLetters, () => String.fromCharCode(rand(97,122))).join('')
	}).join(' ');
} */

function createRandomGarbage() {
	const numWords = rand(25, 150);
	return fill(numWords, () => {
		return words[rand(0, words.length -1 )]
	}).join(' ');
}

export default fill(1000, (i) => {
	return {
		key: `_${i}`,
		name: getName(),
		content: createRandomGarbage(),
	};
});
