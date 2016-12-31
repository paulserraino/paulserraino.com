---
layout: post
title:  "Redux Design Patterns"
date:   2016-02-16 6:07:59
categories: javascript
thumbnail: redux-logo.png
summary: Redux leverages functional design patterns to manage state containers. Let's take a deeper look into how those design patterns work to implement our own version of Redux.
---

# λ

### Reduce Procedure

The `reduce` function is an extremely powerful tool that is used to build new data sets from existing collections of data.

The `reduce` function is a [higher-order function](https://en.wikipedia.org/wiki/Higher-order_function) that accepts at least two arguments: a [pure function](https://en.wikipedia.org/wiki/Pure_function) and an initial state (of any data type). The pure function is evaluated recursively with the current list item and the previous state applied as arguments.

{% highlight javascript %}
var initialState = 0;

var sum = [1,2,3,4,5].reduce(add, initialState); // => 15

function add(a, b) {
    // the reduce method with apply arguments to this method as follows:
    // `a` the previous state
    // `b` the current item in the list
    return a + b;
}

// when `.reduce` is called `add` is recursively evaluated as follows:
// add(0, 1)  => 1
// add(1, 2)  => 3
// add(3, 3)  => 6
// add(6, 4)  => 10
// add(10, 5) => 15

{% endhighlight %}

Redux uses the reduce pattern to create manageable state containers for application stores. Notice, that in the above example, that each time `add` is evaluated it returns the current state of the recursive process. In Redux, the `add` method would be referred as a "reducer" and the elements of the list could be thought of as actions; and the state could be thought of as the state of the application. The biggest difference is that in Redux, we don't process lists of actions, actions are "dispatched". Each time an action is dispatched the reducer (a pure function) is evaluated with the current state and the action object as arguments.  

### Composite Functions
Functional composition is a way mapping the results of one function to the arguments of another. This is a useful tool, as it allows us create new abstractions by combining other abstractions. Composite functions are used in Redux to create middleware.

{% highlight javascript %}
function f(x) { return x*x }
function g(x) { return x*2 }
function h(x) { return x+1 }

f(g(h(2))) // => 36
{% endhighlight %}

## Implementing Redux

Using our knowledge of `reduce` and functional composition lets try to implemented some the methods found in Redux from scratch.

### createStore

The store is the heart of Redux. Redux stores are made up of the following:

- the state of the application
- dispatch method, used to dispatch actions to the store
- listener method, used to listen for state changes
- reducer, a pure function used to change the state of store based on an action
- getState method, which returns the current state of the store

While the store is made of many things, its implementation is quite simple and can be written in 20 or 30 lines of code.

{% highlight javascript %}
function createStore(reducer) {
    var state;
    var listeners = []

    function getState() {
        return state
    }

    // The redux store interface is similar to the flux dispatcher
    // in that the flow of data is unidirectional, but unlike the
    // flux dispatcher, the Redux store is not an event-emitter it's
    // an observable object.

    // So unlike in the flux dispatcher, where we use a key/value map to
    // to manage dispatcher tokens and registered callbacks, the Redux
    // `subscribe` method simply uses an array, `listeners`, to store
    // callbacks. No tokens, no maps.

    function subscribe(listener) {
        listeners.push(listener)

        // The `unsubscribe` method will remove the listener from the
        // `listeners` array.

        return unsubscribe() {
            var index = listeners.indexOf(listener)
            listeners.splice(listener)
        }
    }

    // The `dispatch` method is used invoke actions on store and depending
    // on the type of the action the store's state will change.

    function dispatch(action) {

        // Here the reducer function is call to get the new state of the
        // store. Remember the reducer is pure function, meaning it does
        // not augment its parent scope. The reducer function returns a
        // new state object and that object is assigned to the current
        // state of the store.

        state = reducer(state, action)

        // Each time the `dispatch` method is called every listener is the
        // `listeners` array is invoked.

        listeners.forEach(listener => listener())
    }

    // Here we call the dispatch method with an empty object to initialize
    // the state of the store.

    dispatch({})

    // lastly we expose the API
    return { dispatch, subscribe, getState }
}
{% endhighlight %}


### combineReducers

As we have seen in the example above, the entire state of the application is determined by a reducer function that accepts two arguments: the current state and an action. Actions, tell the reducer how the application's state should change and the reducer function returns the new state.

Using a single reducer works for most trivial applications but it doesn't scale. As the application's state tree grows, it becomes more difficult for the reducer to make state changes. The solution to this problem is to implement child reducers. This solution not works well for Redux, but implementing single minded functions is a good practice when working with complex datasets. So lets take at look at how to implement child reducers with Redux's `combineReducers` function.

{% highlight javascript %}
// Let's say our application state looks something like this:

const state = {
    foo: [],
    bar: null
}

// and instead having a single reducer manage state changes for `foo` and `bar`,
// we want to use child reducers to manage individual parts of the state tree.

// We can do this by using the `combineReducers` function.

const appReducer = combineReducers({
    foo: fooReducer,
    bar: barReducer  
})

{% endhighlight %}

The `combineReducers` function accepts one argument, a key/value map. The key is the state field. The value is the child reducer. `combineReducers` maps the child reducer to the state field and returns a new reducer.

How does it work?

The implementation of `combineReducers` is quite simple and can be written is a few lines of code.
{% highlight javascript %}
function combineReducers(reducers) {
    return newReducer;

    function newReducer(nextState, action) {

        // Here we get the list of keys from the reducers key/value map
        // and we call the `reduce` function that we talked about earlier.

        // We call the `reduce` function with the initial state as empty
        // object, `{}`.

        return Object.keys(reducers).reduce((nextstate, key) => {

            // We call the child reducer for a give key and the child
            // reducer should return the next state for the given key.

            nextState[key] = reducers[key].call(this, state[key], action)

            // Finally we return the new state.

            return nextState
        }, {})
    }
}
{% endhighlight %}

### applyMiddleware

The middleware layer in Redux leverages <a href="#composite-functions">function composition</a>, that we discussed earlier.

So lets implement a `compose` helper function that will allow us to easily preform function composition.

{% highlight javascript %}

// compose(f, g, h) is the same as f(g(h(x)))

function compose(...funcs) {
    return function(...args) {
        const lastFn = funcs[funcs.length - 1]
        const fns = funcs.slice(0, 1)

        // We initialize the state of `reduceRight` with the return value of
        // the last function. The results of the previous function are than
        // passed as arguments to the next.

        return fns.reduceRight((result, f) => f(result), lastFn(...args))
    }
}
{% endhighlight %}

Now that we have a convenient way of composing functions, we can start to write the middleware layer for our Redux implementation.

We're going to implement the `applyMiddleware` function. This function will create middleware that "sits" between the store's `dispatch` method its action handler (a.k.a the reducer). So the data flow will look something like this:

{% highlight javascript %}
// [Dispatch action] --> [Middleware functions] --> [Store's reducer]
{% endhighlight %}

So let's build it!

{% highlight javascript %}
// Our `applyMiddleware` function will accept n functions as arguments and wraps the
// Redux `createStore` method.

// ex. applyMiddleware(f, g, h)(createStore)

function applyMiddleware(...middlewares) {
    return (createStore) => (reducer, initialState) => {

        // we need to create a Redux store
        var store = createStore(reducer, initialState)
        var dispatch = store.dispatch

        // setup the middleware api
        var api = {
            getState: store.getState,
            dispatch: dispatch
        }

        // we get a list of middleware functions

        var chain = middlewares.map((middleware) => middleware(api))

        // we compose those functions and wrap the store's `dispatch` method

        dispatch = compose(...chain)(dispatch)

        // Finally, we return the store's interface with the new `dispatch` method

        return {
            ...store,
            dispatch
        }
    }
}
{% endhighlight %}

## Resources

- [mini-redux](https://github.com/paulserraino/mini-redux)
- [redux source](https://github.com/reactjs/redux/tree/master/src)
