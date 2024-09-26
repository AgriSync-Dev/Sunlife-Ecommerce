// An array to store the detected wallet providers.
let providers = [];

export const store = {
	value: () => providers,
	subscribe: (callback) => {
		function onAnnouncement(event) {
			if (providers.map((p) => p.info.uuid).includes(event.detail.info.uuid))
				return;
			providers = [...providers, event.detail];
			callback();
		}

		// Listen for eip6963:announceProvider and call onAnnouncement when the event is triggered.
		window.addEventListener("eip6963:announceProvider", onAnnouncement);

		// Dispatch the event, which triggers the event listener in the MetaMask wallet.
		window.dispatchEvent(new Event("eip6963:requestProvider"));

		// Return a function that removes the event listener.
		return () =>
			window.removeEventListener("eip6963:announceProvider", onAnnouncement);
	},
};
