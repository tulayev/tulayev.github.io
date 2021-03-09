$(document).ready(function() {
	$('.carousel').carousel({
	  interval: 5000
	});
	

	

	// $(".btn-down").on('click', function() { 
	// 	$("HTML, BODY").animate({ scrollTop: 0 }, 1000); 
	// });

 $(function () {

            $(".btn-down").click(function (event) {
                event.preventDefault();
                var section = $(this).data("section");
                $("html, body").animate({ scrollTop: $("#" + section).offset().top }, 1000);
            });
        });




 
});