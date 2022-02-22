# Promise-poser

## 一、什么是Promise

Promise 是 JS 中进行异步编程的新的解决方案

(1) 从语法上来说: Promise 是一个构造函数 

(2) 从功能上来说: promise 对象用来封装一个异步操作并可以获取其结果

**promise 的状态改变**

1. pending 变为 resolved 
2. pending 变为 rejected 

说明: 只有这 2 种, 且一个 promise 对象只能改变一次 无论变为成功还是失败, 都会有一个结果数据 成功的结果数据一般称为 vlaue, 失败的结果数据一般称为 reason。

**Promise是做什么的？**

Promise可以支持链式调用，用来解决回调地狱问题。

**Promise的体验**

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.css" rel="stylesheet">
</head>

<body>
  <!-- 需求，点击抽检按钮，检测是否可以中奖 中奖概率为百分之三十-->
  <h1>promise初体验</h1>
  <button id="btn">开始抽奖</button>

  <script>
    // 生成随机数
    function random(m, n) {
      return Math.ceil(Math.random() * (n - m + 1)) + m - 1
    }
    const btn = document.querySelector('#btn')
    btn.addEventListener('click', () => {
      const p = new Promise((resolve, reject) => {
        setTimeout(() => {
          // 30%的概率
          let n = random(1, 100)
          if (n <= 30) {  //中奖了
            resolve()
          }else{  //未中奖，
            reject()
          }
        }, 1000)
      })
      p.then(()=>{
        alert('中奖成功');
      },()=>{
        alert('很遗憾')
      })
    })

  </script>
</body>

</html>
```



## 二、Promise的相关API

### 2.1 Promise.resolve(value => {})，返回一个成功/失败的 Promise对象

`value`: 成功的数据或Promise对象

### 2.2 Promise.reject(error => {}), 返回一个失败的Promise对象

`error`：失败的错误

### 2.3 Promise.protptype.then(value => {}, error => {})

`Promise`成功后返回的第一个回调函数，失败后返回到第二个回调函数

### 2.4 Promise.all(params)

`params`是一个数组，内部可以传多个Promise对象，当所有的Promise都成功后返回的是所有Promise成功后的结果封装成的数组，一旦内部有一个失败，则返回的便是失败的Promise数据

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <!-- 
    promise.all的方法
      当所有的promise都为成功的时候，all方法返回的也是所有promise返回成功的结果
      一旦有一个为失败，那all方法返回的也是失败
   -->
  <script>
    let p1 = new Promise((resolve, reject) => {
      const data = { name: '啦啦啦', age: 12}
      resolve(data)
    })
    let p2 = new Promise((resolve, reject) => {
      const data = { name: '啦啦啦22', age: 12}
      // resolve(data)
      reject('Error')
    })
    let p3 = new Promise((resolve, reject) => {
      const data = { name: '啦啦啦33', age: 12}
      resolve(data)
    })
    let result = Promise.all([p1, p2, p3])
    console.log(result);
  </script>
</body>

</html>
```

### 2.5 Promise.race(params)

`params`是一个数组，内部可以传多个Promise，返回第一个完成Promise的结果状态，也是最终状态

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <script>
    let p1 = new Promise((resolve, reject) => {
      setTimeout(()=>{
        const data = { name: '啦啦啦', age: 12}
        resolve(data)
      },4000)
    })
    let p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = { name: '啦啦啦22', age: 12}
        // resolve(data)
        reject('Error')
      }, 2000);
    })
    let p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = { name: '啦啦啦33', age: 12}
        resolve(data)
      }, 3000);
    })
    let result = Promise.race([p1, p2, p3])
    console.log(result);
  </script>
</body>

</html>
```

### 2.6 Promise.protptype.catch(error => {})

可以捕获到Promise在返回失败时的结果

```js
<script>
    let p = new Promise((resolve, reject) => {
      const data = [1, 2, 3]
      resolve(data)
      // reject(data)
    })

    p.then(value => {
      alert(value)
    }).catch(err => {
      console.log(err);
    })
  </script>
```

## 三、Promise的几个关键问题

### 3.1 Promise如何改变状态

1.  通过resolve() pendding就会变为resolved
2.  通过reject() pendding就会变为rejected
3.  通过throw 关键字去抛出异常 pendding 就会变为 rejected

### 3.2 一个Promise指定多个回调 成功 or 失败 都会调用嘛？

当Promise改变为对应状态时都会调用

```js
<script>
    /** 
     * 当一个promise对象同时指定多个状态时，
     * 当 promise的状态改变成对应的状态后 ，对应的回调 都会执行
     */

    let p = new Promise((resolve,reject)=>{
      // resolve('ok')
      reject('no')
    })

    p.then((value) => {
      console.log(value)
    }).catch((reason) => {
      console.log(reason)
    });

    p.then((value) => {
      console.log(value)
    }).catch((reason) => {
      alert(reason)
    });
  </script>
```



### 3.3 改变Promise状态和指定回调函数谁先谁后？

1. 都有可能，正常情况下时先指定回调再改变状态，但也可以先改状态再指定回调
2. 如何先该状态再指定回调？
   - 直接调用`resolve()/reject()`
   - 延迟更长时间调用`then`
3. 什么时候才能得到数据？
   - 如果先指定的回调，当状态发生改变时，回调函数就会调用，得到数据
   - 如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据

当Promise内部代码时同步代码时，先执行resolve后执行then。当执行器函数内部的代码时异步的，就是then先执行，在执行异步代码里边的resolve

```js
<script>
    /* 
      改变 promise 状态和指定回调函数谁先谁后
        - 正常情况下是先指定回调，在改变状态； 但也可以先改变状态再指定回调

        - 如何先改变状态再指定回调？
          1.在执行器函数中直接调用 resolve/reject方法
          2.在执行器函数中(延迟更长时间后),才调用then方法

        - 什么时候才能拿到数据？ --> 回调函数什么时候执行
          1. 如果先指定的回调（异步延迟），当状态发生改变时，回调函数就会调用，得到数据
          2. 如果先改变的状态，当指定回调时，回调函数就会调用，得到数据
    */

    let p = new Promise((resolve,reject)=>{
      resolve('我调用了该函数，先改变了状态,一指定回调，就会进行调用')
    })

    p.then(value=>{
      console.log(value)
    },(reason)=>{
      console.log(reason)
    })

    let p2= new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve('我是异步任务，当我的状态改变时，回调函数才会调用')
      },3000)
    })

    p2.then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    });
  </script>
```



### 3.4 Promise.then()返回的新 promise 的结果状态由什么决定

由 then()指定的回调函数执行

- 如果抛出异常, 新 promise 变为 rejected, reason 为抛出的异常 
- 如果返回的是非 promise 的任意值, 新 promise 变为 resolved, value 为返回的值 
- 如果返回的是另一个新 promise, 此 promise 的结果就会成为新 promise的结果

```js
<body>
  <!-- then方法返回的promise对象结果由什么来决定？ -->
  <!-- 
      由then指定的回调函数的执行结果来决定
        1. 如果抛出异常，新的promise对象变为rejected，reason为抛出的异常
        2. 如果返回的是非promise的任意值，新promise变为resolved，value为返回的值
        3. 如果返回一个promise对象，则该promise的结果就是新promise的结果

   -->
  <script>
    let p = new Promise((resolve,reject)=>{
      resolve('ok')
    })

    let result = p.then((value) => {
      // 1.抛出错误
      // throw 'Error'
      // 2.返回非promise对象的任意值
      // return 333
      // 3.返回一个promise对象
      return new Promise((resolve,reject)=>{
        resolve('success')
        // reject('failed')
      })
    }).catch((reason) => {
      console.warn(reason)
    });

    console.log(result)
  </script>
</body>
```



### 3.5 promise 如何串连多个操作任务?

1.  promise 的 then()返回一个新的 promise, 可以开成 then()的链式调用 

2. 通过 then 的链式调用串连多个同步/异步任务

3. ```js
    <script>
       /* 
         promise串联多个操作任务
           1.promise的then()返回一个新的promise，可以看成then的链式调用
           2.通过then的链式调用串联多个同步、异步任务
       */
      
       let p = new Promise((resolve,reject)=>{
         setTimeout(()=>{
           resolve('异步任务执行了...')
         },1000)
       })
      
       p.then((value) => {
         return new Promise((resolve,reject)=>{
           resolve('then的回调执行了')
         })
       }).then((value) => {
         console.log(value)
       }).then(value=>{
         console.log(value)
       })
     </script>
   ```

   

### 3.6 Promise的异常穿透

1.  当使用 `.then` 链式调用时, 可以在最后指定失败的回调, 
2.  前面任何操作出了异常, 都会传到最后失败的回调中处理

```js
 <script>
    /* 
      promise对象的异常穿透 
        1.当使用promise的then链式调用时，可以再最后指定失败的回调
        2.前面任何操作出现了异常，都会传到最后失败的回到中处理
    */

    let p = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve('ok')
      },1000)
    })

    p.then(value=>{
      console.log(111)
      throw '我在这出错了'
    }).then(value=>{
      console.log(222)
    }).then(value=>{
      console.log(333)
    }).catch(reason=>{
      console.warn(reason)
    })

  </script>
```



### 3.7 如何中断 Promise 链？

在回调函数中返回一个 `pendding`状态的 `Promise`对象

即返回一个空状态的新的`Promise`

```js
 <script>
    /* 
      中断promise链条 
        有且只有一条方式,在回调函数中返回一个pendding状态的promise对象
    */
    let p = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve('ok')
      },1000)
    })

    p.then(value=>{
      console.log(111)
      return new Promise(()=>{})
    }).then(value=>{
      console.log(222)
    }).then(value=>{
      console.log(333)
    }).catch(reason=>{
      console.warn(reason)
    })
  </script>
```

## 四、自定义Promise

### 4.1 搭建Promise环境

```js

function Promise(executor) {

}
// 添加 then 方法
Promise.prototype.then = function(onResolved, onRejected) {

}
```

### 4.2 封装resolve和reject

```js

function Promise(executor) {

  // Promise的两个状态
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const _this = this;

  function resolve(data) {
    // 该函数下的 this 指向的是window

    // resolve内部需要改变状态和结果
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;

  }

  function reject(data) {
    // 该函数下的 this 指向的是window

    // reject 内部需要改变状态和结果
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;
    
  }

  // 执行器 函数 是 同步调用的
  executor(resolve, reject);


}

Promise.prototype.then = function(onResolved, onRejected) {

}
```

### 4.3 throw抛出异常中断promise

```js

function Promise(executor) {

  // Promise的两个状态
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const _this = this;

  function resolve(data) {
    // 该函数下的 this 指向的是window

    // resolve内部需要改变状态和结果
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;

  }

  function reject(data) {
    // 该函数下的 this 指向的是window

    // reject 内部需要改变状态和结果
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;
    
  }

  // 抛出异常捕获错误
  try {
    // 执行器 函数 是 同步调用的
    executor(resolve, reject);
  } catch (error) {
    reject(error)
  }


}

Promise.prototype.then = function(onResolved, onRejected) {

}
```

### 4.4 让promise的状态只能修改一次

```js

function Promise(executor) {

  // Promise的两个状态
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const _this = this;

  function resolve(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return; 
    // resolve内部需要改变状态和结果
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;

  }

  function reject(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;

    // reject 内部需要改变状态和结果
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;
    
  }

  // 抛出异常捕获错误
  try {
    // 执行器 函数 是 同步调用的
    executor(resolve, reject);
  } catch (error) {
    reject(error)
  }


}

Promise.prototype.then = function(onResolved, onRejected) {

}
```

### 4.5 方法回调函数的执行

```js

function Promise(executor) {

  // Promise的两个状态
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const _this = this;

  function resolve(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return; 
    // resolve内部需要改变状态和结果
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;

  }

  function reject(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;

    // reject 内部需要改变状态和结果
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;
    
  }

  // 抛出异常捕获错误
  try {
    // 执行器 函数 是 同步调用的
    executor(resolve, reject);
  } catch (error) {
    reject(error)
  }


}

Promise.prototype.then = function(onResolved, onRejected) {
  // then的回调执行
  if (this.PromiseState === 'fulfilled') {
    onResolved(this.PromiseResult)
  }
  
  if (this.PromiseState === 'rejected') {
    onRejected(this.PromiseResult)
  }
  
}
```

### 4.6 异步条件下执行then的回调

```js

function Promise(executor) {

  // Promise的两个状态
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const _this = this;
  // 创建空对象用来保存异步时，保存then回调的代码
  this.callback = {};

  function resolve(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return; 
    // resolve内部需要改变状态和结果
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;

    // 异步条件下调用成功的回调
    if (_this.callback.onResolved) {
      _this.callback.onResolved(data)
    }

  }

  function reject(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;

    // reject 内部需要改变状态和结果
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;
    
    // 异步条件下调用失败的回调
    if (_this.callback.onRejected) {
      _this.callback.onRejected(data)
    }
  }

  // 抛出异常捕获错误
  try {
    // 执行器 函数 是 同步调用的
    executor(resolve, reject);
  } catch (error) {
    reject(error)
  }


}

Promise.prototype.then =function (onResolved, onRejected) {
  // then的回调执行
  if (this.PromiseState === 'fulfilled') {
    onResolved(this.PromiseResult)
  }
  
  if (this.PromiseState === 'rejected') {
    onRejected(this.PromiseResult)
  }

  if (this.PromiseState === 'pending') {
    this.callback = {
      onResolved,
      onRejected
    }      
  }
}
```



### 4.7 多个then的链式调用

```js

function Promise(executor) {

  // Promise的两个状态
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const _this = this;
  // 创建空对象用来保存异步时，保存then回调的代码
  this.callbacks = [];

  function resolve(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;
    // resolve内部需要改变状态和结果
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;

    // 异步条件下调用成功的回调
    _this.callbacks.forEach(item => {
      item.onResolved(data)
    });
  }

  function reject(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;

    // reject 内部需要改变状态和结果
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;

    // 异步条件下调用失败的回调
    _this.callbacks.forEach(item => {
      item.onRejected(data)
    })
  }

  // 抛出异常捕获错误
  try {
    // 执行器 函数 是 同步调用的
    executor(resolve, reject);
  } catch (error) {
    reject(error)
  }


}

Promise.prototype.then = function (onResolved, onRejected) {
  // then的回调执行
  if (this.PromiseState === 'fulfilled') {
    onResolved(this.PromiseResult)
  }

  if (this.PromiseState === 'rejected') {
    onRejected(this.PromiseResult)
  }

  if (this.PromiseState === 'pending') {
    this.callbacks.push({
      onResolved,
      onRejected
    })
  }
}
```



### 4.8 同步修改then方法返回结果为promise

```js

function Promise(executor) {

  // Promise的两个状态
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const _this = this;
  // 创建空对象用来保存异步时，保存then回调的代码
  this.callbacks = [];

  function resolve(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;
    // resolve内部需要改变状态和结果
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;

    // 异步条件下调用成功的回调
    _this.callbacks.forEach(item => {
      item.onResolved(data)
    });
  }

  function reject(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;

    // reject 内部需要改变状态和结果
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;

    // 异步条件下调用失败的回调
    _this.callbacks.forEach(item => {
      item.onRejected(data)
    })
  }

  // 抛出异常捕获错误
  try {
    // 执行器 函数 是 同步调用的
    executor(resolve, reject);
  } catch (error) {
    reject(error)
  }


}

Promise.prototype.then = function (onResolved, onRejected) {
  // then 方法返回的结果仍然是一个Promise
  return new Promise((resolve, reject) => {
    // then的回调执行
    if (this.PromiseState === 'fulfilled') {
      try {
        // 获取回调函数的执行结果
        let result = onResolved(this.PromiseResult)
        if (result instanceof Promise) {
          result.then(value => {
            resolve(value)
          }, reason => {
            reject(reason)
          })
        } else {
          // 结果对象为成功
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }

    if (this.PromiseState === 'rejected') {
      onRejected(this.PromiseResult)
    }

    if (this.PromiseState === 'pending') {
      this.callbacks.push({
        onResolved,
        onRejected
      })
    }
  })
}
```



### 4.9 异步then方法返回结果为Promise

```js

function Promise(executor) {

  // Promise的两个状态
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const _this = this;
  // 创建空对象用来保存异步时，保存then回调的代码
  this.callbacks = [];

  function resolve(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;
    // resolve内部需要改变状态和结果
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;

    // 异步条件下调用成功的回调
    _this.callbacks.forEach(item => {
      item.onResolved(data)
    });
  }

  function reject(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;

    // reject 内部需要改变状态和结果
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;

    // 异步条件下调用失败的回调
    _this.callbacks.forEach(item => {
      item.onRejected(data)
    })
  }

  // 抛出异常捕获错误
  try {
    // 执行器 函数 是 同步调用的
    executor(resolve, reject);
  } catch (error) {
    reject(error)
  }


}

Promise.prototype.then = function (onResolved, onRejected) {
  const _this = this;
  // then 方法返回的结果仍然是一个Promise
  return new Promise((resolve, reject) => {
    // then的回调执行
    if (this.PromiseState === 'fulfilled') {
      try {
        // 获取回调函数的执行结果
        let result = onResolved(this.PromiseResult)
        if (result instanceof Promise) {
          result.then(value => {
            resolve(value)
          }, reason => {
            reject(reason)
          })
        } else {
          // 结果对象为成功
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }

    if (this.PromiseState === 'rejected') {
      onRejected(this.PromiseResult)
    }

    if (this.PromiseState === 'pending') {
      this.callbacks.push({
        onResolved: function () {
          try {
            // 执行成功的回调函数
            let result = onResolved(_this.PromiseResult)
            if (result instanceof Promise) {
              result.then(value => {
                resolve(value);
              }, reason => {
                reject(reason);
              })
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        },
        onRejected: function () {
          try {
            // 执行成功的回调函数
            let result = onRejected(_this.PromiseResult)
            if (result instanceof Promise) {
              result.then(value => {
                resolve(value);
              }, reason => {
                reject(reason);
              })
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        }
      })
    }
  })
}
```



### 4.10 对then方法回调函数的封装

```js

function Promise(executor) {

  // Promise的两个状态
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const _this = this;
  // 创建空对象用来保存异步时，保存then回调的代码
  this.callbacks = [];

  function resolve(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;
    // resolve内部需要改变状态和结果
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;

    // 异步条件下调用成功的回调
    _this.callbacks.forEach(item => {
      item.onResolved(data)
    });
  }

  function reject(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;

    // reject 内部需要改变状态和结果
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;

    // 异步条件下调用失败的回调
    _this.callbacks.forEach(item => {
      item.onRejected(data)
    })
  }

  // 抛出异常捕获错误
  try {
    // 执行器 函数 是 同步调用的
    executor(resolve, reject);
  } catch (error) {
    reject(error)
  }


}

Promise.prototype.then = function (onResolved, onRejected) {
  const _this = this;
  // then 方法返回的结果仍然是一个Promise
  return new Promise((resolve, reject) => {
    // 封装的then方法根据返回结果执行的回调
    function callback(type) {
      try {
        // 获取回调函数的执行结果
        let result = type(_this.PromiseResult)
        if (result instanceof Promise) {
          result.then(value => {
            resolve(value)
          }, reason => {
            reject(reason)
          })
        } else {
          // 结果对象为成功
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    // then的回调执行
    if (this.PromiseState === 'fulfilled') {
      callback(onResolved);
    }

    if (this.PromiseState === 'rejected') {
      callback(onRejected)
    }

    if (this.PromiseState === 'pending') {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        }
      })
    }
  })
}
```



### 4.11封装catch方法并进行异常穿透处理promise

```js

function Promise(executor) {

  // Promise的两个状态
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const _this = this;
  // 创建空对象用来保存异步时，保存then回调的代码
  this.callbacks = [];

  function resolve(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;
    // resolve内部需要改变状态和结果
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;

    // 异步条件下调用成功的回调
    _this.callbacks.forEach(item => {
      item.onResolved(data)
    });
  }

  function reject(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;

    // reject 内部需要改变状态和结果
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;

    // 异步条件下调用失败的回调
    _this.callbacks.forEach(item => {
      item.onRejected(data)
    })
  }

  // 抛出异常捕获错误
  try {
    // 执行器 函数 是 同步调用的
    executor(resolve, reject);
  } catch (error) {
    reject(error)
  }


}

Promise.prototype.then = function (onResolved, onRejected) {
  const _this = this;
  // 判断回调函数的参数
  if (typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = value => value;
  }
  // then 方法返回的结果仍然是一个Promise
  return new Promise((resolve, reject) => {
    // 封装的then方法根据返回结果执行的回调
    function callback(type) {
      try {
        // 获取回调函数的执行结果
        let result = type(_this.PromiseResult)
        if (result instanceof Promise) {
          result.then(value => {
            resolve(value)
          }, reason => {
            reject(reason)
          })
        } else {
          // 结果对象为成功
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    // then的回调执行
    if (this.PromiseState === 'fulfilled') {
      callback(onResolved);
    }

    if (this.PromiseState === 'rejected') {
      callback(onRejected)
    }

    if (this.PromiseState === 'pending') {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        }
      })
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}
```



### 4.12 封装resolve方法

```js

function Promise(executor) {

  // Promise的两个状态
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const _this = this;
  // 创建空对象用来保存异步时，保存then回调的代码
  this.callbacks = [];

  function resolve(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;
    // resolve内部需要改变状态和结果
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;

    // 异步条件下调用成功的回调
    _this.callbacks.forEach(item => {
      item.onResolved(data)
    });
  }

  function reject(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;

    // reject 内部需要改变状态和结果
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;

    // 异步条件下调用失败的回调
    _this.callbacks.forEach(item => {
      item.onRejected(data)
    })
  }

  // 抛出异常捕获错误
  try {
    // 执行器 函数 是 同步调用的
    executor(resolve, reject);
  } catch (error) {
    reject(error)
  }


}

Promise.prototype.then = function (onResolved, onRejected) {
  const _this = this;
  // 判断回调函数的参数
  if (typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = value => value;
  }
  // then 方法返回的结果仍然是一个Promise
  return new Promise((resolve, reject) => {
    // 封装的then方法根据返回结果执行的回调
    function callback(type) {
      try {
        // 获取回调函数的执行结果
        let result = type(_this.PromiseResult)
        if (result instanceof Promise) {
          result.then(value => {
            resolve(value)
          }, reason => {
            reject(reason)
          })
        } else {
          // 结果对象为成功
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    // then的回调执行
    if (this.PromiseState === 'fulfilled') {
      callback(onResolved);
    }

    if (this.PromiseState === 'rejected') {
      callback(onRejected)
    }

    if (this.PromiseState === 'pending') {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        }
      })
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

Promise.resolve = function (value) {
  // 返回一个Promise
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(value => {
        resolve(value)
      }, reason => {
        reject(reason)
      })
    } else {
      resolve(value)
    }
  }) 
}
```



### 4.13封装reject方法

```js

function Promise(executor) {

  // Promise的两个状态
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const _this = this;
  // 创建空对象用来保存异步时，保存then回调的代码
  this.callbacks = [];

  function resolve(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;
    // resolve内部需要改变状态和结果
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;

    // 异步条件下调用成功的回调
    _this.callbacks.forEach(item => {
      item.onResolved(data)
    });
  }

  function reject(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;

    // reject 内部需要改变状态和结果
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;

    // 异步条件下调用失败的回调
    _this.callbacks.forEach(item => {
      item.onRejected(data)
    })
  }

  // 抛出异常捕获错误
  try {
    // 执行器 函数 是 同步调用的
    executor(resolve, reject);
  } catch (error) {
    reject(error)
  }


}

Promise.prototype.then = function (onResolved, onRejected) {
  const _this = this;
  // 判断回调函数的参数
  if (typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = value => value;
  }
  // then 方法返回的结果仍然是一个Promise
  return new Promise((resolve, reject) => {
    // 封装的then方法根据返回结果执行的回调
    function callback(type) {
      try {
        // 获取回调函数的执行结果
        let result = type(_this.PromiseResult)
        if (result instanceof Promise) {
          result.then(value => {
            resolve(value)
          }, reason => {
            reject(reason)
          })
        } else {
          // 结果对象为成功
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    // then的回调执行
    if (this.PromiseState === 'fulfilled') {
      callback(onResolved);
    }

    if (this.PromiseState === 'rejected') {
      callback(onRejected)
    }

    if (this.PromiseState === 'pending') {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        }
      })
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

Promise.resolve = function (value) {
  // 返回一个Promise
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(value => {
        resolve(value)
      }, reason => {
        reject(reason)
      })
    } else {
      resolve(value)
    }
  }) 
}

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}
```



### 4.14封装all方法

```js

function Promise(executor) {

  // Promise的两个状态
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const _this = this;
  // 创建空对象用来保存异步时，保存then回调的代码
  this.callbacks = [];

  function resolve(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;
    // resolve内部需要改变状态和结果
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;

    // 异步条件下调用成功的回调
    _this.callbacks.forEach(item => {
      item.onResolved(data)
    });
  }

  function reject(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;

    // reject 内部需要改变状态和结果
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;

    // 异步条件下调用失败的回调
    _this.callbacks.forEach(item => {
      item.onRejected(data)
    })
  }

  // 抛出异常捕获错误
  try {
    // 执行器 函数 是 同步调用的
    executor(resolve, reject);
  } catch (error) {
    reject(error)
  }


}

Promise.prototype.then = function (onResolved, onRejected) {
  const _this = this;
  // 判断回调函数的参数
  if (typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = value => value;
  }
  // then 方法返回的结果仍然是一个Promise
  return new Promise((resolve, reject) => {
    // 封装的then方法根据返回结果执行的回调
    function callback(type) {
      try {
        // 获取回调函数的执行结果
        let result = type(_this.PromiseResult)
        if (result instanceof Promise) {
          result.then(value => {
            resolve(value)
          }, reason => {
            reject(reason)
          })
        } else {
          // 结果对象为成功
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    // then的回调执行
    if (this.PromiseState === 'fulfilled') {
      callback(onResolved);
    }

    if (this.PromiseState === 'rejected') {
      callback(onRejected)
    }

    if (this.PromiseState === 'pending') {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        }
      })
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

Promise.resolve = function (value) {
  // 返回一个Promise
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(value => {
        resolve(value)
      }, reason => {
        reject(reason)
      })
    } else {
      resolve(value)
    }
  }) 
}

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

Promise.all = function (PromiseArr) {
  return new Promise((resolve, reject) => {
    // 用来标记每个Promise都成功
    let count = 0;
    // 用来标识每个promise返回的结果
    let promiseResultArr = [];

    for (let i = 0; i < PromiseArr.length; i++) {
      PromiseArr[i].then(value=> {
        count++;
        promiseResultArr[i] = value;

        // 如果每个Promise都成功才返回成功
        if (count === PromiseArr.length) resolve(promiseResultArr)
      }, reason => {
        reject(reason)
      })
    }
  })
}
```



### 4.15 封装race方法

```js

function Promise(executor) {

  // Promise的两个状态
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const _this = this;
  // 创建空对象用来保存异步时，保存then回调的代码
  this.callbacks = [];

  function resolve(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;
    // resolve内部需要改变状态和结果
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;

    // 异步条件下调用成功的回调
    _this.callbacks.forEach(item => {
      item.onResolved(data)
    });
  }

  function reject(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;

    // reject 内部需要改变状态和结果
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;

    // 异步条件下调用失败的回调
    _this.callbacks.forEach(item => {
      item.onRejected(data)
    })
  }

  // 抛出异常捕获错误
  try {
    // 执行器 函数 是 同步调用的
    executor(resolve, reject);
  } catch (error) {
    reject(error)
  }


}

Promise.prototype.then = function (onResolved, onRejected) {
  const _this = this;
  // 判断回调函数的参数
  if (typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = value => value;
  }
  // then 方法返回的结果仍然是一个Promise
  return new Promise((resolve, reject) => {
    // 封装的then方法根据返回结果执行的回调
    function callback(type) {
      try {
        // 获取回调函数的执行结果
        let result = type(_this.PromiseResult)
        if (result instanceof Promise) {
          result.then(value => {
            resolve(value)
          }, reason => {
            reject(reason)
          })
        } else {
          // 结果对象为成功
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    // then的回调执行
    if (this.PromiseState === 'fulfilled') {
      callback(onResolved);
    }

    if (this.PromiseState === 'rejected') {
      callback(onRejected)
    }

    if (this.PromiseState === 'pending') {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        }
      })
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

Promise.resolve = function (value) {
  // 返回一个Promise
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(value => {
        resolve(value)
      }, reason => {
        reject(reason)
      })
    } else {
      resolve(value)
    }
  }) 
}

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

Promise.all = function (PromiseArr) {
  return new Promise((resolve, reject) => {
    // 用来标记每个Promise都成功
    let count = 0;
    // 用来标识每个promise返回的结果
    let promiseResultArr = [];

    for (let i = 0; i < PromiseArr.length; i++) {
      PromiseArr[i].then(value=> {
        count++;
        promiseResultArr[i] = value;

        // 如果每个Promise都成功才返回成功
        if (count === PromiseArr.length) resolve(promiseResultArr)
      }, reason => {
        reject(reason)
      })
    }
  })
}

Promise.race = function (PromiseArr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < PromiseArr.length; i++) {
      PromiseArr[i].then(value => {
        resolve(value)
      }, reason => {
        reject(reason)
      })
    }
  })
}
```



### 4.16 将then方法的回调改为异步执行

```js

function Promise(executor) {

  // Promise的两个状态
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  const _this = this;
  // 创建空对象用来保存异步时，保存then回调的代码
  this.callbacks = [];

  function resolve(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;
    // resolve内部需要改变状态和结果
    _this.PromiseState = 'fulfilled';
    _this.PromiseResult = data;

    // 将then方法的回调变为异步
    setTimeout(() => {
      // 异步条件下调用成功的回调
      _this.callbacks.forEach(item => {
        item.onResolved(data)
      });
    });
  }

  function reject(data) {
    // 该函数下的 this 指向的是window

    // 让promise的状态只修改一次
    if (_this.PromiseState !== 'pending') return;

    // reject 内部需要改变状态和结果
    _this.PromiseState = 'rejected';
    _this.PromiseResult = data;

    // 将then方法的回调变为异步
    setTimeout(() => {
      // 异步条件下调用失败的回调
      _this.callbacks.forEach(item => {
        item.onRejected(data)
      })
    });
  }

  // 抛出异常捕获错误
  try {
    // 执行器 函数 是 同步调用的
    executor(resolve, reject);
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const _this = this;
  // 判断回调函数的参数
  if (typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = value => value;
  }
  // then 方法返回的结果仍然是一个Promise
  return new Promise((resolve, reject) => {
    // 封装的then方法根据返回结果执行的回调
    function callback(type) {
      try {
        // 获取回调函数的执行结果
        let result = type(_this.PromiseResult)
        if (result instanceof Promise) {
          result.then(value => {
            resolve(value)
          }, reason => {
            reject(reason)
          })
        } else {
          // 结果对象为成功
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    // then的回调执行
    if (this.PromiseState === 'fulfilled') {
      // 将then方法的回调变为异步
      setTimeout(() => {
        callback(onResolved);
      });
    }

    if (this.PromiseState === 'rejected') {
      // 将then方法的回调变为异步
      setTimeout(() => {
        callback(onRejected)
      });
    }

    if (this.PromiseState === 'pending') {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        }
      })
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

Promise.resolve = function (value) {
  // 返回一个Promise
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(value => {
        resolve(value)
      }, reason => {
        reject(reason)
      })
    } else {
      resolve(value)
    }
  }) 
}

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

Promise.all = function (PromiseArr) {
  return new Promise((resolve, reject) => {
    // 用来标记每个Promise都成功
    let count = 0;
    // 用来标识每个promise返回的结果
    let promiseResultArr = [];

    for (let i = 0; i < PromiseArr.length; i++) {
      PromiseArr[i].then(value=> {
        count++;
        promiseResultArr[i] = value;

        // 如果每个Promise都成功才返回成功
        if (count === PromiseArr.length) resolve(promiseResultArr)
      }, reason => {
        reject(reason)
      })
    }
  })
}

Promise.race = function (PromiseArr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < PromiseArr.length; i++) {
      PromiseArr[i].then(value => {
        resolve(value)
      }, reason => {
        reject(reason)
      })
    }
  })
}
```



### 4.17 改写为class方式

```js

class Promise {
  constructor(executor) {
    // Promise的两个状态
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    const _this = this;
    // 创建空对象用来保存异步时，保存then回调的代码
    this.callbacks = [];

    function resolve(data) {
      // 该函数下的 this 指向的是window

      // 让promise的状态只修改一次
      if (_this.PromiseState !== 'pending') return;
      // resolve内部需要改变状态和结果
      _this.PromiseState = 'fulfilled';
      _this.PromiseResult = data;

      // 将then方法的回调变为异步
      setTimeout(() => {
        // 异步条件下调用成功的回调
        _this.callbacks.forEach(item => {
          item.onResolved(data)
        });
      });
    }
    function reject(data) {
      // 该函数下的 this 指向的是window

      // 让promise的状态只修改一次
      if (_this.PromiseState !== 'pending') return;

      // reject 内部需要改变状态和结果
      _this.PromiseState = 'rejected';
      _this.PromiseResult = data;

      // 将then方法的回调变为异步
      setTimeout(() => {
        // 异步条件下调用失败的回调
        _this.callbacks.forEach(item => {
          item.onRejected(data)
        })
      });
    }
    // 抛出异常捕获错误
    try {
      // 执行器 函数 是 同步调用的
      executor(resolve, reject);
    } catch (error) {
      reject(error)
    }
  }
  then(onResolved, onRejected) {
    const _this = this;
    // 判断回调函数的参数
    if (typeof onRejected !== 'function') {
      onRejected = reason => {
        throw reason
      }
    }
    if (typeof onResolved !== 'function') {
      onResolved = value => value;
    }
    // then 方法返回的结果仍然是一个Promise
    return new Promise((resolve, reject) => {
      // 封装的then方法根据返回结果执行的回调
      function callback(type) {
        try {
          // 获取回调函数的执行结果
          let result = type(_this.PromiseResult)
          if (result instanceof Promise) {
            result.then(value => {
              resolve(value)
            }, reason => {
              reject(reason)
            })
          } else {
            // 结果对象为成功
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      }
      // then的回调执行
      if (this.PromiseState === 'fulfilled') {
        // 将then方法的回调变为异步
        setTimeout(() => {
          callback(onResolved);
        });
      }

      if (this.PromiseState === 'rejected') {
        // 将then方法的回调变为异步
        setTimeout(() => {
          callback(onRejected)
        });
      }

      if (this.PromiseState === 'pending') {
        this.callbacks.push({
          onResolved: function () {
            callback(onResolved)
          },
          onRejected: function () {
            callback(onRejected)
          }
        })
      }
    })
  }
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
  static resolve(value) {
    // 返回一个Promise
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(value => {
          resolve(value)
        }, reason => {
          reject(reason)
        })
      } else {
        resolve(value)
      }
    })
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
  static all(PromiseArr) {
    return new Promise((resolve, reject) => {
      // 用来标记每个Promise都成功
      let count = 0;
      // 用来标识每个promise返回的结果
      let promiseResultArr = [];

      for (let i = 0; i < PromiseArr.length; i++) {
        PromiseArr[i].then(value => {
          count++;
          promiseResultArr[i] = value;

          // 如果每个Promise都成功才返回成功
          if (count === PromiseArr.length) resolve(promiseResultArr)
        }, reason => {
          reject(reason)
        })
      }
    })
  }
  static race(PromiseArr) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < PromiseArr.length; i++) {
        PromiseArr[i].then(value => {
          resolve(value)
        }, reason => {
          reject(reason)
        })
      }
    })
  }
}

```

## 五、async与await

### 5.1 async函数

1. 函数的反回值为promise对象
2. promise对象的结果是由async函数的执行返回值决定
   - 如果返回值是一个非Promise类型数据，直接返回成功
   - 如果返回值是一个Promise对象，则该Promise的返回值就是该函数的返回值
   - 抛出异常返回失败的promise

```js
<script>
    /* async函数 */
    // 1.函数的返回值为promise对象
    // 2.promise对象的结果是由async函数的执行返回值决定
    async function main() {  
      // 1.如果返回值是一个非Promise类型的数据，则直接返回成功
      // return 222
      // 2.如果返回值是一个promise对象，则该promise的返回值就是该函数的返回值
      // return new Promise((resolve,reject)=>{
      //   resolve('ok')
      // })
      // 3.抛出异常,返回失败的promise对象
      throw 'error'
    }

    let result = main()
    console.log(result)
  </script>
```



### 3.2 await

1. await右侧的表达式一般为promise对象，但是也可以是其他值
2. 如果表达式是Promise对象，await返回的是Promise成功的值
3. 如果表达式是其他值，直接将此值作为await的返回值

**await必须写在async函数中，但是async函数中可以没有await**

**如果await的promise失败了，就会抛出异常，通过try catch 去处理**

```js
<script>
    /* await */
    /* 
      1.await右侧的表达式一般为promise对象，但是也可以是其他的值
      2.如果表达式是promise对象，await返回的是promise成功的值
      3.如果表达式是其他值，直接将此值作为await的返回值

      注：
        1.await必须卸载async函数中，但是async函数中可以没有await
        2.如果await的promise失败了，就会抛出异常，需要通过 try...catch 捕获
    */

    async function main() {  
      let p = new Promise((resolve,reject)=>{
        // resolve('ok')
        reject('no')
      })
      // // 1.右侧为promise的情况
      // let res = await p
      // console.log(res)
      // // 2.右侧为其他类型的数据
      // let res2 = await 20
      // console.log(res2)
      // 3.promise为失败
      try {
        let res3 = await p
      } catch (error) {
        console.log(error)
      }
    }
    main()
  </script>
```

### 5.3 async与await结合使用

```js
const fs = require('fs')
const util = require('util')
const mineReadFile = util.promisify(fs.readFile)

async function main() {
  // 分别读取三个文件的内容
  try {
    let data1 = await mineReadFile('./resource/1.txt')
    let data2 = await mineReadFile('./resource/2.txt')
    let data3 = await mineReadFile('./resource/3.txt')
    console.log(data1 + data2 + data3)
  } catch (error) {
    console.log(error)
  }
}

main()
```

