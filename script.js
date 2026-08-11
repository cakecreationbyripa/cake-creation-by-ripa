/* =========================================================
   CAKE CREATION BY RIPA
   COMPLETE SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =========================================================
       ELEMENTS
    ========================================================= */

    const orderModal =
        document.getElementById("orderModal");

    const closeOrder =
        document.getElementById("closeOrder");

    const orderButtons =
        document.querySelectorAll(".order-cake-btn");

    const nextButtons =
        document.querySelectorAll(".wizard-next");

    const backButtons =
        document.querySelectorAll(".wizard-back");

    const steps =
        document.querySelectorAll(".order-step-form");

    const progressSteps =
        document.querySelectorAll(".progress-step");

    const progressLines =
        document.querySelectorAll(".progress-line");


    /* =========================================================
       VARIABLES
    ========================================================= */

    let selectedCake = "";

    let currentStep = 1;

    let quantity = 1;


    /* =========================================================
       CAKE PRICES
       
       এখান থেকে Cake-এর Pound অনুযায়ী Price change করতে পারবে।
    ========================================================= */

    const cakePrices = {


        "Chocolate Cake": {
            "0.5": 400,
            "1": 650,
            "1.5": 900,
            "2": 1200,
            "2.5": 1450,
            "3": 1700
        },


        "Red Velvet": {
            "0.5": 550,
            "1": 850,
            "1.5": 1150,
            "2": 1500,
            "2.5": 1800,
            "3": 2100
        },


        "Red Velvet Cake": {
            "0.5": 550,
            "1": 850,
            "1.5": 1150,
            "2": 1500,
            "2.5": 1800,
            "3": 2100
        },


        "Vanilla Cake": {
            "0.5": 450,
            "1": 700,
            "1.5": 950,
            "2": 1250,
            "2.5": 1500,
            "3": 1750
        },


        "Birthday Cake": {
            "0.5": 600,
            "1": 900,
            "1.5": 1200,
            "2": 1550,
            "2.5": 1850,
            "3": 2200
        },


        "Half Vanilla & Half Chocolate Cake": {
            "0.5": 500,
            "1": 800,
            "1.5": 1100,
            "2": 1500,
            "2.5": 1800,
            "3": 2200
        },


        "Wedding Cake": {
            "0.5": 800,
            "1": 1200,
            "1.5": 1600,
            "2": 2200,
            "2.5": 2700,
            "3": 3200
        },


        "Premium Chocolate Cake": {
            "0.5": 550,
            "1": 750,
            "1.5": 1050,
            "2": 1400,
            "2.5": 1700,
            "3": 2000
        },


        "Cake 05": {
            "0.5": 500,
            "1": 750,
            "1.5": 1000,
            "2": 1400,
            "2.5": 1700,
            "3": 2000
        },


        "Cake 06": {
            "0.5": 550,
            "1": 800,
            "1.5": 1050,
            "2": 1500,
            "2.5": 1800,
            "3": 2200
        },


        "Cake 07": {
            "0.5": 550,
            "1": 850,
            "1.5": 1100,
            "2": 1600,
            "2.5": 1900,
            "3": 2300
        },


        "Cake 08": {
            "0.5": 600,
            "1": 900,
            "1.5": 1200,
            "2": 1700,
            "2.5": 2100,
            "3": 2500
        },


        "Cake 09": {
            "0.5": 650,
            "1": 950,
            "1.5": 1300,
            "2": 1800,
            "2.5": 2200,
            "3": 2700
        },


        "Cake 10": {
            "0.5": 700,
            "1": 1000,
            "1.5": 1400,
            "2": 1900,
            "2.5": 2300,
            "3": 2800
        }

    };


    /* =========================================================
       OPEN ORDER MODAL
    ========================================================= */

    orderButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            selectedCake =
                this.getAttribute("data-cake") || "";


            /* Selected Cake Name */

            const selectedCakeName =
                document.getElementById(
                    "selectedCakeName"
                );

            if (selectedCakeName) {

                selectedCakeName.textContent =
                    selectedCake;

            }


            /* Reset Quantity */

            quantity = 1;

            const cakeQuantity =
                document.getElementById(
                    "cakeQuantity"
                );

            if (cakeQuantity) {

                cakeQuantity.textContent = "1";

            }


            /* Reset Weight */

            const cakeWeight =
                document.getElementById(
                    "cakeWeight"
                );

            if (cakeWeight) {

                cakeWeight.value = "1";

            }


            /* Hide Custom Weight */

            const customWeightGroup =
                document.getElementById(
                    "customWeightGroup"
                );

            if (customWeightGroup) {

                customWeightGroup.style.display =
                    "none";

            }


            /* Update Price */

            updateCakePrice();


            /* Update Summary */

            updateSummary();


            /* Start Step 1 */

            currentStep = 1;

            showStep(currentStep);


            /* Open Modal */

            if (orderModal) {

                orderModal.classList.add("show");

            }

            document.body.classList.add(
                "modal-open"
            );

        });

    });


    /* =========================================================
       CLOSE ORDER MODAL
    ========================================================= */

    if (closeOrder) {

        closeOrder.addEventListener(
            "click",
            closeModal
        );

    }


    if (orderModal) {

        orderModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === orderModal
                ) {

                    closeModal();

                }

            }
        );

    }


    function closeModal() {

        if (orderModal) {

            orderModal.classList.remove(
                "show"
            );

        }

        document.body.classList.remove(
            "modal-open"
        );

    }


    /* =========================================================
       SHOW STEP
    ========================================================= */

    function showStep(stepNumber) {

        steps.forEach(function (step) {

            step.classList.remove(
                "active"
            );

        });


        const currentForm =
            document.querySelector(
                `.order-step-form[data-step="${stepNumber}"]`
            );


        if (currentForm) {

            currentForm.classList.add(
                "active"
            );

        }


        /* Progress Steps */

        progressSteps.forEach(
            function (step, index) {

                step.classList.remove(
                    "active",
                    "completed"
                );


                if (
                    index + 1 < stepNumber
                ) {

                    step.classList.add(
                        "completed"
                    );

                }

                else if (
                    index + 1 === stepNumber
                ) {

                    step.classList.add(
                        "active"
                    );

                }

            }
        );


        /* Progress Lines */

        progressLines.forEach(
            function (line, index) {

                if (
                    index + 1 < stepNumber
                ) {

                    line.classList.add(
                        "completed"
                    );

                }

                else {

                    line.classList.remove(
                        "completed"
                    );

                }

            }
        );


        currentStep = stepNumber;


        /* Update Summary */

        updateSummary();

    }


    /* =========================================================
       NEXT BUTTON
    ========================================================= */

    nextButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {


                /* STEP 1 */

                if (currentStep === 1) {

                    if (!selectedCake) {

                        alert(
                            "Please select a cake first."
                        );

                        return;

                    }

                }


                /* STEP 2 */

                if (currentStep === 2) {

                    const cakeWeight =
                        document.getElementById(
                            "cakeWeight"
                        );


                    if (!cakeWeight) {

                        alert(
                            "Please select cake weight."
                        );

                        return;

                    }


                    if (
                        cakeWeight.value ===
                        "custom"
                    ) {

                        const customWeight =
                            document.getElementById(
                                "customWeight"
                            );


                        if (
                            !customWeight ||
                            !customWeight.value.trim()
                        ) {

                            alert(
                                "Please enter custom cake weight."
                            );

                            return;

                        }

                    }

                }


                /* STEP 3 */

                if (currentStep === 3) {

                    const deliveryDate =
                        document.getElementById(
                            "deliveryDate"
                        );


                    if (
                        !deliveryDate ||
                        !deliveryDate.value
                    ) {

                        alert(
                            "Please select your delivery date."
                        );

                        return;

                    }

                }


                /* STEP 4 */

                if (currentStep === 4) {

                    const nameElement =
                        document.getElementById(
                            "customerName"
                        );


                    const mobileElement =
                        document.getElementById(
                            "customerMobile"
                        );


                    const addressElement =
                        document.getElementById(
                            "deliveryAddress"
                        );


                    const name =
                        nameElement
                        ? nameElement.value.trim()
                        : "";


                    const mobile =
                        mobileElement
                        ? mobileElement.value.trim()
                        : "";


                    const address =
                        addressElement
                        ? addressElement.value.trim()
                        : "";


                    if (!name) {

                        alert(
                            "Please enter your name."
                        );

                        return;

                    }


                    if (!mobile) {

                        alert(
                            "Please enter your mobile number."
                        );

                        return;

                    }


                    if (
                        !/^01[0-9]{9}$/.test(
                            mobile
                        )
                    ) {

                        alert(
                            "Please enter a valid 11-digit Bangladeshi mobile number."
                        );

                        return;

                    }


                    if (!address) {

                        alert(
                            "Please enter your delivery area."
                        );

                        return;

                    }


                    updateSummary();

                }


                if (
                    currentStep < 5
                ) {

                    showStep(
                        currentStep + 1
                    );

                }

            }
        );

    });


    /* =========================================================
       BACK BUTTON
    ========================================================= */

    backButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                if (
                    currentStep > 1
                ) {

                    showStep(
                        currentStep - 1
                    );

                }

            }
        );

    });


    /* =========================================================
       CAKE WEIGHT
    ========================================================= */

    const cakeWeight =
        document.getElementById(
            "cakeWeight"
        );


    const customWeightGroup =
        document.getElementById(
            "customWeightGroup"
        );


    const customWeight =
        document.getElementById(
            "customWeight"
        );


    if (cakeWeight) {

        cakeWeight.addEventListener(
            "change",
            function () {


                if (
                    this.value ===
                    "custom"
                ) {

                    if (customWeightGroup) {

                        customWeightGroup.style.display =
                            "block";

                    }

                }

                else {

                    if (customWeightGroup) {

                        customWeightGroup.style.display =
                            "none";

                    }

                }


                /* VERY IMPORTANT */

                updateCakePrice();

                updateSummary();

            }
        );

    }


    /* =========================================================
       CUSTOM WEIGHT
    ========================================================= */

    if (customWeight) {

        customWeight.addEventListener(
            "input",
            function () {

                updateSummary();

            }
        );

    }


    /* =========================================================
       QUANTITY
    ========================================================= */

    const minusQty =
        document.getElementById(
            "minusQty"
        );


    const plusQty =
        document.getElementById(
            "plusQty"
        );


    const cakeQuantity =
        document.getElementById(
            "cakeQuantity"
        );


    if (minusQty) {

        minusQty.addEventListener(
            "click",
            function () {

                if (
                    quantity > 1
                ) {

                    quantity--;

                    if (cakeQuantity) {

                        cakeQuantity.textContent =
                            quantity;

                    }

                    updateCakePrice();

                    updateSummary();

                }

            }
        );

    }


    if (plusQty) {

        plusQty.addEventListener(
            "click",
            function () {

                if (
                    quantity < 20
                ) {

                    quantity++;

                    if (cakeQuantity) {

                        cakeQuantity.textContent =
                            quantity;

                    }

                    updateCakePrice();

                    updateSummary();

                }

            }
        );

    }


    /* =========================================================
       GET CURRENT PRICE
    ========================================================= */

    function getCurrentPrice() {

        const weightElement =
            document.getElementById(
                "cakeWeight"
            );


        const weight =
            weightElement
            ? weightElement.value
            : "1";


        if (
            weight === "custom"
        ) {

            return null;

        }


        let unitPrice = 650;


        if (
            cakePrices[selectedCake] &&
            cakePrices[selectedCake][weight]
        ) {

            unitPrice =
                cakePrices[selectedCake][weight];

        }


        return unitPrice * quantity;

    }


    /* =========================================================
       UPDATE CAKE PRICE
    ========================================================= */

    function updateCakePrice() {

        const priceElement =
            document.getElementById(
                "estimatedPrice"
            );


        if (!priceElement) {

            return;

        }


        const totalPrice =
            getCurrentPrice();


        if (
            totalPrice === null
        ) {

            priceElement.textContent =
                "Custom Price";

        }

        else {

            priceElement.textContent =
                "৳" +
                totalPrice.toLocaleString();

        }

    }


    /* =========================================================
       UPDATE ORDER SUMMARY
    ========================================================= */

    function updateSummary() {


        /* Customer Name */

        const nameElement =
            document.getElementById(
                "customerName"
            );


        const name =
            nameElement
            ? nameElement.value.trim()
            : "";


        /* Mobile */

        const mobileElement =
            document.getElementById(
                "customerMobile"
            );


        const mobile =
            mobileElement
            ? mobileElement.value.trim()
            : "";


        /* Address */

        const addressElement =
            document.getElementById(
                "deliveryAddress"
            );


        const address =
            addressElement
            ? addressElement.value.trim()
            : "";


        /* Date */

        const dateElement =
            document.getElementById(
                "deliveryDate"
            );


        const date =
            dateElement
            ? dateElement.value
            : "";


        /* Weight */

        const weightElement =
            document.getElementById(
                "cakeWeight"
            );


        const weight =
            weightElement
            ? weightElement.value
            : "1";


        let displayWeight;


        if (
            weight === "custom"
        ) {

            displayWeight =
                customWeight &&
                customWeight.value.trim()
                ? customWeight.value.trim()
                : "Custom";

        }

        else {

            displayWeight =
                weight +
                " Pound";

        }


        /* Price */

        const totalPrice =
            getCurrentPrice();


        let displayPrice;


        if (
            totalPrice === null
        ) {

            displayPrice =
                "Custom Price";

        }

        else {

            displayPrice =
                "৳" +
                totalPrice.toLocaleString();

        }


        /* =====================================================
           SUMMARY ELEMENTS
        ===================================================== */


        const summaryCake =
            document.getElementById(
                "summaryCake"
            );


        if (summaryCake) {

            summaryCake.textContent =
                selectedCake || "-";

        }


        const summaryWeight =
            document.getElementById(
                "summaryWeight"
            );


        if (summaryWeight) {

            summaryWeight.textContent =
                displayWeight;

        }


        const summaryQuantity =
            document.getElementById(
                "summaryQuantity"
            );


        if (summaryQuantity) {

            summaryQuantity.textContent =
                quantity;

        }


        const summaryPrice =
            document.getElementById(
                "summaryPrice"
            );


        if (summaryPrice) {

            summaryPrice.textContent =
                displayPrice;

        }


        const summaryDate =
            document.getElementById(
                "summaryDate"
            );


        if (summaryDate) {

            summaryDate.textContent =
                formatDate(date);

        }


        const summaryName =
            document.getElementById(
                "summaryName"
            );


        if (summaryName) {

            summaryName.textContent =
                name || "-";

        }


        const summaryMobile =
            document.getElementById(
                "summaryMobile"
            );


        if (summaryMobile) {

            summaryMobile.textContent =
                mobile || "-";

        }


        const summaryAddress =
            document.getElementById(
                "summaryAddress"
            );


        if (summaryAddress) {

            summaryAddress.textContent =
                address || "-";

        }

    }


    /* =========================================================
       LIVE SUMMARY UPDATE
    ========================================================= */

    const customerName =
        document.getElementById(
            "customerName"
        );


    const customerMobile =
        document.getElementById(
            "customerMobile"
        );


    const deliveryAddress =
        document.getElementById(
            "deliveryAddress"
        );


    const deliveryDate =
        document.getElementById(
            "deliveryDate"
        );


    [
        customerName,
        customerMobile,
        deliveryAddress,
        deliveryDate
    ].forEach(function (element) {

        if (element) {

            element.addEventListener(
                "input",
                updateSummary
            );


            element.addEventListener(
                "change",
                updateSummary
            );

        }

    });


    /* =========================================================
       FORMAT DATE
    ========================================================= */

    function formatDate(dateString) {

        if (!dateString) {

            return "-";

        }


        const date =
            new Date(
                dateString +
                "T00:00:00"
            );


        return date.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    /* =========================================================
       WHATSAPP ORDER
    ========================================================= */

    const confirmOrder =
        document.getElementById(
            "confirmOrder"
        );


    if (confirmOrder) {

        confirmOrder.addEventListener(
            "click",
            function () {


                /* Customer */

                const name =
                    customerName
                    ? customerName.value.trim()
                    : "";


                const mobile =
                    customerMobile
                    ? customerMobile.value.trim()
                    : "";


                const address =
                    deliveryAddress
                    ? deliveryAddress.value.trim()
                    : "";


                /* Date */

                const date =
                    deliveryDate
                    ? deliveryDate.value
                    : "";


                /* Weight */

                const weight =
                    cakeWeight
                    ? cakeWeight.value
                    : "1";


                let displayWeight;


                if (
                    weight ===
                    "custom"
                ) {

                    displayWeight =
                        customWeight &&
                        customWeight.value.trim()
                        ? customWeight.value.trim()
                        : "Custom";

                }

                else {

                    displayWeight =
                        weight +
                        " Pound";

                }


                /* Price */

                const totalPriceValue =
                    getCurrentPrice();


                const totalPrice =
                    totalPriceValue === null
                    ? "Custom Price"
                    : "৳" +
                      totalPriceValue.toLocaleString();


                /* Formatted Date */

                const formattedDate =
                    formatDate(date);


                /* =================================================
                   WHATSAPP MESSAGE
                ================================================= */

                const message =
`🍰 *NEW CAKE ORDER*

━━━━━━━━━━━━━━━━━━

🎂 *Cake:* ${selectedCake}

⚖️ *Weight:* ${displayWeight}

🔢 *Quantity:* ${quantity}

💰 *Total Price:* ${totalPrice}

📅 *Delivery Date:* ${formattedDate}

━━━━━━━━━━━━━━━━━━

👤 *Customer Name:* ${name}

📱 *Mobile:* ${mobile}

📍 *Delivery Area:* ${address}

━━━━━━━━━━━━━━━━━━

❤️ Cake Creation by Ripa
Homemade Cakes • Made with Love`;


                /* WhatsApp Number */

                const whatsappNumber =
                    "8801568012276";


                const whatsappURL =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodeURIComponent(
                        message
                    );


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /* =========================================================
       DELIVERY DATE
    ========================================================= */

    if (deliveryDate) {

        const today =
            new Date()
            .toISOString()
            .split("T")[0];


        deliveryDate.min =
            today;

    }


/* =========================================================
   CAKE SEARCH & CATEGORY FILTER
========================================================= */

const cakeSearch =
    document.getElementById(
        "cakeSearch"
    );


const categoryButtons =
    document.querySelectorAll(
        ".category-btn"
    );


const cakeItems =
    document.querySelectorAll(
        ".cake-item"
    );


const noCakeResult =
    document.getElementById(
        "noCakeResult"
    );


/* =========================================================
   FILTER CAKES
========================================================= */

function filterCakes() {

    if (!cakeItems.length) {

        return;

    }


    /* Search Text */

    const searchText =
        cakeSearch
        ? cakeSearch.value
            .toLowerCase()
            .trim()
        : "";


    /* Active Category */

    const activeCategory =
        document.querySelector(
            ".category-btn.active"
        );


    const category =
        activeCategory
        ? activeCategory.dataset.category
            .toLowerCase()
        : "all";


    let visibleCount = 0;


    /* =====================================================
       CHECK EVERY CAKE
    ===================================================== */

    cakeItems.forEach(
        function (item) {


            /* Cake Text */

            const cakeText =
                item.innerText
                    .toLowerCase();


            /* =================================================
               MULTIPLE CATEGORIES

               Example:
               data-category="vanilla chocolate"

               This cake will appear in both
               Vanilla and Chocolate.
            ================================================= */

            const itemCategories =
                item.dataset.category
                ? item.dataset.category
                    .toLowerCase()
                    .split(/\s+/)
                : [];


            /* Search Match */

            const matchesSearch =
                cakeText.includes(
                    searchText
                );


            /* Category Match */

            const matchesCategory =
                category === "all" ||
                itemCategories.includes(
                    category
                );


            /* =================================================
               SHOW / HIDE
            ================================================= */

            if (
                matchesSearch &&
                matchesCategory
            ) {

                item.classList.remove(
                    "hidden"
                );

                visibleCount++;

            }

            else {

                item.classList.add(
                    "hidden"
                );

            }

        }
    );


    /* =====================================================
       NO RESULT MESSAGE
    ===================================================== */

    if (noCakeResult) {

        noCakeResult.style.display =
            visibleCount === 0
            ? "block"
            : "none";

    }

}


/* =========================================================
   SEARCH EVENT
========================================================= */

if (cakeSearch) {

    cakeSearch.addEventListener(
        "input",
        filterCakes
    );

}


/* =========================================================
   CATEGORY BUTTON EVENT
========================================================= */

categoryButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {


                /* Remove Active */

                categoryButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                /* Add Active */

                this.classList.add(
                    "active"
                );


                /* Filter Cakes */

                filterCakes();

            }
        );

    }
);


/* =========================================================
   INITIAL FILTER
========================================================= */

filterCakes();


/* =========================================================
   INITIAL ORDER SUMMARY
========================================================= */

updateSummary();

});