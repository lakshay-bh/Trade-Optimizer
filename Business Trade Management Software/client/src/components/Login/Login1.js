import $ from 'jquery'
var main = function() {
    $('#login, .home .arrow.left').click(function() {
      $('.login-page').animate({
        left: "0px"
      }, 1000);
  
      $('body').animate({
        left: "100%"
      }, 1000);
    });
  
    $('.login-page .arrow.right').click(function() {
      $('.login-page').animate({
        left: "-100%"
      }, 1000);
  
      $('body').animate({
        left: "0px"
      }, 1000);
    });
    
    $('#register, .home .arrow.right').click(function() {
      $('.register-page').animate({
        left: "0px"
      }, 1000);
  
      $('body').animate({
        left: "-100%"
      }, 1000);
      
    });
    
    $('.register-page .arrow.left').click(function() {
      $('.register-page').animate({
        left: "100%"
      }, 1000);
  
      $('body').animate({
        left: "0px"
      }, 1000);
      
    });
    
  };
  
  
  document.addEventListener('DOMContentLoaded', (event) => {
    //the event occurred
    main()
  })