;(function(){

    'use strict';

    let $btn = document.querySelector('.header-nav__hamburgger'),
        $html = document.querySelector('html'),
        $menuList = document.querySelector('#mainMenu'),
        menuOpened = 'menu-opened',
        menuOpenedToggle = false;

    $html.addEventListener('click', function(e){
        if(e.target === $html && menuOpenedToggle){
            closeMenu();
        }
    });

    $btn.addEventListener('click', toggleMenu);

    function toggleMenu(){
        if(menuOpenedToggle){
            closeMenu();
        }else{
            openMenu();
        }
    }

    function closeMenu(){
        menuOpenedToggle = false;
        $html.classList.remove(menuOpened);
        $menuList.setAttribute('aria-expanded', false);
        $btn.setAttribute('aria-expanded', false);
    }

    function openMenu(){
        menuOpenedToggle = true;
        $html.classList.add(menuOpened);
        $menuList.setAttribute('aria-expanded', true);
        $btn.setAttribute('aria-expanded', true);
    }

}());