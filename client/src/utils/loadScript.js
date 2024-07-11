const loadScript = (src) =>
  new Promise((resolve) => {
    const allScripts = document.getElementsByTagName("script");

    for (const script of allScripts) {
      if (script.src === src) {
        return resolve(true);
      }
    }

    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      console.log("razorpay loaded successfully");
      resolve(true);
    };

    script.onerror = () => {
      console.log("error in loading razorpay");
      resolve(false);
    };

    document.body.appendChild(script);
  });

export { loadScript };
