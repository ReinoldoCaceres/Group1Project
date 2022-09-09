const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach(tabContent => {tabContent.classList.remove('active')});
    target.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let myBtns = document.querySelectorAll(".tabs-title");
  myBtns.forEach(function (btn) {
    btn.addEventListener("click", () => {
      myBtns.forEach((b) => b.classList.remove("active-title"));
      btn.classList.add("active-title");
    });
  });
});

