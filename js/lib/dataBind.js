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

  // Fetch a list of users from `url` and append to any element with
  // `data-users-list`. Each list element may set `data-users-source` to
  // override the URL. This runs silently if the endpoint is unavailable.
  async function fetchAndAppendUsers(defaultUrl = '/api/users', root = document) {
    const lists = Array.from(root.querySelectorAll('[data-users-list]'));
    if (!lists.length) return;

    for (const list of lists) {
      const url = list.getAttribute('data-users-source') || defaultUrl;
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const users = await res.json();
        list.innerHTML = '';
        (users || []).forEach(u => {
          const li = document.createElement('li');
          li.textContent = u.name || u.username || u.email || JSON.stringify(u);
          list.appendChild(li);
        });
      } catch (err) {
        // don't break the app; log and leave the list empty
        // console.warn('fetchAndAppendUsers failed for', url, err);
        list.innerHTML = '<li>Unable to load users</li>';
      }
    }
  }

  function init(root = document) {
    bindInputs(root);

    // If a users list placeholder exists, prefer fetching users rather
    // than restoring the input values from localStorage for that
    // section. Each list can specify a source with `data-users-source`.
    if (root.querySelector('[data-users-list]')) {
      fetchAndAppendUsers(undefined, root);
    } else {
      // Restore input values from localStorage
      const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      Object.keys(savedState).forEach(key => {
        const input = root.querySelector(`[data-model="${key}"]`);
        if (input) input.value = savedState[key];
      });
    }

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
