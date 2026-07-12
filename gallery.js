
const {button, div, img} = van.tags


const IMAGES = [
  { src: "public/img/landscape/beach.jpg" },
  { src: "public/img/landscape/chrono_trigger_zhyle.jpg" },
  { src: "public/img/landscape/feltiliminal.jpg" },
  { src: "public/img/landscape/makai.jpg" },
  { src: "public/img/landscape/papillon.jpg" },
  { src: "public/img/landscape/reimu.jpg" },
  { src: "public/img/landscape/test.jpg" },
  { src: "public/img/landscape/amaurot.jpg" },
  { src: "public/img/mono/doremi_color.jpg" },
  { src: "public/img/mono/doremy.jpg" },
  { src: "public/img/mono/pumpiino_blender.jpg" },
  { src: "public/img/mono/sakuya.jpg" },
  { src: "public/img/mono/seija.jpg" },
  { src: "public/img/mono/wriggle_mono.jpg" },
  { src: "public/img/mono/keiki_mono.jpg" },
  { src: "public/img/pixelart/follow_me_unafraid.png" },
  { src: "public/img/pixelart/mysterious_snake_show.png" },
  { src: "public/img/pixelart/sea.png" },
  { src: "public/img/pixelart/takane.png" },
  { src: "public/img/pixelart/Ninnie.png" },
  { src: "public/img/pixelart/alice.png" },
  { src: "public/img/pixelart/b114.png" },
  { src: "public/img/pixelart/gray2.gif" },
  { src: "public/img/pixelart/gray-ending-2.png" },
  { src: "public/img/pixelart/lillie2.png" },
  { src: "public/img/pixelart/spr_soundtest_code_015_0.png" },
  { src: "public/img/pixelart/grayspeedrun.png" },
  { src: "public/img/pixelart/bnunytan.png" },
  { src: "public/img/pixelart/beeee2.png" },
  { src: "public/img/pixelart/reimu.png" },
  { src: "public/img/pixelart/mikuleek.png" },
  { src: "public/img/portrait/birthday.jpg" },
  { src: "public/img/portrait/felti.jpg" },
  { src: "public/img/portrait/ghost_trick.jpg" },
  { src: "public/img/portrait/kua.jpg" },
  { src: "public/img/portrait/muse.jpg" },
  { src: "public/img/portrait/muse2.jpg" },
  { src: "public/img/portrait/muse3.jpg" },
  { src: "public/img/portrait/muse7.jpg" },
  { src: "public/img/portrait/pumpiino.jpg" },
  { src: "public/img/portrait/pumpi22.jpg" },
  { src: "public/img/portrait/rosalind.jpg" },
  { src: "public/img/portrait/sophie.jpg" },
  { src: "public/img/portrait/sumireko.jpg" },
  { src: "public/img/portrait/fireworks.jpg" },
  { src: "public/img/portrait/noxshield.jpg" },
  { src: "public/img/portrait/noxshield2.jpg" },
  { src: "public/img/portrait/noxshield3.jpg" },
  { src: "public/img/portrait/megumi.jpg" },
  { src: "public/img/portrait/pumpiinothanksgiving.jpg" },
  { src: "public/img/quick/hibari_quick.jpg" },
  { src: "public/img/quick/ddc_on_a_line.jpg" },
  { src: "public/img/rough/heroines.jpg" },
  { src: "public/img/rough/sumireko.jpg" },
  { src: "public/img/vs/lords.png" },
  { src: "public/img/vs/ninnie.png" },
  { src: "public/img/vs/tanbee.png" },
  { src: "public/img/vs/vs_wiki_banner.png" },
  { src: "public/img/vs/monster_bee.png" },
  { src: "public/img/vs/casual_gor.png" },
  { src: "public/img/vs/casual_lev.png" },
  { src: "public/img/vs/casual_mon.png" },
  { src: "public/img/vs/casual_tan.png" },
  { src: "public/img/comic/lillie_comic_01.png" },
  { src: "public/img/comic/lillie_comic_02.png" },
  { src: "public/img/comic/lillie_comic_03.png" },
  { src: "public/img/comic/lillie_comic_04.png" },
]

/**
 * Returns a new shuffled array
 * 
 * @template T
 * @param {T[]} array 
 * @returns {T[]}
 */
function shuffle(array) {
  /** @type {T[]} */
  const shuffled = array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return shuffled;
}

const Card = ({ src, onclick }) => div(
  { class:  `card`, onclick },
  img({ src, class: "back" }),
  img({ src, class: "fore" })
)

const Gallery = () => {
  const isOpen = van.state(false);
  const shuffledImages = van.state(shuffle(IMAGES));
  const selectedImage = van.state(null);
  const selectedImageSrc = van.derive(() => selectedImage.val?.src);


  const toggle = () => {
    isOpen.val = false;
  }

  const nextImage = () => {
    const index = shuffledImages.val.indexOf(selectedImage.val)
    selectedImage.val = shuffledImages.val[index + 1];
  }

  return div(
    { class: "gallery" },
    shuffledImages.val.map(image => 
      Card({ src: image.src, onclick: () => { 
        isOpen.val = true;
        selectedImage.val = image;
      }})
    ),
    Modal(
      { isOpen: isOpen, toggle },
      div(
        { class: "viewer" },
        img({ src: selectedImageSrc, onclick: nextImage })
      )
    )
  )
}

const Modal = ({ isOpen, toggle }, ...children) => {
  const display = van.derive(() => isOpen.val ? 'flex' : 'none');

  const onclick = (ev) => {
    if (ev.target === ev.currentTarget) {
      toggle();
    }
  }

  return div(
    { class: "modal", style: () => `display: ${display.val}`, onclick },
    div(
      { class: "modal-content",  },
      button(
        { class: "modal-close", onclick: toggle  },
        "✖"
      ),
      ...children
    ),
    
  )
}

van.add(document.body, Gallery())