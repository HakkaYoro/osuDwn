// ==UserScript==
// @name         Osu Auto Download
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Baja automáticamente los mapas de Osu! en cuanto entras a la página.
// @author       Hakka!
// @match        https://osu.ppy.sh/beatmapsets/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ppy.sh
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Aquí definimos el botón que vamos a cliquear.
    // Usamos las clases para que funcione en cualquier idioma (Inglés, Español, etc).
    const SELECTOR_BOTON = 'a.btn-osu-big.btn-osu-big--beatmapset-header';

    function intentarDescarga() {
        const boton = document.querySelector(SELECTOR_BOTON);

        // Si el botón existe y no le hemos dado click antes...
        if (boton && !boton.dataset.yaCliqueado) {
            console.log("Botón encontrado, iniciando descarga...");
            boton.click();

            // Marcamos el botón para no volver a darle click a lo loco si el script corre de nuevo.
            boton.dataset.yaCliqueado = "true";
        }
    }

    // Usamos un observer para estar atentos a cambios en la página.
    // Esto es útil porque Osu a veces carga cosas dinámicamente sin recargar la pestaña.
    const vigilante = new MutationObserver((mutaciones) => {
        // En cada cambio del DOM revisamos si ya apareció el botón mágicamente.
        intentarDescarga();
    });

    // Empezamos a vigilar el cuerpo de la página en cuanto el script carga.
    // @run-at document-idle ya nos asegura que la página cargó lo básico.
    vigilante.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Por si las dudas, probamos una vez al inicio.
    intentarDescarga();

})();
