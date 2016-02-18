// Scrollspy fluide
$(function () {    
    $('#start section').css({ height: ($(window).height()) +'px' });
    $('#start section').css({ position: 'relative', top:($(window).height()/3) +'px' });
    scrollSpy();
});

/*
 * Création du background
 */
function createSVG() {
    
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