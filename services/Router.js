function moveScrollToTop() {
  window.scrollX = 0;
  window.screenY = 0;
}

function changeMainContent(childElement) {
  document.querySelector('main').innerHTML = '';
  document.querySelector('main').appendChild(childElement);
}

function handleBackButtonPress() {
  window.addEventListener('popstate', (event) => {
    Router.go(event.state.route, false);
  });
}

function setupLinks() {
  document.querySelectorAll('a.navlink').forEach((a) => {
    a.addEventListener('click', (event) => {
      event.preventDefault();
      const href = event.target.getAttribute('href');
      Router.go(href);
    });
  });
}

const Router = {
  init: () => {
    setupLinks();
    handleBackButtonPress();

    // Process initial URL
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
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

    moveScrollToTop();
  },
};

export default Router;
