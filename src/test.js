console.log("starts")
Promise.resolve().then(()=>{
  console.log("promise")
})
setTimeout(() => {
  console.log("Timeout")})

console.log("ends")

