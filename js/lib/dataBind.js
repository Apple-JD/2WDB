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
