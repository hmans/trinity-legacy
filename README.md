[![Version](https://img.shields.io/npm/v/@hmans/trinity)](https://www.npmjs.com/package/@hmans/trinity)
[![CI](https://github.com/hmans/trinity/workflows/CI/badge.svg)](https://github.com/hmans/trinity/actions?query=workflow%3ACI)
[![Downloads](https://img.shields.io/npm/dt/@hmans/trinity.svg)](https://www.npmjs.com/package/@hmans/trinity)
[![Bundle Size](https://img.shields.io/bundlephobia/min/@hmans/trinity?label=bundle%20size)](https://bundlephobia.com/result?p=@hmans/trinity)

# ☢️ TRINITY

# This package is currently super-duper experimental. Please do not use it. It is an extraction from my current project, and under heavy flux. There is no documentation, in an effort to really, truly, utterly stop you from using it.

## OVERVIEW

Trinity is a component framework for building games or similar interactive media with **React** and **Three.js**.

#### Examples & Demos

Please check out the [Trinity Examples](https://trinity-examples.netlify.app/) site. Every example has its source code included, and has a link to a Codesandbox where you can experiment with it.

## GETTING STARTED

## Adding Trinity to your project

```
npm install -D @hmans/trinity
```

or

```
yarn add -D @hmans/trinity
```

**NOTE:** Trinity is currently only built as a 100% ESM package, meaning that you can only use it in an environment that supports ES/JS modules.

## USING THE REACTOR

_TODO_

## ADVANCED USAGE

_TODO_

## NOTES

### Differences from react-three-fiber

At the core of Trinity is its Reactor, which is very similar in nature to the [react-three-fiber] package. If you're coming here from react-three-fiber and wondering how Trinity is different, wonder no more:

- Trinity does not implement its own React renderer/reconciler, but works with plain React components instead. This is why, in Trinity, you typically write `<T.Mesh>` where, in r3f, you would write `<mesh>`. Trinity's components are generated on the fly through the Reactor and interact with the Three.js scene try through sideeffects. Not implementing its own renderer yields a bunch of advantages, including not having to bridge contexts across two separate renderers.
- Trinity aims to be "batteries included" and comes with a whole set of game-related functionality, including its own ticker implementation and separate update/lateupdate/etc. callbacks.
- Trinity always gives you complete control over when frames should be rendered (while in r3f this functionality is opt-in.) If Trinity ever renders a frame that your code did not request, please file a bug.
- Besides components, Trinity also exports a `useManagedThreeObject` hook that allows you to set up a managed Three.js resource outside of your component tree.

[react-three-fiber]: https://github.com/pmndrs/react-three-fiber
