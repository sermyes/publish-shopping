var currentCount = 0;

$(document).ready(function(){
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

    addCart(); 
    // 카트수량 

    filter(); 
    // 사이즈, 컬러 필터
});

function activeNav(){
    const $main_nav = $('header .main_nav > div > div:nth-child(2) ul > li');
    $main_nav.click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
}

function switchPage(){
    const $main_navPage = $('header .main_nav > div > div:nth-child(2) ul > li > a');
    const $mnavPage = $('header .mnav > div > .mnav_menu > ul > li > a');
    const $shop_detail = $('.detail');
    const $shop_cart = $('.cart');
    const $home = $('.home');
    const $shop = $('.shop');

    $('body').css({display: 'none'});
    $('body').fadeIn(1000);
    
    reloadPage($main_navPage);
    reloadPage($mnavPage);
    reloadPage($shop_detail);
    reloadPage($shop_cart);
    reloadPage($home);
    reloadPage($shop);
    
    function reloadPage($target){
        $target.click(function(e){
            e.preventDefault();
            if($(this).hasClass('collection')){
                $(this).stop();
            } else {
                linkLocation = $(this).attr('href');
                $('body').fadeOut(1000, redirectPage);
            }
        });
    }
    function redirectPage() {
        window.location = linkLocation;
    }
}

function onMnav(){
    $('.mnav_btn').click(function(){
        $('header .mnav').toggleClass('on');
    });

    $('.mnav_menu > ul > li:nth-child(3)').click(function(){
        $(this).toggleClass('active');
    });
}

function mySlide(){
    const $slide = $('.slideArea > div > .slide');
    const prev = $('.prev');
    const next = $('.next');
    const slideLength = $slide.length;
    let currentIndex = 0;

    prev.click(function(e){
        e.preventDefault();
        if(currentIndex < 0){
            currentIndex = slideLength - 1;
        }
        $slide.hide();
        $slide.eq(currentIndex).fadeIn(1000)
        currentIndex--;
    });

    next.click(function(e){
        e.preventDefault();
        if(currentIndex > slideLength - 1){
            currentIndex = 0;
        }
        $slide.hide();
        $slide.eq(currentIndex).fadeIn(1000)
        currentIndex++;
    });
}

function changeDetailImage(){
    $('.smallImg').find('li').click(function(e){
        e.preventDefault();
        let newSrc = $(this).find('a img').attr('data-target');
        $('.bigImg').attr('src', newSrc);
    });
}

function changeDetailTab(){
    $('.tabMenu').find('li').click(function(e){
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        let tab_numb = $(this).attr('data-tabNumb');
        $('.tabContents').find('> div').hide();
        $('#' + tab_numb).fadeIn(1000);
    });
}

function changeProductQuantity(){
    calcQuantity($('.detail_addcart'));

    for(let i = 1; i <= 12; i++){
        if(i < 10){
            calcQuantity($('#product_0' + i));
        }else{
            calcQuantity($('#product_' + i));
        }
    }

    function calcQuantity($target){
        const $quantity = $target.find('.quantity');
        const $quantity_total = $target.find('.quantity_total');
        const price = $quantity_total.text().substring(1);
        const $quantity_btn = $quantity.find('i');
        const $quantity_input = $quantity.find('input');
    
        $quantity_btn.click(function(){
            let currentCount = $quantity_input.val();
            if($(this).hasClass('plus')){
                $quantity_input.val(++currentCount);
            }else{
                if(currentCount > 1){
                    $quantity_input.val(--currentCount);
                }
            }
            $quantity_total.text( '$' + (price * currentCount).toFixed(2) );
            calcTotalPrice();
        });
    }

    function calcTotalPrice(){
        const $quantity_totals = $('.quantity_total');
        let total = 0.00;
        for(let i = 0; i < $quantity_totals.length; i++){
            let price = $quantity_totals.eq(i).text().substring(1);
            price = parseFloat(price);
            total += price;
        }
        $('.subtotal').text('$' + total.toFixed(2));
        $('.total').text('$' + total.toFixed(2));
    }
}

function changeWish(){
    for(let i = 1; i <= 12; i++){
        if(i < 10){
            toggleWish($('#product_0' + i));
        }else{
            toggleWish($('#product_' + i));
        }
    }
    
    function toggleWish($target){
        $target.find('.wish').click(function(e){
            e.preventDefault();
            $(this).toggleClass('active');
            if($(this).hasClass('active')){
                $(this).find('img').attr('src','images/ico_heart_active.png');
            }else{
                $(this).find('img').attr('src','images/ico_heart.png');
            }
        });
    }
}

function addCart(){
    let currentCount = 0;
    let cartProduct = [];
    let doubleCheck = false;
    let index = 0;
        
    $('.addCart').click(function(){
        let currentProduct = $(this).parents('[id *= product_]');
        doubleCheck = false;
        for(let i = 0; i < cartProduct.length; i++){
            if(currentProduct.attr('id') == cartProduct[i]){
                doubleCheck = true;
            }
        }
        if(doubleCheck == false){
            currentCount++;
            cartProduct[index] = currentProduct.attr('id');
            index++;
            $('.cartCount').text(currentCount);
        }
    });
}

function filter(){
    filterShop($('.size input')); // shop 사이즈 필터
    filterShop($('.color input')); // shop 컬러 필터
    filterShop($('.price_select input')); // shop 가격 필터
    filterBestSeller(); // index bestseller 필터
}

function filterShop($filter_menu){
    const $filter = $filter_menu;
    const $targetList = $('.product');

    $filter.click(function(){
        let targetValue = [];
        
        $filter.filter(':checked').each(function(){
            targetValue.push('.' + $(this).val());
        });

        if($filter.filter(':checked').length == 0){
            $targetList.hide();
            $targetList.fadeIn();
        }else{
            let targetClass = targetValue.join(', ');
            $targetList.hide();
            $(targetClass).fadeIn();
        }
    });
}

function filterBestSeller(){
    const $filter = $('.bestSellFilter li');
    const $targetList = $('.product');
    
    $filter.click(function(e){
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        let targetClass = '.' + $(this).attr('id');
        if(targetClass === '.bestSell'){
            $targetList.hide();
            $targetList.fadeIn();
        }else{
            $targetList.hide();
            $(targetClass).fadeIn();
        }
    });
}

