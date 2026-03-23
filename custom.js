customElements.define(
  "include-html",
  class extends HTMLElement {
    async connectedCallback() {
      const src = this.getAttribute("src");
      this.innerHTML = await (await fetch(src)).text();
    }
  },
);
