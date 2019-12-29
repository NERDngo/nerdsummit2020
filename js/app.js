//@todo once the old page is removed we can remove this codeblock
if (typeof Foundation !== 'undefined') {
  $(document).foundation();
}


$(function () {
  $('a[href*="#"]:not([href="#"])').click(function () {
    // Uncheck the overlay checkbox.
    $('#hamburger').prop("checked", false);

    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});