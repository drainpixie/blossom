export async function initPosts() {
    const response = await fetch('/api/posts');
    const posts = await response.json();

    const container = document.getElementById('posts-container');
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'popout';
        postDiv.innerHTML = `
            <p><span class="highlight">${post.date}</span> <span class="highlight">${post.tags.join(', ')}</span></p>
            <p><a href="${post.link}">${post.title}</a></p>
        `;
        container.appendChild(postDiv);
    });
}
