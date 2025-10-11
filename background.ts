chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === 'time-tracker') {
    port.onDisconnect.addListener(function () {
      console.log('close extension');
    });
  }
});
