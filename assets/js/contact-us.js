$(".content-selector-button").on("click", e => {
    const target = $(e.target);
    const targetId = target.attr("id");
    $(".content-selector-button").attr("active", null);
    target.attr("active", true);
});
$("form").on("submit", async e => {
    const form = $(e.target);
    const formData = form.serialize();
    console.log(formData)
    const url = new URL("/api/mail.php", window.location.origin);
    const method = "POST";
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    };

    if ($(".content-selector-button[active]").attr("id") === "esp-button") {
        url.searchParams.append("esp", "true");
    }

    await $.ajax(url.href, {
        method, headers, data: formData, success: data => {
            console.log(data);
            const response = JSON.parse(data);
            form.trigger("reset");

            form.find(".success").css("opacity", 1);
            setTimeout(() => {
                form.find(".success").css("opacity", 0);
            }, 5000);
        }, error: err => {
            console.error(err);

            form.find(".error").css("opacity", 1);
            setTimeout(() => {
                form.find(".error").css("opacity", 0);
            }, 5000);
        }
    })
});

$("form").on("reset", e => {
    const target = $(e.target);
    const inputs = target.find("input");
    inputs.val("");
})