export const sleep =  async(sec:number) => {
  return new Promise(s => {
    setTimeout(() => {
      window.location.reload()
    }, sec*1000)
  })
}