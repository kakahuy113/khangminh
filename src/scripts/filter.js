const rangeProduct = () => {
    const min = Number($("#low").text());
    const max = Number($("#high").text());
    var startSlider = document.getElementById('rangeProduct');
    if (startSlider) {
        noUiSlider.create(startSlider, {
            start: [min, max],
            range: {
                'min': [min],
                'max': [max]
            },
            step: 1000,
            format: wNumb({
                decimals: 3,
                thousand: '.',
                suffix: ' vnđ'
            })
        });
        var skipValues = [
            document.querySelector('span.priceLow__range'),
            document.querySelector('span.priceHigh__range')
        ];

        startSlider.noUiSlider.on('update', function(values, handle) {
            skipValues[handle].innerHTML = values[handle];
        });
        const ftMin = formatMoney(Number($("#low").text()));
        const ftMax = formatMoney(Number($("#high").text()));
        $("#low").text(ftMin + " vnđ")
        $("#high").text(ftMax + " vnđ")
    }
}

function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 0 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "." : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

const orderPrice = () => {
    const listPrice = document.querySelectorAll(".proItem__price");
    const btn = document.querySelector("#filter");
    if (btn) {
        $(".proFilter__item.submit").click(function(e) {
            e.preventDefault();
            const curRange = $(".proFilter__item.range label").attr("data-current");
            const sort = $(".proFilter__item.price select").val();
            const strMin = $(".priceLow__range").text();
            const strMax = $(".priceHigh__range").text();
            const min = Number(strMin.replace(".", "").replace(" " + curRange, ""));
            const max = Number(strMax.replace(".", "").replace(" " + curRange, ""));
            listPrice.forEach(element => {
                const current = $(element).children("h4").eq(1).attr("data-txt");
                const strPrice = $(element).children("h4").eq(1).text();
                const deleteCurrent = strPrice.replace(" " + current, "");
                const price = Number(deleteCurrent.replace(".", ""));
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
        const current = $(element).children("h4").eq(1).attr("data-txt");
        const strPrice = $(element).children("h4").eq(1).text();
        const deleteCurrent = strPrice.replace(" " + current, "");
        const price = Number(deleteCurrent.replace(".", ""));
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
        const current = $(element).children("h4").eq(1).attr("data-txt");
        const strPrice = $(element).children("h4").eq(1).text();
        const deleteCurrent = strPrice.replace(" " + current, "");
        const price = Number(deleteCurrent.replace(".", ""));
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
        const current = $(element).children("h4").eq(1).attr("data-txt");
        const nicePrice = formatMoney(price);
        const salePrice = formatMoney(sale);
        if (sale > 0) {
            $(element).children("h4").eq(1).text(salePrice + " " + current);
            $(element).children("h4").eq(0).text(nicePrice + " " + current);
        } else {
            $(element).children("h4").eq(1).text(nicePrice + " " + current);
            $(element).children("h4").eq(0).addClass("d-none");
            $(element).children("span").eq(0).addClass("d-none");
            $(element).addClass("noSale");
        }
    });
}

const showSaleDetail = () => {

    const oldPrice = $("h3.new span").text();
    const newPrice = $("h3.new").attr("data-sale");
    const current = $("h3.new").attr("data-txt");
    const deleteCurrent = oldPrice.replace(" " + current, "");
    const price = Number(deleteCurrent.replace(".", ""));
    const fmPrice = formatMoney(price);
    const fmSale = formatMoney(newPrice);
    $("h3.new span").text(fmPrice + " " + current);
    if (newPrice !== "") {
        $("h3.old").removeClass("d-n");
        $("h3.new").addClass("d-n");
        $("h3.new").removeClass("no-sale");
        $("h3.new-x span").text(fmSale + " " + current);
        $("h3.old span").text(fmPrice + " " + current);
    } else {
        $("h3.old").addClass("d-n");
        $("h3.new").addClass("no-sale");
        $("h3.new-x").addClass("d-n");
    }
}

const ajaxGetMoreProduct = () => {
    const btn = document.querySelector(".productGetAll");
    if (btn) {
        $(document).on("click", ".productGetAll" ,function(e) {
            e.preventDefault();
            const url = $(this).attr("data-url");
            $.ajax({
                type: "get",
                url: url,
                success: (res) => {
                    btn.remove();
                    $(btn.parentElement()).append(res);
                },
                error: (res) => {
                    console.log(res);
                },
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    rangeProduct();
    orderPrice();
    showSale();
    showSaleDetail();
    ajaxGetMoreProduct();
});