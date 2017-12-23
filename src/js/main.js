/* Menu toggle */
var navigationBg = $('.navigation');
var navigation = $('.navigation__overlay');
var toggle = $('#toggle');

$(toggle).click(function() {
	$(this).toggleClass('open');
    $(navigation).toggleClass('open');
    $(navigationBg).toggleClass('navigation__background');
});

/* Projects show and hide */
var categoryLink = $('.projectsNavigation__link');
var project = $('.projectsList__list');

var $btns = $(categoryLink).click(function() {
  if (this.id == 'All') {
    $(project).show();
  } else {
    var $el = $('.' + this.id).show();
    $(project).not($el).hide();
  }

  $btns.removeClass('active');
  $(this).addClass('active');
});


