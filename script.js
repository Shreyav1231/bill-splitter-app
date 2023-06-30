
document.addEventListener('DOMContentLoaded', function() {
    const billAmount = document.getElementById("bill-amount");
    const peopleNumber = document.getElementById("people");
    const totalToPay = document.getElementById("total-person");
    const tipToPay = document.getElementById("tip-person");
    const tipButtons = document.querySelectorAll(".percent-buttons button");
    const reset = document.getElementById("reset-button");
    totalToPay.innerText = "0.00";
    tipToPay.innerText = "0.00";
    
    //event listeners
    billAmount.addEventListener("input", calculateTipAndTotal);
    peopleNumber.addEventListener("input", calculateTipAndTotal);
    document.getElementById("tip-custom").addEventListener("input", calculateTipAndTotal);
    
    tipButtons.forEach((button) => {
      button.addEventListener("click", handleTipButtonClick);
    });

    reset.addEventListener('click', function() {
        billAmount.value = "";
        peopleNumber.value = "";
        document.getElementById("tip-custom").value = "";
        tipButtons.forEach((button) => {
            button.classList.remove("active");
          });
        
          totalToPay.innerText = "0.00";
          tipToPay.innerText = "0.00";
    })

    function calculateTipAndTotal() {
        const billValue = parseFloat(billAmount.value);
        const numPeople = parseFloat(peopleNumber.value);
        const tipPercent = getSelectedTipPercent();

        if (billValue>=0 && numPeople>=0 && tipPercent>=0) {
        const tipAmount = billValue * (tipPercent/100);
        const totalAmount = billValue + tipAmount;
        const totalPerPerson = totalAmount/numPeople;
        const tipPerPerson = tipAmount/numPeople;

        tipToPay.innerText = tipPerPerson.toFixed(2);
        totalToPay.innerText = totalPerPerson.toFixed(2);  
        } else {
            tipToPay.innerText = "Please enter positive values";
            totalToPay.innerText = "Please enter positive values";
        }  
    }

    function handleTipButtonClick(event) {
        tipButtons.forEach((button) => {
            button.classList.remove("active");
        });

        event.target.classList.add("active");

        calculateTipAndTotal();
    }

    function getSelectedTipPercent() {
        const customTip = document.getElementById("tip-custom");
        if (customTip.value !== "") {
            return parseFloat(customTip.value);
        } else {
            const selectedTipButton = document.querySelector(".percent-buttons button.active");
            if (selectedTipButton) {
                return parseFloat(selectedTipButton.textContent);
            }
        }
    }
});

  
  
  
  
  
  
