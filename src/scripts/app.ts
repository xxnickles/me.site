import '../styles/styles.scss';

const createLabel = (skillpercentage: number) => {
    const spanElement = document.createElement('span');
    spanElement.classList.add('label');
    spanElement.textContent = `${skillpercentage}%`;
    spanElement.hidden = true;
    return spanElement;
}

const addAnimationToBar = (element: HTMLElement, targetWidth: string, delay: number) => {
    if ('animate' in element) {
        var animation = element.animate([
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

        const barWrapper = element.querySelector('div.bar-wrapper') as HTMLElement;
        const skillBar = element.querySelector('div.skill-bar') as HTMLElement;
        let label = createLabel(parseInt(skillPercentage));


        const bar = element.querySelector('div.bar') as HTMLElement;
        addAnimationToBar(bar, skillPercentage, delay);
    }
}


const listItems = (document.querySelectorAll('#dev-skills li') as NodeListOf<HTMLElement>).forEach((element, index) => {
    processSkill(element, index * 200);
});


