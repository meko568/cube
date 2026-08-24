(function () {
  'use strict';

  function init() {
    var burger = document.getElementById('navBurger');
    var nav = document.getElementById('mobileNav');
    if (!burger || !nav) return;

    var panel = nav.querySelector('.mobile-nav__panel');
    var backdrop = nav.querySelector('.mobile-nav__backdrop');
    var closeBtn = nav.querySelector('.mobile-nav__close');
    var links = nav.querySelectorAll('.mobile-nav__link');

    function isOpen() {
      return nav.classList.contains('is-open');
    }

    function setOpen(open) {
      if (open && nav.hidden) {
        nav.hidden = false;
        void panel.offsetWidth;
      }
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-open', open);

      if (open) {
        (closeBtn || links[0]).focus();
        return;
      }
      burger.focus();
      var hide = function () {
        if (!isOpen()) nav.hidden = true;
      };
      panel.addEventListener('transitionend', hide, { once: true });
      setTimeout(hide, 400);
    }

    burger.addEventListener('click', function () {
      setOpen(!isOpen());
    });
    closeBtn.addEventListener('click', function () {
      setOpen(false);
    });
    backdrop.addEventListener('click', function () {
      setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) setOpen(false);
    });
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    // Close the drawer if the viewport grows past the mobile breakpoint
    var mq = window.matchMedia('(min-width: 640px)');
    var onMq = function (e) {
      if (e.matches && isOpen()) setOpen(false);
    };
    if (mq.addEventListener) mq.addEventListener('change', onMq);
    else mq.addListener(onMq);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
