/**
* @jest-environment jsdom
*/
import { render, screen } from '@testing-library/react';
import ArticleCard from '..';
import { cutTextToLength } from '../../../utils';
import { article } from './mock';

describe('ArticleCard', () => {
    test('Generated link should be in the correct format', () => {
        // testing-library의 render메서드로 마운트,렌더링.
        const component = render(<ArticleCard {...article} />);
        // component의 링크 정보와 href 속성값을 읽어옴
        const link = component.getByRole('link').getAttribute('href');
        // 이 속성값이 원하는 문자열과 일치하는지 검사
        expect(link).toBe('/articles/healthy-summer-meloncarrot-soup-u12w3o0d');
    });

    // 컴포넌트를 렌더링하고, 게시글body의 요약본을 만들고, 컴포넌트의 body와 일치하는지 검사
    test('Generated summary should not exceed 100 characters', async () => {
        render(<ArticleCard {...article} />);
        const summary = screen.getByText(cutTextToLength(article.body, 100));
        expect(summary).toBeDefined();
    })
});