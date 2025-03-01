+++
title = "Rules For Working With Me"
description = "Some rules to work with me, because, seriously, it's not easy."
date = 2025-09-02

[taxonomies]
tags = ["productivity", "rant"]
+++

## Why do I need this?

It is a difficult entity. It has _strong preferences_, _rules_, and _boundaries_ that need to be adhered to in a non-professional environment.  
<br />

Working on the basis of _full transparency_ regarding its necessities is a great _filter_ when looking for the right people; it enjoys building things and enjoys even more the process of building an infrastructure to build things on.  
<br />
Thus, [the limits of its language mean the limits of its world](https://www.goodreads.com/quotes/5475578-5-6-the-limits-of-my-language-mean-the-limits-of), one is free to collaborate with it on any of its projects, so long as they share the same views.

## Regulae sacrae

> _A Latin phrase_ meaning "Sacred Rules"

<br /> Every single one of its projects, to an extent, has a standardized set of _tooling_ one will have to learn and use to _collaborate_. _Ethics_ and _attitude_ also play a big part in it.

### [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) + [Gitmoji](https://gitmoji.dev/)

It is a firm believer that _good commit messages_ equal a better collaboration experience, be it in _debugging_, _blaming_, _reverting_, and so on; it can be tedious, thus the usage of [Koji](https://github.com/cococonscious/koji) is recommended but _not required_ for committing to its repositories.

### [Conventional Branches](https://conventional-branch.github.io/)

Not much to say, refer to the previous heading.

### Ante agendum, dic

> _A Latin phrase_ meaning "Before acting, tell"

<br /> Nobody enjoys _merge conflicts_, _diverging histories_, _force-pushes_, and such. And quite frankly, it would just prefer _clear communication_ over doing whatever one feels like whenever one feels like.

### Adhere

It likes _linters_ & _formatters_, it likes it even more when code is _clean_, _elegant_, and properly _formatted_. It generally has hooks set up for _Nix_ users, but if one does not use _Nix_, it always provides the tooling needed to format and/or lint the project in _scripts_.  
<br />

Touching back on the previous paragraph, while it is not personally a die-hard _functional programming_ enthusiast, it would prefer elegant _declarative_ approaches rather than abominable _imperative_ ones;

#### Don't

Imperative, ugly, it-hates-you.  
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

Elegant, concise, it-loves-you.  
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

It _likes_ talking, it will listen to one's _opinion_, _patiently_, weigh the _pros_ and _cons_, and then decide whether it's a _"yes"_ or a _"no."_  
<br />
If it says no and gives a reason for it, it really does not want to argue any more in bad faith, it just makes it not want to work with one. At all.

## Mutabilitas et Continuitas

> _A Latin phrase_ meaning "Change and Continuity"

<br /> This post is *subject to change* and should be a *constant reference*. Its way of working *evolves*, and so do its *expectations*. One should *revisit this regularly* if they intend to work with it *long-term*.
