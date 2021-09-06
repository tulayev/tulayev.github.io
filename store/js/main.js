$(document).ready(function(){
  $(".hot-carousel-container").owlCarousel({
  	items: 1,
  	loop: true,
  	smartSpeed: 1000
  })

  $(".new-carousel-container").owlCarousel({
    items: 3,
    loop: true,
    smartSpeed: 500,
    responsive : {
    // breakpoint from 0 up
    0: {
        items: 1,
        dots: false
    },
    // breakpoint from 576 up
    576: {
        items: 2,
        dots: false
      },
    768: {
      items: 3
    }  
    }
  });
  
  // sidebar-menu
  $('.sidebar-menu-btn').on('click', function(e) {
  e.preventDefault();
  $('.sidebar-menu').addClass('sidebar-menu_active');
  });
  $('.sidebar-menu-btn-close').on('click', function(e) {
  e.preventDefault();
  $('.sidebar-menu').removeClass('sidebar-menu_active');
  });

  // accordion
  $('.card-header').on('click', function(e){
  	e.preventDefault();
  	$('.arrow-down').toggleClass('arrow-down_active');
  });

  // spinner
  $("#spinner")
  .spinner('delay', 200) //delay in ms
  .spinner('changed', function(e, newVal, oldVal) {
    // trigger lazed, depend on delay option.
  })
  .spinner('changing', function(e, newVal, oldVal) {
    // trigger immediately
  })
  .spinner({
    min: 1, 
    max: 999, 
    step: 1, 
    precision:0 
  });

  $(".js-range-slider").ionRangeSlider({
        type: "double",
        min: 0,
        max: 1000,
        from: 200,
        to: 500,
        grid: true,
        skin: "big",
        onChange: function (data) {
            // fired on every range slider update
            // Saving it's instance to var
  			var slider = $(".js-range-slider").data("ionRangeSlider");
  			// Get values
  			var from = slider.result.from;
  			var to = slider.result.to;
	      $("#from").html(from);
	      $("#to").html(to)
    },
  
  });


  var container = document.querySelector('.rating');
  var items = container.querySelectorAll('.rating-item')
  container.onclick = function(e) {
    if( ! e.target.classList.contains('active') ){
      items.forEach(function(item){
        item.classList.remove('active');
      });
      e.target.classList.add('active');
    }
  };

  //$('.custom-scroll_container').customScroll();
  
  SimpleScrollbar.initEl(document.querySelector(".custom-scroll_container"));

//http://standy.github.io/custom-scroll/

  
  });