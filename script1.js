let input = document.querySelector(".input");
let buttons = document.querySelectorAll(".btn");
let historyBox = document.getElementById("history");

let string = "";

function updateDisplay() {
    input.value = string;
}
function calculate(expr) {
    try {
        return eval(expr);
    } catch {
        return "Error";
    }
}

function addToHistory(expression, result) {
    let historyItem = document.createElement("div");
    historyItem.innerText = `${expression} = ${result}`;
    
    historyBox.appendChild(historyItem);

   
    if (historyBox.children.length > 10) {
        historyBox.removeChild(historyBox.children[1]);
    }
}

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        let value = e.target.innerText;

        if (value === "=") {
            try {
                if (string === "") return;

                let result = eval(string);

                addToHistory(string, result);

                string = result.toString();
                updateDisplay();

            } catch {
                input.value = "Error";
                string = "";
            }
        }

       
        else if (value === "C") {
            string = "";
            updateDisplay();
        }

    
        else if (value === "%") {
            try {
                if (string === "") return;
                string = (eval(string) / 100).toString();
                updateDisplay();
            } catch {
                input.value = "Error";
                string = "";
            }
        }

        else if (value === "x²") {
    if (string === "") return;
    string = (eval(string) ** 2).toString();
    updateDisplay();
}

        else if (value === "⌫") {
    string = string.slice(0, -1);
    updateDisplay();
}

        else if (["+", "-", "*", "/"].includes(value)) {
            if (string === "") return;

            let lastChar = string[string.length - 1];
            if (["+", "-", "*", "/"].includes(lastChar)) {
                string = string.slice(0, -1); 
            }

            string += value;
            updateDisplay();
        }

        else {
            string += value;
            updateDisplay();
        }
    });
});

document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
        string += e.key;
        updateDisplay();
    }

    else if (e.key === "Enter") {
        try {
            let result = eval(string);
            addToHistory(string, result);
            string = result.toString();
            updateDisplay();
        } catch {
            input.value = "Error";
            string = "";
        }
    }

    else if (e.key === "Backspace") {
        string = string.slice(0, -1);
        updateDisplay();
    }

    else if (e.key === "Escape") {
        string = "";
        updateDisplay();
    }
});