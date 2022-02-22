
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