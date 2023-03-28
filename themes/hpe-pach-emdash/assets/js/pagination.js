const paginator = document.getElementById('paginator');

if (paginator) {
paginator.children[0].classList.toggle('is-hidden');

currentPager = paginator.children[0]

   function revealPage(pager){
      lastVisiblePager = currentPager 
      lastVisiblePager.classList.toggle('is-hidden');
      currentPager = document.getElementById(pager)
      currentPager.classList.toggle('is-hidden');
      // remove black button class from last visible pager
   
   }


   // get all the button elements
   const buttons = document.querySelectorAll('button');
   console.log (buttons)
   // if the button is clicked, toggle the black class
   let lastButtonClicked = null;
   buttons.forEach(button => {
      button.addEventListener('click', function() {
         button.classList.toggle('black');
         button.classList.toggle("darken-7");
         button.classList.toggle("brighten-7");
         if (lastButtonClicked) {
            lastButtonClicked.classList.toggle('black');
            lastButtonClicked.classList.toggle("darken-7");
            lastButtonClicked.classList.toggle("brighten-7");
         }
         lastButtonClicked = button;
      });
   } );
}

