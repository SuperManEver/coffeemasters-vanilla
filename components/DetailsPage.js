export default class DetailsPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });

    this.styles = document.createElement('style');

    this.root.appendChild(this.styles);

    this.loadCSS();
  }

  async loadCSS() {
    const request = await fetch('/components/DetailsPage.css');
    const css = await request.text();

    this.styles.textContent = css;
  }

  connectedCallback() {
    const template = document.getElementById('product-item-template');
    const content = template.content.cloneNode(true);

    this.root.appendChild(content);
  }
}

customElements.define('details-page', DetailsPage);
