+++

title = "Rules For Working With Me"
description = "Some rules to work with me."
date = 2025-09-02

[taxonomies]
tags = ["productivity", "rant"]

+++

## Why do I need this?

I'm difficult. I have _strong preferences_, _rules_, and _boundaries_ that need to be adhered to in a non-professional environment.  
<br />

Working on the basis of _full transparency_ regarding my necessities is a great _filter_ when looking for the right people; I enjoy building things and enjoy even more the process of building an infrastructure to build things on.  
<br />
Thus, [the limits of its language mean the limits of its world](https://www.goodreads.com/quotes/5475578-5-6-the-limits-of-my-language-mean-the-limits-of), one is free to collaborate with me on any of my projects, so long as they share the same views.

## Regulae sacrae

> _A Latin phrase_ meaning "Sacred Rules"

<br /> Every single one of my projects, to an extent, have a standardized set of _tooling_ one will have to learn and use to _collaborate_. _Ethics_ and _attitude_ also play a big part in it.

### [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) + [Gitmoji](https://gitmoji.dev/)

I am a firm believer that _good commit messages_ equal a better collaboration experience, be it in _debugging_, _blaming_, _reverting_, and so on; it can be tedious, thus the usage of [Koji](https://github.com/cococonscious/koji) is recommended but _not required_ for committing to my repositories.

### [Conventional Branches](https://conventional-branch.github.io/)

Not much to say, refer to the previous heading.

### Ante agendum, dic

> _A Latin phrase_ meaning "Before acting, tell"

<br /> Nobody enjoys _merge conflicts_, _diverging histories_, _force-pushes_, and such. And quite frankly, I would just prefer _clear communication_ over doing whatever one feels like whenever one feels like.

### Adhere

I like _linters_ & _formatters_, I like it even more when code is _clean_, _elegant_, and properly _formatted_. I generally have hooks set up for _Nix_ users, but if one does not use _Nix_, I always provide the tooling needed to format and/or lint the project in _scripts_.  
<br />

Touching back on the previous paragraph, while it is not personally a die-hard _functional programming_ enthusiast, it would prefer elegant _declarative_ approaches rather than abominable _imperative_ ones;

#### Don't

Imperative, ugly, i-hate-you.  
<br />

```py
xs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = []

for x in xs:
    if x % 2 == 0:
        evens.append(x)

print(evens)
```

<br />

```js
const xs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = [];

for (const x of xs) {
  if (x % 2 === 0) {
    evens.push(x);
  }
}

console.log(evens);
```

#### Do

Elegant, concise, i-love-you.  
<br />

```py
xs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(lambda x: x % 2 == 0, xs))

print(evens)
```

<br />

```js
const xs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = xs.filter((x) => x % 2 === 0);

console.log(evens);
```

### Do Not Argue Pointlessly

I _like_ talking, I will listen to one's _opinion_, _patiently_, weigh the _pros_ and _cons_, and then decide whether it's a _"yes"_ or a _"no."_  
<br />
If I say no and give a reason for it, I really do not want to argue any more in bad faith, it just makes me not want to work with one. At all.

## Mutabilitas et Continuitas

> _A Latin phrase_ meaning "Change and Continuity"

<br /> This post is *subject to change* and should be a *constant reference*. My way of working *evolves*, and so do my *expectations*. One should *revisit this regularly* if they intend to work with me *long-term*.
