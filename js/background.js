let blackList = ['pornhub.com', 'bilibili.com', 'weibo.com']

const removeHistoryFromBlackList = (url) => {
  try {
    if (!url) return

    // 检查 URL 是否在黑名单中
    const blacklistedDomain = blackList.find((domain) => url.includes(domain))
    if (blacklistedDomain) {
      // 搜索该域名下的所有历史记录
      chrome.history.search({
        text: blacklistedDomain,
        startTime: 0,  // 从最早的记录开始
        maxResults: 1000  // 设置较大的数值以获取更多结果
      }, (historyItems) => {
        // 过滤出包含该域名的记录并删除
        historyItems.forEach((item) => {
          if (item.url.includes(blacklistedDomain)) {
            chrome.history.deleteUrl({ url: item.url })
            console.log(`已从历史记录中删除: ${item.url}`)
          }
        })
      })
    } else {
      console.log('不在黑名单中')
    }
  } catch (error) {
    console.error('删除历史记录时出错:', error)
  }
}

chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (tab) => {
    console.log('onActivated tab', tab)
    console.log('blackList', blackList)
    removeHistoryFromBlackList(tab.url);
  })
});

chrome.storage.sync.get(['blackList'], (result) => {
  blackList = result.blackList || []
})

chrome.storage.onChanged.addListener((changes) => {
  if (changes.blackList) {
    blackList = changes.blackList.newValue
  }
})