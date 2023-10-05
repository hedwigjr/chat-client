export function debounce(func, time){
    let isCooldown = false
    return function(...args){
        if (isCooldown) return
        isCooldown = true
        setTimeout(()=>isCooldown=false, time)
        return func.apply(this, args)
    }
}