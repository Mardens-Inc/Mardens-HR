// ==UserScript==
// @name         Mardens HR Kiosk
// @namespace    http://tampermonkey.net/
// @version      2024-02-20
// @description  a script that adds navigation to the kiosk firefox browser
// @author       Drew Chase
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mardens-hr.com
// @grant        none
// @downloadURL  https://cdn.statically.io/gh/mardens-inc/mardens-hr/master/assets/js/kiosk.js
// ==/UserScript==

(function () {
    'use strict';
    const links = document.querySelectorAll('a[target="_blank"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(link.href, '_self');
        });
    });
    const style = document.createElement("style");
    style.innerHTML = `
#kiosk-navigation {
  background: rgba(0,0,0,.7);
  position: fixed;
  top: 5px;
  left: 5px;
  display: flex;
  gap: 5px;
  padding: 5px;
  border-radius: 100px;
  z-index: 9999999999999999999999999999;
}
#kiosk-navigation > div {
  width: 32px;
  height: 32px;
  border: none;
  background: white;
  border-radius: 1010px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  padding: unset;
}
#kiosk-navigation > div > svg {
  width: 20px;
}
`;
    const nav = document.createElement("div");
    nav.id = "kiosk-navigation";
    const back = document.createElement("div");
    const forward = document.createElement("div");
    const home = document.createElement("div");
    back.id = "kiosk-back";
    forward.id = "kiosk-forward";
    home.id = "kiosk-home";
    home.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>`;
    home.addEventListener("click", () => {
        window.location.href = "https://mardens-hr.com";
    });


    forward.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>`;
    forward.addEventListener("click", () => {
        window.history.forward();

    });

    back.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>`;
    back.addEventListener("click", () => {
        window.history.back();
    });
    nav.appendChild(home);
    if (window.location.href !== "https://mardens-hr.com/") {
        nav.appendChild(back);
        nav.appendChild(forward);
    }
    document.body.appendChild(style);
    document.body.appendChild(nav);
})();