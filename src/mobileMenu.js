export default class MobileMenu{
  constructor(menuButton, header, headerNav, headerMenu) {
    this.menuButton= menuButton
    this.header = header
    this.headerNav = headerNav
    this.headerMenu = headerMenu
  }

  mobleMenuOpen=()=>{
    this.header.classList.add('header_type_menu-open')
    this.menuButton.classList.add('header__mobile-menu_open')
    this.headerNav.classList.add('header__navigation_type_menu-open')
    this.headerMenu.classList.add('header__menu_is-opened')
  }

  mobleMenuClose=()=>{
    this.header.classList.remove('header_type_menu-open')
    this.menuButton.classList.remove('header__mobile-menu_open')
    this.headerNav.classList.remove('header__navigation_type_menu-open')
    this.headerMenu.classList.remove('header__menu_is-opened')
  }

  mobleMenuOpenWhite=()=>{
    this.header.classList.add('header_type_menu-open')
    this.menuButton.classList.add('header__mobile-menu_open')
    this.headerNav.classList.add('header__navigation_type_menu-open-white')
    this.headerMenu.classList.add('header__menu_is-opened')
    this.headerMenu.classList.add('header__menu_type_white')
  }


}