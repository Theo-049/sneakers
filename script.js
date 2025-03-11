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

                // L'animation et l'effet d'opacité s'activent uniquement après la sélection de la couleur
                afficherLottie();
                appliquerOpacite();
            }
        });
    });

    // Modifier la couleur via la palette personnalisée
    window.changeColor = function (picker) {
        if (selectedPart) {
            selectedPart.setAttribute("fill", picker.toHEXString());

            // L'animation et l'effet d'opacité s'activent uniquement après la sélection de la couleur
            afficherLottie();
            appliquerOpacite();
        }
    };

    function afficherLottie() {
        // Vérifier si une animation existe déjà et la supprimer si c'est le cas
        let existingLottie = document.querySelector("#lottie-overlay");
        if (existingLottie) {
            existingLottie.remove();
        }

        // Créer un conteneur pour l'animation Lottie
        let lottieContainer = document.createElement("div");
        lottieContainer.id = "lottie-overlay"; // Identifiant pour faciliter la suppression
        lottieContainer.style.position = "fixed";
        lottieContainer.style.top = "0";
        lottieContainer.style.left = "0";
        lottieContainer.style.width = "100%";
        lottieContainer.style.height = "100%";
        lottieContainer.style.zIndex = "999";
        lottieContainer.style.display = "flex";
        lottieContainer.style.justifyContent = "center";
        lottieContainer.style.alignItems = "center";

        // Créer l'élément de l'animation Lottie
        let lottieAnimation = document.createElement("div");
        lottieAnimation.id = "lottie-animation";
        lottieContainer.appendChild(lottieAnimation);

        // Charger l'animation Lottie avec un fichier JSON externe
        fetch('gg.json') // Remplacez 'path/to/your/animation.json' par le chemin réel de votre fichier JSON
            .then(response => response.json())
            .then(data => {
                lottie.loadAnimation({
                    container: lottieAnimation,
                    renderer: 'svg',
                    loop: false,
                    autoplay: true,
                    animationData: data
                });
            })
            .catch(error => console.error('Erreur lors du chargement de l\'animation Lottie :', error));

        // Ajouter l'overlay Lottie au body
        document.body.appendChild(lottieContainer);

        // Supprimer l'overlay après 3 secondes (3000ms)
        setTimeout(() => {
            lottieContainer.remove();
        }, 3000);
    }

    function appliquerOpacite() {
        // Appliquer l'opacité seulement après la sélection de la couleur
        let existingOverlay = document.querySelector("#color-overlay");
        if (existingOverlay) {
            existingOverlay.remove(); // Retirer l'overlay précédent s'il existe
        }

        // Créer un nouvel overlay pour appliquer l'opacité
        let opacityOverlay = document.createElement("div");
        opacityOverlay.id = "color-overlay"; // Identifiant pour faciliter la suppression
        opacityOverlay.style.position = "fixed";
        opacityOverlay.style.top = "0";
        opacityOverlay.style.left = "0";
        opacityOverlay.style.width = "100%";
        opacityOverlay.style.height = "100%";
        opacityOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        opacityOverlay.style.zIndex = "998"; // S'assurer que l'overlay est derrière l'animation Lottie

        // Ajouter l'overlay au body
        document.body.appendChild(opacityOverlay);

        // Retirer l'overlay après 3 secondes
        setTimeout(() => {
            opacityOverlay.remove();
        }, 3000);
    }
});
