import Mock from 'mockjs'
const {
  userdata
} = Mock.mock({
  'userdata|100': [{
    id: '@increment(1)',
    username: '@cname()',
    'school|1': ['清华大学', '北京大学', '辽宁大学'],
    'college|1': ['机械工程学院', '外国语学院'],
    department: '机电工程系',
    address: '@city(true)',
    date: '@date(yyyy-MM-dd hh:mm:ss)',
    isName: false
  }]
})
var templist = userdata
var school, college, department
const getQuery = (url, name) => {
  const index = url.indexOf('?')
  if (index !== -1) {
    const queryStrArr = url.substr(index + 1).split('&')
    for (let i = 0; i < queryStrArr.length; i++) {
      const itemArr = queryStrArr[i].split('=')
      if (itemArr[0] === name) {
        return itemArr[1]
      }
    }
  }
}

Mock.mock(/\/api\/get\/userdata/, 'get', (options) => {
  const pageindex = getQuery(options.url, 'pageindex')
  const pagesize = getQuery(options.url, 'pagesize')
  const start = (pageindex - 1) * pagesize
  const end = pageindex * pagesize
  const totalPage = Math.ceil(templist.length / pagesize)
  const list = pageindex > totalPage ? [] : templist.slice(start, end)
  return {
    status: 200,
    meg: '获取数据成功',
    data: list,
    total: templist.length
  }
})

Mock.mock('/api/add/newInfo', 'post', (options) => {
  const body = JSON.parse(options.body)
  userdata.push(
    Mock.mock({
      id: '@increment(1)',
      username: body.name,
      school: body.school,
      college: body.college,
      department: body.department,
      address: body.address,
      date: '@date(yyyy-MM-dd hh:mm:ss)',
      isName: false
    }))
  if (school && college === '' && department === '') {
    templist = userdata.filter(item => item.school === school)
  } else if (school && college && department === '') {
    templist = userdata.filter(item => item.school === school && item.college === college)
  } else if (school && college && department) {
    templist = userdata.filter(item => item.school === school && item.college === college && item.department ===
      department)
  } else {
    templist = userdata
  }
  return {
    status: 200,
    meg: '提交数据成功',
    list: templist,
    total: templist.length
  }
})

Mock.mock('/api/remove/userow', 'post', (options) => {
  const body = JSON.parse(options.body)
  const index = userdata.findIndex(item => item.id === body.id)
  if (templist === userdata) {
    userdata.splice(index, 1)
  } else {
    const index1 = templist.findIndex(item => item.id === body.id)
    userdata.splice(index, 1)
    templist.splice(index1, 1)
  }
  return {
    status: 200,
    meg: '删除行成功',
    list: templist,
    total: templist.length
  }
})

Mock.mock(/\/api\/get\/updateUser/, 'get', (options) => {
  school = decodeURI(getQuery(options.url, 'school'))
  college = decodeURI(getQuery(options.url, 'college'))
  department = decodeURI(getQuery(options.url, 'department'))
  if (school && college === '' && department === '') {
    templist = userdata.filter(item => item.school === school)
  } else if (school && college && department === '') {
    templist = userdata.filter(item => item.school === school && item.college === college)
  } else if (school && college && department) {
    templist = userdata.filter(item => item.school === school && item.college === college && item.department ===
      department)
  } else {
    templist = userdata
  }
  return {
    status: 200,
    meg: '获取数据成功',
    data: templist,
    total: templist.length
  }
})

Mock.mock('/api/post/updaterow', 'post', (options) => {
  const body = JSON.parse(options.body)
  if (templist === userdata) {
    userdata.some(item => {
      if (item.id === body.id) {
        item.name = body.name
        item.school = body.school
        item.college = body.college
        item.department = body.department
        return true
      }
    })
  } else {
    userdata.some(item => {
      if (item.id === body.id) {
        item.name = body.name
        item.school = body.school
        item.college = body.college
        item.department = body.department
        return true
      }
    })
    templist.some(item => {
      if (item.id === body.id) {
        item.name = body.name
        item.school = body.school
        item.college = body.college
        item.department = body.department
        return true
      }
    })
  }
  return {
    status: 200,
    meg: '获取数据成功',
    data: templist,
    total: templist.length
  }
})

Mock.mock('api/post/selectname', 'post', (options) => {
  const body = JSON.parse(options.body)
  let list = []
  console.log(body)
  const pageindex = body.pageindex
  const pagesize = body.pagesize
  const start = (pageindex - 1) * pagesize
  const end = pageindex * pagesize
  const totalPage = Math.ceil(templist.length / pagesize)
  console.log(totalPage)
  console.log(pageindex)
  if (!body.state && body.name) {
    console.log(0)
    list = templist.filter(item => item.username === body.name)
  } else {
    console.log(1)
    list = templist.slice(start, end)
  }
  console.log(list)
  return {
    status: 200,
    meg: '获取数据成功',
    data: list,
    total: list.length
  }
})
console.log(userdata)
