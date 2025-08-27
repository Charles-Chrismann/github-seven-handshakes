# Github Seven Handshakes

## Overview
**Github Seven Handshakes** is an experimental project that aims to discover a chain of followers between two people on GitHub.

It is based on the theory of the [Six (or Seven) Degrees of Separation](https://en.wikipedia.org/wiki/Six_degrees_of_separation), which suggests that anyone in the world can be connected to anyone else through a chain of at most six (or seven) handshakes.

This project applies that theory to GitHub, using "follows" relationships instead of real-world connections.

## How it works
- The project explores the network of followers on GitHub.
- Given two GitHub users, it tries to find the shortest path of follower connections between them.
- The architecture is organized as a **monorepo** powered by [Nx](https://nx.dev/).
- The backend is built with [Express](https://expressjs.com/).

## Current Status
This project is currently in an experimental stage. It demonstrates the concept but is not yet optimized for performance or scalability.

I am currently considering reviving the project to:
- Improve its performance and structure
- Add a **fancy UI** to make the exploration of GitHub connections more visual and interactive

## Inspiration
- [Six Degrees of Separation](https://en.wikipedia.org/wiki/Six_degrees_of_separation)
- Social graph exploration and network theory
