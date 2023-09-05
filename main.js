/* Operations*/
let add = (a, b) => a+b;
let subtract = (a, b) => a-b;
let multiply = (a, b) => a*b;
let divide = (a, b)=> a/b;
function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    switch(operator){
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "×": 
            return multiply(a,b);
        case "/":
            if(b===0) return null;
            else return divide(a,b);
        case "%":
            if(b===0) return await;
            else return(a%b);
        default:
            return null;
    }
}

const currentScreen = document.getElementById("screen-current");
const opSummary = document.getElementById("operationSummary");
const numpad = document.querySelectorAll(".numpad");
const resetButton = document.getElementById("reset");
const deleteButton = document.getElementById("delete");
const operators = document.querySelectorAll(".operator");
const decimal = document.getElementById("decimal");
const equals = document.getElementById("equals");
const keys = document.querySelectorAll("keys");

/*valueA is the first input into the operate function; valueB is the second*/
let valueA = 0;
let valueB = 0;
let currentOperation = null;
let queuedOperation = null;


numpad.forEach((button) =>{
    button.addEventListener("click", () =>{
        if(currentOperation == null){
            updateScreen("0");
            currentOperation = "0";
        }
        if(currentScreen.textContent === "0")
            currentScreen.textContent = button.textContent;
        else
            currentScreen.textContent+=button.textContent;
        opSummary.textContent+=button.textContent;
    })
});
operators.forEach((button) =>{
    button.addEventListener("click", () =>{
        currentOperation = button.textContent;
        button.classList.add("toggleOperators");
        if(opSummary.textContent.includes("="))
        opSummary.textContent = opSummary.textContent.substring(0,  opSummary.textContent.length-1);
        operatorPressed();
    });
});

resetButton.addEventListener("click", resetScreen);
deleteButton.addEventListener("click", backSpace);
decimal.addEventListener("click", printDecimal);
equals.addEventListener("click", equalsPressed);


/*Functions*/
function resetScreen(){
    currentScreen.textContent = "0";
    valueA = 0;
    let valueB = 0;
    currentOperation = null;
    queuedOperation = null;
    opSummary.textContent = "";

}

function backSpace(){
    let a = currentScreen.textContent;
    currentScreen.textContent = a.substring(0, a.length-1);
    if(a.length === "")
        currentScreen.textContent = 0;
   
}

function updateScreen(a){
    currentScreen.textContent = a;
}

function printDecimal(){
    if(!currentScreen.textContent.includes("."))
        currentScreen.textContent+=".";
}

function equalsPressed(){
    let temp = valueA;
    if(queuedOperation!=null){
        valueB = Number(currentScreen.textContent);
        valueA = operate(queuedOperation, valueA, valueB);
        currentScreen.textContent = valueA;
        updateScreen(valueA);
        opSummary.textContent = temp + "+" + valueB + "=";
    }
    queuedOperation = null;
}

function operatorPressed(){
    if(queuedOperation == null){
        queuedOperation = currentOperation;
        valueA = Number(currentScreen.textContent);
        opSummary.textContent += currentOperation;
    }
    else{
        valueB = Number(currentScreen.textContent);
        valueA = operate(queuedOperation, valueA, valueB);
        opSummary.textContent = valueA;
        opSummary.textContent += currentOperation;
        currentScreen.textContent = valueA;
        updateScreen(valueA);
        valueB = null;
        queuedOperation = currentOperation;
    }
    currentOperation = null;
}