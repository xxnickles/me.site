import '../styles/styles.scss';

const createLabel = (skillpercentage: number) => {
    const spanElement = document.createElement('span');
    spanElement.classList.add('label');
    spanElement.textContent = `${skillpercentage}%`;
    spanElement.hidden = true;
    return spanElement;
}


const processSkill = (element: HTMLElement) => {
    const skillPercentage = element.dataset.percent;
    if (skillPercentage) {

        const barWrapper = element.querySelector('div.bar-wrapper') as HTMLElement;
        const skillBar = element.querySelector('div.skill-bar') as HTMLElement;
        let label = createLabel(parseInt(skillPercentage));
        skillBar.appendChild(label);
        element.addEventListener('mouseenter', () => {
            label.hidden = false;
        });

        element.addEventListener('mouseleave', () => {
            label.hidden = true;
        });

        const bar = element.querySelector('div.bar') as HTMLElement;
        bar.style.width = `${skillPercentage}%`;
    }

}


const listItems = (document.querySelectorAll('#dev-skills li') as NodeListOf<HTMLElement>).forEach((element) => {
    processSkill(element);
});


