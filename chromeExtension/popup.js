$( document ).ready(function() {
  var isDeveloper = false;

  addInstalledMod(102323, "a title", "bob burgerson", 1000, "there once was a wee young mod, who was no more than a boy. but he dreamed of being a great big mod and hoped that the other mods would stop picking on him. So he practiced and practiced and eventually failed and gave up");
  addInstalledMod(102323, "another Title", "ME, YOUR GOD", 1);

  addAvailableMod(102323, "another Title", "ME, YOUR GOD", 1);


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



function renderInstalledMod(title, author, popularity, description){
  return '<div class="modListing"><div class="row"><div class="col-xs-8 listingTitleArea"><div class="listingTitle">' + title + '</div><div class="listingAuthor">By: ' + author + '</div><div class="listingPopularity">' + popularity + ' using</div></div><div class="col-xs-2 continueArrowHolder"><img class="continueArrow" src="rightArrow.svg"></div><div class="col-xs-2 removeIconHolder"><img class="removeIcon" src="xicon.png"></div></div><div class="listingDescription">' + description + '</div></div>'
}

function renderAvailableMod(title, author, popularity, description){
  return '<div class="modListing"><div class="row"><div class="col-xs-8 listingTitleArea"><div class="listingTitle">' + title + '</div><div class="listingAuthor">By: ' + author + '</div><div class="listingPopularity">' + popularity + ' using</div></div><div class="col-xs-2 continueArrowHolder"><img class="continueArrow" src="rightArrow.svg"></div><div class="col-xs-2 downloadContainer"><img class="downloadIcon" src="downloadIcon.png"></div></div><div class="listingDescription">' + description + '</div></div>'
}

function addInstalledMod(modId, title, author, popularity, description){
  $("#installedList").append(renderInstalledMod(title, author, popularity, description))
  $("#installedList").find(".modListing").last().data("modId", modId);
  if(description){
    $("#installedList").find(".modListing").last().click(function(){
      if($(event.target).hasClass("removeIcon")){
        console.log("delete");
      }else{
        if($(this).find(".continueArrow").attr("src") == "rightArrow.svg") {
          $(this).find(".listingDescription").slideDown();
          $(this).find(".continueArrow").attr("src", "downArrow.svg");
        }else{
          $(this).find(".listingDescription").slideUp();
          $(this).find(".continueArrow").attr("src", "rightArrow.svg");
        }
      }
    });
  }else{
    $("#installedList").find(".modListing").last().find(".continueArrow").hide();
  }

}

function addAvailableMod(modId, title, author, popularity, description){
  $("#availableList").append(renderAvailableMod(title, author, popularity, description))
  $("#availableList").find(".modListing").last().data("modId", modId);
  if(description){
    $("#availableList").find(".modListing").last().click(function(){
      if($(event.target).hasClass("removeIcon")){
        console.log("delete");
      }else{
        if($(this).find(".continueArrow").attr("src") == "rightArrow.svg") {
          $(this).find(".listingDescription").slideDown();
          $(this).find(".continueArrow").attr("src", "downArrow.svg");
        }else{
          $(this).find(".listingDescription").slideUp();
          $(this).find(".continueArrow").attr("src", "rightArrow.svg");
        }
      }
    });
  }else{
    $("#availableList").find(".modListing").last().find(".continueArrow").hide();
  }

}