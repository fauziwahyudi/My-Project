window.addEventListener("DOMContentLoaded", () => {
    var MenuItems = document.getElementById("MenuItems");
    var toggleButton = document.getElementById("toggleButton");
  
    if (MenuItems && toggleButton) {
      MenuItems.style.maxHeight = "0px";
  
      toggleButton.addEventListener("click", function () {
        if (MenuItems.style.maxHeight === "0px") {
          MenuItems.style.maxHeight = "200px";
        } else {
          MenuItems.style.maxHeight = "0px";
        }
      });
    }
  });
  
  window.addEventListener("DOMContentLoaded", () => {
    var ProductImg = document.getElementById("ProductImg");
    var SmallImg = document.getElementsByClassName("small-img");
  
    for (let i = 0; i < SmallImg.length; i++) {
      SmallImg[i].addEventListener("click", function () {
        ProductImg.src = SmallImg[i].src;
      });
    }
  });
  