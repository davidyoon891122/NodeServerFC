// @ts-check

// 프레임워크 없이 간단한 토이프로젝트 웹 서버 구현하기
/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터베이스로 사용 (JSON)
 * - 인증 로직은 넣지 않는다
 * - RESTful API를 사용한다
 */

const http = require('http')
const { routes } = require('./api')

const server = http.createServer((req, res) => {
  async function main() {
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        _route.url.test(req.url) &&
        _route.method === req.method
    )

    if (!route) {
      res.statusCode = 404
      res.end('Not found.')
      return
    }
    const reuslt = await route.callback()
    res.statusCode = reuslt.statusCode

    if (typeof reuslt.body === 'string') {
      res.end(reuslt.body)
    } else {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(reuslt.body))
    }
  }
  main()
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`The Server is listening at ${PORT}`)
})
