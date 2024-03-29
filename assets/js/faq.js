(async () => {
    await loadFAQ();

    async function loadFAQ() {
        const url = "/assets/md/faq.md";
        const response = await fetch(url);
        const text = await response.text();
        const converter = new showdown.Converter();
        const html = $(`<div id='faq-items'>${converter.makeHtml(text)}</div>`);
        const h1 = html.find("h1");
        const p = html.find("p");
        const faq = $(`<div id='faq-items' class="col"></div>`);

        for (let i = 0; i < h1.length; i++) {
            const h1Text = $(h1[i]).text();
            const pText = $(p[i]).text();
            const template = `
                <details>
                    <summary>${h1Text}</summary>
                    <p>${pText}</p>
                </details>
            `
            faq.append(template);
        }
        $(".faq-items").replaceWith(faq);
    }

    $("#print-faq-button").on('click', ()=>{
        const pdfUrl = "/assets/pdf/Employee FAQs.pdf";
        // print pdf
        window.open(pdfUrl, '_blank');

    })

})();