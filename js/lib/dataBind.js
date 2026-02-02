// ============================
// GLOBAL REACTIVE STATE
// ============================
window.state = new Proxy({}, {
  set(target, key, value) {
    target[key] = value;

    document
      .querySelectorAll(`[data-bind="${key}"]`)
      .forEach(el => {
        if (
          el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.tagName === "SELECT"
        ) {
          el.value = value;
        } else {
          el.textContent = value;
        }
      });

    return true;
  }
});

// ============================
// BIND INITIALIZER FUNCTION
// ============================
window.initTwoWayBinding = function (scope = document) {
  scope.querySelectorAll("[data-bind]").forEach(el => {

    // prevent duplicate listeners
    if (el.__bound) return;
    el.__bound = true;

    const key = el.dataset.bind;

    // UI → STATE
    el.addEventListener("input", e => {
      state[key] = e.target.value;
    });

    // STATE → UI (initial sync)
    if (state[key] !== undefined) {
      if (
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.tagName === "SELECT"
      ) {
        el.value = state[key];
      } else {
        el.textContent = state[key];
      }
    }
  });
};


const Store = (() => {
  const STORAGE_KEY = "APP_STATE";
  const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  const state = { ...savedState };

  const proxy = new Proxy(state, {
    set(target, key, value) {
      target[key] = value;

      // persist
      localStorage.setItem(STORAGE_KEY, JSON.stringify(target));

      // update views
      document.querySelectorAll(`[data-bind="${key}"]`).forEach((el) => {
        el.textContent = value;
      });

      document.querySelectorAll(`[data-model="${key}"]`).forEach((el) => {
        if (el.value !== value) el.value = value;
      });

      return true;
    }
  });

  function bindInputs(root = document) {
    root.querySelectorAll("[data-model]").forEach((input) => {
      const key = input.getAttribute("data-model");

      if (input.__bound) return;
      input.__bound = true;

      input.addEventListener("input", (e) => {
        proxy[key] = e.target.value;
      });
    });
  }

  function hydrateView() {
    Object.keys(state).forEach((key) => {
      proxy[key] = state[key]; // force UI sync
    });
  }

  function init(root = document) {
    bindInputs(root);
    hydrateView();
  }

  return { state: proxy, init };
})();
document.addEventListener("DOMContentLoaded", () => {
  Store.init();
  if (!Store.state.username) {
    Store.state.username = "Guest";
  }
});
window.addEventListener("DOMContentLoaded", () => {
  initTwoWayBinding();
});