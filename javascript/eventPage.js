// Restore settings from chrome.storage.sync API
function restoreFromSync() {
	chrome.storage.sync.get(null, function (sync_object) {
        chrome.storage.local.set(sync_object, function() {
            console.log('Settings restored from sync.');
            window.location.reload();
        });
	});
}

// Sync settings to chrome.storage.sync API
function syncToStorage() {
chrome.storage.local.get(null, function(local_object) {
        chrome.storage.sync.set(local_object, function() {
            console.log('Settings synced to storage.');
        });
    });
}

// Listen for sync events and update from synchronized data
chrome.storage.local.get(['enable_sync'], function(result) {
    if (result.enable_sync === true) {
        chrome.storage.onChanged.addListener(function(changes, namespace) {
            if (namespace === 'sync') {
                console.log('Sync data changed. Restoring...');
                restoreFromSync();
            }
        });
    }
});
