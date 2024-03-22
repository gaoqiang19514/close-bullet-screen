/**
 * 获取最新一条打卡文本内容
 * @returns {string}
 */
const getNewestPost = () => {
  const punchInPosts = $(
    ".vue-recycle-scroller__item-wrapper .vue-recycle-scroller__item-view"
  ).filter((_, item) => {
    const text = $(item).find(":first .wbpro-feed-ogText div").html();
    const arr = text.match(/[a-zA-Z]+|\d+/g);

    if (!arr) {
      return false;
    }

    const [key1, key1Value, br, key2] = arr;

    return key1 === "f" && br === "br" && key2 === "dw";
  });

  const [firstPunchInPost] = punchInPosts;
  const text = $(firstPunchInPost).find(":first .wbpro-feed-ogText div").html();
  const arr = text.match(/[a-zA-Z]+|\d+/g);
  const [key1, key1Value, _, key2, key2Value, key2Target] = arr;

  return `${key1} ${Number(key1Value) + 1}\n${key2} (${
    Number(key2Value) + 2
  }/${key2Target})`;
};

/**
 * 将文本插入textare中
 * @param {string} text
 */
const insertTextarea = (text) => {
  if (!text) {
    throw new Error("写入值不能为空");
  }

  const textarea = document.querySelector("textarea");
  const inputEvent = new Event("input", { bubbles: true });

  textarea.value = text;
  textarea.dispatchEvent(inputEvent);
};

$(function () {
  $(".woo-pop-wrap-main button").click(() => {
    insertTextarea(getNewestPost());
  });
});
