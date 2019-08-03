// 检查元素不包含指定class
function notHaveClass($elem, className) {
  return !$elem.hasClass(className);
}

// 检查元素是否包含指定关键字
function hasKeyText(arr, key) {
  let flag = false
  arr.forEach((item) => {
    if (item.indexOf(key) >= 0) {
      flag = true
    }
  })
  return flag
}

function closeDanmuBtn(selector, notDisabledStatusClassFunc) {
  var $closeBtn = $(selector);
  count += 1;
  console.log("尝试查找弹幕关闭按钮。。。", $closeBtn);
  if ($closeBtn.length && notDisabledStatusClassFunc($closeBtn)) {
    $closeBtn.trigger("click");
    console.log("关闭弹幕成功");
  } else if (count < TRY_COUNT) {
    setTimeout(() => {
      closeDanmuBtn(selector, notDisabledStatusClassFunc);
    }, 500);
  }
}

var TRY_COUNT = 100;
var count = 0;
$(function() {

  if (window.location.host.indexOf('www.huya.com') !== -1) {
    console.log('huya')
    // 关闭虎牙弹幕
    closeDanmuBtn("#player-danmu-btn", function($elem) {
      if ($elem.hasClass("danmu-hide-btn")) {
        return false
      }
      return true
    });
  }
    
  if (window.location.host.indexOf('www.bilibili.com') !== -1) {
    console.log('bilibili')
    // 关闭B站弹幕
    closeDanmuBtn(".bilibili-player-video-danmaku-switch .bui-checkbox", function() {
      if (!$(".bilibili-player-video-danmaku-switch.bui.bui-switch .bui-checkbox").attr('checked')) {
        return false
      }
      return true
    });
  }

  if (window.location.host.indexOf('www.douyu.com') !== -1) {
    console.log('douyu')
    // 关闭斗鱼弹幕
    closeDanmuBtn('div[title="关闭弹幕"]', function() {
      if (!hasKeyText($('div[title="关闭弹幕"]').classList, 'removed')) {
        return false
      }
      return true
    });
  }

});
