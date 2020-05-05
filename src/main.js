const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
/* 初始时从  LocalStorage 中读取对应的 hash  */
const x = localStorage.getItem('x') || 'null'
// 将读取的字符串 变为 对象
const xObject = JSON.parse(x)
// hashMap 初始化保底值
const hashMap = xObject || [{
  logo: 'A',
  url: 'https://www.acfun.cn',
  logoICO: 'https://www.acfun.cn/favicon.ico'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com',
  logoICO: 'https://www.bilibili.com/favicon.ico'
}]
/* 显示链接 缩短 */
const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '') // 删除以 / 开头的内容 贪婪匹配
}
/* 操作 hashMap 渲染页面 */
const render = () => {
  /*  再次渲染 hashMap 之前必须先 清空原来的 */
  // 找到 的除了 lastLi 之外的所有 li
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {
    // console.log(node.logoICO)
    let showLogo = `<img src = ${node.logoICO}>`
    const $li = $(`
        <li>
          <div class="site">
            <div class="logo">${showLogo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
              <svg class="icon">
                <use xlink:href="#icon-close"></use>
              </svg>
            </div>
          </div>
        </li>
  `).insertBefore($lastLi)
    // 用JS操作 点击跳转
    $li.on('click', () => {
      // console.log(node.url);
      window.open(node.url, '_self')
    })
    // 阻止冒泡
    $li.on('click', '.close', (e) => {
      // console.log('阻止冒泡')
      e.stopPropagation()
      // console.log(hashMap);
      // console.log(index);
      hashMap.splice(index, 1)
      render()
    })
  })
}
render()

/* 事件处理 */
$('.addButton').on('click', () => {
  let url = window.prompt("请输入网址")
  /* 网址合法行判断 */
  if (url.indexOf("www.") !== 0 && url.indexOf("http") !== 0) {
    url = 'www.' + url
    console.log(url);
  }
  if (url.indexOf("http") !== 0) {
    url = 'https://' + url
    console.log(url);
  }
  // console.log(url)
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
    logoICO: (url + '/favicon.ico')
  })
  render()
})

// 获取焦点
window.onload = () => {
  // $('.searchInput').focus() <input autofocus>
  $('.searchForm').attr("action", "https://baidu.com/s")
}

// 退出网站 用户关闭网站前触发 存到 localStorage 里
window.onbeforeunload = () => {
  // console.log('页面要关闭了') // 可以开启 Preserve log 查看
  // // 将 对象变为 字符串
  const string = JSON.stringify(hashMap)
  // console.log(typeof hashMap)
  // console.log(hashMap)
  // console.log(typeof string)
  // console.log(string)
  localStorage.setItem('x', string)
}

// 监听键盘事件 点击跳转相应网站
$(document).on('keypress', (e) => {
  // console.log(e.keyCode)
  // console.log(e.key)
  /*
  const key = e.key
  变量名 和 属性名一样
  可以简写为
  const {key} = e
  解构赋值
  */
  const {
    key
  } = e;
  // console.log(key);
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      // console.log(hashMap[i].logo)
      // location.href = hashMap[i].url // 模拟用户在地址栏输入
      window.open(hashMap[i].url, '_blank')
    }
  }
})

// 搜索框 键盘事件 阻止冒泡
$('.searchForm').on('keypress', (e) => {
  e.stopPropagation()
});

window.onload = () => {
  $("body").addClass("bgp");
  console.log("min");
}