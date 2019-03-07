console.log("hi from module");
export const NICE = 42;
const webshopInputFixturesProducts = {};
console.assert(!!document.querySelector('.grave-swagger'));
Array.from(document.querySelectorAll('.next-button'))
    .forEach((el) => el.addEventListener('click', evt => (console.log("OK") !== undefined) || evt.stopPropagation()));
Array.from(document.querySelectorAll('.grave-swagger'))
    .forEach((el) => {
    function updateView() {
        collect(el);
    }
    el.addEventListener('mouseup', evt => updateView());
    el.addEventListener('keyup', evt => updateView());
    Array.from(el.querySelectorAll('select'))
        .forEach((el) => el.addEventListener('change', evt => updateView()));
});
function collect(node) {
    Array.from(node.querySelectorAll('input'))
        .forEach((el) => console.log(`${el.name}: ${el.value}`));
}
