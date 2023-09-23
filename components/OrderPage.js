export default class OrderPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });

    this.styles = document.createElement('style');

    this.root.appendChild(this.styles);

    this.loadCSS();
  }

  async loadCSS() {
    const request = await fetch('/components/OrderPage.css');
    const css = await request.text();

    this.styles.textContent = css;
  }

  connectedCallback() {
    const template = document.getElementById('order-form-template');
    const content = template.content.cloneNode(true);

    this.root.appendChild(content);
  }
}

customElements.define('order-page', OrderPage);
