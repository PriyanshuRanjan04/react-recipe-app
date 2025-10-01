export function getFestivalClass(date = new Date()) {
    const m = date.getMonth() + 1
    // Rough mapping by month
    // Diwali (Oct/Nov), Holi (Mar), Eid (Apr/May varies), Onam (Aug/Sep)
    if (m === 10 || m === 11) return 'festival-diwali'
    if (m === 3) return 'festival-holi'
    if (m === 4 || m === 5) return 'festival-eid'
    if (m === 8 || m === 9) return 'festival-onam'
    return ''
}

export function applyFestivalTheme() {
    const cls = getFestivalClass()
    const body = document.body
    body.classList.remove('festival-diwali', 'festival-holi', 'festival-eid', 'festival-onam')
    if (cls) {
        body.classList.add(cls)
    }
}


