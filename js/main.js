/**
 * ===================================================================
 * main js
 *
 * -------------------------------------------------------------------
 */

(function ($) {
	"use strict";
  
	/*---------------------------------------------------- */
	/* Preloader
	  ------------------------------------------------------ */
	$(window).load(function () {
	  // will first fade out the loading animation
	  $("#loader").fadeOut("slow", function () {
		// will fade out the whole DIV that covers the website.
		$("#preloader").delay(300).fadeOut("slow");
	  });
	});
  
	/*---------------------------------------------------- */
	/* FitText Settings
		------------------------------------------------------ */
	setTimeout(function () {
	  $("#intro h1").fitText(1, { minFontSize: "42px", maxFontSize: "84px" });
	}, 100);
  
	/*---------------------------------------------------- */
	/* FitVids
	  ------------------------------------------------------ */
	$(".fluid-video-wrapper").fitVids();
  
	/*---------------------------------------------------- */
	/* Owl Carousel
	  ------------------------------------------------------ */
	$("#owl-slider").owlCarousel({
	  navigation: false,
	  pagination: true,
	  itemsCustom: [
		[0, 1],
		[700, 2],
		[960, 3],
	  ],
	  navigationText: false,
	});
  
	/*----------------------------------------------------- */
	/* Stat Counter
		------------------------------------------------------- */
	let statSection = $("#stats"),
	  stats = $(".stat-count");
  
	statSection.waypoint({
	  handler: function (direction) {
		if (direction === "down") {
		  stats.each(function () {
			let $this = $(this);
  
			$({ Counter: 0 }).animate(
			  { Counter: $this.text() },
			  {
				duration: 4000,
				easing: "swing",
				step: function (curValue) {
				  $this.text(Math.ceil(curValue));
				},
			  }
			);
		  });
		}
  
		// trigger once only
		this.destroy();
	  },
  
	  offset: "90%",
	});

	/*----------------------------------------------------- */
	/* Skills Animation + Reveal
		------------------------------------------------------- */
	let skillBars = $(".skill-bars"),
	  skillProgress = skillBars.find(".progress"),
	  revealBlocks = $(".about-card, #portfolio .folio-item, .service, .contact-card, #contact form");

	skillProgress.each(function () {
	  let $bar = $(this);
	  let widthClass = ($bar.attr("class") || "").match(/percent(\d{1,3})/);
	  let targetWidth = widthClass ? widthClass[1] + "%" : "0%";

	  $bar.attr("data-target-width", targetWidth);
	  $bar.css("width", "0%");
	});

	skillBars.waypoint({
	  handler: function (direction) {
		if (direction === "down") {
		  let $list = $(this.element);

		  $list.addClass("is-animated");
		  $list.find(".progress").each(function (index) {
			let $bar = $(this);
			let targetWidth = $bar.attr("data-target-width") || "0%";

			$bar.delay(index * 140).animate(
			  { width: targetWidth },
			  900,
			  "swing"
			);
		  });

		  this.destroy();
		}
	  },
	  offset: "80%",
	});

	revealBlocks.addClass("reveal-up");
	revealBlocks.each(function (index) {
	  let element = this;
	  $(element).css("transition-delay", Math.min(index % 4, 3) * 90 + "ms");

	  $(element).waypoint({
		handler: function (direction) {
		  if (direction === "down") {
			$(element).addClass("is-visible");
			this.destroy();
		  }
		},
		offset: "88%",
	  });
	});
  
	/*---------------------------------------------------- */
	/*	Portfolio Carousel
	  ------------------------------------------------------ */
	let containerProjects = $("#folio-wrapper");

	if (containerProjects.hasClass("portfolio-carousel")) {
	  containerProjects.owlCarousel({
		navigation: true,
		navigationText: [
		  "<i class='fa fa-angle-left'></i>",
		  "<i class='fa fa-angle-right'></i>",
		],
		pagination: false,
		autoPlay: 5000,
		stopOnHover: true,
		rewindNav: true,
		itemsCustom: [
		  [0, 1],
		  [700, 2],
		  [1024, 3],
		  [1400, 4],
		],
		slideSpeed: 700,
		paginationSpeed: 500,
	  });
	} else {
	  containerProjects.imagesLoaded(function () {
		containerProjects.masonry({
		  itemSelector: ".folio-item",
		  resize: true,
		});
	  });
	}
  
	/*----------------------------------------------------*/
	/*	Modal Popup
	  ------------------------------------------------------*/
	$(".item-wrap a").magnificPopup({
	  type: "inline",
	  fixedContentPos: false,
	  removalDelay: 300,
	  showCloseBtn: false,
	  mainClass: "mfp-fade",
	});
  
	$(document).on("click", ".popup-modal-dismiss", function (e) {
	  e.preventDefault();
	  $.magnificPopup.close();
	});
  
	/*-----------------------------------------------------*/
	/* Navigation Menu
	 ------------------------------------------------------ */
	let toggleButton = $(".menu-toggle"),
	  nav = $(".main-navigation");
  
	// toggle button
	toggleButton.on("click", function (e) {
	  e.preventDefault();
	  toggleButton.toggleClass("is-clicked");
	  nav.slideToggle();
	});
  
	// nav items
	nav.find("li a").on("click", function () {
	  if (window.matchMedia("(max-width: 768px)").matches) {
		toggleButton.removeClass("is-clicked");
		nav.fadeOut();
	  }
	});
  
	/*---------------------------------------------------- */
	/* Highlight the current section in the navigation bar
		------------------------------------------------------ */
	let sections = $("section"),
	  navigation_links = $("#main-nav-wrap li a");
  
	sections.waypoint({
	  handler: function (direction) {
		let active_section;
  
		active_section = $("section#" + this.element.id);
  
		if (direction === "up") active_section = active_section.prev();
  
		let active_link = $(
		  '#main-nav-wrap a[href="#' + active_section.attr("id") + '"]'
		);
  
		navigation_links.parent().removeClass("current");
		active_link.parent().addClass("current");
	  },
  
	  offset: "25%",
	});
  
	/*---------------------------------------------------- */
	/* Smooth Scrolling
		------------------------------------------------------ */
	$(".smoothscroll").on("click", function (e) {
	  e.preventDefault();
  
	  let target = this.hash,
		$target = $(target),
		headerHeight = $("header").outerHeight() || 0;
  
	  $("html, body")
		.stop()
		.animate(
		  {
			scrollTop: Math.max($target.offset().top - headerHeight + 2, 0),
		  },
		  800,
		  "swing",
		  function () {
			window.location.hash = target;
		  }
		);
	});
  
	/*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	  ------------------------------------------------------ */
	$("input, textarea, select").placeholder();

	/*---------------------------------------------------- */
	/* Contact Form
	  ------------------------------------------------------ */
	let contactForm = $("#contactForm"),
	  submitLoader = $("#submit-loader"),
	  messageWarning = $("#message-warning"),
	  messageSuccess = $("#message-success");

	contactForm.on("submit", function (e) {
	  e.preventDefault();

	  let $form = $(this),
		submitButton = $form.find(".submitform");

	  messageWarning.hide().html("");
	  messageSuccess.hide();
	  submitLoader.fadeIn(200);
	  submitButton.prop("disabled", true);

	  $.ajax({
		url: $form.attr("action"),
		method: "POST",
		data: $form.serialize(),
		dataType: "json",
		headers: {
		  Accept: "application/json",
		},
	  })
		.done(function () {
		  submitLoader.fadeOut(200);
		  submitButton.prop("disabled", false);
		  messageSuccess.fadeIn(200);
		  $form[0].reset();
		})
		.fail(function () {
		  submitLoader.fadeOut(200);
		  submitButton.prop("disabled", false);
		  messageWarning
			.html("Não foi possível enviar sua mensagem agora. Tente novamente em instantes ou fale comigo pelo e-mail.")
			.fadeIn(200);
		});
	});
  
	/*----------------------------------------------------- */
	/* Back to top
	 ------------------------------------------------------- */
	let pxShow = 300; // height on which the button will show
	let fadeInTime = 400; // how slow/fast you want the button to show
	let fadeOutTime = 400; // how slow/fast you want the button to hide
  
	// Show or hide the sticky footer button
	jQuery(window).scroll(function () {
	  if (jQuery(window).scrollTop() >= pxShow) {
		jQuery("#go-top").fadeIn(fadeInTime);
	  } else {
		jQuery("#go-top").fadeOut(fadeOutTime);
	  }
	});
  })(jQuery);
  
