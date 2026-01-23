/**
* SPA Library
* Version 2.0.0
* Author Enminvithaigal
* Last Updated Jun 14, 2024
* Last updated Jan 28, 2025
*/

window.addEventListener("load", initiateState);

// =====================
// INIT
// =====================
function initiateState() {
  const hash = window.location.hash;
  const path = hash === "" ? "/" : hash.replace("#", "");

  const stateObj = { page: path };
  window.history.replaceState(stateObj, "Index", "#" + path);
  loadState(stateObj);
}

// =====================
// ROUTE LOADER
// =====================
function loadState(state) {
  const $body = $("#body");
  const page = state.page;

  sessionStorage.setItem("page", page);

  if (!routes[page]) {
    throw Error("Template not registered in route");
  }

  $body.css({
    transition: "all 500ms ease-in-out",
    opacity: 0,
    transform: "translateX(-15px)",
  });

  setTimeout(() => {
    $body.load(routes[page], function (response, status) {
      if (status === "error") {
        throw Error("Error on loading template...", routes[page]);
      }

      $body.css({
        opacity: 1,
        transform: "translateX(0)",
      });

      // 🔥 Single dispatch
      document.dispatchEvent(new Event("contentLoaded"));

      initializeScrollLogic();
    });
  }, 500);
}

// =====================
// TWO-WAY BIND HOOK
// =====================
document.addEventListener("contentLoaded", function () {
  if (window.initTwoWayBinding) {
    initTwoWayBinding(document.getElementById("body"));
  }

  // Navbar visibility
  const currentPath = sessionStorage.getItem("page") || "/";
  const navBar = document.getElementById("navBar");

  if (navBar) {
    navBar.style.display = publicRoutes.includes(currentPath.toLowerCase())
      ? "none"
      : "block";
  }
});

// =====================
// LINK INTERCEPT
// =====================
$(document).on("click", "a", function (e) {
  const target = $(this).attr("target");
  const href = $(this).attr("href");

  if (target === "_blank" || href === "#" || !href) return;

  e.preventDefault();
  routing(href);
});

// =====================
// ROUTING
// =====================
function routing(path) {
  const stateObj = { page: path };
  window.history.replaceState(stateObj, path, "#" + path);
  window.dispatchEvent(new PopStateEvent("popstate", { state: stateObj }));
}

window.addEventListener("popstate", function (event) {
  if (event.state) {
    loadState(event.state);
  }
});

// =====================
// CONFIG
// =====================
const publicRoutes = ["/", "/login"];
