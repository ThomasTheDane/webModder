$( document ).ready(function() {
  var isDeveloper = false;

  chrome.storage.sync.get('isDeveloper', function(data){
    isDeveloper = data.isDeveloper;
    console.log("read ", isDeveloper);

    if(isDeveloper) {
      $("#developerSection").show();
      $("#developerCheckbox").attr("src", "checkbox.png");
    }else{
      $("#developerSection").hide();
      $("#developerCheckbox").attr("src", "checkboxEmpty.png");
      isDeveloper = false;
    }

  });

  $("#developerCheck").click(function(){
    if(!isDeveloper) {
      $("#developerSection").slideDown();
      $("#developerCheckbox").attr("src", "checkbox.png");
      isDeveloper = true;
    }else{
      $("#developerSection").slideUp();
      $("#developerCheckbox").attr("src", "checkboxEmpty.png");
      isDeveloper = false;
    }
    chrome.storage.sync.set({'isDeveloper': isDeveloper}, function() {
      console.log(isDeveloper);
    });

  });
});