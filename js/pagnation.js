var page_number;  

var pre_page = '<button class="button button-large button-plain button-border button-circle" id="page-pre"><-</i></button>';

var next_page = '<button class="button button-large button-plain button-border button-circle" id="page-next">-></i></button>';

var per_page;

var PAGE_SIZE = 10;

// var pagnation = $("#pagnation");
//   $(document).on("keydown",function(event){
//     switch(event.keyCode){
//        case 37 : window.location.href = pagnation.find(".page-prev").attr("href");break;
//        case 39 : window.location.href = pagnation.find(".page-next").attr("href");break
//     }
//   });

function runPagnation() {
  var page_sum = Math.ceil(window.bookmarkOnFilterSum / PAGE_SIZE);
  if (page_sum == 1) {
    $("#pagnation").html("");
  } else {
    var pagnationHTML = "";
    pagnationHTML += pre_page;
    for (page_number = 1; page_number <= page_sum; page_number ++) {
      pagnationHTML += 
        ('<button class="button button-large button-plain button-border button-circle" id="page_' 
          + page_number + '">' + page_number + '</i></button>');
    }
    pagnationHTML += next_page;
    $("#pagnation").html(pagnationHTML);
  }
}

function updatePage(bookmarkContent) {

}