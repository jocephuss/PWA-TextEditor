const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  window.deferredPrompt = event; // Store the event for later use
  butInstall.classList.remove("hidden"); // Show the install button
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  // If the user dismissed the prompt, return
  if (!promptEvent) {
    return;
  }

  // Show the install prompt to the user and log the result
  promptEvent.prompt();
  // Log the user's choice to the console for debugging purposes
  const result = await promptEvent.userChoice;
  // If the user accepted the installation, add the PWA to the home screen
  if (result.outcome === "accepted") {
    console.log("PWA installed successfully!");
  } else {
    console.log("Installation was dismissed by the user.");
  }

  // Hide the prompt if the user dismisses it
  window.deferredPrompt = null;

  //Hide the install button after the user makes a choice
  butInstall.classList.add("hidden");
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("The PWA has been installed successfully!");
  window.deferredPrompt = event; // Clear the deferred prompt reference
  window.deferredPrompt = null; // Clear the deferred prompt reference
});
