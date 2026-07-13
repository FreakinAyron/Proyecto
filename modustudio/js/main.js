$(document).ready(function () {

  // 1. ANIMACIONES EN SCROLL (LIBRERÍA AOS)
  if (window.AOS) {
    AOS.init({ 
      duration: 1000, 
      once: true,     
      offset: 100     
    });
  }

  // 2. VENTANA EMERGENTE DE BIENVENIDA (TOAST EN INDEX)
  const toastEl = document.getElementById('welcomeToast');
  if (toastEl) {
    setTimeout(function () {
      new bootstrap.Toast(toastEl, { delay: 5000 }).show(); 
    }, 1500);
  }

  // 3. INICIALIZAR HOVER DE INFORMACIÓN (TOOLTIPS EN NOSOTROS)
  $('[data-bs-toggle="tooltip"]').each(function () {
    new bootstrap.Tooltip(this);
  });

  // 4. CAMBIO DE COLOR DEL MENÚ (NAVBAR) Y CONTROL DEL BOTÓN VOLVER ARRIBA
  $(window).on('scroll', function () {
    const trackingScroll = $(this).scrollTop();

    // Comportamiento del Navbar
    if (trackingScroll > 60) {
      $('.ms-navbar').addClass('scrolled');
    } else {
      $('.ms-navbar').removeClass('scrolled');
    }

    // Comportamiento del Botón Volver Arriba
    if (trackingScroll > 100) {
      $('#scrollTopBtn').fadeIn(300);
    } else {
      $('#scrollTopBtn').fadeOut(300);
    }
  });

  // 5. ACCIÓN DE CLIC PARA EL BOTÓN VOLVER ARRIBA
  $('#scrollTopBtn').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  // 6. CONTADORES NUMÉRICOS AUTOMÁTICOS (ESTADÍSTICAS EN INDEX)
  function animarContadores() {
    $('.counter').each(function () {
      const $this = $(this);
      const target = parseInt($this.data('target'), 10); 
      
      if ($this.data('animated')) return;
      
      const topOfElement = $this.offset().top;
      const bottomOfScreen = $(window).scrollTop() + $(window).height();
      
      if (topOfElement < bottomOfScreen) {
        $this.data('animated', true); 
        
        $({ count: 0 }).animate({ count: target }, {
          duration: 2000, 
          easing: 'swing', 
          step: function () {
            $this.text(Math.floor(this.count));
          },
          complete: function () {
            $this.text(target + '+');
          }
        });
      }
    });
  }

  $(window).on('scroll load', animarContadores);

  // 7. FILTRO DINÁMICO DE IMÁGENES (GALERÍA)
  $('.modu-filter-btn').on('click', function () {
    const filterValue = $(this).data('filter');
    
    $('.modu-filter-btn').removeClass('active btn-dark').addClass('btn-outline-dark');
    $(this).addClass('active btn-dark').removeClass('btn-outline-dark');
    
    if (filterValue === 'all') {
      $('.modu-gallery-col').fadeIn(350);
    } else {
      $('.modu-gallery-col').hide();
      $('.modu-gallery-col[data-cat="' + filterValue + '"]').fadeIn(350);
    }
  });

  // 8. VENTANA EMERGENTE PARA AMPLIAR FOTOS (LIGHTBOX EN GALERÍA)
  $('.modu-img-box').on('click', function () {
    const imgSrc = $(this).find('img').attr('src');
    const imgCaption = $(this).data('caption') || '';
    
    $('#moduLightboxImg').attr('src', imgSrc);
    $('#moduLightboxCaption').text(imgCaption);
    
    const lanzarModal = new bootstrap.Modal(document.getElementById('moduLightboxModal'));
    lanzarModal.show();
  });

  // 9. VALIDACIÓN Y EFECTO DE CARGA DEL FORMULARIO (CONTACTO)
  const $formContacto = $('#moduContactForm');
  if ($formContacto.length) {
    $formContacto.on('submit', function (e) {
      e.preventDefault();
      
      if (this.checkValidity()) {
        $formContacto.addClass('was-validated');
        $('#progressWrapper').removeClass('d-none');
        
        let porcentaje = 0;
        const animacionBarra = setInterval(function () {
          porcentaje += 20;
          $('#sendingProgressBar').css('width', porcentaje + '%');
          
          if (porcentaje >= 100) {
            clearInterval(animacionBarra);
            $formContacto[0].reset();
            $formContacto.removeClass('was-validated');
            $('#progressWrapper').addClass('d-none');
            $('#sendingProgressBar').css('width', '0%');
            
            const lanzarToastExito = new bootstrap.Toast(document.getElementById('contactoSuccessToast'));
            lanzarToastExito.show();
          }
        }, 250);
      } else {
        $formContacto.addClass('was-validated');
      }
    });
  }

});