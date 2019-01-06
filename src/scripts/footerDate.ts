export function setFooterDate(selector: string) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = `2018 - ${new Date().getFullYear()}`;
    }
}