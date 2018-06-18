import { evaluateTriggerAnimation, addOnLoadListener, calculateElementYPosition, addScrollListener, removeScrollListener } from "./skills-animation.utils";

const addAnimationToBar = (element: HTMLElement, targetWidth: string, delay: number) => {
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
    } else {
        // fallback
        element.style.width = `${targetWidth}%`;
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
    (element.querySelectorAll('li') as NodeListOf<HTMLElement>).forEach((element, index) => {
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
    elements.forEach((element) => {
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

export function initBarAnimation() {
    const barContainers = getBarContainers();
    addOnLoadListener(checkPositionsOnload(barContainers));
    addScrollListener(checkPositionsOnScroll());

}