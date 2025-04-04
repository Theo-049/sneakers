let selectedPart = null;

document.querySelectorAll("#produit-svg path").forEach(part => {
    part.addEventListener("click", function() {
        if (selectedPart) {
            selectedPart.style.stroke = "none";
        }
        selectedPart = this;
        selectedPart.style.stroke = "black";
        document.getElementById("colorPicker").value = rgbToHex(selectedPart.getAttribute("fill"));
    });
});

document.getElementById("colorPicker").addEventListener("input", function() {
    if (selectedPart) {
        selectedPart.setAttribute("fill", hexToRgba(this.value, 0.6));
    }
});

function rgbToHex(rgb) {
    if (!rgb) return "#000000";
    const rgbValues = rgb.match(/\d+/g);
    if (!rgbValues) return "#000000";
    return `#${rgbValues.map(x => parseInt(x).toString(16).padStart(2, '0')).join('')}`;
}

function hexToRgba(hex, opacity) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

document.addEventListener("DOMContentLoaded", () => {
    const cartCount = document.getElementById("cart-count");
    const btnsAddToCart = document.querySelectorAll(".btn-add-to-cart");
    const confirmationMessage = document.getElementById("confirmation-message");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();

    btnsAddToCart.forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.dataset.id;
            const productName = button.dataset.name;
            const productImage = button.dataset.image;
            const sizeSelect = document.getElementById("size");
            const selectedSize = sizeSelect ? sizeSelect.value : "Taille unique";

            const product = {
                id: productId,
                name: productName,
                size: selectedSize,
                image: productImage
            };

            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();

            // ✅ Message de confirmation animé
            confirmationMessage.textContent = `✔️ "${productName}" (Taille ${selectedSize}) ajouté au panier !`;
            confirmationMessage.style.display = "block";
            confirmationMessage.style.opacity = "1";

            setTimeout(() => {
                confirmationMessage.style.opacity = "0";
                setTimeout(() => {
                    confirmationMessage.style.display = "none";
                }, 500);
            }, 3000);
        });
    });

    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }
});

// Créer un conteneur pour l'animation
const animContainer = document.createElement('div');
animContainer.id = 'lottie-animation';
animContainer.style.position = 'absolute';
animContainer.style.top = '0';
animContainer.style.left = '0';
animContainer.style.width = '100%';
animContainer.style.height = '100%';
animContainer.style.zIndex = '1000'; // Assure que l'animation est au premier plan
animContainer.style.pointerEvents = 'none';
animContainer.style.display = 'none';

// Ajouter le conteneur à product-image comme premier enfant
const productImage = document.querySelector('.product-image');
productImage.style.position = 'relative';
productImage.insertBefore(animContainer, productImage.firstChild);

// Initialiser l'animation
let anim = null;

// Écouter les changements de couleur
document.getElementById('colorPicker').addEventListener('change', function() {
    const color = this.value;
    
    // Afficher l'animation
    animContainer.style.display = 'block';
    
    if (!anim) {
        // Charger l'animation la première fois
        anim = lottie.loadAnimation({
            container: animContainer,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: 'animation.json'
        });

        // Cacher l'animation une fois terminée
        anim.addEventListener('complete', () => {
            animContainer.style.display = 'none';
        });
    } else {
        // Rejouer l'animation
        anim.goToAndPlay(0);
    }
});
