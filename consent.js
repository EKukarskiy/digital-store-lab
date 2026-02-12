// 1. Устанавливаем состояние по умолчанию (Default)
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

if (!localStorage.getItem('consentMode')) {
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'personalization_storage': 'denied',
        'wait_for_update': 500
    });
} else {
    const savedConsent = JSON.parse(localStorage.getItem('consentMode'));
    gtag('consent', 'default', savedConsent);
}

// 2. Функция для обновления согласия
function updateConsent(isAccepted) {
    const consentStatus = {
        'ad_storage': isAccepted ? 'granted' : 'denied',
        'analytics_storage': isAccepted ? 'granted' : 'denied',
        'personalization_storage': isAccepted ? 'granted' : 'denied'
    };
    
    gtag('consent', 'update', consentStatus);
    localStorage.setItem('consentMode', JSON.stringify(consentStatus));
    
    // Скрываем баннер
    document.getElementById('consent-banner').style.display = 'none';
}

// 3. Отрисовка баннера (простой HTML внутри JS для удобства)
window.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('consentMode')) {
        const banner = document.createElement('div');
        banner.id = 'consent-banner';
        banner.innerHTML = `
            <div style="position: fixed; bottom: 20px; left: 20px; right: 20px; background: #fff; border: 1px solid #ccc; padding: 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 9999;">
                <p style="margin: 0; font-family: sans-serif;">We use cookies to improve your experience.</p>
                <div>
                    <button onclick="updateConsent(true)" style="padding: 8px 16px; background: #000; color: #fff; border: none; cursor: pointer; margin-right: 10px;">Accept</button>
                    <button onclick="updateConsent(false)" style="padding: 8px 16px; background: #eee; border: none; cursor: pointer;">Reject</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);
    }
});
