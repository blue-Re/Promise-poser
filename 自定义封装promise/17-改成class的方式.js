
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
