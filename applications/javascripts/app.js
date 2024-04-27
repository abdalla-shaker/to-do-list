const addButton = document.querySelector("#add-button");
const userInput = document.querySelector("#user-input");
const inProgress = document.querySelector("#in-progress");
const finished = document.querySelector("#finished");

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const dangerBtns = Array.from(node.querySelectorAll(".danger"));
          const successBtns = Array.from(node.querySelectorAll(".success"));
          dangerBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
              btn.parentElement.parentElement.classList.add(
                "going-out-to-left"
              );
              setTimeout(() => {
                btn.parentElement.parentElement.remove();
              }, 400);
            });
          });

          successBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
              const success = btn.parentElement.parentElement;
              finished.appendChild(success);
            });
          });
        }
      });
    }
  });
});

observer.observe(inProgress, { childList: true, subtree: true });

const appendCard = () => {
  if (!userInput.value) {
    return;
  }

  const card = document.createElement("div");
  const theToDoItem = document.createElement("p");
  const buttonGroup = document.createElement("div");
  const dangerBtn = document.createElement("button");
  const successBtn = document.createElement("button");

  card.classList.add("card");
  theToDoItem.classList.add("The-to-do-item");
  theToDoItem.innerText = userInput.value;
  buttonGroup.classList.add("button-group");
  dangerBtn.classList.add("btn", "danger");
  dangerBtn.innerText = "Give up";
  successBtn.classList.add("btn", "success");
  successBtn.innerText = "Finish";
  buttonGroup.append(dangerBtn, successBtn);
  card.append(theToDoItem, buttonGroup);
  inProgress.appendChild(card);
};

addButton.addEventListener("click", () => {
  appendCard();
});
