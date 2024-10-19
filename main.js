function updatePrice() {
    let price = 0;
    let prices = getPrices();
    let checkDiv = document.getElementById("checkboxes");
    let selectDiv = document.getElementById("goods_options");
    let check_var = 0;
    let select_var = 0;

    let radios = document.getElementsByName("goods");
    radios.forEach(function (radio) {
        if (radio.checked) {
            price = prices.g_Types[radio.value];
            //checkbox
            if (
                radio.value === "g_1" ||
                radio.value === "g_2" ||
                radio.value === "g_5"
            ) {
                checkDiv.style.display = "none";
                check_var = 0;
            } else {
                checkDiv.style.display = "block";
                check_var = 1;
            }
            //select
            if (radio.value === "g_1" || radio.value === "g_3") {
                selectDiv.style.display = "none";
                select_var = 0;
            } else {
                selectDiv.style.display = "block";
                select_var = 1;
            }
        }
    });

    // Смотрим какая товарная опция выбрана.
    let s = document.getElementsByName("g_options");
    let select = s[0].value;
    if (select !== undefined && select_var === 1) {
        price += prices.g_Options[select];
    }

    //смотрим какие товарные свойства выбраны
    let checkboxes = document.querySelectorAll("#checkboxes input");
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            let g_Price = prices.g_Properties[checkbox.name];
            if (g_Price !== undefined && check_var === 1) {
                price += g_Price;
            }
        }
    });

    let res = document.getElementById("result");

    //подсчет цены с учетом количества товара
    let g_amount = document.getElementsByName("amount");
    let m = g_amount[0].value.match(/^\d+$/);
    if (m !== null) {
        price *= m;
        res.innerHTML = "Итоговая стоимость: " + price;
    } else {
        res.innerHTML = "Данные введены некорректно";
    }
}

function getPrices() {
    return {
        g_Options: {
            option_1: 0,
            option_2: 10,
            option_3: 20
        },
        g_Properties: {
            property_1: 1500,
            property_2: 2000,
            property_3: 3000
        },
        g_Types: {
            g_1: 350,
            g_2: 200,
            g_3: 500,
            g_4: 156,
            g_5: 35000
        }
    };
}


window.addEventListener("DOMContentLoaded", function () {
    // Назначаем обработчик радиокнопок
    let radios = document.getElementsByName("goods");
    radios.forEach(function (radio) {
        radio.addEventListener("change", function () {
            updatePrice();
        });
    });

    // Находим select по имени в DOM.
    let sel = document.getElementsByName("g_options");
    let select = sel[0];
    // Назначаем обработчик на изменение select
    select.addEventListener("change", function () {
        updatePrice();
    });

    // Назначаем обработчик чекбоксов
    let checkboxes = document.querySelectorAll("#checkboxes input");
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            updatePrice();
        });
    });

    let am = document.getElementsByName("amount");
    let g_am = am[0];
    // Назначаем обработчик на изменение select
    g_am.addEventListener("change", function () {
        updatePrice();
    });

    updatePrice();
});