const operationSuggestion = document.getElementById("operation-suggestion");
const computerScreen = document.getElementById("computer-screen");
let roll = {
  status: "",
  level: 0, // 2 is Maximum
  isRollDown: false,
};

// Mouse event
document.addEventListener("mousemove", (event) => {
  updateMousePosition(event.clientX, event.clientY);
});

// Mouse in screen
document.addEventListener("mouseenter", (event) => {
  updateMousePosition(event.clientX, event.clientY);
  operationSuggestion.style.display = "block";
  setTimeout(() => {
    operationSuggestion.style.animation =
      "show-operation-suggestion 0.5s ease-out forwards";
  }, 2000);
});

// Mouse out screen
document.addEventListener("mouseleave", () => {
  operationSuggestion.style.opacity = 0;
  operationSuggestion.style.display = "none";
});
function updateMousePosition(x, y) {
  operationSuggestion.style.transform = `translate(${x + 10}px, ${y + 10}px)`;
}

// Scroll event
document.addEventListener("wheel", function (event) {
  // DeltaY > 0 is roll down
  if (event.deltaY > 0 && roll.level < 2) {
    roll.level += 1;
    roll.isRollDown = true;
  }

  // DeltaY < 0 is roll up
  if (event.deltaY < 0 && roll.level > 0) {
    roll.level -= 1;
    roll.isRollDown = false;
  }

  // Roll down to open
  if (roll.isRollDown) {
    if (roll.level == 1) {
      computerScreen.style.animation =
        "move-transform 0.2s ease-out forwards, move-center 0.3s ease-out forwards";
      roll.status = "";
    }
    if (roll.level == 2) {
      if (roll.status == "") {
        computerScreen.style.animation =
          "move-full-screen 0.2s ease-out forwards";
        roll.status = "openFull";
      }
    }
  } else {
    if (roll.level == 0) {
      if (roll.status == "") {
        computerScreen.style.animation =
          "move-center-back 0.3s ease-out forwards";
        setTimeout(() => {
          computerScreen.style.animation =
            "move-transform-back 0.2s ease-out forwards";
        }, 300);
        roll.status = "closeFull";
      }
    }
    if (roll.level == 1) {
      computerScreen.style.animation =
        "move-full-screen-back 0.2s ease-out forwards";
      roll.status = "";
    }
  }
});

// Think animate
function triggerThink() {
  const bubble = document.getElementById("think");
  bubble.style.animation = "none";
  bubble.offsetHeight;
  bubble.style.animation = "think-animate 5s ease-out";
  setTimeout(() => {
    bubble.style.opacity = "1";
  }, 10);
  setTimeout(triggerThink, 7000);
}
triggerThink();
