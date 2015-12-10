$(document).ready(function() {
  initialize();
  runDynamicEvent();
});

function initialize() {
  initializeData();
  initializeUI();
}

function initializeData() {
  downloadData();
}

function initializeUI() {
  initializePage.call(window.bookmarkHtmlList);
  initializePagnation();
}

function runDynamicEvent() {
  runSearchEvent();
  //TODO runDeleteEvent();
}

function runAddEvent() {
  openAddDialog();
}

