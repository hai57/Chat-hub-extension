import { saveTabRole, getTabRoles } from '../shared/storage';

console.log('[AI Chat Hub] Background Service Worker initialized.');

// Configure side panel behavior to open on action icon click
if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error('Error setting side panel behavior:', error));
}

// Handle runtime messages
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'SET_TAB_ROLE') {
    const { tabId, role } = message;
    saveTabRole(tabId, role).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }

  if (message.type === 'GET_TAB_ROLES') {
    getTabRoles().then((roles) => {
      sendResponse({ success: true, data: roles });
    });
    return true;
  }
});
