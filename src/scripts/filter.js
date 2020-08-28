const rangeProduct = () => {
    var startSlider = document.getElementById('rangeProduct');

    noUiSlider.create(startSlider, {
        start: [20, 80],
        range: {
            'min': [0],
            'max': [100]
        }
    });
}
const orderPrice = () => {
    const btn = document.querySelector("#filter");
    if (btn) {
        btn.addEventListener("click", function() {
            alert(1)
        })
    }
}
document.addEventListener("DOMContentLoaded", () => {
    rangeProduct();
});