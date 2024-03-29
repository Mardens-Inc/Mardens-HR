$(".content-selector-button").on("click", e => {
    $("#contact-us form").css("display", "");
    const target = $(e.target);
    if (target.attr("active") !== undefined) {
        $("#contact-us form").css("display", "none");
        target.attr("active", null);
        return;
    }
    const targetId = target.attr("id");
    $(".content-selector-button").attr("active", null);
    target.attr("active", true);

    $("[notip]").css("display", "");
    if (targetId === "esp-button") {
        $("#content-title").html("Contact EPS");
    } else if (targetId === "human-resources-button") {
        $("#content-title").html("Contact HR");
    } else if (targetId === "tipline-button") {
        $("#content-title").html("Contact Tip-Line (Anonymous)");
        $("[notip]").css("display", "none");
    }


});
$("form").on("submit", async e => {
    $("#contact-us .loading").removeClass("hidden");
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
    if ($(".content-selector-button[active]").attr("id") === "human-resources-button") {
        url.searchParams.append("hr", "true");
    }
    if ($(".content-selector-button[active]").attr("id") === "tipline-button") {
        url.searchParams.append("tipline", "true");
    }

    await $.ajax(url.href, {
        method, headers, data: formData, complete: () => {
            $("#contact-us .loading").addClass("hidden");
        }, success: data => {
            console.log(data);
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