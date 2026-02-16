// 1. Initialize the queue
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// 2. Setting the Default state
if (!localStorage.getItem('consentMode')) {
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'personalization_storage': 'denied',
        'wait_for_update': 500
    });
} else {
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
    gtag('consent', 'update', consentStatus);
    localStorage.setItem('consentMode', JSON.stringify(consentStatus));
    window.dataLayer.push({
        'event': 'consent_updated',
        'consent_status': status
    });
    document.getElementById('consent-banner').style.display = 'none';
}

// 4. Drawing the banner
window.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('consentMode')) {
        const banner = document.createElement('div');
        banner.id = 'consent-banner';
        banner.innerHTML = `
            <div style="
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: #ffffff;
                border-top: 1px solid #e8e8e8;
                box-shadow: 0 -4px 24px rgba(0,0,0,0.08);
                padding: 20px 48px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                z-index: 10000;
                font-family: 'Helvetica Neue', Arial, sans-serif;
                gap: 24px;
            ">
                <div style="font-size: 0.875rem; color: #666; line-height: 1.5; max-width: 600px;">
                    We use cookies to analyze traffic and optimize your experience on this learning website.
                </div>
                <div style="display: flex; gap: 12px; flex-shrink: 0;">
                    <button onclick="updateConsent(false)" style="
                        font-family: 'Helvetica Neue', Arial, sans-serif;
                        font-size: 0.875rem;
                        color: #888;
                        background: transparent;
                        border: 1.5px solid #e8e8e8;
                        padding: 10px 20px;
                        cursor: pointer;
                        border-radius: 4px;
                        transition: border-color 0.15s, color 0.15s;
                    "
                    onmouseover="this.style.borderColor='#111';this.style.color='#111'"
                    onmouseout="this.style.borderColor='#e8e8e8';this.style.color='#888'"
                    >Reject</button>
                    <button onclick="updateConsent(true)" style="
                        font-family: 'Helvetica Neue', Arial, sans-serif;
                        font-size: 0.875rem;
                        font-weight: 500;
                        color: #ffffff;
                        background: #111111;
                        border: none;
                        padding: 10px 20px;
                        cursor: pointer;
                        border-radius: 4px;
                    "
                    onmouseover="this.style.background='#333'"
                    onmouseout="this.style.background='#111'"
                    >Accept All</button>
                </div>
            </div>`;
        document.body.appendChild(banner);
    }
});
