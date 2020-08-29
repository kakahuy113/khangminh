const rangeProduct = () => {
    const min = Number($(".priceLow span").text());
    const max = Number($(".priceHigh span").text());
    var startSlider = document.getElementById('rangeProduct');
    noUiSlider.create(startSlider, {
        start: [min, max],
        range: {
            'min': [min],
            'max': [max]
        },
        step: 1000,
    });
    var skipValues = [
        document.querySelector('.priceLow span'),
        document.querySelector('.priceHigh span')
    ];

    startSlider.noUiSlider.on('update', function(values, handle) {
        skipValues[handle].innerHTML = values[handle];
    });
}
const orderPrice = () => {
    const listPrice = document.querySelectorAll(".proItem__price");
    const btn = document.querySelector("#filter");
    if (btn) {
        $(".proFilter__item.submit").click(function(e) {
            e.preventDefault();
            const sort = $(".proFilter__item.price select").val();
            const min = Number($("#low").text());
            const max = Number($("#high").text());

            listPrice.forEach(element => {
                const price = Number($(element).children("h4").eq(1).text());
                if (sort == 1) {
                    const data = getPriceMinMax();
                    const priceSort = data.sort;
                    for (let i = 0; i < priceSort.length; i++) {
                        if (priceSort[i] == price) {
                            $(element).parent().parent().css("order", i + 1);
                        }
                    }
                } else {
                    const dataDown = getSortDown();
                    const priceDown = dataDown.sort;
                    for (let i = 0; i < priceDown.length; i++) {
                        if (priceDown[i] == price) {
                            $(element).parent().parent().css("order", i + 1);
                        }
                    }
                }
                if (price <= max && price >= min) {
                    $(element).parent().parent().removeClass("d-none");
                } else {
                    $(element).parent().parent().addClass("d-none");
                }
            });

        });
    }
}

const getPriceMinMax = () => {
    var obj = [];
    const listPrice = document.querySelectorAll(".proItem__price");
    listPrice.forEach(element => {
        const price = Number($(element).children("h4").eq(1).text());
        obj.push(price);
    })
    const max = Math.max(...obj);
    const min = Math.min(...obj);

    function compareNumbers(a, b) {
        return a - b;
    }
    const sortUp = obj.sort(compareNumbers);
    return { "min": min, 'max': max, "sort": sortUp };
}

const getSortDown = () => {
    var obj = [];
    const listPrice = document.querySelectorAll(".proItem__price");
    listPrice.forEach(element => {
        const price = Number($(element).children("h4").eq(1).text());
        obj.push(price);
    })

    function compareNumbers(a, b) {
        return b - a;
    }
    const sortDown = obj.sort(compareNumbers);
    return { "sort": sortDown };
}

const showSale = () => {
    const listPrice = document.querySelectorAll(".proItem__price");
    listPrice.forEach(element => {
        const price = Number($(element).children("h4").eq(1).text());
        const sale = Number($(element).children("h4").eq(1).attr("data-sale"));
        if (sale > 0) {
            $(element).children("h4").eq(1).text(sale);
            $(element).children("h4").eq(0).text(price);
        } else {
            $(element).children("h4").eq(1).text(price);
            $(element).children("h4").eq(0).addClass("d-none");
            $(element).children("span").eq(0).addClass("d-none");
            $(element).addClass("noSale");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    rangeProduct();
    orderPrice();
    showSale();
});