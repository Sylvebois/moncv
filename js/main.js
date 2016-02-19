// Scrollspy fluide
$(function () {  
    checkModal();
    displayStart();
    applyResize();
    scrollSpy();
    modMailTo();
});


/*
 * Dimensionnement de l'accueil
 */
function displayStart() {
    var startHeight = $(window).height() - $('header nav').height();
    
    $('#start section').css({ height: startHeight + 'px' });
    $('#start section div').css({ 
        position: 'relative', 
        top:($(window).height()/3) + 'px' 
    });
}

/*
 * Redimensionnement de l'accueil en cas de changement de la taille d'écran
 */
function applyResize() {
    $(window).on('resize', function() { 
        displayStart();
    }); 
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
 * Gestion de la fenêtre modale
 */

//Vérifie si la fenêtre a déjà été ouverte
function checkModal() {
//    $(window).load(function(){
//        $('#modalForm').modal('show');
//    });
}

//Gestion des événements dans la fenêtre
function manageModal() {
    
}