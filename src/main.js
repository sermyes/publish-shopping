var currentCount = 0;

$(document).ready(function() {
  switchPage();
  // 페이지이동

  activeNav();
  // 메인 네비게이션 이동

  onMnav();
  // 모바일 네비게이션

  mySlide();
  // 메인슬라이드

  changeDetailImage();
  // 제품디테일 이미지변경

  changeDetailTab();
  // 제품디테일 탭메뉴

  changeProductQuantity();
  // 카트 수량, 가격변경

  changeWish();
  // 찜하트 체크

  filter();
  // 사이즈, 컬러 필터
});

function activeNav() {
  const $main_nav = $('header .main_nav > div > div:nth-child(2) ul > li');
  $main_nav.click(function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
}

function switchPage() {
  const $main_navPage = $(
    'header .main_nav > div > div:nth-child(2) ul > li > a'
  );
  const $mnavPage = $('header .mnav > div > .mnav_menu > ul > li > a');
  const $shop_detail = $('.detail');
  const $shop_cart = $('.cart');
  const $home = $('.home');
  const $shop = $('.shop');

  reloadPage($main_navPage);
  reloadPage($mnavPage);
  reloadPage($shop_detail);
  reloadPage($shop_cart);
  reloadPage($home);
  reloadPage($shop);

  function reloadPage($target) {
    $target.click(function(e) {
      e.preventDefault();
      if ($(this).hasClass('collection')) {
        $(this).stop();
      } else {
        linkLocation = $(this).attr('href');
        $('body').fadeOut(700, () => (window.location = linkLocation));
      }
    });
  }
}

function onMnav() {
  $('.mnav_btn').click(function() {
    $('header .mnav').toggleClass('on');
  });

  $('.mnav_menu > ul > li:nth-child(3)').click(function() {
    $(this).toggleClass('active');
  });
}

function mySlide() {
  const $slide = $('.slideArea > div > .slide');
  const prev = $('.prev');
  const next = $('.next');
  const slideLength = $slide.length;
  let currentIndex = 0;

  prev.click(function(e) {
    e.preventDefault();
    if (currentIndex < 0) {
      currentIndex = slideLength - 1;
    }
    $slide.hide();
    $slide.eq(currentIndex).fadeIn(1000);
    currentIndex--;
  });

  next.click(function(e) {
    e.preventDefault();
    if (currentIndex > slideLength - 1) {
      currentIndex = 0;
    }
    $slide.hide();
    $slide.eq(currentIndex).fadeIn(1000);
    currentIndex++;
  });
}

function changeDetailImage() {
  $('.smallImg').find('li').click(function(e) {
    e.preventDefault();
    let newSrc = $(this).find('a img').attr('data-target');
    $('.bigImg').attr('src', newSrc);
  });
}

function changeDetailTab() {
  $('.tabMenu').find('li').click(function(e) {
    e.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
    let tab_numb = $(this).attr('data-tabNumb');
    $('.tabContents').find('> div').hide();
    $('#' + tab_numb).fadeIn(1000);
  });
}

function changeProductQuantity() {
  const $quantity = $('.quantity');
  $quantity.click(e => {
    e.preventDefault();
    const target = e.target;
    const input = e.currentTarget.children[0];
    if (target.matches('.plus')) {
      input.value = parseInt(input.value) + 1;
    } else if (target.matches('.minus')) {
      const value = parseInt(input.value) - 1;
      input.value = value < 1 ? 1 : value;
    }

    if ($(e.target).parents('.cartArea').length) {
      updateTotalPrice($(e.target).parents('[id *= product]'));
    }
  });
}

function updateTotalPrice(product) {
  const subTotal = $('.subtotal');
  const total = $('.total');
  const input = product.find('.quantity input');
  const price = product.find('.price').text().substr(1);
  const itemTotal = product.find('.quantity_total');
  const totalPrice = total.text().substr(1) - itemTotal.text().substr(1);

  const updatePrice = (input.val() * price).toFixed(2);
  itemTotal.text(`$${updatePrice}`);

  const updateTotalPrice = (parseFloat(updatePrice) +
    parseFloat(totalPrice)).toFixed(2);
  subTotal.text(`$${updateTotalPrice}`);
  total.text(`$${updateTotalPrice}`);
}

function changeWish() {
  $wish = $('.wish');
  $wish.click(e => {
    e.preventDefault();
    const target = e.currentTarget;
    const img = target.childNodes[0];
    target.classList.toggle('active');

    if (target.classList.contains('active')) {
      img.setAttribute('src', 'assets/images/ico_heart_active.png');
    } else {
      img.setAttribute('src', 'assets/images/ico_heart.png');
    }
  });
}

function filter() {
  filterShop($('.size input')); // shop 사이즈 필터
  filterShop($('.color input')); // shop 컬러 필터
  filterShop($('.price_select input')); // shop 가격 필터
  filterBestSeller(); // index bestseller 필터
}

function filterShop($filter_menu) {
  const $filter = $filter_menu;
  const $targetList = $('.product');

  $filter.click(function() {
    let targetValue = [];

    $filter.filter(':checked').each(function() {
      targetValue.push('.' + $(this).val());
    });

    if ($filter.filter(':checked').length == 0) {
      $targetList.hide();
      $targetList.fadeIn();
    } else {
      let targetClass = targetValue.join(', ');
      $targetList.hide();
      $(targetClass).fadeIn();
    }
  });
}

function filterBestSeller() {
  const $filter = $('.bestSellFilter li');
  const $targetList = $('.product');

  $filter.click(function(e) {
    e.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
    let targetClass = '.' + $(this).attr('id');
    if (targetClass === '.bestSell') {
      $targetList.hide();
      $targetList.fadeIn();
    } else {
      $targetList.hide();
      $(targetClass).fadeIn();
    }
  });
}
