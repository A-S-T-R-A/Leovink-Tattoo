import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, f as renderSlot, b as addAttribute, e as renderComponent, m as maybeRenderHead } from '../astro.14afed36.mjs';
import 'html-escaper';
import { A as AppLink, b as classNames, C as ChevronDownIcon, S as Section, M as ModalGallery, G as GalleryGrid, B as Button, e as ArrowDownIcon, T as Typography, h as Modal, a as PlusIcon, i as fetchImagesData, g as getLangFromUrl, d as fetchSectionData, f as fetchGlobalData, $ as $$Layout } from './_...artistSlug_.astro.28d2e717.mjs';
import { F as FormSection } from './contact.astro.fd747d9a.mjs';
import { useState } from 'preact/hooks';
import { s as styles, a as styles$1, b as styles$3, c as styles$4, d as styles$5, e as styles$6, f as styles$7, g as styles$9, h as styles$a, i as styles$b, j as styles$c } from '../index.66423ba1.d67ead9a.mjs';
import { jsxs, jsx, Fragment } from 'preact/jsx-runtime';
import { s as styles$2, a as styles$8 } from '../testimonials.184ffaed.d8012482.mjs';
import '../index.64369eb8.6b42ba8f.mjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { F as FaqBlock } from './faq.astro.87fb6b98.mjs';

function ShowMoreLink({
  to,
  text,
  className
}) {
  return jsxs(AppLink, {
    to,
    className: classNames(styles.container, {}, [className]),
    children: [text, jsx(ChevronDownIcon, {
      className: styles.icon
    })]
  });
}
__astro_tag_component__(ShowMoreLink, "@astrojs/preact");

function Portfolio({
  title,
  button,
  fetchedData,
  language,
  defaultLanguage
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const data = fetchedData.slice(0, 12);
  function clickHandler(index) {
    const newModalData = [...data.slice(index), ...data.slice(0, index)];
    setIsOpen(true);
    setModalData(newModalData);
  }
  const link = language === defaultLanguage ? "/portfolio" : `/${language}/portfolio`;
  return jsxs(Section, {
    title,
    wrapperClassName: styles$1.wrapper,
    children: [jsx(ModalGallery, {
      isOpen,
      onClose: () => setIsOpen(false),
      data: modalData,
      language
    }), jsx(GalleryGrid, {
      data,
      onClick: clickHandler,
      maxHeight: "600px",
      language
    }), jsx(ShowMoreLink, {
      to: link,
      text: button,
      className: styles$1.link
    })]
  });
}
__astro_tag_component__(Portfolio, "@astrojs/preact");

function CtaButton({
  className,
  text
}) {
  function scrollToTarget() {
    const targetElement = document.getElementById("formSection");
    if (targetElement) {
      const offset = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offset,
        behavior: "smooth"
      });
    }
  }
  return jsxs(Button, {
    onClick: scrollToTarget,
    className: classNames(styles$2.btn, {}, [className]),
    children: [text, jsx(ArrowDownIcon, {
      className: styles$2.icon
    })]
  });
}
__astro_tag_component__(CtaButton, "@astrojs/preact");

function Steps({
  data,
  title,
  button
}) {
  const [selected, setSelected] = useState(0);
  return jsxs(Section, {
    title,
    children: [jsx("div", {
      className: styles$3.container,
      children: data.map((item, index) => {
        const {
          title: title2,
          img,
          description
        } = item;
        return jsxs("div", {
          className: styles$3.stepContainer,
          style: {
            flex: index === selected ? "3" : "2"
          },
          children: [jsx("img", {
            src: img,
            alt: "step",
            className: styles$3.img
          }), jsx(Typography, {
            className: styles$3.index,
            tag: "p",
            size: "xxxl",
            color: "base",
            children: "0" + (index + 1)
          }), jsxs("div", {
            className: styles$3.readMoreBtn,
            onClick: () => setSelected(index),
            children: [jsx(Typography, {
              tag: "p",
              size: "m",
              color: "accent",
              className: classNames(styles$3.readMore, {
                [styles$3.selectedReadMore]: selected === index
              }),
              children: "Read More"
            }), jsx(ChevronDownIcon, {
              className: classNames(styles$3.chevron, {
                [styles$3.selectedChevron]: selected === index
              })
            })]
          }), jsxs("div", {
            className: styles$3.textContainer,
            children: [jsx(Typography, {
              className: styles$3.title,
              tag: "h3",
              size: "xxl",
              color: "base",
              weight: "five",
              children: title2
            }), jsx(Typography, {
              className: classNames(styles$3.description, {
                [styles$3.selectedDescription]: selected === index
              }),
              tag: "p",
              color: "base",
              size: "m",
              children: description
            })]
          })]
        });
      })
    }), jsx(CtaButton, {
      className: styles$3.btn,
      text: button
    })]
  });
}
__astro_tag_component__(Steps, "@astrojs/preact");

function ModalImage({
  url,
  className
}) {
  const [isOpen, setIsOpen] = useState(false);
  function onClose() {
    setIsOpen(false);
  }
  if (!url)
    return null;
  return jsxs(Fragment, {
    children: [jsxs(Modal, {
      isOpen,
      onClose,
      contentClassName: styles$4.container,
      children: [jsx("div", {
        className: styles$4.cross,
        onClick: onClose,
        children: jsx(PlusIcon, {})
      }), jsx("img", {
        src: url,
        className: styles$4.img
      })]
    }), jsx("img", {
      src: url,
      alt: "",
      className,
      onClick: () => setIsOpen(true)
    })]
  });
}
__astro_tag_component__(ModalImage, "@astrojs/preact");

function Services({
  data,
  title,
  button
}) {
  const [open, setOpen] = useState(0);
  function clickHandler(index) {
    if (open !== index) {
      setOpen(index);
    } else {
      setOpen(-1);
    }
  }
  return jsx(Section, {
    title,
    children: jsx("ul", {
      className: styles$5.servicesContainer,
      children: data.map((item, index) => {
        const {
          title: title2,
          images,
          description
        } = item;
        return jsx(Fragment, {
          children: jsxs("li", {
            className: styles$5.serviceContainer,
            children: [jsx("div", {
              className: styles$5.serviceClick,
              onClick: () => clickHandler(index),
              children: jsxs(Typography, {
                tag: "h3",
                size: "xxl",
                className: styles$5.title,
                children: ["0", index + 1, ". ", title2, jsx(ArrowDownIcon, {
                  className: classNames(styles$5.arrowIcon, {
                    [styles$5.open]: open === index
                  }, [])
                })]
              })
            }), jsx("div", {
              className: classNames(styles$5.content, {
                [styles$5.isOpen]: open === index,
                [styles$5.isClose]: open !== index
              }, []),
              children: jsxs("div", {
                children: [jsx(Typography, {
                  tag: "p",
                  className: styles$5.description,
                  color: "lightgray",
                  size: "m",
                  children: description
                }), jsx("div", {
                  className: styles$5.imgContainer,
                  children: images.map((image) => {
                    return jsx(ModalImage, {
                      url: image
                    });
                  })
                }), jsx(CtaButton, {
                  className: styles$5.btn,
                  text: button
                })]
              })
            })]
          })
        });
      })
    })
  });
}
__astro_tag_component__(Services, "@astrojs/preact");

function ArtistCard({
  data,
  button,
  language,
  defaultLanguage
}) {
  const {
    img,
    name,
    description,
    specialization,
    slug
  } = data;
  function getLocalizedLink(slug2) {
    const path = "/" + slug2;
    if (language === defaultLanguage)
      return path;
    return "/" + language + path;
  }
  return jsxs("div", {
    className: styles$6.container,
    children: [jsx("img", {
      src: img,
      alt: "",
      className: styles$6.img
    }), jsx(Typography, {
      tag: "h3",
      size: "xxl",
      className: styles$6.name,
      children: name
    }), jsx(Typography, {
      tag: "p",
      size: "m",
      color: "lightgray",
      className: styles$6.specialization,
      children: specialization
    }), jsx(Typography, {
      tag: "p",
      size: "m",
      color: "lightgray",
      className: styles$6.description,
      children: description
    }), jsxs(AppLink, {
      to: getLocalizedLink(slug),
      className: styles$6.view,
      children: [button, " ", jsx(ArrowDownIcon, {})]
    })]
  });
}
__astro_tag_component__(ArtistCard, "@astrojs/preact");

function Artists({
  data,
  title,
  button,
  language,
  defaultLanguage
}) {
  return jsx(Section, {
    title,
    children: jsx(Swiper, {
      spaceBetween: 20,
      slidesPerView: 1,
      modules: [Pagination, Navigation],
      pagination: {
        clickable: true
      },
      breakpoints: {
        489: {
          slidesPerView: 2
        },
        769: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 4
        }
      },
      className: classNames(styles$7.swiper, {}, ["artistPagination"]),
      children: data.map((item) => {
        return jsx(SwiperSlide, {
          className: styles$7.slide,
          children: jsx(ArtistCard, {
            data: item,
            button,
            language,
            defaultLanguage
          })
        });
      })
    })
  });
}
__astro_tag_component__(Artists, "@astrojs/preact");

function Testimonial({
  isReversed,
  isWithBorder,
  data,
  cta
}) {
  const {
    title,
    description,
    duration,
    artist,
    preview,
    video
  } = data;
  return jsxs("div", {
    className: styles$8.container,
    style: {
      borderBottom: isWithBorder ? "1px solid var(--color-darkgray)" : ""
    },
    children: [jsx("div", {
      className: styles$8.videoContainer,
      children: jsx("video", {
        src: video,
        poster: preview,
        controls: true
      })
    }), jsxs("div", {
      className: styles$8.infoContainer,
      children: [jsx(Typography, {
        tag: "h3",
        size: "xxl",
        weight: "five",
        className: styles$8.title,
        children: title
      }), jsx(Typography, {
        tag: "p",
        color: "lightgray",
        className: styles$8.description,
        children: description
      }), jsxs("div", {
        className: styles$8.info,
        children: [jsxs(Typography, {
          tag: "h5",
          children: [jsx("span", {
            className: styles$8.bold,
            children: "tattoo artist:"
          }), " ", artist]
        }), jsxs(Typography, {
          tag: "h5",
          children: [jsx("span", {
            className: styles$8.bold,
            children: "duration:"
          }), " ", duration]
        })]
      }), jsx(CtaButton, {
        text: cta
      })]
    })]
  });
}
__astro_tag_component__(Testimonial, "@astrojs/preact");

function Testimonials({
  data,
  title,
  showMore,
  cta,
  language,
  defaultLanguage
}) {
  const link = language === defaultLanguage ? "/testimonials" : `/${language}/testimonials`;
  return jsxs(Section, {
    title,
    children: [data.map((item, index, array) => jsx(Testimonial, {
      data: item,
      cta,
      isWithBorder: index !== array.length - 1
    })), jsx(ShowMoreLink, {
      to: link,
      text: showMore,
      className: styles$9.showMore
    })]
  });
}
__astro_tag_component__(Testimonials, "@astrojs/preact");

function Faq({
  data,
  title,
  button,
  language,
  defaultLanguage
}) {
  const link = language === defaultLanguage ? "/faq" : `/${language}/faq`;
  return jsxs(Section, {
    title,
    children: [jsx(FaqBlock, {
      data: data.filter((item) => item.title === "index")[0],
      isWithoutTitle: true
    }), jsx(ShowMoreLink, {
      to: link,
      text: button,
      className: styles$a.link
    })]
  });
}
__astro_tag_component__(Faq, "@astrojs/preact");

const leovinkTitle = "/_astro/leovinkLogo.daf659c7.webp";

const leovinkHorns = "/_astro/leovinkHorns.66d4d70c.png";

const layerBaseImg = "/_astro/base-bg.c3f5d5f0.webp";

const layerBaseImgLowRes = "data:image/webp;base64,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";

const layerMiddleImg = "/_astro/layer-middle.58ed6f6b.webp";

const layerMiddleImgLowRes = "data:image/webp;base64,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";

const layerFrontImg = "/_astro/layer-front.d8c5e40f.webp";

const layerFrontImgLowRes = "data:image/webp;base64,UklGRt4EAABXRUJQVlA4WAoAAAAQAAAAxwAAhgAAQUxQSGsDAAABoIdt++HGer5vmrrd3WPbtm3btm3bNte2bdu2beQkaTsz3x9B00lx3IiYAK31f63/a/1f6/+/PkWkZiDUEASpEQiIUAMQEBF1qn0ggqhT7RMEUXWqewIiok58BgGSQUJmCQIgAog6mQCQhDOaHwaoAgQMQAuBJICoKgQHdpCinZ/8dDtERJ0KAEhFBCAO6p1yySmAqLLzFZ3nt3txPyg6cL/DITAgXPbhjac0G3ftlzcVoArknnWLg1CnEIIgCvrWxLenbGp1MqGQOEmzUhGS1t3tnn0AEjiFucdecWwdUHIunmbefaH9dgOBkweWmq2+46n5sT9ijxIvAaDeUYReHNxx+oKy2O97IALXNO649m4g58FOVxSgKkCaAAHIPbZLydj3bhkxZ8DwQXuhooJSzqI9Djj6optPuWHREruK3Lws4nPOf29Gmb/0VYWHw2ZL2s+ZumTYVXDP79PNzMos4YT6p+luABUj0PLra1qu32rm2+Zm9beHMwYuMFv6beuR3Ro3HPTOvgAnXX8EaaH40B2c81556usxnpVFrekZbw22GyCrTn6diwb/8vB5bX/69O0XHrrj+use77V0a9Qzs22uW7Z03rwF03o26f/C7uT8tipsZk0PuKTnYtds89lH9Vi/7ImGYStvZOSGtnfvUwSSNgG53o1YUs/mvnte0/q/W4p+l5evve3XRs06XJCm/Gvv/6D+HEva9aQxy5/Je+jXUYtnL3UtiBu+62OJXUs48rGOVoEb59W/JYf0CM6On80JW6re4ojZhm2pJB53XR2kPICoAqHD1yTbvNxKv19glfl40iPO/ofdsdCzIEYGHAKkxv4HKYDAc1Z1ul/uCyrJU6DuxTeMNdcLgIUHtn1pH0JOKtetn9jpjoI6DsWTqhCzyA97gCZJqKqw885XT2kZs6COfP4sB1CJp+4Jsxe1uL/34Xf8vrxKMZvy2NGAajIRgdAbTW590QuMbery1hP35pM0+9qHJ07r1WeJVbkbv9lZiihn7tmtZ4ct6KNfO/PE8y4/KcQzvc0sYlXyuPZdnz9m+zr7n7HnvmffetUJZ73SZplvmVhi1rnp1DtbWlUe3bJs8ugRQ7p26jV8+sJVmyNlmVE99F23NLJl48bN4Wip61u13vc813U9zzPfqv2+71ut///1GwBWUDggTAEAABAPAJ0BKsgAhwA+kUieTCWnoyUhtVlw8BIJaQoNaBdAUIXS5Nai7ngkouz6gi1hiKq/PclsRVSVuN1qLs+oIfUEPqCCgGgJtwtOu2JUqg/HK0JXJ/2ATn83PO2FRNBEu+fA28nvZeaFeozTohfQM6o68mQ5/KB7s0L2g1u/QD9SgAD+/mpq2mzsRyAAAALeKGQA77KOAAidTIdFpyYS90u+bwfhV7xQRZoAGtLJi9RJNAjS4Y8YBjXS6FLgZ7PaxPcZ+iacoTDQ3eHUUM4P+/GOsc/4146rKX7R2zte2zzPRC3M9txrm0fB9sp36OiFWYzTYx5ioONsmm4z42DgPpn2dk23zshpqBS6cVpL+4Bx4THTNtYXfUC3ygDWlFwGCFRQt5ovxR0ianh2A3V2pMpaggd7Obb1SjTXJF+xs8kN/ULiIMemIQR6bFAA";

const dungeonImg = "/_astro/dungeon2.72d5a2ab.webp";

function ScrollIcon({
  className,
  query
}) {
  function clickHandler() {
    query && document.querySelector(query)?.scrollIntoView({
      behavior: "smooth"
    });
  }
  return jsx("div", {
    className: classNames(styles$b.container, {}, [className]),
    onClick: clickHandler,
    children: jsx("div", {
      className: styles$b.ball
    })
  });
}
__astro_tag_component__(ScrollIcon, "@astrojs/preact");

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$3 = createAstro();
const $$Main = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Main;
  return renderTemplate(_a || (_a = __template(["", '<header id="wrapperMainSection"', '>\n  <div id="main-container"', ">\n    <div", ">\n      <img", "", ">\n      <img", ' alt=""', ">\n      <p", ">TATTOO & PIERCING</p>\n      <p", '>EST. 2010</p>\n    </div>\n\n    <div id="baseImg"', "", "", '></div>\n    \n    <div id="middleImg"', "", "", '></div>\n    \n    <div id="frontImg"', "", "", "></div>\n\n    ", "\n  </div>\n</header>\n<div", ' id="dungeon"', "></div>\n", '\n\n<script>\nfunction onScrollMobile() {\n  throttleMobile(() => {\n    document.documentElement.style.setProperty("--scrollTop", `${window.scrollY}px`)\n  })()\n}\n\nfunction onScrollDesktop() {\n  throttleDesktop(() => {\n    document.documentElement.style.setProperty("--scrollTop", `${window.scrollY}px`)\n  })()\n}\n\nfunction throttleDesktop(fn, delay = 50) {\n  let timeoutId;\n  return function (...args) {\n    if (timeoutId) {\n      return;\n    }\n    timeoutId = setTimeout(() => {\n      fn(...args);\n      timeoutId = null;\n    }, delay);\n  }\n}\n\nfunction throttleMobile(func, delay = 50) {\n  let timeoutId;\n  let lastExecutedTime = 0;\n\n  return function (...args) {\n    const currentTime = new Date().getTime();\n\n    if (currentTime - lastExecutedTime < delay) {\n      clearTimeout(timeoutId);\n      timeoutId = setTimeout(() => {\n        lastExecutedTime = currentTime;\n        func(...args);\n      }, delay);\n    } else {\n      lastExecutedTime = currentTime;\n      func(...args);\n    }\n  };\n}\n\nfunction applyDataSrc(id) {\n  const base = document.getElementById(id)\n  const imgEl = new Image()\n  imgEl.src = base.getAttribute("data-src")\n\n  if (imgEl.complete) {\n    base.style.backgroundImage = `url(${imgEl.src})`\n  } else {\n    imgEl.onload = () => {\n      base.style.opacity = 0.1\n      base.style.backgroundImage = `url(${imgEl.src})`\n      base.style.opacity = 1\n      base.classList.add("loaded")\n    }\n  }\n}\n\napplyDataSrc("baseImg")\napplyDataSrc("middleImg")\napplyDataSrc("frontImg")\n\nconst observer = new IntersectionObserver((entries) => {\n  entries.forEach((entry) => {\n    if (entry.isIntersecting) {\n      if (window.innerWidth < 961) {\n        window.addEventListener("scroll", onScrollMobile, { passive: true })\n      } else {\n        window.addEventListener("scroll", onScrollDesktop, { passive: true })\n      }\n    } else {\n      window.removeEventListener("scroll", onScrollMobile)\n      window.removeEventListener("scroll", onScrollDesktop)\n    }\n  })\n}, { rootMargin: "150px 0px 0px 0px" })\n\nobserver.observe(document.getElementById("wrapperMainSection"))\n<\/script>'], ["", '<header id="wrapperMainSection"', '>\n  <div id="main-container"', ">\n    <div", ">\n      <img", "", ">\n      <img", ' alt=""', ">\n      <p", ">TATTOO & PIERCING</p>\n      <p", '>EST. 2010</p>\n    </div>\n\n    <div id="baseImg"', "", "", '></div>\n    \n    <div id="middleImg"', "", "", '></div>\n    \n    <div id="frontImg"', "", "", "></div>\n\n    ", "\n  </div>\n</header>\n<div", ' id="dungeon"', "></div>\n", '\n\n<script>\nfunction onScrollMobile() {\n  throttleMobile(() => {\n    document.documentElement.style.setProperty("--scrollTop", \\`\\${window.scrollY}px\\`)\n  })()\n}\n\nfunction onScrollDesktop() {\n  throttleDesktop(() => {\n    document.documentElement.style.setProperty("--scrollTop", \\`\\${window.scrollY}px\\`)\n  })()\n}\n\nfunction throttleDesktop(fn, delay = 50) {\n  let timeoutId;\n  return function (...args) {\n    if (timeoutId) {\n      return;\n    }\n    timeoutId = setTimeout(() => {\n      fn(...args);\n      timeoutId = null;\n    }, delay);\n  }\n}\n\nfunction throttleMobile(func, delay = 50) {\n  let timeoutId;\n  let lastExecutedTime = 0;\n\n  return function (...args) {\n    const currentTime = new Date().getTime();\n\n    if (currentTime - lastExecutedTime < delay) {\n      clearTimeout(timeoutId);\n      timeoutId = setTimeout(() => {\n        lastExecutedTime = currentTime;\n        func(...args);\n      }, delay);\n    } else {\n      lastExecutedTime = currentTime;\n      func(...args);\n    }\n  };\n}\n\nfunction applyDataSrc(id) {\n  const base = document.getElementById(id)\n  const imgEl = new Image()\n  imgEl.src = base.getAttribute("data-src")\n\n  if (imgEl.complete) {\n    base.style.backgroundImage = \\`url(\\${imgEl.src})\\`\n  } else {\n    imgEl.onload = () => {\n      base.style.opacity = 0.1\n      base.style.backgroundImage = \\`url(\\${imgEl.src})\\`\n      base.style.opacity = 1\n      base.classList.add("loaded")\n    }\n  }\n}\n\napplyDataSrc("baseImg")\napplyDataSrc("middleImg")\napplyDataSrc("frontImg")\n\nconst observer = new IntersectionObserver((entries) => {\n  entries.forEach((entry) => {\n    if (entry.isIntersecting) {\n      if (window.innerWidth < 961) {\n        window.addEventListener("scroll", onScrollMobile, { passive: true })\n      } else {\n        window.addEventListener("scroll", onScrollDesktop, { passive: true })\n      }\n    } else {\n      window.removeEventListener("scroll", onScrollMobile)\n      window.removeEventListener("scroll", onScrollDesktop)\n    }\n  })\n}, { rootMargin: "150px 0px 0px 0px" })\n\nobserver.observe(document.getElementById("wrapperMainSection"))\n<\/script>'])), maybeRenderHead($$result), addAttribute(styles$c.mainWrapper, "class"), addAttribute(styles$c.mainContainer, "class"), addAttribute(styles$c.textContainer, "class"), addAttribute(leovinkHorns, "src"), addAttribute(styles$c.horns, "class"), addAttribute(leovinkTitle, "src"), addAttribute(styles$c.title, "class"), addAttribute(styles$c.caption, "class"), addAttribute(styles$c.est, "class"), addAttribute(`${styles$c.layerBase} ${styles$c.layer}`, "class"), addAttribute({ backgroundImage: `url(${layerBaseImgLowRes})` }, "style"), addAttribute(layerBaseImg, "data-src"), addAttribute(`${styles$c.layerMiddle} ${styles$c.layer}`, "class"), addAttribute({ backgroundImage: `url(${layerMiddleImgLowRes})` }, "style"), addAttribute(layerMiddleImg, "data-src"), addAttribute(`${styles$c.layerFront} ${styles$c.layer}`, "class"), addAttribute({ backgroundImage: `url(${layerFrontImgLowRes})` }, "style"), addAttribute(layerFrontImg, "data-src"), renderComponent($$result, "ScrollIcon", ScrollIcon, { "client:load": true, "className": styles$c.scroll, "client:component-hydration": "load", "client:component-path": "shared/ui/ScrollIcon/ScrollIcon", "client:component-export": "ScrollIcon" }), addAttribute(styles$c.dungeon, "class"), addAttribute({ backgroundImage: `url(${dungeonImg})` }, "style"), renderSlot($$result, $$slots["default"]));
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/widgets/Main/Main.astro");

const $$Astro$2 = createAstro();
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$2;
  const defaultLanguage = "en";
  const imagesData = await fetchImagesData();
  const language = getLangFromUrl(Astro2.url);
  const stepsData = await fetchSectionData(language, "steps");
  const servicesData = await fetchSectionData(language, "services");
  const artistsData = await fetchSectionData(language, "artists");
  const faqData = await fetchSectionData(language, "faq");
  const testimonialsData = await fetchSectionData(language, "testimonials");
  const globalData = await fetchGlobalData();
  const { sectionNames, buttons, formData } = globalData;
  const { portfolio, steps, services, artists, testimonials, faq, form } = sectionNames[language];
  const { cta, showMore, viewGallery } = buttons[language];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "Main", $$Main, {}, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "Portfolio", Portfolio, { "client:idle": true, "title": portfolio, "button": showMore, "fetchedData": imagesData, "language": language, "defaultLanguage": defaultLanguage, "client:component-hydration": "idle", "client:component-path": "widgets/Portfolio/Portfolio", "client:component-export": "Portfolio" })}
        ${renderComponent($$result3, "Steps", Steps, { "client:load": true, "data": stepsData, "title": steps, "button": cta, "client:component-hydration": "load", "client:component-path": "widgets/Steps/Steps", "client:component-export": "Steps" })}
        ${renderComponent($$result3, "Services", Services, { "client:idle": true, "data": servicesData, "title": services, "button": cta, "client:component-hydration": "idle", "client:component-path": "widgets/Services/Services", "client:component-export": "Services" })}
        ${renderComponent($$result3, "Artists", Artists, { "client:idle": true, "data": artistsData, "title": artists, "button": viewGallery, "language": language, "defaultLanguage": defaultLanguage, "client:component-hydration": "idle", "client:component-path": "widgets/Artists/Artists", "client:component-export": "Artists" })}
        ${renderComponent($$result3, "Testimonials", Testimonials, { "data": testimonialsData.slice(0, 2), "title": testimonials, "showMore": showMore, "cta": cta, "language": language, "defaultLanguage": defaultLanguage })}
        ${renderComponent($$result3, "Faq", Faq, { "client:idle": true, "data": faqData, "title": faq, "button": showMore, "language": language, "defaultLanguage": defaultLanguage, "client:component-hydration": "idle", "client:component-path": "widgets/Faq/Faq", "client:component-export": "Faq" })}
        ${renderComponent($$result3, "FormSection", FormSection, { "client:load": true, "data": formData[language], "title": form, "button": cta, "client:component-hydration": "load", "client:component-path": "widgets/FormSection/FormSection", "client:component-export": "FormSection" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/index.astro");

const $$file$2 = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/index.astro";
const $$url$2 = "";

const index$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$2,
    file: $$file$2,
    url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  const defaultLanguage = "en";
  const imagesData = await fetchImagesData();
  const language = getLangFromUrl(Astro2.url);
  const stepsData = await fetchSectionData(language, "steps");
  const servicesData = await fetchSectionData(language, "services");
  const artistsData = await fetchSectionData(language, "artists");
  const faqData = await fetchSectionData(language, "faq");
  const testimonialsData = await fetchSectionData(language, "testimonials");
  const globalData = await fetchGlobalData();
  const { sectionNames, buttons, formData } = globalData;
  const { portfolio, steps, services, artists, testimonials, faq, form } = sectionNames[language];
  const { cta, showMore, viewGallery } = buttons[language];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "Main", $$Main, {}, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "Portfolio", Portfolio, { "client:idle": true, "title": portfolio, "button": showMore, "fetchedData": imagesData, "language": language, "defaultLanguage": defaultLanguage, "client:component-hydration": "idle", "client:component-path": "widgets/Portfolio/Portfolio", "client:component-export": "Portfolio" })}
        ${renderComponent($$result3, "Steps", Steps, { "client:load": true, "data": stepsData, "title": steps, "button": cta, "client:component-hydration": "load", "client:component-path": "widgets/Steps/Steps", "client:component-export": "Steps" })}
        ${renderComponent($$result3, "Services", Services, { "client:idle": true, "data": servicesData, "title": services, "button": cta, "client:component-hydration": "idle", "client:component-path": "widgets/Services/Services", "client:component-export": "Services" })}
        ${renderComponent($$result3, "Artists", Artists, { "client:idle": true, "data": artistsData, "title": artists, "button": viewGallery, "language": language, "defaultLanguage": defaultLanguage, "client:component-hydration": "idle", "client:component-path": "widgets/Artists/Artists", "client:component-export": "Artists" })}
        ${renderComponent($$result3, "Testimonials", Testimonials, { "data": testimonialsData.slice(0, 2), "title": testimonials, "showMore": showMore, "cta": cta, "language": language, "defaultLanguage": defaultLanguage })}
        ${renderComponent($$result3, "Faq", Faq, { "client:idle": true, "data": faqData, "title": faq, "button": showMore, "language": language, "defaultLanguage": defaultLanguage, "client:component-hydration": "idle", "client:component-path": "widgets/Faq/Faq", "client:component-export": "Faq" })}
        ${renderComponent($$result3, "FormSection", FormSection, { "client:load": true, "data": formData[language], "title": form, "button": cta, "client:component-hydration": "load", "client:component-path": "widgets/FormSection/FormSection", "client:component-export": "FormSection" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/index.astro");

const $$file$1 = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ro/index.astro";
const $$url$1 = "/ro";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$1,
    file: $$file$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const defaultLanguage = "en";
  const imagesData = await fetchImagesData();
  const language = getLangFromUrl(Astro2.url);
  const stepsData = await fetchSectionData(language, "steps");
  const servicesData = await fetchSectionData(language, "services");
  const artistsData = await fetchSectionData(language, "artists");
  const faqData = await fetchSectionData(language, "faq");
  const testimonialsData = await fetchSectionData(language, "testimonials");
  const globalData = await fetchGlobalData();
  const { sectionNames, buttons, formData } = globalData;
  const { portfolio, steps, services, artists, testimonials, faq, form } = sectionNames[language];
  const { cta, showMore, viewGallery } = buttons[language];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "Main", $$Main, {}, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "Portfolio", Portfolio, { "client:idle": true, "title": portfolio, "button": showMore, "fetchedData": imagesData, "language": language, "defaultLanguage": defaultLanguage, "client:component-hydration": "idle", "client:component-path": "widgets/Portfolio/Portfolio", "client:component-export": "Portfolio" })}
        ${renderComponent($$result3, "Steps", Steps, { "client:load": true, "data": stepsData, "title": steps, "button": cta, "client:component-hydration": "load", "client:component-path": "widgets/Steps/Steps", "client:component-export": "Steps" })}
        ${renderComponent($$result3, "Services", Services, { "client:idle": true, "data": servicesData, "title": services, "button": cta, "client:component-hydration": "idle", "client:component-path": "widgets/Services/Services", "client:component-export": "Services" })}
        ${renderComponent($$result3, "Artists", Artists, { "client:idle": true, "data": artistsData, "title": artists, "button": viewGallery, "language": language, "defaultLanguage": defaultLanguage, "client:component-hydration": "idle", "client:component-path": "widgets/Artists/Artists", "client:component-export": "Artists" })}
        ${renderComponent($$result3, "Testimonials", Testimonials, { "data": testimonialsData.slice(0, 2), "title": testimonials, "showMore": showMore, "cta": cta, "language": language, "defaultLanguage": defaultLanguage })}
        ${renderComponent($$result3, "Faq", Faq, { "client:idle": true, "data": faqData, "title": faq, "button": showMore, "language": language, "defaultLanguage": defaultLanguage, "client:component-hydration": "idle", "client:component-path": "widgets/Faq/Faq", "client:component-export": "Faq" })}
        ${renderComponent($$result3, "FormSection", FormSection, { "client:load": true, "data": formData[language], "title": form, "button": cta, "client:component-hydration": "load", "client:component-path": "widgets/FormSection/FormSection", "client:component-export": "FormSection" })}
    ` })}
` })}`;
}, "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/index.astro");

const $$file = "C:/Users/Artius/Documents/GitHub/Leovink-Tattoo/front/src/pages/ru/index.astro";
const $$url = "/ru";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { Testimonial as T, index$1 as a, index as b, index$2 as i };
