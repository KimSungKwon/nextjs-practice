describe('articles APIs', () => {

    test('should correctly set apllication/json header', () => {
        // 서버로부터 요청, 응답받기
        cy.request('http://localhost:3000/api/articles')
            // 응답받은 HTTP 헤더에 content-type=apllication/json 정보가 있는가?
            .its('headers')
            .its('content-type')
            .should('include', 'application/json');
    });

    test('should correctly return a 200 status code', () => {
        cy.request('http://localhost:3000/api/articles')
            // 응답코드가 200인가?
            .its('status')
            .should('be.equal', 200);
    });

    /*
        each()와 then()은 마지막에 done()호출해야 함
    */

    test('should correctly request a list of articles', () => {
        cy.request('https://localhost:3000/api/articles')
            // 배열(응답)의 각 개체(article)가 함수(tohavekeys)의 인자로 전달한 모든 키 값을 가지고 있는가?
            .its('body')
            .each((article) => {
                expect(article)
                    .to.have.keys('id', 'title', 'body', 'author', 'image');
                expect(article.author).to.have.keys('id', 'name');
                expect(article.image).to.have.keys('url', 'author');
                done();
            });
    });

    test('should correctly return a an article given an ID', (done) => {
        cy.request('https://localhost:3000/api/article?id=u12w3o0d')
            // 게시글 ID를 주면 해당 게시글을 읽어오는 APi 테스트
            .then(({ body }) => {
                expect(body)
                    .to.have.keys('id', 'title', 'body', 'author', 'image');
                expect(body.author).to.have.keys('id', 'name');
                expect(body.author).to.have.keys('url', 'author');
                done();
            });
    });

    test('should return 404 when an article is not found', () => {
        cy.request({
            url: 'http://localhost:3000/api/article?id=unexistingID',
            failOnStatusCode: false,
        })
            // 게시글이 없으면 404 리턴하는가? 
            .its('status')
            .should('be.equal', 404);
    })
});