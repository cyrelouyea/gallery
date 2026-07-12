const { ul, li, a } = van.tags

const LINKS = [
  { href: "index.html", label: "Home" },
  { href: "gallery.html", label: "Gallery" },
]

const Header = () => ul(
  LINKS.map(({ href, label }) =>
    li({ class: "border" }, a({ class: "link", href }, label))
  )
)


van.add(document.querySelector('nav'), Header())
