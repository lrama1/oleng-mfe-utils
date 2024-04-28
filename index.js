async function loadRemoteModule({ url, scope, module }) {
  // Create script tag and load remote entry file
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  // Initializes the shared scope. Fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__("default");
  const container = window[scope]; // or get the container somewhere else
  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  const factory = await window[scope].get(module);
  const Module = factory();

  // Invoke the mount function from the loaded module
  if (Module && Module.mount) {
    Module.mount();
  }

  if (Module && !Module.mount) {
    console.log("The module does not export a mount function");
  }

  return Module;
}

function getMyVersion() {
  return "1.0.1";
}

module.exports = { loadRemoteModule, getMyVersion };
