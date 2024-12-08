# oleng-mfe-utils

A utility which facilitates loading of Microfrontends during runtime.

# Usage for a React Host Application

```
import React, { useState, useEffect, Suspense } from "react";
import ReactDOM from "react-dom";
import { loadRemoteModule } from "oleng-mfe-utils";

function App() {
  const [RemoteComponent, setRemoteComponent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRemoteModule({
      url: "http://localhost:9002/remoteEntry.js",
      scope: "microfrontend",
      module: "./Microfrontend",
    })
      .then((module) => {
        setRemoteComponent(() => module.default);
      })
      .catch((err) => {
        console.error("Error loading remote module:", err);
        setError(err);
      });
  }, []);

  return (
    <div>
      <h1>Container</h1>
      {error ? (
        <div>Error loading remote component: {error.message}</div>
      ) : RemoteComponent ? (
        <Suspense fallback={<div>Loading...</div>}>
          <RemoteComponent />
        </Suspense>
      ) : (
        <div>Loading Remote Component...</div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

```

# Usage for a Plain Javascript Host Application

**_TBD_**
