# oleng-mfe-utils

A utility which facilitates loading of Microfrontends during runtime.

# Usage for a React Host Application

```
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { loadRemoteModule } from "./utils/mfeUtils";

const ErrorMessage = () => <div>Failed to load remote module</div>;

const App = () => {
  const [RemoteModule, setRemoteModule] = useState(null);
  const [hasError, setHasError] = useState(false);

  async function init() {
    try {
      const remoteModule = await loadRemoteModule({
        url: "http://localhost:8081/remoteEntry.js",
        scope: "microfrontend",
        module: "./Microfrontend",
      });
      setRemoteModule(() => remoteModule);
    } catch (error) {
      console.error("Failed to load remote module", error);
      setHasError(true);
    }
  }

  // Load the remote module when the component mounts
  React.useEffect(() => {
    init();
  }, []);

  if (hasError) {
    return <ErrorMessage />;
  }

  const MFE1 = RemoteModule ? RemoteModule.default : null;

  return (
    <div>
      <h1>Hello, React App (host app)</h1>
      <div>{MFE1 ? <MFE1 /> : "Loading remote module..."}</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

```

# Usage for a Plain Javascript Host Application

**_TBD_**
