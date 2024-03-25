import './index.css'

class Link extends HTMLAnchorElement {
    connectedCallback() {
        this.rel = 'noopener noreferrer'
        this.target = '_blank'

        // Here we use `insertAdjacentHTML` to avoid the text-decoration
        this.insertAdjacentHTML('afterend', '<sub>↗</sub>')
    }
}

customElements.define('x-link', Link, { extends: 'a' });
customElements.define('blog-post-title', BlogPostTitle, { extends: 'h2' });
