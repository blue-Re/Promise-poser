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

