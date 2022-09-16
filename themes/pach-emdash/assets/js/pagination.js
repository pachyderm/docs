const paginator = document.getElementById('paginator');

if (paginator) {
paginator.children[0].classList.toggle('is-hidden');

currentPager = paginator.children[0]

   function revealPage(pager){
      lastVisiblePager = currentPager 
      lastVisiblePager.classList.toggle('is-hidden');
      currentPager = document.getElementById(pager)
      currentPager.classList.toggle('is-hidden');
   }
}

