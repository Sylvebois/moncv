$(function () {  
    displayStart();
    applyResize();
    scrollSpy();
    modMailTo();
    checkModal();
    createSVG();
    diapo();
});


/*
 * Dimensionnement de l'accueil
 */

//Mise en place de départ
function displayStart() {    
    $('#start section').css({ height: $(window).height() + 'px' });
    $('#start section div').css({ 
        position: 'relative', 
        top:($(window).height()/3) + 'px'
    });
}

// Redimensionnement de l'accueil en cas de changement de la taille d'écran
function applyResize() {
    $(window).on('resize', function() { 
        displayStart();
        createSVG();
    }); 
}

//Création du svg
function createSVG() {
    var largeur = $(window).width();
    var hauteur = $(window).height();
    
    $('#bg').empty();
    $('#bg').width(largeur);
    $('#bg').height(hauteur);
    
    svgBasic(largeur, hauteur);
}

//svg de base
function svgBasic(w, h){
    var nbLignes = (w > h)? Math.floor(h/10) : Math.floor(w/10);
    var pasH = h/nbLignes;
    var pasW = w/nbLignes;
    
    var startXY = 10;
    var endXY = (w > h)? w/2 : h/2;
    
    for(var i = 0; i <= nbLignes; i++) {
        var line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute('x1', i*pasW);
        line1.setAttribute('y1', 0);
        line1.setAttribute('x2', w);
        line1.setAttribute('y2', i*pasH);
        line1.setAttribute('stroke', setColor(1, i));
        line1.setAttribute('stroke-width',1);
        
        var line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute('x1', 0);
        line2.setAttribute('y1', i*pasH);
        line2.setAttribute('x2', w-(pasW*i));
        line2.setAttribute('y2', 0);
        line2.setAttribute('stroke', setColor(2, i));
        line2.setAttribute('stroke-width',1);
        
        var line3 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line3.setAttribute('x1', 0);
        line3.setAttribute('y1', h-(pasH*i));
        line3.setAttribute('x2', w-(pasW*i));
        line3.setAttribute('y2', h);
        line3.setAttribute('stroke',setColor(4, i));
        line3.setAttribute('stroke-width',1);
                
        var line4 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line4.setAttribute('x1', pasW*i);
        line4.setAttribute('y1', h);
        line4.setAttribute('x2', w);
        line4.setAttribute('y2', h-(pasH*i));
        line4.setAttribute('stroke', setColor(3, i));
        line4.setAttribute('stroke-width',1);

        $('#bg').append(line1);
        $('#bg').append(line2);
        $('#bg').append(line3);
        $('#bg').append(line4);
    }  
}

//crée le dégradé de couleur
function setColor(type, cmp) {
    var r,v,b = 0;
    
    if (type === 1) {
        r = 22;
        v = (150-cmp < 142)? 142 : 150-cmp;
        b = (cmp > 72)? 72 : cmp;
    }
    else if (type === 2) {
        r = (255-cmp < 194)? 194 : 255-cmp;
        v = 33;
        b = (cmp > 39)? 39 : cmp; 
    }
    else if (type === 3) {
        r = (255-cmp < 140)? 140 : 255-cmp;
        v = (cmp > 106)? 106 : cmp;
        b = 55; 
    }
    else if (type === 4) {
        r = 194;
        v = (cmp > 33)? 33 : cmp;
        b = (255-cmp < 39)? 39 : 255-cmp; 
    }
    
    return 'rgb('+r+','+v+','+b+')';
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
            $('.modal-dialog').load('./includes/startForm/form_accueil.html');
            $('.modal-dialog').css({
                'background-color': 'rgb(255,255,255)',
                'border-radius': '6px',
                'box-shadow': 'rgba(0,0,0,0.5) 0px 5px 15px 0px',
                'border': 'solid 1px rgba(0,0,0,0.2)'
            });
            
            $('#modalForm').modal('show');
        }); 
    }
    
    $('footer a').click(function() {
        $('.modal-dialog').load('./includes/startForm/form_accueil.html');
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
        loadForm('form1');
    });  
    $('#modalForm').on('click','#form3 #formPrev',function(){
        loadForm('form2');
    });  
 
    //Suivant
    $('#modalForm').on('click','#form1 #formNext',function(){
        loadForm('form2');
    });
    $('#modalForm').on('click','#form2 #formNext',function(){
        loadForm('form3');
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
    $('.modal-dialog').load('./includes/startForm/'+nom+'.html');    
}

/*
 * Gestion du carrousel
 */
function diapo() {    
    loadText('text1');
    
    $('.carousel').carousel({interval : 7000});
    $('.carousel').on('slid.bs.carousel', function(){
        var tmpId = $('#portfolio .carousel .active').attr('id');
        tmpId = tmpId.substring(3);  

        loadText('text'+tmpId);
    });
}

//Chargement du texte à côté du carrousel
function loadText(nom) {
    $('#textCarousel').empty();
    $('#textCarousel').load('./includes/carouselText/'+nom+'.html');     
}

/*
 * Divers
 */

//Génération d'un nombre aléatoire
function randIntIncl(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
}

//Modifie l'adresse mail
function modMailTo() {
    $('a[href^="mailto:"]').on('click', function(e) {
        var mail = $(this).attr('href').replace('mailto:', '');
        mail = mail.split('').reverse().join('');

        $(this).attr('href', 'mailto:' + mail);
    });
}