function onEntry(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add('animated-element--show')
    }
  })
}

let observer = new IntersectionObserver(onEntry, { threshold: [0.5] })
let elements = document.querySelectorAll('.animated-element')
for (let elm of elements) {
  observer.observe(elm)
}
