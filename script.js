$(document).ready(function() {
    
    // Function to handle file input change event
    $('#fileInput').on('change', function() {
        // Clear previously uploaded files
        $('#uploadedFiles').empty();
        // Loop through each selected file
        for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i];
            // Display file name
            $('#uploadedFiles').append('<p>' + file.name + '</p>');
            // You can also upload the file to server using AJAX if needed
        }
    });
    
    $("#messageArea").on("submit", function(event) {
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const str_time = hour + ":" + minute;
        var rawText = $("#text").val();

        var userHtml =
            '<div class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send">' +
            rawText +
            '<span class="msg_time_send">' +
            str_time +
            "</span></div><div class='img_cont_msg'><img src='https://i.ibb.co/d5b84Xw/Untitled-design.png' class='rounded-circle user_img_msg'></div></div>";

        $("#text").val("");
        $("#messageFormeight").append(userHtml);

        $.ajax({
            data: JSON.stringify({
                user_id: "unique_user_id",
                question: rawText,
            }),
            type: "POST",
            url: "/chat",
            contentType: "application/json",
        }).done(function(data) {
            var botResponse = data.bot_response;
            var productInfo = data.product_info; // Get product info object

            var botHtml =
                '<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg"><img src="https://i.ibb.co/fSNP7Rz/icons8-chatgpt-512.png" class="rounded-circle user_img_msg"></div><div class="msg_cotainer">' +
                botResponse +
                '<span class="msg_time">' +
                str_time +
                "</span></div></div>";

            $("#messageFormeight").append($.parseHTML(botHtml));

            // Check if product info is available and display it
            if (productInfo && productInfo.product_url) {
                var productHtml =
                '<div class="d-flex justify-content-center align-items-center mb-4 product-box">' +
                '<a href="' + productInfo.product_url + '" target="_blank" class="product-link">Shop Now</a>' +
                '</a>' +
                '</div>';

                $("#messageFormeight").append(productHtml);
            }
        });
        event.preventDefault();
    });
});