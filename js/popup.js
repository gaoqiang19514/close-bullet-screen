const renderBlacklist = () => {
  const container = document.getElementById('blacklist')
  container.innerHTML = ''

  chrome.storage.sync.get(['blackList'], (result) => {
    const blackList = result.blackList || []
    blackList.forEach((domain) => {
      const item = document.createElement('div')
      item.className = 'blacklist-item'
      item.innerHTML = `
        <span>${domain}</span>
        <button data-domain="${domain}">删除</button>
      `
      container.appendChild(item)
    })
  })
}

const addDomain = (domain) => {
  chrome.storage.sync.get(['blackList'], (result) => {
    const blackList = result.blackList || []
    if (!blackList.includes(domain)) {
      blackList.push(domain)
      chrome.storage.sync.set({ blackList }, () => {
        renderBlacklist()
      })
    }
  })
}

const removeDomain = (domain) => {
  chrome.storage.sync.get(['blackList'], (result) => {
    const blackList = result.blackList || []
    const newList = blackList.filter(d => d !== domain)
    chrome.storage.sync.set({ blackList: newList }, () => {
      renderBlacklist()
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  renderBlacklist()

  document.getElementById('addDomain').addEventListener('click', () => {
    const input = document.getElementById('newDomain')
    const domain = input.value.trim()
    if (domain) {
      addDomain(domain)
      input.value = ''
    }
  })

  document.getElementById('blacklist').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const domain = e.target.dataset.domain
      removeDomain(domain)
    }
  })
})