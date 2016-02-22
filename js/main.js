$(function () {  
    displayStart();
    applyResize();
    scrollSpy();
    modMailTo();
    checkModal();
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
    var cookies = document.cookie.split(';');

    if(cookies.indexOf('formViewed=true') < 0) {
        $(document).ready(function () {
            //Mise en scène
            $('header').hide();
            $('#start section div').hide();
            
            //Chargement de la fenêtre
            $('.modal-dialog').load('./includes/form_accueil.html');
            $('#modalForm').modal('show');
        }); 
    }
    
    $('footer a').click(function() {
        $('.modal-dialog').load('./includes/form_accueil.html');
    });
    
    manageModal();
}

//Gestion des boutons dans la fenêtre
function manageModal() {
    //Début
    $('#modalForm').on('click','#formStart',function(){
        loadForm('form1');
    });
   
   //Précédent
    $('#modalForm').on('click','#form1 #formPrev',function(){
        loadForm('form_accueil');
    });
    $('#modalForm').on('click','#form2 #formPrev',function(){
        loadForm('form1')
    });  
    $('#modalForm').on('click','#form3 #formPrev',function(){
        loadForm('form2')
    });  
 
    //Suivant
    $('#modalForm').on('click','#form1 #formNext',function(){
        loadForm('form2')
    });
    $('#modalForm').on('click','#form2 #formNext',function(){
        loadForm('form3')
    });
    $('#modalForm').on('click','#form3 #formNext',function(){
        loadForm('form_fin');
        setTimeout(showResult, 2000);
   });
   
   //Fin
    $('#modalForm').on('click','#formEnd',function(){
       $('.modal-dialog').empty();
       $('#modalForm').modal('hide');
       document.cookie="formViewed=true"; 
    });    
    
    //Mise en scène
   $('#modalForm').on('hidden.bs.modal', function(){
        $('header').fadeIn('slow', function(){
            $('#start section div').fadeIn(3000);     
        });  
   });
}

//Affichage d'un résultat sur la dernière fenêtre modale
function showResult() {
    $('.modal-header h2:first-of-type').addClass('hidden');
    $('.modal-header h2:last-of-type').removeClass('hidden');
    
    $('.modal-body p:first-of-type').addClass('hidden');
    $('.modal-body p:last-of-type').removeClass('hidden');
    
    $('#formEnd').removeClass('disabled');
}

//Chargement d'une page dans la fenêtre modale
function loadForm(nom) {
    $('.modal-dialog').empty();
    $('.modal-dialog').load('./includes/'+nom+'.html');    
}