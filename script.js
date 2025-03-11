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
                
                afficherGif();
            }
        });
    });

    // Modifier la couleur via la palette personnalisée
    window.changeColor = function (picker) {
        if (selectedPart) {
            selectedPart.setAttribute("fill", picker.toHEXString());
            afficherGif();
        }
    };

    function afficherGif() {
        // Ajouter l'animation GIF
        let gif = document.createElement("img");
        gif.src = "anime.gif";
        gif.style.position = "absolute";
        gif.style.top = "50%";
        gif.style.left = "50%";
        gif.style.transform = "translate(-50%, -50%)";
        gif.style.pointerEvents = "none";
        gif.style.width = "300px";
        gif.style.height = "300px";
        gif.style.zIndex = "1000";

        // Redémarrer le GIF
        gif.src = ""; 
        gif.src = "anime.gif";

        document.body.appendChild(gif);
        
        // Ajouter un overlay pour diminuer l'opacité du fond sans affecter le GIF
        let overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        overlay.style.zIndex = "999";
        
        document.body.appendChild(overlay);
        
        // Supprimer le GIF et l'overlay après 3 secondes (3000ms)
        setTimeout(() => {
            gif.remove();
            overlay.remove();
        }, 2200);
    }
});
