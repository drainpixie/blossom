+++

title = "Apt"
description = "Advanced Packaging Tool"
date = 2025-02-28

[taxonomies]
tags = ["tech", "debian"]

+++

It stands for *Advanced Packaging Tool*, mainly used on Debian (and based on.)  
<br />

Effectively a *front-end* to *dpkg*, `apt` improves over it by *managing relations* between packages and dependencies by running `dpkg` in the best possible sequence using [[Topological Sorting|topological sorting]].

## Installing a specific version of a package

```sh
sudo apt install vim=2:8.1.2269-1ubuntu5
```

## Hold package version

```sh
sudo apt-mark hold vim
```

## Simulate package installation

```sh
sudo apt install -s vim
```

## Add/remove a repository

```sh
sudo add-apt-repository ppa:nginx/stable
sudo apt update

sudo add-apt-repository --remove ppa:nginx/stable
sudo apt update
```
