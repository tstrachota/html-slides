$(function() {

  function getSlideNo() {
    var slideNo = $(location).attr('hash').substring(1);
    if (slideNo == "") {
      $(location).attr('hash', 0);
      return 0;
    } else {
      return parseInt(slideNo);
    }
  }

  function moveSlideNo(move) {
    var newIndex = getSlideNo() + move;
    if (newIndex >= 0 && newIndex < $('slide').length)
      $(location).attr('hash', newIndex);
  }

  function activeSlide() {
    return $('slide.active');
  }

  function prevSlide() {
    var prev = activeSlide().prev('slide');
    if (prev.length > 0)
      return prev;
    else
      return activeSlide();
  }

  function nextSlide() {
    var next = activeSlide().next('slide');
    if (next.length > 0)
      return next;
    else
      return activeSlide();
  }

  function swapSlides(a, b) {
    if (a == b)
      return;
    a.toggleClass('active')
    b.toggleClass('active')
  }

  // Parse all <* class="md"> or <md> with markdown
  $('.md').each(function(i, elem) {
    elem = $(elem)
    elem.html(marked(elem.text()));
  });

  $('md').each(function(i, elem) {
    elem = $(elem)
    elem.html(marked(elem.text()));
  });

  // Show active slide
  var i = getSlideNo();
  $('slide').eq(i).addClass('active');

  // Copy clases defining language from <code> to it's parent <pre>
  $('code').each(function(i, elem) {
    elem = $(elem);
    elem.closest('pre').addClass(elem.attr("class"));
  });

  // Pretty print the code
  $('code').addClass('prettyprint');
  prettyPrint();

  // Make arrows to switch slides
  $(document).keyup(function(e) {

    switch(e.which) {
      case 37: // left
        swapSlides(
          activeSlide(),
          prevSlide()
        );
        moveSlideNo(-1);
        break;

      case 39: // right
        swapSlides(
          activeSlide(),
          nextSlide()
        );
        moveSlideNo(1);
        break;
    }
  });

});
