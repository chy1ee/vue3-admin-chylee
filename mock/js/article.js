let articleList = {
  coe: 200,
  msg: 'success',
  data: {
    total: 100,
    'rows|8': [{
      id: '@guid', title: '@ctitle', auth: '@cname', 'job|1': ['Web前端', 'Java工程师', '架构工程师', '数据库管理员']
    }]
  }
}

export default {
  'get|/dev-api/article/list': articleList
}