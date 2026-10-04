document.addEventListener("DOMContentLoaded", function () {

    /* ================================
       ORDER MODAL
    ================================= */

    const orderModal = document.getElementById("orderModal");
    const closeOrder = document.getElementById("closeOrder");

    let selectedCake = "";
    let currentStep = 1;
    let quantity = 1;


    /* ================================
       CAKE PRICES
    ================================= */

    const cakePrices = {

        "Chocolate Cake": {
            "0.5": 400,
            "1": 650,
            "1.5": 900,
            "2": 1200,
            "2.5": 1450,
            "3": 1700
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

        "Wedding Cake": {
            "0.5": 800,
            "1": 1200,
            "1.5": 1600,
            "2": 2200,
            "2.5": 2700,
            "3": 3200
        },

        "Spiderman Theme Cake": {
            "0.5": 650,
            "1": 900,
            "1.5": 1200,
            "2": 1550,
            "2.5": 1900,
            "3": 2300
        },

        "Customized Cake": {
            "0.5": 650,
            "1": 900,
            "1.5": 1200,
            "2": 1600,
            "2.5": 1950,
            "3": 2400
        },

        "Half Vanilla & Half Chocolate Cake": {
            "0.5": 500,
            "1": 800,
            "1.5": 1100,
            "2": 1500,
            "2.5": 1800,
            "3": 2200
        },

        "Premium Anniversary Cake": {
            "0.5": 700,
            "1": 1000,
            "1.5": 1400,
            "2": 1900,
            "2.5": 2300,
            "3": 2800
        }
    };


    /* ================================
       GET ELEMENTS
    ================================= */

    const cakeWeight = document.getElementById("cakeWeight");
    const customWeight = document.getElementById("customWeight");
    const customWeightGroup =
        document.getElementById("customWeightGroup");

    const cakeQuantity =
        document.getElementById("cakeQuantity");

    const estimatedPrice =
        document.getElementById("estimatedPrice");


    /* ================================
       OPEN ORDER
    ================================= */

    document.addEventListener("click", function (event) {

        const orderButton =
            event.target.closest(".order-cake-btn");

        if (!orderButton) return;

        selectedCake =
            orderButton.getAttribute("data-cake") || "";

        const selectedCakeName =
            document.getElementById("selectedCakeName");

        if (selectedCakeName) {
            selectedCakeName.textContent = selectedCake;
        }

        quantity = 1;

        if (cakeQuantity) {
            cakeQuantity.textContent = "1";
        }

        if (cakeWeight) {
            cakeWeight.value = "1";
        }

        if (customWeightGroup) {
            customWeightGroup.style.display = "none";
        }

        if (customWeight) {
            customWeight.value = "";
        }

        currentStep = 1;

        showStep(1);
        updatePrice();
        updateSummary();

        if (orderModal) {
            orderModal.classList.add("show");
        }

        document.body.classList.add("modal-open");
    });


    /* ================================
       CLOSE ORDER
    ================================= */

    function closeModal() {

        if (orderModal) {
            orderModal.classList.remove("show");
        }

        document.body.classList.remove("modal-open");
    }


    if (closeOrder) {
        closeOrder.addEventListener("click", closeModal);
    }


    if (orderModal) {

        orderModal.addEventListener("click", function (event) {

            if (event.target === orderModal) {
                closeModal();
            }

        });
    }


    /* ================================
       SHOW STEP
    ================================= */

    function showStep(stepNumber) {

        currentStep = stepNumber;

        const steps =
            document.querySelectorAll(".order-step-form");

        steps.forEach(function (step) {

            step.classList.remove("active");

        });


        const current =
            document.querySelector(
                '.order-step-form[data-step="' +
                stepNumber +
                '"]'
            );


        if (current) {
            current.classList.add("active");
        }


        const progress =
            document.querySelectorAll(".progress-step");

        progress.forEach(function (item, index) {

            item.classList.remove(
                "active",
                "completed"
            );

            if (index + 1 < stepNumber) {
                item.classList.add("completed");
            }

            if (index + 1 === stepNumber) {
                item.classList.add("active");
            }

        });


        const lines =
            document.querySelectorAll(".progress-line");

        lines.forEach(function (line, index) {

            if (index + 1 < stepNumber) {
                line.classList.add("completed");
            }
            else {
                line.classList.remove("completed");
            }

        });

    }


    /* ================================
       NEXT BUTTON
    ================================= */

    document.addEventListener("click", function (event) {

        const button =
            event.target.closest(".wizard-next");

        if (!button) return;


        if (currentStep === 1) {

            if (!selectedCake) {

                alert("Please select a cake first.");

                return;
            }
        }


        if (currentStep === 2) {

            if (
                cakeWeight &&
                cakeWeight.value === "custom"
            ) {

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


        if (currentStep === 3) {

            const date =
                document.getElementById("deliveryDate");

            if (!date || !date.value) {

                alert(
                    "Please select delivery date."
                );

                return;
            }
        }


        if (currentStep === 4) {

            const name =
                document.getElementById("customerName");

            const mobile =
                document.getElementById("customerMobile");

            const address =
                document.getElementById("deliveryAddress");


            if (!name || !name.value.trim()) {

                alert("Please enter your name.");

                return;
            }


            if (!mobile || !mobile.value.trim()) {

                alert(
                    "Please enter your mobile number."
                );

                return;
            }


            if (
                !/^01[0-9]{9}$/.test(
                    mobile.value.trim()
                )
            ) {

                alert(
                    "Please enter a valid 11-digit mobile number."
                );

                return;
            }


            if (!address || !address.value.trim()) {

                alert(
                    "Please enter delivery address."
                );

                return;
            }

        }


        if (currentStep < 5) {

            currentStep++;

            showStep(currentStep);

            updateSummary();
        }

    });


    /* ================================
       BACK BUTTON
    ================================= */

    document.addEventListener("click", function (event) {

        const button =
            event.target.closest(".wizard-back");

        if (!button) return;


        if (currentStep > 1) {

            currentStep--;

            showStep(currentStep);

            updateSummary();
        }

    });


    /* ================================
       WEIGHT CHANGE
    ================================= */

    if (cakeWeight) {

        cakeWeight.addEventListener(
            "change",
            function () {

                if (this.value === "custom") {

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

                updatePrice();
                updateSummary();

            }
        );
    }


    /* ================================
       QUANTITY
    ================================= */

    document.addEventListener("click", function (event) {

        const plus =
            event.target.closest("#plusQty");

        const minus =
            event.target.closest("#minusQty");


        if (plus) {

            if (quantity < 20) {

                quantity++;

                if (cakeQuantity) {
                    cakeQuantity.textContent =
                        quantity;
                }

                updatePrice();
                updateSummary();
            }
        }


        if (minus) {

            if (quantity > 1) {

                quantity--;

                if (cakeQuantity) {
                    cakeQuantity.textContent =
                        quantity;
                }

                updatePrice();
                updateSummary();
            }
        }

    });


    /* ================================
       GET PRICE
    ================================= */

    function getUnitPrice() {

        const weight =
            cakeWeight
                ? cakeWeight.value
                : "1";


        if (weight === "custom") {
            return null;
        }


        if (
            cakePrices[selectedCake] &&
            cakePrices[selectedCake][weight]
        ) {

            return cakePrices[selectedCake][weight];

        }


        return 650;
    }


    /* ================================
       UPDATE PRICE
    ================================= */

    function updatePrice() {

        if (!estimatedPrice) return;


        const unitPrice =
            getUnitPrice();


        if (unitPrice === null) {

            estimatedPrice.textContent =
                "Custom Price";

            return;
        }


        const total =
            unitPrice * quantity;


        estimatedPrice.textContent =
            "৳" + total.toLocaleString();

    }


    /* ================================
       SUMMARY
    ================================= */

    function updateSummary() {

        const summaryCake =
            document.getElementById("summaryCake");

        const summaryWeight =
            document.getElementById("summaryWeight");

        const summaryQuantity =
            document.getElementById("summaryQuantity");

        const summaryPrice =
            document.getElementById("summaryPrice");

        const summaryDate =
            document.getElementById("summaryDate");

        const summaryName =
            document.getElementById("summaryName");

        const summaryMobile =
            document.getElementById("summaryMobile");

        const summaryAddress =
            document.getElementById("summaryAddress");


        if (summaryCake) {

            summaryCake.textContent =
                selectedCake || "-";
        }


        const weight =
            cakeWeight
                ? cakeWeight.value
                : "1";


        let displayWeight;


        if (weight === "custom") {

            displayWeight =
                customWeight &&
                customWeight.value.trim()
                    ? customWeight.value.trim() +
                      " Pound"
                    : "Custom";

        }
        else {

            displayWeight =
                weight + " Pound";
        }


        if (summaryWeight) {

            summaryWeight.textContent =
                displayWeight;
        }


        if (summaryQuantity) {

            summaryQuantity.textContent =
                quantity;
        }


        const unitPrice =
            getUnitPrice();


        if (summaryPrice) {

            if (unitPrice === null) {

                summaryPrice.textContent =
                    "Custom Price";

            }
            else {

                summaryPrice.textContent =
                    "৳" +
                    (
                        unitPrice * quantity
                    ).toLocaleString();
            }
        }


        const date =
            document.getElementById("deliveryDate");


        if (summaryDate) {

            summaryDate.textContent =
                date && date.value
                    ? formatDate(date.value)
                    : "-";
        }


        const name =
            document.getElementById("customerName");


        if (summaryName) {

            summaryName.textContent =
                name && name.value.trim()
                    ? name.value.trim()
                    : "-";
        }


        const mobile =
            document.getElementById("customerMobile");


        if (summaryMobile) {

            summaryMobile.textContent =
                mobile && mobile.value.trim()
                    ? mobile.value.trim()
                    : "-";
        }


        const address =
            document.getElementById("deliveryAddress");


        if (summaryAddress) {

            summaryAddress.textContent =
                address && address.value.trim()
                    ? address.value.trim()
                    : "-";
        }

    }


    /* ================================
       DATE FORMAT
    ================================= */

    function formatDate(value) {

        if (!value) {
            return "-";
        }

        const date =
            new Date(
                value + "T00:00:00"
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


    /* ================================
       LIVE SUMMARY
    ================================= */

    [
        "customerName",
        "customerMobile",
        "deliveryAddress",
        "deliveryDate",
        "customWeight"
    ].forEach(function (id) {

        const element =
            document.getElementById(id);

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


    /* ================================
       WHATSAPP
    ================================= */

    const confirmOrder =
        document.getElementById("confirmOrder");


    if (confirmOrder) {

        confirmOrder.addEventListener(
            "click",
            function () {

                const name =
                    document.getElementById(
                        "customerName"
                    ).value.trim();


                const mobile =
                    document.getElementById(
                        "customerMobile"
                    ).value.trim();


                const address =
                    document.getElementById(
                        "deliveryAddress"
                    ).value.trim();


                const date =
                    document.getElementById(
                        "deliveryDate"
                    ).value;


                const weight =
                    cakeWeight.value;


                let displayWeight;


                if (weight === "custom") {

                    displayWeight =
                        customWeight.value.trim() +
                        " Pound";

                }
                else {

                    displayWeight =
                        weight + " Pound";
                }


                const unitPrice =
                    getUnitPrice();


                const totalPrice =
                    unitPrice === null
                        ? "Custom Price"
                        : "৳" +
                          (
                              unitPrice *
                              quantity
                          ).toLocaleString();


                const message =
`🍰 NEW CAKE ORDER

Cake: ${selectedCake}
Weight: ${displayWeight}
Quantity: ${quantity}
Estimated Price: ${totalPrice}

Delivery Date: ${formatDate(date)}

Customer Name: ${name}
Mobile: ${mobile}
Delivery Address: ${address}

Cake Creation by Ripa`;


                const whatsappURL =
                    "https://wa.me/8801635651905?text=" +
                    encodeURIComponent(message);


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );
    }


    /* ================================
       DELIVERY DATE MIN
    ================================= */

    const deliveryDate =
        document.getElementById("deliveryDate");


    if (deliveryDate) {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        deliveryDate.min = today;
    }


    /* ================================
       SEARCH + CATEGORY
    ================================= */

    const search =
        document.getElementById("cakeSearch");


    const categoryButtons =
        document.querySelectorAll(
            ".category-btn"
        );


    const cakeItems =
        document.querySelectorAll(
            ".cake-item"
        );


    const noResult =
        document.getElementById(
            "noCakeResult"
        );


    let activeCategory = "all";


    function filterCakes() {

        const searchText =
            search
                ? search.value
                    .toLowerCase()
                    .trim()
                : "";


        let visible = 0;


        cakeItems.forEach(function (item) {

            const text =
                item.innerText
                    .toLowerCase();


            const categories =
                (
                    item.dataset.category ||
                    ""
                )
                .toLowerCase()
                .split(/\s+/);


            const searchMatch =
                text.includes(searchText);


            const categoryMatch =
                activeCategory === "all" ||
                categories.includes(
                    activeCategory
                );


            if (
                searchMatch &&
                categoryMatch
            ) {

                /* Direct display.
                   CSS hidden class-এর
                   উপর depend করবে না. */

                item.style.display = "";

                visible++;

            }
            else {

                item.style.display =
                    "none";
            }

        });


        if (noResult) {

            noResult.style.display =
                visible === 0
                    ? "block"
                    : "none";
        }

    }


    /* ================================
       CATEGORY BUTTON
    ================================= */

    categoryButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    categoryButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );


                    activeCategory =
                        (
                            this.dataset.category ||
                            "all"
                        ).toLowerCase();


                    filterCakes();

                }
            );

        }
    );


    /* ================================
       SEARCH
    ================================= */

    if (search) {

        search.addEventListener(
            "input",
            filterCakes
        );
    }


    /* ================================
       INITIAL
    ================================= */

    filterCakes();

    updatePrice();

    updateSummary();

});
