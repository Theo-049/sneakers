document.addEventListener("DOMContentLoaded", function () {
    let selectedPart = null; // Stocke la partie sélectionnée

    // Sélectionner une partie de la chaussure
    document.querySelectorAll("#produit-svg path").forEach(part => {
        part.addEventListener("click", function () {
            if (selectedPart) {
                selectedPart.classList.remove("selected");
            }
            selectedPart = this;
            selectedPart.classList.add("selected");
        });
    });

    // Appliquer une couleur en cliquant sur une pastille
    document.querySelectorAll(".color").forEach(color => {
        color.addEventListener("click", function () {
            if (selectedPart) {
                let hex = this.getAttribute("data-hex");
                selectedPart.setAttribute("fill", hex);
            }
        });
    });

    // Modifier la couleur via la palette personnalisée
    window.changeColor = function (picker) {
        if (selectedPart) {
            selectedPart.setAttribute("fill", picker.toHEXString());
        }
    };
});

