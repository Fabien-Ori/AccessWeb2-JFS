// Blocs.js Minified
function setUpSpecialNavs() {
    $(".navbar-toggle").click(function(t) {
        var e = $(this).closest("nav"),
            i = e.find("ul.site-navigation"),
            a = i.clone();
        if (i.parent().hasClass("nav-special"))
            if (t.stopPropagation(), $(this).hasClass("selected-nav")) $(".blocsapp-special-menu blocsnav").removeClass("open"), $(".selected-nav").removeClass("selected-nav"), setTimeout(function() {
                $(".blocsapp-special-menu").remove(), $("body").removeClass("lock-scroll"), $(".selected-nav").removeClass("selected-nav")
            }, 300);

            // Essential navigation and dropdown functions
            function extraNavFuncs() {
                $(".site-navigation a").click(function(t) {
                    $(t.target).closest(".dropdown-toggle").length || $(".navbar-collapse").collapse("hide");
                });
                $("a.dropdown-toggle").click(function(t) {
                    $(this).parent().addClass("target-open-menu");
                    $(this).closest(".dropdown-menu").find(".dropdown.open").each(function() {
                        $(this).removeClass("open");
                    });
                    $(".target-open-menu").removeClass("target-open-menu");
                });
            }

            function setUpDropdownSubs() {
                $("ul.dropdown-menu [data-toggle=dropdown]").on("click", function(t) {
                    t.preventDefault();
                    t.stopPropagation();
                    $(this).parent().siblings().removeClass("open");
                    $(this).parent().toggleClass("open");
                    var e = $(this).parent().children(".dropdown-menu");
                    if (e.offset().left + e.width() > $(window).width()) {
                        e.addClass("dropmenu-flow-right");
                    }
                });
            }

            function scrollToTopView() {
                $(window).scroll(function() {
                    if ($(window).scrollTop() > $(window).height() / 3) {
                        $(".scrollToTop").addClass("showScrollTop");
                    } else {
                        $(".scrollToTop").removeClass("showScrollTop");
                    }
                });
            }

            function setUpLightBox() {
                $(document).on("click", "[data-lightbox]", function(t) {
                    t.preventDefault();
                    // Basic lightbox logic placeholder
                    // You can expand this as needed
                    var targetLightbox = $(this);
                    var caption = targetLightbox.attr("data-caption") || "";
                    // Show modal or lightbox here
                });
            }

            $(document).ready(function() {
                extraNavFuncs();
                setUpDropdownSubs();
                setUpLightBox();
                scrollToTopView();
                $('[data-toggle="tooltip"]').tooltip();
            });
    }), $(document).on("click", ".next-lightbox, .prev-lightbox", function(t) {
        t.preventDefault();
        var e = "no-gallery-set",
            i = $("a[data-lightbox]").index(targetLightbox),
            a = $("a[data-lightbox]").eq(i + 1);
        targetLightbox.attr("data-gallery-id") && (e = targetLightbox.attr("data-gallery-id"), i = $('a[data-gallery-id="' + e + '"]').index(targetLightbox), a = $('a[data-gallery-id="' + e + '"]').eq(i + 1)), $(this).hasClass("prev-lightbox") && (a = $('a[data-gallery-id="' + e + '"]').eq(i - 1), "no-gallery-set" == e && (a = $("a[data-lightbox]").eq(i - 1)));
        var o = a.attr("data-lightbox");
        if (".mp4" == o.substring(o.length - 4)) {
            var l = "";
            1 == a.attr("data-autoplay") && (l = "autoplay"), $("#lightbox-image, .lightbox-caption").hide(), $("#lightbox-video-container").show().html("<video controls " + l + ' class="embed-responsive-item"><source id="lightbox-video" src="' + o + '" type="video/mp4"></video>')
        } else $("#lightbox-image").attr("src", o).show(), $(".lightbox-caption").html(a.attr("data-caption")).show(), $("#lightbox-video-container").hide();
        targetLightbox = a, $(".next-lightbox, .prev-lightbox").hide(), "no-gallery-set" == e ? ($("a[data-lightbox]").index(a) != $("a[data-lightbox]").length - 1 && $(".next-lightbox").show(), $("a[data-lightbox]").index(a) > 0 && $(".prev-lightbox").show()) : ($('a[data-gallery-id="' + e + '"]').index(a) != $('a[data-gallery-id="' + e + '"]').length - 1 && $(".next-lightbox").show(), $('a[data-gallery-id="' + e + '"]').index(a) > 0 && $(".prev-lightbox").show())
    })
}

function addSwipeSupport() {
    $(".carousel-inner").length && $(".carousel-inner").swipe({
        swipeLeft: function(t, e, i, a, o) {
            $(this).parent().carousel("next")
        },
        swipeRight: function() {
            $(this).parent().carousel("prev")
        },
        threshold: 0
    })
}

function addKeyBoardSupport() {
    $(window).keydown(function(t) {
        37 == t.which ? $(".prev-lightbox").is(":visible") && $(".prev-lightbox").click() : 39 == t.which && $(".next-lightbox").is(":visible") && $(".next-lightbox").click()
    })
}

function addLightBoxSwipeSupport() {
    $("#lightbox-image").length && $("#lightbox-image").swipe({
        swipeLeft: function(t, e, i, a, o) {
            $(".next-lightbox").is(":visible") && $(".next-lightbox").click()
        },
        swipeRight: function() {
            $(".prev-lightbox").is(":visible") && $(".prev-lightbox").click()
        },
        threshold: 0
    })
}
$(document).ready(function() {
    $("#scroll-hero").click(function(t) {
        t.preventDefault(), $("html,body").animate({
            scrollTop: $("#scroll-hero").closest(".bloc").height()
        }, "slow")
    }), extraNavFuncs(), setUpSpecialNavs(), setUpDropdownSubs(), setUpLightBox(), setUpVisibilityToggle(), addSwipeSupport(), addKeyBoardSupport(), -1 != navigator.userAgent.indexOf("Safari") && -1 == navigator.userAgent.indexOf("Chrome") && $("#page-loading-blocs-notifaction").remove()
}), $(window).load(function() {
    setFillScreenBlocHeight(), animateWhenVisible(), $("#page-loading-blocs-notifaction").remove()
}).resize(function() {
    setFillScreenBlocHeight()
}), $(function() {
    $('[data-toggle="tooltip"]').tooltip()
});