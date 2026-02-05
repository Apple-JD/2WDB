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
// ============================
// STORAGE ADAPTERS
// ============================

// Default: localStorage adapter
const LocalStorageAdapter = {
  load() {
    return JSON.parse(localStorage.getItem("APP_STATE")) || {};
  },
  save(state) {
    localStorage.setItem("APP_STATE", JSON.stringify(state));
  }
};

// Optional: API adapter (client can configure)
const ApiAdapter = {
  async load() {
    const res = await fetch(window.APP_CONFIG?.STATE_API || "/api/state");
    return res.ok ? await res.json() : {};
  },
  async save(state) {
    await fetch(window.APP_CONFIG?.STATE_API || "/api/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    });
  }
};

// Choose adapter (default = localStorage)
const StorageAdapter =
  window.APP_CONFIG?.storage === "api"
    ? ApiAdapter
    : LocalStorageAdapter;

// ============================
// PERSISTENT APP STATE STORE
// ============================
const Store = (() => {
  const STORAGE_KEY = "APP_STATE";
  const savedState = StorageAdapter.load() || {};

  const state = { ...savedState };

  const proxy = new Proxy(state, {
    set(target, key, value) {
      target[key] = value;

      // persist
      StorageAdapter.save(target);

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


  async function fetchAndAppendUsers(defaultUrl = '/api/users', root = document) {
    const lists = Array.from(root.querySelectorAll('[data-users-list]'));
    if (!lists.length) return;

    for (const list of lists) {
      const url = list.getAttribute('data-users-source') || defaultUrl;
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const users = Array.isArray(data)
          ? data
          : Array.isArray(data.users)
            ? data.users
            : [];

        list.innerHTML = '';
        (users || []).forEach(u => {
          const li = document.createElement('li');
          li.textContent = u.name || u.username || u.email || JSON.stringify(u);
          list.appendChild(li);
        });
      } catch (err) {
        list.innerHTML = '<li>Unable to load users</li>';
      }
    }
  }

  function init(root = document) {
    bindInputs(root);

    if (root.querySelector('[data-users-list]')) {
      fetchAndAppendUsers(undefined, root);
    } else {

      const savedState = StorageAdapter.load() || {};

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
