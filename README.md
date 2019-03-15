# react-ssr-example

Server Side Rendering in React

### Why Server Side Render?

Server Side Rendering / Isomorphic JavaScript / Universal JavaScript is the idea of running JavaScript on both client and server. Advantages being code reuse, improved performance and SEO gains.

### Concept

Server sends HTML document to client, client gets to see pre-rendered HTML without having to wait for JavaScript execution on the client side.

### Things to keep in mind

1. Client and Server representation of React components must be identical because there is no guarantee that attribute differences will be patched.
