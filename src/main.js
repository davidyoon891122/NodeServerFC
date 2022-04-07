// @ts-check

// 프레임워크 없이 간단한 토이프로젝트 웹 서버 구현하기
/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터베이스로 사용 (JSON)
 * - 인증 로직은 넣지 않는다
 * - RESTful API를 사용한다
 */

const http = require('http')

/**
 * Post API
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
  const POST_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+$)/ // 정규식 안에 () 캡쳐를 하면 원하는 부분이 추출 된다.
  const postIdRegesResult =
    (req.url && POST_ID_REGEX.exec(req.url)) || undefined
  if (req.url === '/posts' && req.method === 'GET') {
    res.statusCode = 200
    res.end('List of posts')
  } else if (postIdRegesResult) {
    // GET /posts/:id
    const postId = postIdRegesResult[1]
    console.log(`postId: ${postId}`)
    res.statusCode = 200
    res.end('Reading a post')
  } else if (req.url === '/posts' && req.method === 'POST') {
    res.statusCode = 200
    res.end('Creating post')
  } else {
    res.statusCode = 404
    res.end('Not found.')
  }
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`The Server is listening at ${PORT}`)
})
