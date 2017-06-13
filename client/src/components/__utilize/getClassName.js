export default function getClassName(classObject, classOptional = null) {
    let classList = []

    for(let className in classObject) {
    	// classObject[key] is a logic expression to show className
        if(classObject[className]) {
            classList.push(className)
        }
    }

    if(classOptional) 
    	classList.push(classOptional)

    return classList.join(" ")
}