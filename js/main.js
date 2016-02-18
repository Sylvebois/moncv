// Scrollspy fluide
$(function () {   
    createSVG();
    displayStart();
    applyResize();
    scrollSpy();
    modMailTo();
});

/*
 * Création du background
 */
function createSVG() {
    var svgNS = "http://www.w3.org/2000/svg";
    
    var sWidth = $('#start').width();
    var sHeight = $('#start').height()- $('header nav').height();

    
    var poly = document.createElementNS(svgNS,'polyligne');
    poly.setAttributeNS(null, 'points', '5,5 45,45 5,45 45,5');
    poly.setAttributeNS(null, 'fill', 'none');
    poly.setAttributeNS(null, 'stroke', 'green');
    
    document.getElementById('svgBackground').appendChild(poly);
}

/*
 * Scrollspy fluide
 */
function scrollSpy() {
    $('header a').on('click', function(e) {
        e.preventDefault();
        var hash = this.hash; 
        
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top
        }, 1000, function(){
            window.location.hash = hash;
        });
    });    
}

/*
 * Modifie l'adresse mail
 */
function modMailTo() {
    $('a[href^="mailto:"]').on('click', function(e) {
        var mail = $(this).attr('href').replace('mailto:', '');
        mail = mail.split('').reverse().join('');

        $(this).attr('href', 'mailto:' + mail);
    });
}

/*
 * Dimensionnement de l'acceuil
 */
function displayStart() {
    var startHeight = $(window).height() - $('header nav').height();
    
    $('#start section').css({ height: startHeight + 'px' });
    $('#start section div').css({ 
        position: 'relative', 
        top:($(window).height()/3) + 'px' 
    });
    $('#svgBackground').css({  
        top: $('header nav').height() + 'px', 
        bottom: startHeight + 'px',
        width: $(window).width() + 'px',
        heigth: startHeight
    });
}

/*
 * Redimensionnement de l'accueil en cas de changement de la taille d'écran
 */
function applyResize() {
    $(window).on('resize', function() {  displayStart()	}); 
}