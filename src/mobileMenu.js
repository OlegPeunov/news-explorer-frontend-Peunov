export default class MobileMenu{
  constructor(menuButton, header, headerNav, headerMenu) {
    this.menuButton= menuButton
    this.header = header
    this.headerNav = headerNav
    this.headerMenu = headerMenu
  }

  mobleMenuToggle=()=>{
    this.header.classList.toggle('header_type_menu-open')
    this.menuButton.classList.toggle('header__mobile-menu_open')
    this.headerNav.classList.toggle('header__navigation_type_menu-open')
    this.headerMenu.classList.toggle('header__menu_is-opened')
  }


  mobleMenuOpenToggle=()=>{
    this.header.classList.toggle('header_type_menu-open')
    this.menuButton.classList.toggle('header__mobile-menu_open')
    this.headerNav.classList.toggle('header__navigation_type_menu-open-white')
    this.headerMenu.classList.toggle('header__menu_is-opened')
    this.headerMenu.classList.toggle('header__menu_type_white')
  }


}