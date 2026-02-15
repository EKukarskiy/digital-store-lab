
// 1. Initialize the queue
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// 2. Setting the Default state
if (!localStorage.getItem('consentMode')) {
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'personalization_storage': 'denied',
        'wait_for_update': 500 // Wait 500ms for synchronization
    });
} else {
    // If the choice has already been made, we take it from memory
    gtag('consent', 'default', JSON.parse(localStorage.getItem('consentMode')));
}

// 3. Click processing function
function updateConsent(isAccepted) {
    const status = isAccepted ? 'granted' : 'denied';
    const consentStatus = {
        'ad_storage': status,
        'analytics_storage': status,
        'personalization_storage': status
    };

    // Update Consent Mode
    gtag('consent', 'update', consentStatus);

    // Save the selection
    localStorage.setItem('consentMode', JSON.stringify(consentStatus));

    // Push an event to the DataLayer for GTM triggers
    window.dataLayer.push({
        'event': 'consent_updated',
        'consent_status': status
    });

    // Hide the banner
    document.getElementById('consent-banner').style.display = 'none';
}

// 4. Drawing the banner
window.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('consentMode')) {
        const banner = document.createElement('div');
        banner.id = 'consent-banner';
        banner.innerHTML = `
            <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #1a1a1a; color: #fff; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; z-index: 10000; font-family: -apple-system, sans-serif; font-size: 14px; box-shadow: 0 -2px 10px rgba(0,0,0,0.3);">
                <div style="margin-right: 20px;">
                    We use cookies to analyze traffic and optimize your experience on this learning website.
                </div>
                <div style="display: flex; gap: 10px;">
                    <button onclick="updateConsent(true)" style="background: #4CAF50; color: white; border: none; padding: 8px 16px; cursor: pointer; border-radius: 4px; font-weight: bold;">Accept All</button>
                    <button onclick="updateConsent(false)" style="background: transparent; color: #ccc; border: 1px solid #444; padding: 8px 16px; cursor: pointer; border-radius: 4px;">Reject</button>
                </div>
            </div>`;
        document.body.appendChild(banner);
    }
});
