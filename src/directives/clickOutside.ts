import type { Directive } from "vue";


export default <Directive>{
    mounted: (el, { value }) => {
        el.__clickOutside__ = function (event: Event) {
            if(!(el === event.target || el.contains(event.target))) {
                value()
            }
        }
        document.body.addEventListener('click',  el.__clickOutside__)
    },
    unmounted: (el, { value }) => {
        document.body.removeEventListener('click',  el.__clickOutside__)

    }
}