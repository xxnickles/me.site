import { evaluateTriggerAnimation, addOnLoadListener, calculateElementYPosition, addScrollListener, removeScrollListener } from "./skills-animation.utils";

const addAnimationToBar = (element: HTMLElement, targetWidth: string, delay: number) => {
    let innerSpan = element.querySelector('span');
    if ('animate' in element) {
        element.animate([
            { width: 0 },
            { width: `${targetWidth}%` }
        ], {
                duration: 700,
                delay: delay,
                fill: 'forwards',
                easing: 'ease-out',
            });
        if (innerSpan) {
            innerSpan.animate([
                { opacity: 0 },
                { opacity: 1 }
            ], {
                    duration: 700,
                    delay: delay,
                    fill: 'forwards',
                    easing: 'ease-out',
                });
        }

    } else {
        // fallback
        // @ts-ignore
        element.style.width = `${targetWidth}%`;
        // @ts-ignore
        innerSpan.style.opacity = '1';
    }

}

const processSkill = (element: HTMLElement, delay = 0) => {
    const skillPercentage = element.dataset.percent;
    if (skillPercentage) {
        const bar = element.querySelector('div.bar') as HTMLElement;
        addAnimationToBar(bar, skillPercentage, delay);
    }
}

function executeAnimation(element: HTMLElement) {
    nodesAsArray(element.querySelectorAll('li') as NodeListOf<HTMLElement>).forEach((element, index) => {
        processSkill(element, index * 100);
    });
}


function checkPositionsOnload(elements: NodeListOf<HTMLElement>) {
    return (event: Event) => {
        tryToAnimate(elements);
    }
}

function checkPositionsOnScroll() {
    return (event: UIEvent) => {
        const elements = getBarContainers();
        tryToAnimate(elements)
        if (elements.length === 0) removeScrollListener();
    }

}

function tryToAnimate(elements: NodeListOf<HTMLElement>) {

    nodesAsArray(elements).forEach((element) => {
        const shouldTriggerAnimation = evaluateTriggerAnimation(calculateElementYPosition(element));
        if (shouldTriggerAnimation) {
            executeAnimation(element);
            element.classList.remove('animate')
        }
    });
}

function getBarContainers() {
    return document.querySelectorAll('ul.timeline.animate') as NodeListOf<HTMLElement>;
}

function nodesAsArray(elements: NodeListOf<HTMLElement>): HTMLElement[] {
    return Array.prototype.slice.call(elements, 0);
}

export function initBarAnimation() {
    const barContainers = getBarContainers();
    addOnLoadListener(checkPositionsOnload(barContainers));
    addScrollListener(checkPositionsOnScroll());

}