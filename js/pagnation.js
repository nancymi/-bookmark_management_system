var PRE_PAGE = '<button type="button" onclick="updatePageByButton(this.id)" class="button button-large button-plain button-border button-circle" id="page-pre"><-</i></button>';

var NEXT_PAGE = '<button type="button" onclick="updatePageByButton(this.id)" class="button button-large button-plain button-border button-circle" id="page-next">-></i></button>';

var PAGE_SIZE = 10;

var currentPage = 1;

function initializePagnation() {
  loadPagnation(window.bookmarks.length);
}

function updatePagnation() {
  loadPagnation(window.bookmarkOnFilters.length);
}

function loadPagnation(bookmarkSum) {
  var page_sum = Math.ceil(bookmarkSum / PAGE_SIZE);
  if (page_sum == 1) {
    clearPagnation();
  } else {
    var pageHTML = getPagnationHTML(page_sum);
    setPagnation(pageHTML);
  }
}

function clearPagnation() {
  $("#pagnation").html("");
}

function setPagnation(content) {
  $("#pagnation").html(content);
}

function getPagnationHTML(page_sum) {
  var pagnationHTML = "";
  pagnationHTML += PRE_PAGE;
  for (var page_number = 1; page_number <= page_sum; page_number ++) {
    pagnationHTML += 
      ('<button type="button" onclick="updatePageByButton(this.id)" class="button button-large button-plain button-border button-circle" id="'
       + page_number + '">' + page_number + '</i></button>');
  }
  pagnationHTML += NEXT_PAGE;
  return pagnationHTML;
}



function initializePage() {
  loadPage.call(this, 1);
}

function updatePageByFilter() {
  loadPage.call(this, 1);
}

function updatePageByButton(page_id) {
  if (isOnFilter()) {
    loadPage.call(window.bookmarkOnFilterHtmlList, page_id);
  } else {
    loadPage.call(window.bookmarkHtmlList, page_id);
  }
}

function isOnFilter() {
  if (window.inputKeyword == null) {
    return false;
  } else if (window.inputKeyword == "") {
    return false;
  } else {
    return true;
  }
}

function loadPage(page_id) {
  var current_page = getCurrentPage(page_id);
  //alert(current_page);
  window.currentPage = current_page;
  var start = (window.currentPage-1) * PAGE_SIZE;
  var end = start + PAGE_SIZE;
  var pageHTML = this.slice(start, end);
  setPageContent.call(pageHTML);
}

function getCurrentPage(page_id) {
  if (page_id == null) {
    return 1;
  }
    switch(page_id) {
      case 'page-pre': {
        if (window.currentPage == 1)
          return window.currentPage;
        else 
          return window.currentPage-1;
        break;
      }
      case 'page-next': {
        if (isOnFilter()) {
          return window.currentPage == window.bookmarkOnFilterHtmlList.length ? 
            window.currentPage : window.currentPage+1;
        } else {
          return window.currentPage == window.bookmarkHtmlList.length ? 
            window.currentPage : window.currentPage+1;
        }
          return window.currentPage+1;
        break;
      }
      default: {
        return parseInt(page_id);
      }
    }
}

function setPageContent() {
  if (this instanceof Array) {
    $("#content").html(this.join(""));
  } else {
    $("#content").html(this.value());
  }
}