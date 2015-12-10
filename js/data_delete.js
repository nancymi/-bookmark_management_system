function openDeleteDialog(obj) {
  if (confirm("确认要删除？")) {
    //alert($(obj).parent().parent().find(".bookmark_content").find(".title").text());
    var bookmark_title = getBookmarkTitle.call(obj);
    var bookmark = getBookmark(bookmark_title);
    deleteBookmark.call(bookmark);
  } else {}
}

function getBookmarkTitle() {
  var title = $(this).parent().parent().find(".bookmark_content").find(".title").text();
  if (title == null) {
    return "";
  } else {
    return title;
  }
}

function getBookmark(bookmark_title) {
  for (var i = 0; i < window.bookmarks.length; i ++) {
    if (bookmark_title == window.bookmarks[i].title) {
      return window.bookmarks[i];
    }
  }
  return null;
}

function deleteBookmark() {
  deleteBookmarkOnLocal.call(this);
  deleteBookmarkOnUI();
  //TODO deleteBookmarkOnRemote();
}

function deleteBookmarkOnLocal() {
  var position = $.inArray(this, window.bookmarks);
  if (position != -1) {
    window.bookmarks.splice(position, 1);
  } else {
    alert("未找到该元素");
  }
}

function deleteBookmarkOnUI() {
  initializeUI();
}