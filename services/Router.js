function changeMainContent(childElement) {
  document.querySelector('main').innerHTML = '';
  document.querySelector('main').appendChild(childElement);
}

const Router = {
  init: () => {
    document.querySelectorAll('a.navlink').forEach((a) => {
      a.addEventListener('click', (event) => {
        event.preventDefault();
        const href = event.target.getAttribute('href');
        Router.go(href);
      });
    });
    // Process initial URL
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    console.log('current router: ', route);

    if (addToHistory) {
      history.pushState({ route }, '', route);
    }

    let pageElement = null;

    switch (route) {
      case '/':
        pageElement = document.createElement('h1');
        pageElement.textContent = 'Menu';
        break;
      case '/order':
        pageElement = document.createElement('h1');
        pageElement.textContent = 'Order';
        break;
      default:
        if (route.startsWith('/product-')) {
          pageElement = document.createElement('h1');
          pageElement.textContent = 'Details';
          pageElement.dataset.productId = route.substring(
            route.lastIndexOf('-') + 1,
          );
        }
        break;
    }

    if (pageElement) {
      changeMainContent(pageElement);
    }

    window.scrollX = 0;
  },
};

export default Router;
