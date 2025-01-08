export function AutoBind(_: any, _1: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            return originalMethod.bind(this)
        }
    }

    return adjustedDescriptor
}
