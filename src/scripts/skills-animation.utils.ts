export function calculateElementYPosition(element: HTMLElement) {
    return element.getBoundingClientRect().top
}


export function addScrollListener(fn: (event: UIEvent) => void) {
    window.addEventListener('scroll', fn)
}

export function addOnLoadListener(fn: (event: Event) => void) {
    window.addEventListener('load', fn)
}

export function removeScrollListener() {
    window.removeEventListener('scroll', () => { })
}

export function evaluateTriggerAnimation(elementY: number) {    
    return elementY > 0 && getWindowHeight() >= elementY;
}

function getWindowHeight() {
    return window.innerHeight;
}

