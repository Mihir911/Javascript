let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButtons = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");

let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];

function initializer() {
    fontList.forEach((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    for (let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    fontSizeRef.value = 3;
}

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

fontName.addEventListener("change", () => {
    modifyText("fontName", false, fontName.value);
});

fontSizeRef.addEventListener("change", () => {
    modifyText("fontSize", false, fontSizeRef.value);
});

linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL?");
    if (!/^https?:\/\//i.test(userLink)) {
        userLink = "https://" + userLink;
    }
    modifyText("createLink", false, userLink);
});

window.onload = initializer();
