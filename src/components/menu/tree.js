const data = [{
  id: 0,
  label: '全部信息',
  children: [{
    id: 1,
    label: '清华大学',
    children: [{
      id: 2,
      label: '机械工程学院',
      children: [{
        id: 3,
        label: '机电工程系'
      }]
    }, {
      id: 4,
      label: '外国语学院'
    }]
  }, {
    id: 2,
    label: '北京大学',
    children: [{
      id: 5,
      label: '计算机科学与技术学院'
    }, {
      id: 6,
      label: '外国语学院'
    }]
  }, {
    id: 3,
    label: '厦门大学',
    children: [{
      id: 7,
      label: '自动化教研室'
    }, {
      id: 8,
      label: '电气教研室'
    }]
  }]
}]

export default JSON.parse(JSON.stringify(data))
