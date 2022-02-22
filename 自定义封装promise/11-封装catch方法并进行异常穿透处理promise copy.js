
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