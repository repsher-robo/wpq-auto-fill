// When the user clicks on the extension do stuff
chrome.action.onClicked.addListener(async (tab) => {

	// on click insert our wpq-auto-fill JS file:
	await chrome.scripting.executeScript({
		files: ["wpq-auto-fill.js"],
		world: 'MAIN',
		target: { tabId: tab.id }
	});

});
