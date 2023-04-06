import { cutTextToLength, slugify, composeArticleSlug, extractArticleIdFromSlug } from '../index';

/* 
    jest 내장함수: describe, test, expect
    describe: 테스트와 관련된 그룹을 만듬. 동일한 함수에 대한 다른 테스트나 모듈 등을 해당 함수 내에 포함시킴
    test: 테스트를 선언하고 실행
    expact: 함수의 출력과 예상한 결과를 비교 
*/
describe("cut TextToLength and add ...", () => {

    test('Should cut a string that exceeds 10 characters', () => {
        const initialString = 'This is a 34 character long string';
        const cutResult = cutTextToLength(initialString, 10);
        expect(cutResult).toEqual('This is a ...');
    });

    test("Should not cut a string if it's shorter than 10 characters", () => {
        const initialString = '7 chars';
        const cutResult = cutTextToLength(initialString, 10);
        expect(cutResult).toEqual('7 chars');
    });
});

describe("slugify  makes a string URL-safe", () => {

    test('Should convert a string to URL-safe format', () => {
        const initialString = 'This is a string to slugify';
        const slugifiedString = slugify(initialString);
        expect(slugifiedString).toEqual('this-is-a-string-to-slugify');
    });

    test("Should slugify a string with special characters", () => {
        const initialString = 'This is a string to slugify!@#&@^#';
        const slugifiedString = slugify(initialString);
        expect(slugifiedString).toEqual('this-is-a-string-to-slugify');
    });
});