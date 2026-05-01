document.addEventListener("DOMContentLoaded", ()=>{
    let form = document.querySelector("main form");
    
    let fillbutton = ()=>{
        let button = form.querySelector("button");
        let inputs = document.querySelectorAll("fieldset input");
        inputs.forEach((inp)=>{
            if (inp.checked) {
                button.textContent = `Find ${inp.value}`;
                button.dataset.value = `${inp.value}`;
            }
            inp.addEventListener("change", ()=>{
                if (inp.checked) {
                    button.textContent = `Find ${inp.value}`;
                    button.dataset.value = `${inp.value}`;
                }
            });
        });
    };
    
    let fillcontent = ()=>{
        let input = form.querySelector("div input");
        input.addEventListener("input", ()=>{
            let value = parseInt(input.value);
            let val = value;
            let isBinary = true;

            while (val > 0) {
                if (val%10 > 1) {
                    isBinary = false;
                    break;
                }
                else{
                    isBinary = true;
                }
                val = Math.floor(val/10);
            }

            if (isBinary === true) {
                let oldfieldset = form.querySelector("fieldset");
                let oldbutton = form.querySelector("button");
                if (oldfieldset) {
                    oldfieldset.remove();
                }
                if (oldbutton) {
                    oldbutton.remove();
                }
                
                let fieldset = document.createElement("fieldset");
                fieldset.innerHTML = `
                    <legend>Convert to Decimal or Binary?</legend>
                    <label for="decimal"><input type="radio" value="Decimal" id="decimal" name="conversion" checked required>Decimal</label>
                    <label for="binary"><input type="radio" value="Binary" id="binary" name="conversion" required>Binary</label>
                `;
                
                if (!form.querySelector("fieldset")) {
                    form.appendChild(fieldset);
                }
                
                let button = document.createElement("button");
                button.type = "submit";
                
                if (!form.querySelector("button")) {
                    form.appendChild(button);
                }

                fillbutton();
            }
            else{
                let oldfieldset = form.querySelector("fieldset");
                let oldbutton = form.querySelector("button");
                if (oldfieldset) {
                    oldfieldset.remove();
                }
                if (oldbutton) {
                    oldbutton.remove();
                }
                
                let button = document.createElement("button");
                button.type = "submit";
                button.textContent = "Find Binary";
                button.dataset.value = "Binary";
                
                if (!form.querySelector("button")) {
                    form.appendChild(button);
                }
            }
        });
    };

    fillcontent();

    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        let button = form.querySelector("button");
        let convert = button.dataset.value;
        let value = parseInt(form.querySelector("div input").value);
        let output = document.querySelector("#output");

        if (convert === "Binary") {
            let N = value;
            let remainders = [];
            while (N > 0) {
                remainders.push(N%2);
                N = Math.floor(N/2);
            }

            let number = 0;
            for (let i = 0; i < remainders.length; i++) {
                number += remainders[i]*Math.pow(10, i);
            }

            let out = `The Binary equivalent of ${value} is ${number}`;
            output.innerHTML = `
                <p>${out}</p>
            `;
        }
        else{
            let N = value;
            let remainders = [];
            while (N > 0) {
                remainders.push(N%10);
                N = Math.floor(N/10);
            }
    
            let number = 0;
            for (let i = 0; i < remainders.length; i++) {
                number += remainders[i]*Math.pow(2, i);
            }
    
            let out = `The Decimal equivalent of ${value} is ${number}`;
            output.innerHTML = `
                <p>${out}</p>
            `;

        }
    });
});