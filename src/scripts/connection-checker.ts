export const addOfflineChecking = (target: Element) => {

    if (target) {
        initialize(target);

        window.addEventListener('online', function (e) {
            setOnline(target);
        });
        window.addEventListener('offline', function (e) {
            setOffiline(target);
        });
    }
}

function initialize(connectionIndicatorElement: Element | null) {
    if (navigator.onLine) {
        setOnline(connectionIndicatorElement);
    } else {
        setOffiline(connectionIndicatorElement, 'Offline. Loaded from cache');
    }
}

function setOnline(
    connectionIndicatorElement: Element | null,
    message: string = 'Online') {
    setOnlineClass(connectionIndicatorElement);
    setConnectionIndicatorText(connectionIndicatorElement, message);
}

function setOffiline(
    connectionIndicatorElement: Element | null,
    message: string = 'You have gone offline') {
    setOfflineClass(connectionIndicatorElement);
    setConnectionIndicatorText(connectionIndicatorElement, message);

}

function setOnlineClass(element: Element | null) {
    if (element) {
        element.classList.add('online');
        element.classList.remove('offline');
        let icon = element.querySelector('i');
        if (icon) {
            icon.classList.add('icon-cloud');
            icon.classList.remove('icon-cloud-flash');
        }
    }
}

function setOfflineClass(element: Element | null) {
    if (element) {
        element.classList.add('offline');
        element.classList.remove('online');
        let icon = element.querySelector('i');
        if (icon) {
            icon.classList.add('icon-cloud-flash');
            icon.classList.remove('icon-cloud');
        }
    }
}

function setConnectionIndicatorText(element: Element | null, text: string) {
    if (element) {
        const textContainer = element.querySelector('span');
        // @ts-ignore
        textContainer.textContent = text;
    }
}